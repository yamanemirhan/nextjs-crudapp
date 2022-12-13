'use client';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import './globals.css';

// create a client
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
