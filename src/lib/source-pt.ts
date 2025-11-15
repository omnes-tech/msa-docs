import { docsPt } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

// Portuguese source
export const sourcePt = loader({
  baseUrl: '/docs/pt',
  source: createMDXSource(docsPt),
});

