import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Ensures the public folder is properly recognised
});
