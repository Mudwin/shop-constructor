import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';

interface AuthState {
  user: {
    id: string | null;
    email: string | null;
    profile: {
      firstName?: string;
      lastName?: string;
      phone?: string;
    } | null;
  };
  shop: {
    id: string | null;
    name: string | null;
    role: 'owner' | 'viewer' | null;
  } | null;
}

const initialState: AuthState = {
  user: {
    id: null,
    email: null,
    profile: null,
  },
  shop: null,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (): Promise<{
    user: AuthState['user'];
    shop: AuthState['shop'];
  } | null> => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }

    try {
      if (import.meta.env.DEV) {
        console.log('🔧 DEV MODE: Использую моковые данные для авторизации');

        const hasShop = localStorage.getItem('has_shop') === 'true';

        return {
          user: {
            id: '1',
            email: 'dev@example.com',
            profile: {
              firstName: 'Иван',
              lastName: 'Иванов',
              phone: '+79991234567',
            },
          },
          shop: hasShop
            ? {
                id: '1',
                name: 'Тестовый магазин',
                role: 'owner',
              }
            : null,
        };
      }

      api.setToken(token);
      const profile = await api.getProfile();
      const shops = await api.getMyShops();

      return {
        user: {
          id: String(profile.id),
          email: profile.email,
          profile: {
            firstName: profile.first_name,
            lastName: profile.last_name,
            phone: profile.phone,
          },
        },
        shop:
          shops.length > 0
            ? {
                id: String(shops[0].id),
                name: shops[0].name,
                role: 'owner',
              }
            : null,
      };
    } catch (error) {
      console.error('Ошибка инициализации авторизации:', error);

      if (import.meta.env.DEV) {
        console.log('DEV MODE: моковые данные после ошибки');
        return {
          user: {
            id: '1',
            email: 'dev@example.com',
            profile: {
              firstName: 'Иван',
              lastName: 'Иванов',
              phone: '+79991234567',
            },
          },
          shop:
            localStorage.getItem('has_shop') === 'true'
              ? {
                  id: '1',
                  name: 'Тестовый магазин',
                  role: 'owner',
                }
              : null,
        };
      }

      localStorage.removeItem('access_token');
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    setShop: (state, action: PayloadAction<AuthState['shop']>) => {
      state.shop = action.payload;
    },
    clearAuth: (state) => {
      state.user = initialState.user;
      state.shop = initialState.shop;
      localStorage.removeItem('access_token');
      localStorage.removeItem('has_shop');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initializeAuth.fulfilled,
      (
        state,
        action: PayloadAction<{
          user: AuthState['user'];
          shop: AuthState['shop'];
        } | null>
      ) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.shop = action.payload.shop;
        }
      }
    );
  },
});

export const { setUser, setShop, clearAuth } = authSlice.actions;
export default authSlice.reducer;
