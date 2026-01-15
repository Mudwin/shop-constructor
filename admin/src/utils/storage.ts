interface ShopStorageData {
  settings: ShopSettings;
  categories: Category[];
  design: {
    logoUrl?: string;
    logoBase64?: string;
  };
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  product_count: number;
  parentId?: number;
  subcategories: Category[];
  created_at: string;
  updated_at: string;
}

export const shopStorage = {
  // Получить все данные магазина
  getShopData(shopId: number): ShopStorageData {
    const key = `shop_${shopId}`;
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    // Если данных нет, возвращаем структуру по умолчанию
    return {
      settings: {
        store_name: '',
        store_email: '',
        store_phone: '',
        address: '',
        social_media: {
          telegram: '',
          youtube: '',
          vk: '',
        },
      },
      categories: [],
      design: {
        logoUrl: '',
        logoBase64: '',
      },
    };
  },

  // Сохранить все данные магазина
  saveShopData(shopId: number, data: ShopStorageData): void {
    const key = `shop_${shopId}`;
    localStorage.setItem(key, JSON.stringify(data));
  },

  // Обновить настройки
  updateSettings(shopId: number, settings: Partial<ShopSettings>): void {
    const data = this.getShopData(shopId);
    data.settings = { ...data.settings, ...settings };
    this.saveShopData(shopId, data);
  },

  // Обновить дизайн
  updateDesign(shopId: number, design: Partial<ShopStorageData['design']>): void {
    const data = this.getShopData(shopId);
    data.design = { ...data.design, ...design };
    this.saveShopData(shopId, data);
  },

  // Добавить категорию
  addCategory(
    shopId: number,
    category: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'subcategories' | 'product_count'>
  ): Category {
    const data = this.getShopData(shopId);

    const newCategory: Category = {
      ...category,
      id: Date.now(), // Используем timestamp как временный ID
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      product_count: 0,
      subcategories: [],
    };

    if (category.parentId) {
      // Добавляем как подкатегорию
      const parent = this.findCategoryById(data.categories, category.parentId);
      if (parent) {
        parent.subcategories.push(newCategory);
      } else {
        // Если родитель не найден, добавляем как корневую категорию
        data.categories.push(newCategory);
      }
    } else {
      // Добавляем как корневую категорию
      data.categories.push(newCategory);
    }

    this.saveShopData(shopId, data);
    return newCategory;
  },

  // Найти категорию по ID (рекурсивно)
  findCategoryById(categories: Category[], id: number): Category | null {
    for (const category of categories) {
      if (category.id === id) return category;
      if (category.subcategories.length > 0) {
        const found = this.findCategoryById(category.subcategories, id);
        if (found) return found;
      }
    }
    return null;
  },

  // Получить все категории (в виде плоского списка или дерева)
  getCategories(shopId: number): Category[] {
    const data = this.getShopData(shopId);
    return data.categories;
  },

  // Получить все категории в виде плоского списка
  getAllCategoriesFlat(shopId: number): Category[] {
    const data = this.getShopData(shopId);
    const result: Category[] = [];

    const flattenCategories = (categories: Category[], level: number = 0) => {
      categories.forEach((category) => {
        result.push({ ...category, name: '  '.repeat(level) + category.name });
        if (category.subcategories.length > 0) {
          flattenCategories(category.subcategories, level + 1);
        }
      });
    };

    flattenCategories(data.categories);
    return result;
  },

  // Удалить категорию
  removeCategory(shopId: number, categoryId: number): void {
    const data = this.getShopData(shopId);

    const removeRecursive = (categories: Category[]): Category[] => {
      return categories.filter((cat) => {
        if (cat.id === categoryId) return false;
        if (cat.subcategories.length > 0) {
          cat.subcategories = removeRecursive(cat.subcategories);
        }
        return true;
      });
    };

    data.categories = removeRecursive(data.categories);
    this.saveShopData(shopId, data);
  },

  // Получить настройки
  getSettings(shopId: number): ShopSettings {
    const data = this.getShopData(shopId);
    return data.settings;
  },

  // Получить дизайн
  getDesign(shopId: number): ShopStorageData['design'] {
    const data = this.getShopData(shopId);
    return data.design;
  },
};

// Типы
export interface ShopSettings {
  store_name: string;
  store_email: string;
  store_phone: string;
  address: string;
  social_media: {
    telegram: string;
    youtube: string;
    vk: string;
  };
}

// Утилита для конвертации File в base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Утилита для проверки размера base64 (макс 5MB)
export const checkBase64Size = (base64: string): boolean => {
  // base64 увеличивает размер на ~33%, так что примерная проверка
  const base64Length = base64.length;
  const sizeInBytes = base64Length * 0.75; // Примерный размер в байтах
  const sizeInMB = sizeInBytes / (1024 * 1024);

  return sizeInMB <= 5; // максимум 5MB
};
