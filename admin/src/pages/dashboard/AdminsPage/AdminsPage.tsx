import styles from './AdminsPage.module.css';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';
import Administrator from '../../../components/ui/Administrator/Administrator';

export default function AdminsPage() {
  return (
    <div className={styles.container}>
      <PageHeader>Администраторы</PageHeader>
      <div className={styles.adminsContainer}>
        <ContentTile>
          <div className={styles.adminsContentContainer}>
            <Administrator
              name="Админов Админ Админович"
              email="A.A.Adminov@someorg.com"
              role="Главный администратор"
            />
            <Administrator
              name="Иванов Иван Иванович"
              email="I.I.Ivanov@someorg.com"
              role="Администратор"
            />
            <Administrator
              name="Петров Петр Петрович"
              email="P.P.Petrivich@someorg.com"
              role="Контент-менеджер"
            />
            <Administrator
              name="Листьева Елена Алексеевна"
              email="L.E.Listyeva@someorg.com"
              role="Маркетолог"
            />
          </div>
        </ContentTile>
      </div>
    </div>
  );
}
