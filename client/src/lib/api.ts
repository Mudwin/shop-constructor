const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return this.token || localStorage.getItem('access_token');
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(error.detail || error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // ==================== Аутентификация ====================
  async sendOTP(email: string) {
    return this.request('/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async confirmOTP(email: string, otp_code: string) {
    const response = await this.request('/confirm-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp_code }),
    });

    if (response.access_token) {
      this.setToken(response.access_token);
    }

    return response;
  }

  async completeProfile(data: { first_name: string; last_name: string; phone: string }) {
    return this.request('/complete-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

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

  async logout() {
    return this.request('/logout', {
      method: 'POST',
    });
  }

  async refreshToken(refresh_token: string) {
    return this.request(`/refresh-token?refresh_token=${encodeURIComponent(refresh_token)}`, {
      method: 'POST',
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

  async joinShop(join_password: string) {
    return this.request('/shops/join', {
      method: 'POST',
      body: JSON.stringify({ join_password }),
    });
  }
}

export const api = new ApiClient();
