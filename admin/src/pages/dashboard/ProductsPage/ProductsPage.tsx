import styles from './ProductsPage.module.css';
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
import Button from '../../../components/ui/Button/Button';

export default function ProductsPage() {
  return (
    <div className={styles.container}>
      <PageHeader>Товары</PageHeader>
      <div className={styles.searchContainer}>
        <ContentTile>
          <div className={styles.searchContentContainer}>
            <div className={styles.searchIcon}>
              <img src={searchIcon} alt="" />
            </div>
            <div className={styles.inputContainer}>
              <AdminInput id={'search'} placeholder="Поиск товара по ID, названию..." />
            </div>
            <div className={styles.parametersIcon}>
              <img src={parametersIcon} alt="" />
            </div>
            <div className={styles.selectContainer}>
              <AdminSelect type="product" />
            </div>
            <div className={styles.sortIconContainer}>
              <img src={sortIcon} alt="" />
            </div>
          </div>
        </ContentTile>
      </div>
      <div className={styles.productsContainer}>
        <ContentTile>
          <div className={styles.productsContentContainer}>
            <div className={styles.productsListButtonsContainer}>
              <div className={styles.productsListButton}>
                <img src={gridIcon} alt="" />
              </div>
              <div className={styles.productsListButton}>
                <img src={updateIcon} alt="" />
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
              <AdminListItem
                type={'product'}
                id={16384}
                title={'Акриловая краска «Лазурит»'}
                category={'Краски и чернила'}
                price={250}
                amount={24}
                productStatus={'В наличии'}
              />
              <AdminListItem
                type={'product'}
                id={8192}
                title={'Масляная краска «Сонет»'}
                category={'Краски и чернила'}
                price={400}
                amount={0}
                productStatus={'Скоро поступит'}
              />
              <AdminListItem
                type={'product'}
                id={4096}
                title={'Бумага для акварели'}
                category={'Холсты и бумага'}
                price={120}
                amount={0}
                productStatus={'Уточняется'}
              />
              <AdminListItem
                type={'product'}
                id={2048}
                title={'Кисть синтетика круглая'}
                category={'Кисти и инструменты'}
                price={50}
                amount={12}
                productStatus={'В наличии'}
              />
              <AdminListItem
                type={'product'}
                id={121}
                title={'Палитра пластиковая'}
                category={'Аксессуары'}
                price={90}
                amount={0}
                productStatus={'Снят с продажи'}
              />
            </div>
          </div>
        </ContentTile>
      </div>
      <Button fontSize={14} color="blue" paddingBlock={8} paddingInline={30}>
        Добавить товар
      </Button>
    </div>
  );
}
