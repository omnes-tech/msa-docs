/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSource } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound, redirect } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const { locale, slug } = params;

  // Validate locale
  if (locale !== 'en' && locale !== 'pt') {
    notFound();
  }

  // If slug is a locale name (e.g., /docs/en/en, /docs/pt/pt, /docs/en/pt, /docs/pt/en), redirect to index
  if (slug && slug.length === 1 && (slug[0] === 'en' || slug[0] === 'pt')) {
    redirect(`/docs/${locale}/index`);
  }

  // If no slug or slug is ['index'], show index page
  const source = getSource(locale);
  let actualSlug: string[] = [];
  
  if (!slug || slug.length === 0) {
    // Empty slug means index page
    actualSlug = [];
  } else if (slug.length === 1 && slug[0] === 'index') {
    // ['index'] also means index page (empty slug in Fumadocs)
    actualSlug = [];
  } else {
    actualSlug = slug;
  }
  
  // Try to get the page
  let page = source.getPage(actualSlug);
  
  // If page not found and we're looking for index, try alternative approaches
  if (!page && actualSlug.length === 0) {
    // Try with explicit 'index' slug
    page = source.getPage(['index']);
  }
  
  if (!page) {
    notFound();
  }

  const MDXContent = (page.data as any).body;

  // Ensure page has url property before creating relative link
  // The page object should already have url, but we ensure it exists
  if (page && !(page as any).url && page.url === undefined) {
    (page as any).url = `/docs/${locale}/${(slug || []).join('/')}`;
  }

  return (
    <DocsPage toc={(page.data as any).toc} full={(page.data as any).full}>
      <DocsTitle>{(page.data as any).title}</DocsTitle>
      <DocsDescription>{(page.data as any).description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const { sourceEn, sourcePt } = await import('@/lib/source');
  
  const enParams = sourceEn.generateParams()
    .map((params: any) => {
      const slug = params.slug || [];
      // Handle empty slug as index page (use empty array, not ['index'])
      if (!Array.isArray(slug) || slug.length === 0) {
        return {
          locale: 'en',
          slug: [], // Empty array for index page
        };
      }
      // Filter out locale names to avoid /docs/en/en or /docs/en/pt
      const filteredSlug = slug.filter((s: string) => s && s !== 'en' && s !== 'pt');
      // If all segments were filtered out, treat as index
      if (filteredSlug.length === 0) {
        return {
          locale: 'en',
          slug: [], // Empty array for index page
        };
      }
      return {
        locale: 'en',
        slug: filteredSlug,
      };
    });

  const ptParams = sourcePt.generateParams()
    .map((params: any) => {
      const slug = params.slug || [];
      // Handle empty slug as index page (use empty array, not ['index'])
      if (!Array.isArray(slug) || slug.length === 0) {
        return {
          locale: 'pt',
          slug: [], // Empty array for index page
        };
      }
      // Filter out locale names to avoid /docs/pt/pt or /docs/pt/en
      const filteredSlug = slug.filter((s: string) => s && s !== 'en' && s !== 'pt');
      // If all segments were filtered out, treat as index
      if (filteredSlug.length === 0) {
        return {
          locale: 'pt',
          slug: [], // Empty array for index page
        };
      }
      return {
        locale: 'pt',
        slug: filteredSlug,
      };
    });

  // Add explicit index routes
  const indexParams = [
    { locale: 'en', slug: [] },
    { locale: 'pt', slug: [] },
    { locale: 'en', slug: ['index'] }, // Also support /docs/en/index
    { locale: 'pt', slug: ['index'] }, // Also support /docs/pt/index
  ];

  return [...enParams, ...ptParams, ...indexParams];
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const { locale, slug } = params;

  const source = getSource(locale);
  let actualSlug: string[] = [];
  
  if (!slug || slug.length === 0) {
    actualSlug = [];
  } else if (slug.length === 1 && slug[0] === 'index') {
    actualSlug = [];
  } else {
    actualSlug = slug;
  }
  
  const page = source.getPage(actualSlug);
  
  if (!page) {
    notFound();
  }

  return {
    title: (page.data as any).title,
    description: (page.data as any).description,
  };
}

