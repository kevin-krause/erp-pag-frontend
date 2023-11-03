import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://api-pagani-932e9d7b1daf.herokuapp.com/api',
                secure: true
            }
        }
    },
    plugins: [react()]
})
