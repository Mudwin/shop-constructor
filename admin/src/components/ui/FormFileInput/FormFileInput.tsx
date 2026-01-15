import { useState, useEffect, useRef } from 'react';
import styles from './FormFileInput.module.css';
import uploadIcon from '../../../assets/icons/upload-icon.svg';

interface FormFileInputProps {
  id: string;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
}

export default function FormFileInput({
  id,
  value,
  onChange,
  accept = 'image/*',
  disabled = false,
}: FormFileInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обработчик изменения файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageError(false);

    if (file) {
      // Проверяем, является ли файл изображением
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Проверяем размер файла (например, не более 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5MB');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Создаем URL для превью
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      if (onChange) {
        onChange(file);
      }
    } else {
      if (onChange) {
        onChange(null);
      }
    }
  };

  // Очистка превью при размонтировании
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Обработка внешнего значения
  useEffect(() => {
    setImageError(false);

    if (value instanceof File) {
      // Если значение - File объект
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
    } else if (typeof value === 'string' && value) {
      // Если значение - URL строка
      setPreviewUrl(value);
    } else {
      // Если значение null или undefined
      setPreviewUrl(null);
    }
  }, [value]);

  // Клик по label для открытия файлового диалога
  const handleLabelClick = (e: React.MouseEvent) => {
    if (disabled) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Удаление изображения
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    setPreviewUrl(null);
    setImageError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (onChange) {
      onChange(null);
    }
  };

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.container}>
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={styles.input}
        disabled={disabled}
      />

      <label
        htmlFor={id}
        className={`${styles.label} ${disabled ? styles.disabled : ''}`}
        onClick={handleLabelClick}
      >
        {previewUrl && !imageError ? (
          <div className={styles.previewContainer}>
            <img
              src={previewUrl}
              alt="Превью изображения"
              className={styles.previewImage}
              onError={handleImageError}
            />
            {!disabled && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={handleRemoveImage}
                title="Удалить изображение"
              >
                ×
              </button>
            )}
          </div>
        ) : imageError ? (
          <div className={styles.errorContainer}>
            <div className={styles.errorMessage}>Ошибка загрузки</div>
            <div className={styles.retryText}>Нажмите для повторной загрузки</div>
          </div>
        ) : (
          <div className={styles.uploadPlaceholder}>
            <img src={uploadIcon} className={styles.icon} alt="Загрузить" />
            <span className={styles.uploadText}>Загрузить фото</span>
          </div>
        )}
      </label>
    </div>
  );
}
