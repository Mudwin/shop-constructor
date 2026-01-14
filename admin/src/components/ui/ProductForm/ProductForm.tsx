import { useState, useEffect } from 'react';
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
import { checkShopState } from '../../../utils/shopCheck';

interface ProductFormProps {
  productId?: number; // Если передано, то редактирование
  onSuccess?: () => void;
}

interface Category {
  id: number;
  name: string;
  parent_id?: number;
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
    console.log('ProductForm: состояние магазина:', {
      shop,
      shopId: shop?.id,
      shopIdType: typeof shop?.id,
      parsedId: shop?.id ? shop.id : 'не определено',
      isNaN: shop?.id ? isNaN(shop.id) : true,
    });
  }, [shop]);

  // Загружаем категории при монтировании
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

  // Загружаем данные товара, если это редактирование
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId || !shop?.id) return;

      setLoading(true);
      try {
        const product = await api.getProduct(shop.id, productId);
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
      } catch (error: any) {
        setError(error.message || 'Ошибка загрузки товара');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, shop]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shop?.id) {
      setError('Магазин не выбран');
      return;
    }

    // Валидация
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
      if (!shop || !shop.id || shop.id === null) {
        console.error('Магазин не найден или имеет некорректный ID:', shop);
        return (
          <div className={styles.container}>
            <PageHeader>Ошибка</PageHeader>
            <ContentTile width="1100" height="600">
              <div className={styles.errorMessage}>
                Магазин не найден или не создан. Пожалуйста:
                <ol>
                  <li>Создайте магазин через панель онбординга</li>
                  <li>Перезагрузите страницу</li>
                  <li>Если проблема сохраняется, очистите localStorage</li>
                </ol>
                <div className={styles.debugInfo}>
                  <p>Отладочная информация:</p>
                  <pre>{JSON.stringify({ shop }, null, 2)}</pre>
                </div>
              </div>
              <div className={styles.actions}>
                <Button fontSize={15} color="blue" onClick={() => navigate('/onboarding')}>
                  Перейти к созданию магазина
                </Button>
                <Button
                  fontSize={15}
                  color="blue"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Очистить данные и перезагрузить
                </Button>
              </div>
            </ContentTile>
          </div>
        );
      }

      const shopId = shop.id;

      if (isNaN(shopId)) {
        console.error('Некорректный ID магазина (NaN):', shop.id);
        return (
          <div className={styles.container}>
            <PageHeader>Ошибка</PageHeader>
            <ContentTile width="1100" height="600">
              <div className={styles.errorMessage}>
                Некорректный ID магазина: "{shop.id}". Пожалуйста, перезагрузите страницу.
              </div>
              <Button fontSize={15} color="blue" onClick={() => window.location.reload()}>
                Перезагрузить страницу
              </Button>
            </ContentTile>
          </div>
        );
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
        category_id: formData.category_id ? Number(formData.category_id) : null,
      };

      if (productId) {
        // Редактирование
        await api.updateProduct(shopId, productId, productData);
        alert('Товар успешно обновлен!');
      } else {
        // Создание
        await api.createProduct(shopId, productData);
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

  return (
    <div className={styles.container}>
      <PageHeader>{productId ? 'Редактирование товара' : 'Создание товара'}</PageHeader>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <ContentTile width="1100" height="600">
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
