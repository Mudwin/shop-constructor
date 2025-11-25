import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
});

export const confirmSchema = z.object({
  code: z
    .string()
    .regex(/^\d+$/, 'Код должен состоять из цифр')
    .nonempty('Введите код')
    .length(6, 'Длина кода не совпадает'),
});
