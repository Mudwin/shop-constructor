import { stepButtonClasses } from '@mui/material';
import styles from './AdminListItem.module.css';
import editIcon from '../../../assets/icons/edit-icon.svg';

type AdminListItemType = 'order' | 'customer' | 'product';

type OrderStatus = 'Оплачен' | 'В обработке' | 'Отменен' | 'Доставлен';
type ProductStatus = 'В наличии' | 'Скоро поступит' | 'Уточняется' | 'Снят с продажи';
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
  productStatus?: ProductStatus;

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
  productStatus = 'В наличии',
  name,
  email,
  averageMoney,
  customerStatus = 'Новый',
}: AdminListItemProps) {
  if (type === 'order') {
    return (
      <div
        className={`${styles.item} ${styles.order}`}
        style={{ backgroundColor: orderBackgroundColor[orderStatus] }}
      >
        <div className={`${styles.tile} ${styles.orderId}`}>{`#${id}`}</div>
        <div className={`${styles.tile} ${styles.orderClient}`}>{customer}</div>
        <div className={`${styles.tile} ${styles.orderDate}`}>
          <span>{date}</span>
          {time}
        </div>
        <div className={`${styles.tile} ${styles.orderSum}`}>{`${sum} р.`}</div>
        <div className={styles.orderEdit}>
          <img src={editIcon} alt="" />
        </div>
        <div className={`${styles.tile} ${styles.orderStatus}`}>{orderStatus}</div>
      </div>
    );
  }
}
