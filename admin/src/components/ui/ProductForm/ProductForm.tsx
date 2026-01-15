import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { api } from '../../../api';
import styles from './ProductForm.module.css';
import FormTextField from '../FormTextField/FormTextField';
import Button from '../Button/Button';
import FormLabel from '../FormLabel/FormLabel';
import PageHeader from '../PageHeader/PageHeader';
import ContentTile from '../ContentTile/ContentTile';
import FormFileInput from '../FormFileInput/FormFileInput';
import { checkShopState } from '../../../utils/shopCheck';

interface ProductFormProps {
  productId?: number;
  onSuccess?: () => void;
}

interface Category {
  id: number;
  name: string;
  parent_id?: number;
}

interface ProductImage {
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  is_main?: boolean;
  is_primary?: boolean;
  position?: number;
}

export default function ProductForm({ productId, onSuccess }: ProductFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shop } = useSelector((state: RootState) => state.auth);

  const shopCheck = checkShopState(shop);
  if (!shopCheck.isValid) {
    console.error('Ошибка магазина:', shopCheck.error);
  }

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);

  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category_id: '' as string | number,
    status: 'active',
    sku: '',
    tags: [] as string[],
  });

  useEffect(() => {
    const loadCategories = async () => {
      if (!shop?.id) return;

      setLoadingCategories(true);
      try {
        const categoriesData = await api.getCategories(shop.id, {
          include_children: false,
          limit: 100,
        });
        setCategories(categoriesData.categories || []);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [shop]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId || !shop?.id) return;

      setLoading(true);
      try {
        const product = await api.getProduct(shop.id, productId);
        console.log('Загружен товар:', product);

        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          stock_quantity: product.stock_quantity || 0,
          category_id: product.category_id || '',
          status: product.status || 'active',
          sku: product.sku || '',
          tags: product.tags || [],
        });

        if (product.images && Array.isArray(product.images)) {
          console.log('Изображения товара:', product.images);

          const mainImage =
            product.images.find(
              (img: { is_main: boolean; is_primary: boolean; position: number }) =>
                img.is_main === true || img.is_primary === true || img.position === 0
            ) || product.images[0];

          const additionalImages = product.images.filter(
            (img: { is_main: boolean; is_primary: boolean }) =>
              !(img.is_main === true || img.is_primary === true) && img !== mainImage
          );

          console.log('Главное изображение:', mainImage);
          console.log('Дополнительные изображения:', additionalImages);

          if (mainImage?.url) {
            const fullUrl = api.getFullImageUrl(mainImage.url);
            setMainImageUrl(fullUrl);
            console.log('Установлен URL главного изображения:', fullUrl);
          } else {
            setMainImageUrl(null);
          }

          if (additionalImages.length > 0) {
            const urls = additionalImages
              .map((img: { url: string | null }) => api.getFullImageUrl(img.url))
              .filter((url: string): url is string => url !== null);
            setAdditionalImageUrls(urls);
            console.log('Установлены URL дополнительных изображений:', urls);
          } else {
            setAdditionalImageUrls([]);
          }
        } else {
          setMainImageUrl(null);
          setAdditionalImageUrls([]);
          console.log('У товара нет изображений');
        }
      } catch (error: any) {
        setError(error.message || 'Ошибка загрузки товара');
        console.error('Ошибка загрузки товара:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    } else {
      setMainImageUrl(null);
      setAdditionalImageUrls([]);
      setMainImageFile(null);
      setAdditionalImageFiles([]);
    }
  }, [productId, shop]);

  const uploadProductImages = async (shopId: number, productId: number) => {
    try {
      const allFiles: File[] = [];

      if (mainImageFile) {
        const formData = new FormData();
        formData.append('files', mainImageFile);
        formData.append('is_main', 'true');

        await api.request(`/upload/shops/${shopId}/products/${productId}/upload-images`, {
          method: 'POST',
          body: formData,
        });
        console.log('Главное изображение загружено');
      }

      if (additionalImageFiles.length > 0) {
        for (const file of additionalImageFiles) {
          const formData = new FormData();
          formData.append('files', file);
          formData.append('is_main', 'false');

          await api.request(`/upload/shops/${shopId}/products/${productId}/upload-images`, {
            method: 'POST',
            body: formData,
          });
        }
        console.log('Дополнительные изображения загружены');
      }

      return true;
    } catch (error: any) {
      console.error('Ошибка загрузки изображений:', error);
      throw new Error('Не удалось загрузить изображения');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shop?.id) {
      setError('Магазин не выбран');
      return;
    }

    if (!formData.name.trim()) {
      setError('Введите название товара');
      return;
    }

    if (formData.price <= 0) {
      setError('Цена должна быть больше 0');
      return;
    }

    if (formData.stock_quantity < 0) {
      setError('Количество не может быть отрицательным');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const shopId = shop.id;
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
        category_id: formData.category_id ? Number(formData.category_id) : null,
      };

      let productResponse;

      if (productId) {
        productResponse = await api.updateProduct(shopId, productId, productData);
        console.log('Товар обновлен:', productResponse);

        if (mainImageFile || additionalImageFiles.length > 0) {
          await uploadProductImages(shopId, productId);
        }

        alert('Товар успешно обновлен!');
      } else {
        productResponse = await api.createProduct(shopId, productData);
        console.log('Товар создан:', productResponse);

        if (mainImageFile || additionalImageFiles.length > 0) {
          const newProductId = productResponse.id;
          await uploadProductImages(shopId, newProductId);
        }

        alert('Товар успешно создан!');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard/products');
      }
    } catch (error: any) {
      setError(error.message || 'Ошибка сохранения товара');
      console.error('Ошибка сохранения товара:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock_quantity' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const { name, value } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getMainImageValue = () => {
    if (mainImageFile) {
      return mainImageFile;
    }
    return mainImageUrl;
  };

  const handleAddAdditionalImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      setAdditionalImageFiles((prev) => [...prev, ...files]);
    }
  };

  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImagesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (additionalFileInputRef.current) {
      additionalFileInputRef.current.click();
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader>{productId ? 'Редактирование товара' : 'Создание товара'}</PageHeader>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <ContentTile width="1100" height="700">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formColumns}>
            <div className={styles.column}>
              <FormTextField
                id="name"
                name="name"
                type="input"
                label="Название товара *"
                placeholder="Введите название товара"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <FormTextField
                id="description"
                name="description"
                type="textarea"
                label="Описание"
                placeholder="Введите описание товара"
                value={formData.description}
                onChange={handleChange}
              />

              <FormTextField
                id="sku"
                name="sku"
                type="input"
                label="Артикул (SKU)"
                placeholder="Введите артикул"
                value={formData.sku}
                onChange={handleChange}
              />
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <FormLabel element="category">Категория</FormLabel>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleSelectChange}
                  className={styles.select}
                  disabled={loading || loadingCategories}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {loadingCategories && (
                  <div className={styles.loadingNote}>Загрузка категорий...</div>
                )}
                {categories.length === 0 && !loadingCategories && (
                  <div className={styles.note}>
                    Категории не созданы. Создайте категории во вкладке "Настройки"
                  </div>
                )}
              </div>

              <FormTextField
                id="price"
                name="price"
                type="input"
                inputType="number"
                label="Цена *"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />

              <FormTextField
                id="stock_quantity"
                name="stock_quantity"
                type="input"
                inputType="number"
                label="Количество на складе *"
                placeholder="0"
                value={formData.stock_quantity}
                onChange={handleChange}
                min="0"
                required
              />

              <div className={styles.formGroup}>
                <FormLabel element="status">Статус</FormLabel>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleSelectChange}
                  className={styles.select}
                  disabled={loading}
                >
                  <option value="active">В наличии</option>
                  <option value="pending">Скоро поступит</option>
                  <option value="inactive">Снят с продажи</option>
                  <option value="draft">Черновик</option>
                </select>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.imageUploadSection}>
                <FormLabel element="image">Изображение товара</FormLabel>
                <div className={styles.imageUploadContainer}>
                  <div className={styles.mainImageUpload}>
                    <FormFileInput
                      id="mainImage"
                      value={getMainImageValue()}
                      onChange={(file) => setMainImageFile(file)}
                      accept="image/*"
                      disabled={loading}
                    />
                    <div className={styles.imageHint}>
                      {mainImageUrl || mainImageFile
                        ? 'Основное изображение'
                        : 'Загрузите основное изображение'}
                    </div>
                  </div>

                  <div className={styles.additionalImages}>
                    <div className={styles.additionalImagesLabel}>
                      <span>Дополнительные изображения (опционально)</span>
                      <label htmlFor="additionalImagesInput" className={styles.addImagesButton}>
                        <Button
                          type="button"
                          fontSize={12}
                          color="blue"
                          paddingBlock={4}
                          paddingInline={8}
                          onClick={handleAddImagesClick}
                          disabled={loading}
                        >
                          + Добавить
                        </Button>
                      </label>
                      <input
                        id="additionalImagesInput"
                        ref={additionalFileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAddAdditionalImages}
                        style={{ display: 'none', visibility: 'hidden' }}
                        disabled={loading}
                      />
                    </div>

                    <div className={styles.additionalImagesList}>
                      {additionalImageUrls.map((url, index) => (
                        <div key={`existing-${index}`} className={styles.additionalImageItem}>
                          <img
                            src={url}
                            alt={`Дополнительное изображение ${index + 1}`}
                            className={styles.additionalImagePreview}
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Image';
                            }}
                          />
                          <button
                            type="button"
                            className={styles.removeAdditionalImage}
                            onClick={() => {
                              setAdditionalImageUrls((prev) => prev.filter((_, i) => i !== index));
                            }}
                            title="Удалить изображение"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      {additionalImageFiles.map((file, index) => (
                        <div key={`new-${index}`} className={styles.additionalImageItem}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Новое изображение ${index + 1}`}
                            className={styles.additionalImagePreview}
                          />
                          <button
                            type="button"
                            className={styles.removeAdditionalImage}
                            onClick={() => {
                              setAdditionalImageFiles((prev) => prev.filter((_, i) => i !== index));
                              URL.revokeObjectURL(URL.createObjectURL(file));
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <Button
              type="button"
              fontSize={15}
              color="blue"
              onClick={() => navigate('/dashboard/products')}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button type="submit" fontSize={15} color="blue" disabled={loading}>
              {loading ? 'Сохранение...' : productId ? 'Сохранить изменения' : 'Создать товар'}
            </Button>
          </div>
        </form>
      </ContentTile>
    </div>
  );
}
