import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { StrictMode } from 'react';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const container = createRoot(root);

container.render(
  <StrictMode>
    <App />
  </StrictMode>
);
