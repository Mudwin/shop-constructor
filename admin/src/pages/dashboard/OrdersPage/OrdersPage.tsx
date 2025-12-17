import styles from './OrdersPage.module.css';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';
import searchIcon from '../../../assets/icons/search-icon.svg';
import AdminInput from '../../../components/ui/AdminInput/AdminInput';
import parametersIcon from '../../../assets/icons/parameters.svg';
import AdminSelect from '../../../components/ui/AdminSelect/AdminSelect';
import sortIcon from '../../../assets/icons/sort-icon.svg';

export default function OrdersPage() {
  return (
    <>
      <div className={styles.container}>
        <PageHeader>Заказы</PageHeader>
        <div className={styles.searchContainer}>
          <ContentTile>
            <div className={styles.searchContentContainer}>
              <div className={styles.searchIcon}>
                <img src={searchIcon} alt="" />
              </div>
              <div className={styles.inputContainer}>
                <AdminInput id={'search'} placeholder="Поиск заказа по ID, клиенту..." />
              </div>
              <div className={styles.parametersIcon}>
                <img src={parametersIcon} alt="" />
              </div>
              <div className={styles.selectContainer}>
                <AdminSelect />
              </div>
              <div className={styles.sortIconContainer}>
                <img src={sortIcon} alt="" />
              </div>
            </div>
          </ContentTile>
        </div>
        <div className={styles.ordersContainer}>
          <ContentTile></ContentTile>
        </div>
      </div>
    </>
  );
}
