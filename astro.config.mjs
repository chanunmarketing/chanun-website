import { defineConfig } from 'astro/config';
import site from './src/data/site.json' with { type: 'json' };

export default defineConfig({
  site: site.site_url || 'https://example.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
