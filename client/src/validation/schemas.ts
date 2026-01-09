import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Некорректный формат email'),
});

export const confirmSchema = z.object({
  code: z
    .string()
    .min(1, 'Код обязателен')
    .regex(/^\d{6}$/, 'Код должен состоять из 6 цифр'),
});

export const completeProfileSchema = z.object({
  first_name: z.string().min(1, 'Имя обязательно'),
  last_name: z.string().min(1, 'Фамилия обязательна'),
  phone: z.string().min(1, 'Телефон обязателен'),
});
