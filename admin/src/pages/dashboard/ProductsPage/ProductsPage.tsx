import { useState, useEffect, useCallback, useMemo } from 'react';
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

const statusDisplayMap: Record<string, string> = {
  active: 'В наличии',
  pending: 'Скоро поступит',
  in_stock: 'Черновик',
  inactive: 'Снят с продажи',
  archived: 'Архивирован',
  discontinued: 'Снят с производства',
};

export default function ProductsPage() {
  const navigate = useNavigate();
  const { shop } = useSelector((state: RootState) => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const loadProducts = useCallback(async () => {
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
        limit: 1000,
        sort_by: sortBy,
        sort_order: sortOrder,
      };

      console.log('Загрузка товаров с параметрами:', params);

      const response = await api.getProducts(params);
      console.log('Ответ от API товаров:', response);

      let productsArray: Product[] = [];

      if (Array.isArray(response)) {
        productsArray = response;
      } else if (response && response.products && Array.isArray(response.products)) {
        productsArray = response.products;
      } else if (response && typeof response === 'object') {
        const arrayField = Object.values(response).find((value) => Array.isArray(value));
        if (arrayField) {
          productsArray = arrayField;
        } else {
          setError('Неверный формат ответа от сервера');
        }
      }

      const productsWithDisplayStatus = productsArray.map((product) => ({
        ...product,
        status_display: statusDisplayMap[product.status?.toLowerCase()] || product.status,
      }));

      setAllProducts(productsWithDisplayStatus);
      setProducts(productsWithDisplayStatus);
    } catch (error: any) {
      setError(error.message || 'Ошибка загрузки товаров');
      console.error('Ошибка загрузки товаров:', error);
      setAllProducts([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [shop?.id, sortBy, sortOrder]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!allProducts.length) return;

    let filtered = [...allProducts];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (product) => product.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.id.toString().includes(query) || product.name.toLowerCase().includes(query)
      );
    }

    setProducts(filtered);
  }, [allProducts, statusFilter, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      loadProducts();
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!shop?.id || !window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }

    try {
      await api.deleteProduct(shop.id, productId);
      alert('Товар успешно удален!');
      loadProducts();
    } catch (error: any) {
      alert('Ошибка при удалении товара: ' + (error.message || 'Неизвестная ошибка'));
    }
  };

  const handleEditProduct = (productId: number) => {
    navigate(`/dashboard/products/edit/${productId}`);
  };

  const handleAddProduct = () => {
    navigate('/dashboard/products/add');
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleSortChange = (sortField: string) => {
    if (sortBy === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortField);
      setSortOrder('desc');
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader>Товары</PageHeader>

      <div className={styles.searchContainer}>
        <ContentTile>
          <div className={styles.searchContentContainer}>
            <div className={styles.searchIcon} onClick={() => loadProducts()}>
              <img src={searchIcon} alt="Поиск" />
            </div>
            <div className={styles.inputContainer}>
              <AdminInput
                id="search"
                placeholder="Поиск товара по ID или названию..."
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
                onChange={handleStatusFilterChange}
                className={styles.filterSelect}
              >
                <option value="all">Все статусы</option>
                <option value="active">В наличии</option>
                <option value="pending">Скоро поступит</option>
                <option value="in_stock">Черновик</option>
                <option value="inactive">Снят с продажи</option>
              </select>
            </div>
            <div
              className={styles.sortIconContainer}
              onClick={() => handleSortChange('created_at')}
              style={{ cursor: 'pointer' }}
            >
              <img src={sortIcon} alt="Сортировка" />
            </div>
          </div>
        </ContentTile>
      </div>

      <div className={styles.productsContainer}>
        <ContentTile>
          <div className={styles.productsContentContainer}>
            <div className={styles.productsListButtonsContainer}>
              <div
                className={styles.productsListButton}
                onClick={() => handleSortChange('name')}
                title="Сортировать по названию"
              >
                <img src={gridIcon} alt="Сетка" />
              </div>
              <div
                className={styles.productsListButton}
                onClick={loadProducts}
                title="Обновить список"
              >
                <img src={updateIcon} alt="Обновить" />
              </div>
            </div>

            <div className={styles.productsListHeaders}>
              <div className={styles.headersContainer}>
                <h2
                  className={`${styles.header}`}
                  data-id
                  onClick={() => handleSortChange('id')}
                  style={{ cursor: 'pointer' }}
                >
                  ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </h2>
                <h2
                  className={`${styles.header}`}
                  data-title
                  onClick={() => handleSortChange('name')}
                  style={{ cursor: 'pointer' }}
                >
                  Название {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </h2>
                <h2
                  className={`${styles.header}`}
                  data-category
                  onClick={() => handleSortChange('category_id')}
                  style={{ cursor: 'pointer' }}
                >
                  Категория {sortBy === 'category_id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </h2>
                <h2
                  className={`${styles.header}`}
                  data-price
                  onClick={() => handleSortChange('price')}
                  style={{ cursor: 'pointer' }}
                >
                  Цена {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </h2>
                <h2
                  className={`${styles.header}`}
                  data-amount
                  onClick={() => handleSortChange('stock_quantity')}
                  style={{ cursor: 'pointer' }}
                >
                  Количество {sortBy === 'stock_quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
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
                <div className={styles.empty}>
                  {searchQuery || statusFilter !== 'all'
                    ? 'Товары по вашему запросу не найдены'
                    : 'Товары не найдены'}
                </div>
              ) : (
                <>
                  {products.map((product) => (
                    <AdminListItem
                      key={product.id}
                      type={'product'}
                      id={product.id}
                      title={product.name}
                      category={product.category_name || 'Без категории'}
                      price={product.price}
                      amount={product.stock_quantity}
                      productStatus={product.status}
                      onEdit={() => handleEditProduct(product.id)}
                      onDelete={() => handleDeleteProduct(product.id)}
                    />
                  ))}
                </>
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
