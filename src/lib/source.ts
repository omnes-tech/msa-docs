import { docsEn, docsPt } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

// English source
export const sourceEn = loader({
  baseUrl: '/docs/en',
  source: createMDXSource(docsEn),
});

// Portuguese source
export const sourcePt = loader({
  baseUrl: '/docs/pt',
  source: createMDXSource(docsPt),
});

// Default source (English) for backward compatibility
export const source = sourceEn;

// Helper function to get source by locale
export function getSource(locale: string = 'en') {
  if (locale === 'pt') {
    return sourcePt;
  }
  return sourceEn;
}
