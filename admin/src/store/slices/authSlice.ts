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
      isProfileCompleted?: boolean;
    } | null;
  };
  shop: {
    id: string | null;
    name: string | null;
    role: 'owner' | 'viewer' | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    id: null,
    email: null,
    profile: null,
  },
  shop: null,
  isLoading: false,
  error: null,
};

type InitializeAuthSuccess = {
  user: AuthState['user'];
  shop: AuthState['shop'];
};

export const initializeAuth = createAsyncThunk<
  InitializeAuthSuccess,
  void,
  { rejectValue: string }
>('auth/initialize', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return rejectWithValue('Токен не найден');
  }

  try {
    const profile = await api.getProfile();

    let shop = null;
    try {
      const shops = await api.getMyShops();
      if (shops && shops.length > 0) {
        shop = {
          id: String(shops[0].id),
          name: shops[0].name,
          role: 'owner',
        };
      }
    } catch (shopError) {
      console.warn('Ошибка загрузки магазинов:', shopError);
    }

    return {
      user: {
        id: String(profile.id),
        email: profile.email,
        profile: {
          firstName: profile.first_name,
          lastName: profile.last_name,
          phone: profile.phone,
          isProfileCompleted: profile.is_profile_completed,
        },
      },
      shop,
    } as InitializeAuthSuccess;
  } catch (error: any) {
    console.error('Ошибка инициализации авторизации:', error);

    localStorage.removeItem('access_token');
    api.clearToken();

    return rejectWithValue(error.message || 'Ошибка загрузки профиля');
  }
});

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
      state.error = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('has_shop');
      api.clearToken();
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.shop = action.payload.shop;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export const { setUser, setShop, clearAuth, setError } = authSlice.actions;
export default authSlice.reducer;
