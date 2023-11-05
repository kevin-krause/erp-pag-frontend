import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/kkkkk': {
                target: 'https://backend-pagani-24fdde363504.herokuapp.com',
                secure: false
            }
        }
    },
    plugins: [react()]
})
