/* eslint-disable import/no-extraneous-dependencies */
// dato che questo è un file di configurazione di vite posso ignorare la regola di
// import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
