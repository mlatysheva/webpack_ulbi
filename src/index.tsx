import { createRoot } from 'react-dom/client';
import { App } from '@/components/App';
import { StrictMode, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Shop } from '@/pages';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <Suspense fallback={'Loading...'}><About /></Suspense>
      },
      {
        path: '/shop',
        element: <Suspense fallback={'Loading...'}><Shop /></Suspense>
      }
    ]
  }
]);

container.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
