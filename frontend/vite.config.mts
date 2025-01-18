import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');

  return {
    define: {
      'process.env.TON_CENTER_API_CLIENT_KEY': `'${env.TON_CENTER_API_CLIENT_KEY}'`,
      'process.env.API_URL': `'${env.API_URL}'`,
      'process.env.WEB_APP': `'${env.WEB_APP}'`,
      'process.env.CONTRACT_ADDRESS': `'${env.CONTRACT_ADDRESS}'`,
      'process.env.IS_TESTNET': env.IS_TESTNET,
    },
    /* base: '/reactjs-template', */
    plugins: [
      // Allows using React dev server along with building a React application with Vite.
      // https://npmjs.com/package/@vitejs/plugin-react-swc
      react(),
      // Allows using the compilerOptions.paths property in tsconfig.json.
      // https://www.npmjs.com/package/vite-tsconfig-paths
      tsconfigPaths(),
      // Create a custom SSL certificate valid for the local machine.
      // https://www.npmjs.com/package/vite-plugin-mkcert
      // mkcert(),
      nodePolyfills({
        include: ['buffer'],
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
        },
      }),
    ],
    publicDir: './public',
    server: {
      // Exposes your dev server and makes it accessible for the devices in the same network.
      host: true,
      proxy: {
        '/service': {
          target: 'http://localhost:3002',
          changeOrigin: true,
        },
      },
      port: 5178,
    },
    build: {
      rollupOptions: {
        plugins: [inject({ 'globalThis.Buffer': ['buffer', 'Buffer'] })],
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      }
    }
  };
});
