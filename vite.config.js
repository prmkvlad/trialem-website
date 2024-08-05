import vituum from 'vituum';
import posthtml from '@vituum/vite-plugin-posthtml';
import postcss from '@vituum/vite-plugin-postcss';
import { defineConfig } from 'vite'
import { copyFileSync, readdirSync, readFileSync, writeFileSync, statSync } from 'fs';

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
		{
			name: 'handle-html-and-css-paths',
			closeBundle() {
				const outputDir = 'docs';

				const processFiles = (dir) => {
					const files = readdirSync(dir);
					files.forEach(file => {
						const filePath = `${dir}/${file}`;
						if (statSync(filePath).isDirectory()) {
							processFiles(filePath);
						} else if (file.endsWith('.html') || file.endsWith('.css')) {
							let content = readFileSync(filePath, 'utf-8');
							if (file.endsWith('.html')) {
								content = content.replace(/(href|src)=["']\/docs\/([^"']*)["']/g, '$1="./$2"')
									.replace(/(href|src)=["']\/([^"']*)["']/g, '$1="./$2"');
							} else if (file.endsWith('.css')) {
								content = content.replace(/\/docs\//g, '../');
							}
							writeFileSync(filePath, content);
						}
					});
				};
				processFiles(outputDir);
			}
		},
	],

	build: {
		root: './src',
		outDir: './docs/',
		rollupOptions: {
			output: {
				assetFileNames: (asset) => {
					const filePath = asset.name.split('/');
					const nestedPath = filePath.slice(0, -1).join('/');
					const outputPath = `${nestedPath ? nestedPath + '/' : ''}[name][extname]`;

					if (/favicon|apple-touch-icon|android-chrome/.test(asset.name)) {
						return outputPath;
					}

					switch (asset.name.split('.').pop()) {
						case 'css': return `css/${outputPath}`;
						case 'png':
						case 'jpg':
						case 'webp':
						case 'svg': return `images/${outputPath}`;
						case 'woff2': return `fonts/${outputPath}`;
						case 'webmanifest': return outputPath;
						default: return `other/${outputPath}`;
					}
				},
				preserveModuleDirectories: true,
			}
		},
	},
};