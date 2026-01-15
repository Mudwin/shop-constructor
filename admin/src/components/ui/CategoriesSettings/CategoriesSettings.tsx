import { useState } from 'react';
import Button from '../../../components/ui/Button/Button';
import styles from '../../../pages/dashboard/SettingsPage/SettingsForm.module.css';
import type { Category } from '../../../utils/storage';

interface CategoriesSettingsProps {
  categories: Category[];
  onAddCategory: any;
  onDeleteCategory: (categoryId: number) => void;
}

export default function CategoriesSettings({
  categories,
  onAddCategory,
  onDeleteCategory,
}: CategoriesSettingsProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const getAllCategoriesFlat = (
    categories: Category[],
    level: number = 0
  ): Array<{ id: number; name: string; level: number }> => {
    const result: Array<{ id: number; name: string; level: number }> = [];

    categories.forEach((category) => {
      result.push({
        id: category.id,
        name: '— '.repeat(level) + category.name,
        level,
      });
      if (category.subcategories && category.subcategories.length > 0) {
        result.push(...getAllCategoriesFlat(category.subcategories, level + 1));
      }
    });

    return result;
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      setError('Введите название категории');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      await onAddCategory(newCategoryName, newCategoryDescription, selectedParentId);

      setNewCategoryName('');
      setNewCategoryDescription('');
      setSelectedParentId(undefined);
    } catch (error) {
      console.error('Ошибка создания категории:', error);
      setError('Не удалось создать категорию');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (
      window.confirm(
        'Вы уверены, что хотите удалить эту категорию? Все подкатегории также будут удалены.'
      )
    ) {
      onDeleteCategory(categoryId);
    }
  };

  const CategoryTree = ({ categories, level = 0 }: { categories: Category[]; level?: number }) => {
    return (
      <div className={styles.categoryTree}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryItem}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryContent}>
                <div style={{ marginLeft: `${level * 20}px` }}>
                  <span className={styles.categoryName}>
                    {/* {level > 0 ? '└ ' : ''} */}
                    {category.name}
                  </span>
                  {category.description && (
                    <p className={styles.categoryDescription}>{category.description}</p>
                  )}
                </div>
              </div>
              <div className={styles.categoryActions}>
                <span className={styles.categoryCount}>{category.product_count} товаров</span>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDeleteCategory(category.id)}
                  title="Удалить категорию"
                >
                  ╳
                </button>
              </div>
            </div>
            {category.subcategories && category.subcategories.length > 0 && (
              <CategoryTree categories={category.subcategories} level={level + 1} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Категории товаров</h2>
      <p className={styles.subtitle}>Управление категориями вашего магазина</p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Добавить новую категорию</h3>

        <form onSubmit={handleAddCategory} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="categoryName" className={styles.label}>
              Название категории *
            </label>
            <input
              id="categoryName"
              type="text"
              className={styles.input}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Например: Электроника"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="categoryDescription" className={styles.label}>
              Описание категории (опционально)
            </label>
            <textarea
              id="categoryDescription"
              className={styles.textarea}
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              placeholder="Краткое описание категории"
              rows={2}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="parentCategory" className={styles.label}>
              Родительская категория (опционально)
            </label>
            <select
              id="parentCategory"
              className={styles.select}
              value={selectedParentId || ''}
              onChange={(e) =>
                setSelectedParentId(e.target.value ? Number(e.target.value) : undefined)
              }
              disabled={isSubmitting}
            >
              <option value="">— Без родительской категории (корневая)</option>
              {getAllCategoriesFlat(categories).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className={styles.helpText}>
              Выберите родительскую категорию, чтобы создать подкатегорию
            </p>
          </div>

          <div className={styles.actions}>
            <Button type="submit" color="blue" fontSize={15} disabled={isSubmitting}>
              {isSubmitting ? 'Добавление...' : 'Добавить категорию'}
            </Button>
          </div>
        </form>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Существующие категории</h3>

        {categories.length === 0 ? (
          <p className={styles.emptyMessage}>Категории еще не добавлены</p>
        ) : (
          <div className={styles.categoriesList}>
            <CategoryTree categories={categories} />
          </div>
        )}
      </div>
    </div>
  );
}
