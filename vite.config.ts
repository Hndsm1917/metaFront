import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return {
		plugins: [
			vue(),
			eslintPlugin(),
			svgLoader({
				svgo: false
			})
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		server: {
			port: 3000,
			proxy: {
				'/call/client/': process.env.VITE_SERVER_URL
				// '/socket.io': {
				//   target: 'ws://localhost:5174',
				//   ws: true,
				// },
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use \'sass:math\'; @use "@/assets/scss/utils" as *;'
				}
			}
		},
		base: process.env.BASE_URL
	}
})
