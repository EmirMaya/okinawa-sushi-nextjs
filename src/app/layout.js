import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '../components/layout/Header';
import { AppProvider } from '@/components/AppContext';
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Food-App',
  description: 'Generated by Emir Maya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-4xl mx-auto border'>
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className='border-t border-violet-300 p-8 text-center text-neutral-500'>
              &copy; Okinawa Sushi 2023 todos los derechos reservados.
            </footer>
          </AppProvider>
        </main>

      </body>
    </html>
  )
}
