import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Gunakan garis miring (/), bukan titik (.)

export default defineConfig({
  plugins: [react()],
  base: '/', // Atur ke '/' untuk deployment Vercel
})