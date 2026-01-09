class ApiClient {
  private token: string | null = null;
  private API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

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
    const url = `${this.API_BASE_URL}${endpoint}`;

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

  async sendOTP(email: string) {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async confirmOTP(email: string, otp: string) {
    return this.request('/auth/confirm-otp', {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp_code: otp,
      }),
    });
  }

  async completeProfile(data: { first_name: string; last_name: string; phone: string }) {
    return this.request('/auth/complete-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile() {
    return this.request('/auth/profile', {
      method: 'GET',
    });
  }

  async updateProfile(data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
  }) {
    const params = new URLSearchParams();
    if (data.first_name) params.append('first_name', data.first_name);
    if (data.last_name) params.append('last_name', data.last_name);
    if (data.phone) params.append('phone', data.phone);
    if (data.avatar_url) params.append('avatar_url', data.avatar_url);

    return this.request(`/auth/profile?${params.toString()}`, {
      method: 'PUT',
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

export const api = new ApiClient();
