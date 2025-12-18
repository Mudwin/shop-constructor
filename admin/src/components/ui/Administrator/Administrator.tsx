import styles from './Administrator.module.css';
import editIcon from '../../../assets/icons/edit-icon.svg';
import profileIcon from '../../../assets/icons/avatar-icon.svg';

interface AdministratorProps {
  name: string;
  email: string;
  image?: string;
  role: AdministratorRoles;
}

type AdministratorRoles =
  | 'Главный администратор'
  | 'Администратор'
  | 'Контент-менеджер'
  | 'Маркетолог';

const administratorRoleBackgroundColor: Record<AdministratorRoles, string> = {
  ['Главный администратор']: 'var(--color-cyan)',
  ['Администратор']: 'var(--color-light-green)',
  ['Контент-менеджер']: 'var(--color-light-orange)',
  ['Маркетолог']: 'var(--color-light-red)',
};

export default function Administrator({ name, email, image, role }: AdministratorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.editIcon}>
        <img src={editIcon} alt="" />
      </div>
      <div className={styles.profileImage}>
        <img src={profileIcon} alt="" />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.email}>{email}</div>
        <div
          className={styles.role}
          style={{ backgroundColor: administratorRoleBackgroundColor[role] }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}
