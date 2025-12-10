const API_BASE_URL = 'http://localhost:8000/api/v1';

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
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getProfile() {
    return this.request('/me/profile');
  }

  async updateProfile(data: { first_name: string; last_name: string; phone?: string }) {
    return this.request('/me/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async createShop(data: { name: string; description?: string; join_password: string }) {
    return this.request('/shops', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyShops() {
    return this.request('/me/shops');
  }
}

export const api = new ApiClient();
