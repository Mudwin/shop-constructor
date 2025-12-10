import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export const initializeAuth = createAsyncThunk('auth/initialize', async (_, { dispatch }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return null;
  }

  try {
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
    localStorage.removeItem('access_token');
    return null;
  }
});

extraReducers: (builder) => {
  builder.addCase(initializeAuth.fulfilled, (state, action) => {
    if (action.payload) {
      state.user = action.payload.user;
      state.shop = action.payload.shop;
    }
  });
};
