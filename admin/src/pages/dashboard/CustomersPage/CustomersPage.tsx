import styles from './CustomersPage.module.css';
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

export default function CustomersPage() {
  return (
    <div className={styles.container}>
      <PageHeader>Клиенты</PageHeader>
      <div className={styles.searchContainer}>
        <ContentTile>
          <div className={styles.searchContentContainer}>
            <div className={styles.searchIcon}>
              <img src={searchIcon} alt="" />
            </div>
            <div className={styles.inputContainer}>
              <AdminInput id={'search'} placeholder="Поиск клиента по ID, ФИО..." />
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
      <div className={styles.customersContainer}>
        <ContentTile>
          <div className={styles.customersContentContainer}>
            <div className={styles.customersListButtonsContainer}>
              <div className={styles.customersListButton}>
                <img src={gridIcon} alt="" />
              </div>
              <div className={styles.customersListButton}>
                <img src={updateIcon} alt="" />
              </div>
            </div>
            <div className={styles.customersListHeaders}>
              <div className={styles.headersContainer}>
                <h2 className={`${styles.header}`} data-id>
                  ID
                </h2>
                <h2 className={`${styles.header}`} data-name>
                  ФИО
                </h2>
                <h2 className={`${styles.header}`} data-email>
                  E-mail
                </h2>
                <h2 className={`${styles.header}`} data-money>
                  Средний чек
                </h2>
                <h2 className={`${styles.header}`} data-status>
                  Статус
                </h2>
              </div>
              <div className={styles.headersUnderline}></div>
            </div>
            <div className={styles.customersList}>
              <AdminListItem
                type={'customer'}
                id={1024}
                name={'Петров Николай Иванович'}
                email={'n.i.petrov@gmail.com'}
                averageMoney={3999.99}
                customerStatus={'Новый'}
              />
              <AdminListItem
                type={'customer'}
                id={345}
                name={'Николаев Иван Петрович'}
                email={'nik.iv@outlook.com'}
                averageMoney={499.99}
                customerStatus={'Активный'}
              />
              <AdminListItem
                type={'customer'}
                id={153}
                name={'Шварц Елена Игоревна'}
                email={'eschwarz@gmail.com'}
                averageMoney={0.0}
                customerStatus={'Новый'}
              />
              <AdminListItem
                type={'customer'}
                id={5684}
                name={'Ягодкин Петр Андреевич'}
                email={'yagodpetr@gmail.com'}
                averageMoney={10590.99}
                customerStatus={'Активный'}
              />
              <AdminListItem
                type={'customer'}
                id={235}
                name={'Иванов Алексей Александрович'}
                email={'ivanov.1984@gmail.com'}
                averageMoney={220.0}
                customerStatus={'Новый'}
              />
              <AdminListItem
                type={'customer'}
                id={854}
                name={'Петров Николай Иванович'}
                email={'n.i.petrov@gmail.com'}
                averageMoney={0.0}
                customerStatus={'Новый'}
              />
            </div>
          </div>
        </ContentTile>
      </div>
    </div>
  );
}
