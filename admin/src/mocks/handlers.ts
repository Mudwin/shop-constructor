import { http, HttpResponse } from 'msw';

const API_BASE_URL = '/api/v1';

export const handlers = [
  http.get(`${API_BASE_URL}/me/profile`, () => {
    console.log('🎭 MSW: Перехвачен запрос /me/profile');
    return HttpResponse.json({
      id: 1,
      email: 'dev@example.com',
      first_name: 'Иван',
      last_name: 'Иванов',
      phone: '+79991234567',
      created_at: '2024-01-01T00:00:00Z',
    });
  }),

  http.get(`${API_BASE_URL}/me/shops`, () => {
    console.log('🎭 MSW: Перехвачен запрос /me/shops');

    const hasShop = localStorage.getItem('has_shop') === 'true';

    if (hasShop) {
      return HttpResponse.json([
        {
          id: 1,
          name: 'Тестовый магазин',
          description: 'Описание тестового магазина',
          join_password: 'shop123',
          created_at: '2024-01-01T00:00:00Z',
        },
      ]);
    } else {
      return HttpResponse.json([]);
    }
  }),

  http.post(`${API_BASE_URL}/shops`, async ({ request }) => {
    console.log('🎭 MSW: Перехвачен запрос /shops (POST)');
    const data = (await request.json()) as any;

    localStorage.setItem('has_shop', 'true');

    return HttpResponse.json(
      {
        id: 1,
        name: data.name,
        description: data.description,
        join_password: data.join_password,
        created_at: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  http.patch(`${API_BASE_URL}/me/profile`, async ({ request }) => {
    console.log('🎭 MSW: Перехвачен запрос /me/profile (PATCH)');
    const data = (await request.json()) as any;

    return HttpResponse.json({
      id: 1,
      email: 'dev@example.com',
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
    });
  }),
];
