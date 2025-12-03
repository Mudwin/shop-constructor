import styles from './FormFileInput.module.css';
import uploadIcon from '../../../assets/icons/upload-icon.svg';

export default function FormFileInput({ id }: { id: string }) {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        <img src={uploadIcon} className={styles.icon} />
      </label>
      <input id={id} type="file" className={styles.input} />
    </>
  );
}
