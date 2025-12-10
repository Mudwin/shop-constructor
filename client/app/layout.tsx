import { Roboto } from 'next/font/google';
import './styles/globals.css';
import { AuthProvider } from '../src/contexts/AuthContext';

const robotoFont = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-family',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={robotoFont.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
