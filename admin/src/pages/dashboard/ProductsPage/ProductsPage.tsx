import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../store';
import { api } from '../../../api';
import styles from './ProductsPage.module.css';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';
import searchIcon from '../../../assets/icons/search-icon.svg';
import AdminInput from '../../../components/ui/AdminInput/AdminInput';
import parametersIcon from '../../../assets/icons/parameters.svg';
import sortIcon from '../../../assets/icons/sort-icon.svg';
import gridIcon from '../../../assets/icons/grid-icon.svg';
import updateIcon from '../../../assets/icons/update-icon.svg';
import AdminListItem from '../../../components/ui/AdminListItem/AdminListItem';
import Button from '../../../components/ui/Button/Button';

interface Product {
  id: number;
  name: string;
  category_name: string | null;
  price: number;
  stock_quantity: number;
  status: string;
  status_display?: string;
}

interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

const mapApiStatusToDisplay = (apiStatus: string): string => {
  const statusMap: Record<string, string> = {
    ACTIVE: 'В наличии',
    PENDING: 'Скоро поступит',
    IN_STOCK: 'Черновик',
    INACTIVE: 'Снят с продажи',
  };
  return statusMap[apiStatus] || apiStatus;
};

export default function ProductsPage() {
  const navigate = useNavigate();
  const { shop } = useSelector((state: RootState) => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const loadProducts = async () => {
    if (!shop?.id) {
      setError('Магазин не выбран');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const params: any = {
        shop_id: shop.id,
        skip: 0,
        limit: 100,
        sort_by: sortBy,
        sort_order: sortOrder,
      };

      if (searchQuery) {
        params.search_query = searchQuery;
      }

      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await api.getProducts(params);
      console.log('Ответ от API товаров:', response);

      // Разные варианты обработки ответа
      if (Array.isArray(response)) {
        // Если API неожиданно вернул массив (для обратной совместимости)
        setProducts(response);
      } else if (response && response.products && Array.isArray(response.products)) {
        // Нормальный случай: объект с полем products
        setProducts(response.products);
      } else if (response && typeof response === 'object') {
        // Попробуем найти массив в любом поле объекта
        const arrayField = Object.values(response).find((value) => Array.isArray(value));
        if (arrayField) {
          setProducts(arrayField);
        } else {
          setProducts([]);
          setError('Неверный формат ответа от сервера');
        }
      } else {
        setProducts([]);
      }
    } catch (error: any) {
      setError(error.message || 'Ошибка загрузки товаров');
      console.error('Ошибка загрузки товаров:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [shop, statusFilter, sortBy, sortOrder]);

  // Обработчик поиска
  const handleSearch = () => {
    loadProducts();
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик нажатия Enter в поиске
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Удаление товара
  const handleDeleteProduct = async (productId: number) => {
    if (!shop?.id || !window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }

    try {
      await api.deleteProduct(shop.id, productId);
      alert('Товар успешно удален!');
      loadProducts(); // Перезагружаем список
    } catch (error: any) {
      alert('Ошибка при удалении товара: ' + (error.message || 'Неизвестная ошибка'));
    }
  };

  // Редактирование товара
  const handleEditProduct = (productId: number) => {
    navigate(`/dashboard/products/edit/${productId}`);
  };

  // Добавление товара
  const handleAddProduct = () => {
    navigate('/dashboard/products/add');
  };

  // Получение отображаемого статуса
  const getStatusDisplay = (status: string): string => {
    const statusMap: Record<string, string> = {
      active: 'В наличии',
      pending: 'Скоро поступит',
      inactive: 'Снят с продажи',
      draft: 'Черновик',
    };
    return statusMap[status] || status;
  };

  return (
    <div className={styles.container}>
      <PageHeader>Товары</PageHeader>

      <div className={styles.searchContainer}>
        <ContentTile>
          <div className={styles.searchContentContainer}>
            <div className={styles.searchIcon} onClick={handleSearch}>
              <img src={searchIcon} alt="Поиск" />
            </div>
            <div className={styles.inputContainer}>
              <AdminInput
                id="search"
                placeholder="Поиск товара по ID, названию..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className={styles.parametersIcon}>
              <img src={parametersIcon} alt="Фильтры" />
            </div>
            <div className={styles.selectContainer}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">Все статусы</option>
                <option value="ACTIVE">В наличии</option>
                <option value="PENDING">Скоро поступит</option>
                <option value="INACTIVE">Снят с продажи</option>
                <option value="IN-STOCK">Черновик</option>
              </select>
            </div>
            <div className={styles.sortIconContainer}>
              <img src={sortIcon} alt="Сортировка" />
            </div>
          </div>
        </ContentTile>
      </div>

      <div className={styles.productsContainer}>
        <ContentTile>
          <div className={styles.productsContentContainer}>
            <div className={styles.productsListButtonsContainer}>
              <div className={styles.productsListButton} onClick={() => setSortBy('created_at')}>
                <img src={gridIcon} alt="Сетка" />
              </div>
              <div className={styles.productsListButton} onClick={loadProducts}>
                <img src={updateIcon} alt="Обновить" />
              </div>
            </div>

            <div className={styles.productsListHeaders}>
              <div className={styles.headersContainer}>
                <h2 className={`${styles.header}`} data-id>
                  ID
                </h2>
                <h2 className={`${styles.header}`} data-title>
                  Название
                </h2>
                <h2 className={`${styles.header}`} data-category>
                  Категория
                </h2>
                <h2 className={`${styles.header}`} data-price>
                  Цена
                </h2>
                <h2 className={`${styles.header}`} data-amount>
                  Количество
                </h2>
                <h2 className={`${styles.header}`} data-status>
                  Статус
                </h2>
              </div>
              <div className={styles.headersUnderline}></div>
            </div>

            <div className={styles.productsList}>
              {loading ? (
                <div className={styles.loading}>Загрузка товаров...</div>
              ) : error ? (
                <div className={styles.error}>{error}</div>
              ) : products.length === 0 ? (
                <div className={styles.empty}>Товары не найдены</div>
              ) : (
                products.map((product) => (
                  <AdminListItem
                    key={product.id}
                    type={'product'}
                    id={product.id}
                    title={product.name}
                    category={product.category_name || 'Без категории'}
                    price={product.price}
                    amount={product.stock_quantity}
                    productStatus={product.status} // Отправляем API статус, AdminListItem сам преобразует
                    onEdit={() => handleEditProduct(product.id)}
                    onDelete={() => handleDeleteProduct(product.id)}
                  />
                ))
              )}
            </div>
          </div>
        </ContentTile>
      </div>

      <Button
        fontSize={14}
        color="blue"
        paddingBlock={8}
        paddingInline={30}
        onClick={handleAddProduct}
      >
        Добавить товар
      </Button>
    </div>
  );
}
