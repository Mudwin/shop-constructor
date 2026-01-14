import ProductForm from '../../../components/ui/ProductForm/ProductForm';
import styles from './AddProductPage.module.css';

export default function AddProductPage() {
  return (
    <div className={styles.container}>
      <ProductForm />
    </div>
  );
}