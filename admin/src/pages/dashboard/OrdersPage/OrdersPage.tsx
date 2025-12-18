import styles from './OrdersPage.module.css';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';
import searchIcon from '../../../assets/icons/search-icon.svg';
import AdminInput from '../../../components/ui/AdminInput/AdminInput';
import parametersIcon from '../../../assets/icons/parameters.svg';
import AdminSelect from '../../../components/ui/AdminSelect/AdminSelect';
import sortIcon from '../../../assets/icons/sort-icon.svg';
import gridIcon from '../../../assets/icons/grid-icon.svg';
import updateIcon from '../../../assets/icons/update-icon.svg';
import AdminListItem from '../../../components/ui/AdminListItem/AdminListItem';

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
          <ContentTile>
            <div className={styles.ordersContentContainer}>
              <div className={styles.ordersListButtonsContainer}>
                <div className={styles.ordersListButton}>
                  <img src={gridIcon} alt="" />
                </div>
                <div className={styles.ordersListButton}>
                  <img src={updateIcon} alt="" />
                </div>
              </div>
              <div className={styles.ordersListHeaders}>
                <div className={styles.headersContainer}>
                  <h2 className={`${styles.header}`} data-id>
                    ID
                  </h2>
                  <h2 className={`${styles.header}`} data-client>
                    Клиент
                  </h2>
                  <h2 className={`${styles.header}`} data-date>
                    Дата
                  </h2>
                  <h2 className={`${styles.header}`} data-sum>
                    Сумма
                  </h2>
                  <h2 className={`${styles.header}`} data-status>
                    Статус
                  </h2>
                </div>
                <div className={styles.headersUnderline}></div>
              </div>
              <div className={styles.ordersList}>
                <AdminListItem
                  type={'order'}
                  id={16384}
                  customer={'a.petrovich@gmail.com'}
                  date={'30.10.2025'}
                  time={'11:31'}
                  sum={512}
                  orderStatus={'Оплачен'}
                />
                <AdminListItem
                  type={'order'}
                  id={8192}
                  customer={'1233423@outlook.com'}
                  date={'30.10.2025'}
                  time={'14:21'}
                  sum={4219}
                  orderStatus={'В обработке'}
                />
                <AdminListItem
                  type={'order'}
                  id={4096}
                  customer={'gdsderffds44534356...'}
                  date={'30.10.2025'}
                  time={'23:43'}
                  sum={2156}
                  orderStatus={'Доставлен'}
                />
                <AdminListItem
                  type={'order'}
                  id={2048}
                  customer={'kfcsogutt@live.com'}
                  date={'30.10.2025'}
                  time={'19:15'}
                  sum={310}
                  orderStatus={'Отменен'}
                />
                <AdminListItem
                  type={'order'}
                  id={121}
                  customer={'a.e.dudkin@gmail.com'}
                  date={'30.10.2025'}
                  time={'16:16'}
                  sum={110}
                  orderStatus={'Оплачен'}
                />
                <AdminListItem
                  type={'order'}
                  id={256}
                  customer={'d.a.lugov@gmail.com'}
                  date={'30.10.2025'}
                  time={'11:39'}
                  sum={899}
                  orderStatus={'Оплачен'}
                />
              </div>
            </div>
          </ContentTile>
        </div>
      </div>
    </>
  );
}
