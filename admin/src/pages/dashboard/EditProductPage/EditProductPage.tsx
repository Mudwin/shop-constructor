import { useParams } from 'react-router-dom';
import ProductForm from '../../../components/ui/ProductForm/ProductForm';
import styles from './EditProductPage.module.css';

export default function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();
  
  return (
    <div className={styles.container}>
      <ProductForm productId={productId ? parseInt(productId) : undefined} />
    </div>
  );
}