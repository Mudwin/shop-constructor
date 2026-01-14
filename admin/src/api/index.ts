const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private _token: string | null = null;
  private _refreshToken: string | null = null;

  setToken(token: string) {
    this._token = token;
    localStorage.setItem('access_token', token);
  }

  setRefreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
    localStorage.setItem('refresh_token', refreshToken);
  }

  getToken() {
    return this._token || localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return this._refreshToken || localStorage.getItem('refresh_token');
  }

  clearTokens() {
    this._token = null;
    this._refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const passedHeaders = (options.headers as Record<string, string>) || {};
    const headers: Record<string, string> = { ...passedHeaders };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (response.status === 401 && !endpoint.startsWith('/refresh-token')) {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        try {
          const refreshResponse = await this.refreshToken(refreshToken);
          if (refreshResponse && (refreshResponse as any).access_token) {
            this.setToken((refreshResponse as any).access_token);
            return this.request<T>(endpoint, options);
          }
        } catch (error) {
          this.clearTokens();
          window.location.href = '/login';
          throw error;
        }
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error((error as any).detail || `HTTP ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return null as unknown as T;
    }
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      return text as unknown as T;
    }
  }

  // ==================== Аутентификация ====================
  async sendOTP(email: string) {
    return this.request('/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async confirmOTP(email: string, otp_code: string) {
    return this.request('/confirm-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp_code }),
    });
  }

  async refreshToken(refresh_token: string): Promise<any> {
    return this.request(`/refresh-token?refresh_token=${encodeURIComponent(refresh_token)}`, {
      method: 'POST',
    });
  }

  async completeProfile(data: { first_name: string; last_name: string; phone: string }) {
    return this.request('/complete-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request('/logout', {
      method: 'POST',
    });
  }

  // ==================== Профиль ====================
  async getProfile() {
    return this.request('/profile');
  }

  async updateProfile(data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
  }) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==================== Магазины ====================
  async createShop(data: { name: string; description?: string; join_password: string }) {
    return this.request('/shops/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyShops() {
    return this.request('/shops/my-shops');
  }

  async getShop(shop_id: number) {
    return this.request(`/shops/${shop_id}`);
  }

  async updateShop(shop_id: number, data: any) {
    return this.request(`/shops/${shop_id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async joinShop(join_password: string) {
    return this.request('/shops/join', {
      method: 'POST',
      body: JSON.stringify({ join_password }),
    });
  }

  async getShopMembers(shop_id: number) {
    return this.request(`/shops/${shop_id}/members`);
  }

  async getPendingRequests() {
    return this.request('/shops/my-shops/pending-requests');
  }

  async approveRequest(
    shop_id: number,
    request_id: number,
    approve: boolean = true,
    role: string = 'viewer'
  ) {
    return this.request(
      `/shops/${shop_id}/approve-request?request_id=${request_id}&approve=${approve}&role=${role}`,
      {
        method: 'POST',
      }
    );
  }

  // ==================== Товары ====================
  async getProducts(params: {
    shop_id: number;
    skip?: number;
    limit?: number;
    category_id?: number;
    status?: string;
    search_query?: string;
    sort_by?: string;
    sort_order?: string;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return this.request(`/products/?${queryParams.toString()}`);
  }

  async createProduct(shop_id: number, data: any) {
    return this.request(`/products/?shop_id=${shop_id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProduct(shop_id: number, product_id: number) {
    return this.request(`/products/shops/${shop_id}/products/${product_id}`);
  }

  async updateProduct(shop_id: number, product_id: number, data: any) {
    return this.request(`/products/${product_id}?shop_id=${shop_id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(shop_id: number, product_id: number) {
    return this.request(`/products/${product_id}?shop_id=${shop_id}`, {
      method: 'DELETE',
    });
  }

  // ==================== Заказы ====================
  async getOrders(params: {
    shop_id: number;
    skip?: number;
    limit?: number;
    status?: string;
    customer_email?: string;
    start_date?: string;
    end_date?: string;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return this.request(`/orders/?${queryParams.toString()}`);
  }

  async getOrder(order_id: number, shop_id: number) {
    return this.request(`/orders/${order_id}?shop_id=${shop_id}`);
  }

  async updateOrderStatus(order_id: number, shop_id: number, status: string) {
    return this.request(`/orders/${order_id}/status?shop_id=${shop_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // ==================== Категории ====================
  async getCategories(shop_id: number, params?: any) {
    const queryParams = new URLSearchParams(params || {});
    return this.request(`/categories/shops/${shop_id}/categories?${queryParams.toString()}`);
  }

  async createCategory(shop_id: number, data: any) {
    return this.request(`/categories/shops/${shop_id}/categories`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ==================== Клиенты ====================
  async getCustomers(shop_id: number, params?: any) {
    const queryParams = new URLSearchParams(params || {});
    return this.request(`/customers/shops/${shop_id}/customers?${queryParams.toString()}`);
  }

  // ==================== Дашборд ====================
  async getDashboardStats(shop_id: number) {
    return this.request(`/dashboard/shops/${shop_id}/stats`);
  }

  // ==================== Настройки ====================
  async getShopSettings(shop_id: number) {
    return this.request(`/shop-settings/shops/${shop_id}/settings`);
  }

  async updateShopSettings(shop_id: number, data: any) {
    return this.request(`/shop-settings/shops/${shop_id}/settings`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==================== Дизайн ====================
  async getShopDesign(shop_id: number) {
    return this.request(`/design/shops/${shop_id}/design`);
  }

  async updateShopDesign(shop_id: number, data: any) {
    return this.request(`/design/shops/${shop_id}/design`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==================== Загрузка файлов ====================
  async uploadImage(shop_id: number, file: File, folder: string = 'products') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return this.request(`/upload/shops/${shop_id}/upload/image`, {
      method: 'POST',
      body: formData,
    });
  }
}

export const api = new ApiClient();
