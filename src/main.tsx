import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('🚀 Manifestly: Starting application...');
console.log('Environment check:');
console.log('- VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? 'SET' : 'MISSING');
console.log('- VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'MISSING');
console.log('- VITE_OPENAI_API_KEY:', import.meta.env.VITE_OPENAI_API_KEY ? 'SET' : 'MISSING');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ FATAL: Root element not found!');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, mounting React app...');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

console.log('✅ React app mounted successfully');
