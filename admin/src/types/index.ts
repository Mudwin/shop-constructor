export type AdminPage =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'clients'
  | 'settings'
  | 'administrators'
  | 'constructor';

export interface Category {
  id: number;
  name: string;
  description?: string;
  product_count: number;
  subcategories: Category[];
  created_at: string;
  updated_at: string;
}

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

export interface ShopDesign {
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  background_color?: string;
  text_color?: string;
  font_family?: string;
  hero_title?: string;
  hero_subtitle?: string;
}

export interface SettingsPageData {
  settings: ShopSettings;
  design: ShopDesign;
}
