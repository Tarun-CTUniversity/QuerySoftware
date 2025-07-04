import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins:[react()],
    server:{
        port: 1004,
        open: true,
         host: '0.0.0.0', // Allow connections from any IP address
        proxy: {
            '/api': {
                target: 'http://192.168.124.197:1003',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }

});