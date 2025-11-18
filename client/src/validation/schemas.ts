import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, 'Логин должен быть не менее 4 символов')
    .max(30, 'Логин должен быть не более 30 символов')
    .regex(/^[a-zA-Z0-9]+$/, 'Только латинские буквы и цифры'),
  password: z
    .string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
      'Разрешены только латинские буквы, цифры и специальные символы'
    ),
});

export const signupSchema = loginSchema
  .extend({
    email: z.string().email('Некорректный email'),
    surname: z.string().regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'Только буквы'),
    name: z.string().regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'Только буквы'),
    fatherName: z
      .string()
      .regex(/^[a-zA-Zа-яА-ЯёЁ]*$/, 'Только буквы')
      .optional(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatPassword'],
  });
