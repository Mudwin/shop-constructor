import styles from './DashboardPage.module.css';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';

export default function DashboardPage() {
  return (
    <>
      <div className={styles.container}>
        <PageHeader>Панель управления</PageHeader>
        <div className={styles.stats}>
          <div className={styles.statsItem}>
            <h2 className={styles.statsHeader}>Категории товаров</h2>
            <div className={styles.tile}>
              <ContentTile></ContentTile>
            </div>
          </div>
          <div className={styles.statsItem}>
            <h2 className={styles.statsHeader}>Активность</h2>
            <div className={styles.tile}>
              <ContentTile></ContentTile>
            </div>
          </div>
          <div className={styles.statsItem}>
            <h2 className={styles.statsHeader}>Средний рейтинг товаров</h2>
            <div className={styles.smallTile}>
              <ContentTile></ContentTile>
            </div>
            <h2 className={styles.statsHeader}>Средняя стоимость заказа</h2>
            <div className={styles.priceTile}>
              <ContentTile></ContentTile>
            </div>
          </div>
          <div className={styles.statsItem}>
            <h2 className={styles.statsHeader}>Выручка по месяцам</h2>
            <div className={styles.tile}>
              <ContentTile></ContentTile>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
