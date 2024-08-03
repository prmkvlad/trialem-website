import vituum from 'vituum';
import posthtml from '@vituum/vite-plugin-posthtml';
import postcss from '@vituum/vite-plugin-postcss';
import { defineConfig } from 'vite'
import { copyFileSync } from 'fs';

export default {
	base: '/docs/',
	plugins: [
		vituum(),
		postcss(),
		posthtml({
			root: './src',
		}),

		{
			name: 'custom-hmr',
			enforce: 'post',
			handleHotUpdate({ file, server }) {
				if (file.endsWith('.html')) {
					server.ws.send({
						type: 'full-reload',
						path: '*',
					});
				}
			},
		},
		{
			name: 'copy-static-files',
			writeBundle() {
				copyFileSync('src/android-chrome-192x192.png', 'docs/android-chrome-192x192.png');
				copyFileSync('src/android-chrome-512x512.png', 'docs/android-chrome-512x512.png');
			},
		},
	],

	build: {
		root: './src',
		outDir: './docs',
		rollupOptions: {
			output: {
				assetFileNames: (asset) => {
					const filePath = asset.name.split('/');
					const fileName = filePath.pop();
					const nestedPath = filePath.join('/');
					const outputPath = `${nestedPath ? nestedPath + '/' : ''
						}[name][extname]`;

					if (asset.name.includes('favicon') || asset.name.includes('apple-touch-icon') || asset.name.includes('android-chrome')) {
						return `${outputPath}`;
					}

					console.log(`${asset} - ${asset.name} - ${asset.type}`);
					console.dir(`${asset}`);

					if (asset.type === 'asset') {
						switch (asset.name.split('.').pop()) {
							case 'css':
								return `css/${outputPath}`;
							case 'png':
							case 'jpg':
							case 'webp':
							case 'svg':
								return `images/${outputPath}`;
							case 'woff2':
								return `fonts/${outputPath}`;
							case 'webmanifest':
								return `${outputPath}`;
							default:
								return `other/${outputPath}`;
						}
					}
				},
				preserveModuleDirectories: true,
			}
		},
		base: '/docs/',
	},
};

