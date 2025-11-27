import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
    },
  },
});

export const { setUser, setShop, clearAuth } = authSlice.actions;
export default authSlice.reducer;
