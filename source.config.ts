import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

// English docs
export const { docs: docsEn, meta: metaEn } = defineDocs({
  dir: 'content/docs/en',
  baseUrl: '/docs/en',
});

// Portuguese docs
export const { docs: docsPt, meta: metaPt } = defineDocs({
  dir: 'content/docs/pt',
  baseUrl: '/docs/pt',
});

// Default (English) for backward compatibility
export const { docs, meta } = defineDocs({
  dir: 'content/docs/en',
});

export default defineConfig();
