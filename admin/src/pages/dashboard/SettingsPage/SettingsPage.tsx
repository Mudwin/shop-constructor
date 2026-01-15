import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { shopStorage, type ShopSettings, type Category } from '../../../utils/storage';
import styles from './SettingsPage.module.css';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import SettingsSidebar from '../../../components/ui/SettingsSidebar/SettingsSidebar';
import GeneralSettings from '../../../components/ui/GeneralSettings/GeneralSettings';
import ContactSettings from '../../../components/ui/ContactSettings/ContactSettings';
import CategoriesSettings from '../../../components/ui/CategoriesSettings/CategoriesSettings';
import PaymentSettings from '../../../components/ui/PaymentSettings/PaymentSettings';
import DeliverySettings from '../../../components/ui/DeliverySettings/DeliverySettings';
import SocialMediaSettings from '../../../components/ui/SocialMediaSettings/SocialMediaSettings';

type TabType = 'general' | 'contacts' | 'categories' | 'payment' | 'delivery' | 'social';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [design, setDesign] = useState({
    logoUrl: '',
    logoBase64: '',
  });
  const [saveStatus, setSaveStatus] = useState<{ [key in TabType]?: 'saving' | 'saved' | 'error' }>(
    {}
  );
  const [isInitialized, setIsInitialized] = useState(false);

  const shopId = useSelector((state: RootState) => state.auth.shop?.id);

  // Загружаем данные только один раз при монтировании или изменении shopId
  useEffect(() => {
    if (shopId && !isInitialized) {
      loadData();
      setIsInitialized(true);
    }
  }, [shopId, isInitialized]);

  // Также слушаем изменения в localStorage для обновлений из других вкладок
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `shop_${shopId}` && shopId) {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [shopId]);

  const loadData = () => {
    if (!shopId) return;

    try {
      // Загружаем из localStorage
      const shopSettings = shopStorage.getSettings(shopId);
      const shopCategories = shopStorage.getCategories(shopId);
      const shopDesign = shopStorage.getDesign(shopId);

      setSettings(shopSettings);
      setCategories(shopCategories);
      setDesign({
        logoUrl: shopDesign?.logoUrl || '',
        logoBase64: shopDesign?.logoBase64 || '',
      });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      // Если ошибка, устанавливаем значения по умолчанию
      setSettings({
        store_name: '',
        store_email: '',
        store_phone: '',
        address: '',
        social_media: {
          telegram: '',
          youtube: '',
          vk: '',
        },
      });
      setCategories([]);
    }
  };

  const handleSaveGeneralSettings = async (data: any) => {
    if (!shopId || !settings) return;

    try {
      setSaveStatus({ ...saveStatus, general: 'saving' });

      // Сохраняем настройки
      const newSettings = {
        ...settings,
        store_name: data.storeName,
        store_email: data.storeEmail,
        address: data.address,
      };

      shopStorage.updateSettings(shopId, newSettings);

      // Сохраняем логотип
      if (data.logoBase64) {
        shopStorage.updateDesign(shopId, {
          logoBase64: data.logoBase64,
        });
      }

      // Обновляем состояние
      setSettings(newSettings);
      if (data.logoBase64) {
        setDesign({ ...design, logoBase64: data.logoBase64 });
      }

      setSaveStatus({ ...saveStatus, general: 'saved' });
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, general: undefined });
      }, 2000);
    } catch (error) {
      console.error('Ошибка сохранения общих настроек:', error);
      setSaveStatus({ ...saveStatus, general: 'error' });
    }
  };

  const handleSaveContactSettings = async (data: any) => {
    if (!shopId || !settings) return;

    try {
      setSaveStatus({ ...saveStatus, contacts: 'saving' });

      const newSettings = {
        ...settings,
        store_email: data.email,
        store_phone: data.phone,
        address: data.address,
      };

      shopStorage.updateSettings(shopId, newSettings);
      setSettings(newSettings);

      setSaveStatus({ ...saveStatus, contacts: 'saved' });
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, contacts: undefined });
      }, 2000);
    } catch (error) {
      console.error('Ошибка сохранения контактов:', error);
      setSaveStatus({ ...saveStatus, contacts: 'error' });
    }
  };

  const handleSaveSocialMediaSettings = async (data: any) => {
    if (!shopId || !settings) return;

    try {
      setSaveStatus({ ...saveStatus, social: 'saving' });

      const newSettings = {
        ...settings,
        social_media: {
          telegram: data.telegram,
          youtube: data.youtube,
          vk: data.vk,
        },
      };

      shopStorage.updateSettings(shopId, newSettings);
      setSettings(newSettings);

      setSaveStatus({ ...saveStatus, social: 'saved' });
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, social: undefined });
      }, 2000);
    } catch (error) {
      console.error('Ошибка сохранения соцсетей:', error);
      setSaveStatus({ ...saveStatus, social: 'error' });
    }
  };

  const handleAddCategory = async (name: string, description?: string, parentId?: number) => {
    if (!shopId) return;

    try {
      const newCategory = shopStorage.addCategory(shopId, {
        name,
        description,
        parentId,
      });

      // Обновляем список категорий
      const updatedCategories = shopStorage.getCategories(shopId);
      setCategories(updatedCategories);

      return newCategory;
    } catch (error) {
      console.error('Ошибка создания категории:', error);
      throw error;
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (!shopId) return;

    shopStorage.removeCategory(shopId, categoryId);
    const updatedCategories = shopStorage.getCategories(shopId);
    setCategories(updatedCategories);
  };

  const renderContent = () => {
    if (!settings) {
      return <div className={styles.loading}>Загрузка настроек...</div>;
    }

    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings
            initialData={{
              storeName: settings.store_name || '',
              storeEmail: settings.store_email || '',
              address: settings.address || '',
              logoBase64: design.logoBase64 || '',
            }}
            onSave={handleSaveGeneralSettings}
            saveStatus={saveStatus.general}
          />
        );
      case 'contacts':
        return (
          <ContactSettings
            initialData={{
              email: settings.store_email || '',
              phone: settings.store_phone || '',
              address: settings.address || '',
            }}
            onSave={handleSaveContactSettings}
            saveStatus={saveStatus.contacts}
          />
        );
      case 'categories':
        return (
          <CategoriesSettings
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        );
      case 'payment':
        return <PaymentSettings />;
      case 'delivery':
        return <DeliverySettings />;
      case 'social':
        return (
          <SocialMediaSettings
            initialData={{
              telegram: settings.social_media?.telegram || '',
              youtube: settings.social_media?.youtube || '',
              vk: settings.social_media?.vk || '',
            }}
            onSave={handleSaveSocialMediaSettings}
            saveStatus={saveStatus.social}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader>Настройки</PageHeader>

      <div className={styles.content}>
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className={styles.mainContent}>{renderContent()}</div>
      </div>
    </div>
  );
}
