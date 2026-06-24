import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp';

const rootElement = document.getElementById('admin-root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AdminApp />
    </StrictMode>
  );
}
