import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],

    build: {
        // Target modern browsers — smaller, faster output
        target: 'es2020',

        // Raise warning threshold (SPA with React is naturally larger)
        chunkSizeWarningLimit: 600,

        // CSS code splitting per-chunk
        cssCodeSplit: true,

        // Remove console.log in production, no source maps needed
        // Vite 8 uses oxc (Rolldown) by default — fastest minifier available
        minify: 'oxc',
        sourcemap: false,

        rollupOptions: {
            output: {
                // Manual chunk strategy: split react core, vendor libs, and app code
                manualChunks(id) {
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
                        return 'react-core';
                    }
                    if (id.includes('node_modules/')) {
                        return 'vendor';
                    }
                },
                // Deterministic hashed filenames — essential for long-term browser caching
                entryFileNames:  'assets/[name]-[hash].js',
                chunkFileNames:  'assets/[name]-[hash].js',
                assetFileNames:  'assets/[name]-[hash].[ext]',
            },
        },
    },

    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
