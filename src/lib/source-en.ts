import { docs } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

// English source
export const sourceEn = loader({
  baseUrl: '/docs/en',
  source: createMDXSource(docs),
});

