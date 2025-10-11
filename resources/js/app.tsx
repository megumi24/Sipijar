import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { PrimeReactProvider } from 'primereact/api';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const queryClient = new QueryClient();

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <PrimeReactProvider>
        <QueryClientProvider client={queryClient}>
          <App {...props} />
        </QueryClientProvider>
      </PrimeReactProvider>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});

// This will set light / dark mode on load...
initializeTheme();
