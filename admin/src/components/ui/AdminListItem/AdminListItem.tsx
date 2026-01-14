import styles from './AdminListItem.module.css';
import editIcon from '../../../assets/icons/edit-icon.svg';

type AdminListItemType = 'order' | 'customer' | 'product' | 'admin';

type OrderStatus = 'Оплачен' | 'В обработке' | 'Отменен' | 'Доставлен';
type ProductStatus = 'В наличии' | 'Скоро поступит' | 'Черновик' | 'Снят с продажи' | string;
type CustomerStatus = 'Новый' | 'Активный';

interface AdminListItemProps {
  type: AdminListItemType;
  id: number;
  customer?: string;
  date?: string;
  time?: string;
  sum?: number;
  orderStatus?: OrderStatus;

  title?: string;
  category?: string;
  price?: number;
  amount?: number;
  productStatus?: string;
  onEdit?: () => void;
  onDelete?: () => void;

  name?: string;
  email?: string;
  averageMoney?: number;
  customerStatus?: CustomerStatus;
}

const orderBackgroundColor: Record<OrderStatus, string> = {
  ['Оплачен']: 'var(--color-light-green)',
  ['В обработке']: 'var(--color-light-orange)',
  ['Отменен']: 'var(--color-light-red)',
  ['Доставлен']: 'var(--color-cyan)',
};

const productBackgroundColor: Record<string, string> = {
  ['active']: 'var(--color-light-green)',
  ['pending']: 'var(--color-light-orange)',
  ['draft']: 'var(--color-gray)',
  ['inactive']: 'var(--color-light-red)',
};

const productStatusDisplayMap: Record<string, string> = {
  ['active']: 'В наличии',
  ['pending']: 'Скоро поступит',
  ['in_stock']: 'Черновик',
  ['inactive']: 'Снят с продажи',
};

const customerStatusBackgroundColor: Record<CustomerStatus, string> = {
  ['Новый']: 'var(--color-light-red)',
  ['Активный']: 'var(--color-light-green)',
};

const getDisplayProductStatus = (apiStatus: string): string => {
  const normalizedStatus = apiStatus?.toLowerCase() || '';
  return productStatusDisplayMap[normalizedStatus] || apiStatus || 'Неизвестно';
};

const getProductStatusColor = (apiStatus: string): string => {
  const normalizedStatus = apiStatus?.toLowerCase() || '';
  return productBackgroundColor[normalizedStatus] || 'var(--color-gray)';
};

export default function AdminListItem({
  type,
  id,
  customer,
  date,
  time,
  sum,
  orderStatus = 'В обработке',
  title,
  category,
  price,
  amount,
  productStatus = 'active',
  name,
  email,
  averageMoney,
  customerStatus = 'Новый',
  onEdit,
  onDelete,
}: AdminListItemProps) {
  const displayProductStatus = getDisplayProductStatus(productStatus);
  const productBgColor = getProductStatusColor(productStatus);

  if (type === 'order') {
    return (
      <div
        className={`${styles.item} ${styles.order}`}
        style={{ backgroundColor: orderBackgroundColor[orderStatus] }}
      >
        <div className={`${styles.tile} ${styles.id}`}>{`#${id}`}</div>
        <div className={`${styles.tile} ${styles.orderClient}`}>{customer}</div>
        <div className={`${styles.tile} ${styles.orderDate}`}>
          <span>{date}</span>
          {time}
        </div>
        <div className={`${styles.tile} ${styles.orderSum}`}>{`${sum} р.`}</div>
        <button className={styles.orderEdit}>
          <img src={editIcon} alt="Редактировать" />
        </button>
        <div className={`${styles.tile} ${styles.orderStatus}`}>{orderStatus}</div>
      </div>
    );
  }

  if (type === 'product') {
    return (
      <div
        className={`${styles.item} ${styles.product}`}
        style={{ backgroundColor: productBgColor }}
      >
        <div className={`${styles.tile} ${styles.id}`}>{`#${id}`}</div>
        <div className={`${styles.tile} ${styles.productTitle}`}>{title}</div>
        <div className={`${styles.tile} ${styles.productCategory}`}>{category}</div>
        <div className={`${styles.tile} ${styles.productPrice}`}>{`${price} р.`}</div>
        <div className={`${styles.tile} ${styles.productAmount}`}>{`${amount} шт.`}</div>
        <button
          className={styles.orderEdit}
          onClick={onEdit}
          style={{ cursor: onEdit ? 'pointer' : 'default' }}
          title="Редактировать"
        >
          <img src={editIcon} alt="Редактировать" />
        </button>
        <div className={`${styles.tile} ${styles.productStatus}`}>{displayProductStatus}</div>
      </div>
    );
  }

  if (type === 'customer') {
    return (
      <div className={`${styles.item} ${styles.customer}`}>
        <div className={`${styles.tile} ${styles.id}`}>{`#${id}`}</div>
        <div className={`${styles.tile} ${styles.customerName}`}>{name}</div>
        <div className={`${styles.tile} ${styles.customerEmail}`}>{email}</div>
        <div className={`${styles.tile} ${styles.customerAverageMoney}`}>
          {`${averageMoney} р.`}
        </div>
        <div className={styles.orderEdit}>
          <img src={editIcon} alt="Редактировать" />
        </div>
        <div
          className={`${styles.tile} ${styles.customerStatus}`}
          style={{
            backgroundColor: customerStatusBackgroundColor[customerStatus],
            outline: '2px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          {customerStatus}
        </div>
      </div>
    );
  }

  return null;
}
