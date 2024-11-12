import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify('AIzaSyCEp4kCuU2bu-taifN8G_JvQjD8hcvHf8g')
  }
});