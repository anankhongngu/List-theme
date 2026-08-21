import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { proxyHlsRequest } from './lib/hlsProxy.js'

export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [
    vue(),
    mode === 'development' ? vueDevTools() : null,
    {
      name: 'hls-proxy',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/hls')) return next();

          const urlObj = new URL(req.url, 'http://localhost');
          const target = urlObj.searchParams.get('url');

          if (!target) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing url parameter' }));
            return;
          }

          try {
            const { body, contentType } = await proxyHlsRequest(target);
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Content-Type', contentType);
            res.end(body);
          } catch (err) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))
