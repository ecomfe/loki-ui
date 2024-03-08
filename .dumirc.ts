import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '',
    logo: "https://pic.rmb.bdstatic.com/activity/2023-12/1703081616671/a7932a0d0448.png",
  },
  favicons: ['https://pic.rmb.bdstatic.com/activity/2023-12/1703672356517/7177d38d1e41.ico'],
  apiParser: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  publicPath: '/loki-ui/',
  cssPublicPath: '/loki-ui/',
  base: '/loki-ui/',
});
