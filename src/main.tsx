import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './Layout.tsx';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// tanstack queryClient: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <App />
      </Layout>
    </QueryClientProvider>
  </StrictMode>,
);
