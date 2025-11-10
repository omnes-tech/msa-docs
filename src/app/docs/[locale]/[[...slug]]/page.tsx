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

  // If no slug, redirect to quick-start
  if (!slug || slug.length === 0) {
    redirect(`/docs/${locale}/getting-started/quick-start`);
  }

  const source = getSource(locale);
  const page = source.getPage(slug || []);
  
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
      // Filter out empty slugs and locale names to avoid /docs/en/en or /docs/en/pt
      if (!Array.isArray(slug) || slug.length === 0) {
        return null; // Skip empty slugs
      }
      const filteredSlug = slug.filter((s: string) => s && s !== 'en' && s !== 'pt');
      // Only return if there's at least one valid slug segment
      if (filteredSlug.length === 0) {
        return null;
      }
      return {
        locale: 'en',
        slug: filteredSlug,
      };
    })
    .filter((p: any) => p !== null);

  const ptParams = sourcePt.generateParams()
    .map((params: any) => {
      const slug = params.slug || [];
      // Filter out empty slugs and locale names to avoid /docs/pt/pt or /docs/pt/en
      if (!Array.isArray(slug) || slug.length === 0) {
        return null; // Skip empty slugs
      }
      const filteredSlug = slug.filter((s: string) => s && s !== 'en' && s !== 'pt');
      // Only return if there's at least one valid slug segment
      if (filteredSlug.length === 0) {
        return null;
      }
      return {
        locale: 'pt',
        slug: filteredSlug,
      };
    })
    .filter((p: any) => p !== null);

  return [...enParams, ...ptParams];
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const { locale, slug } = params;

  const source = getSource(locale);
  const page = source.getPage(slug || []);
  
  if (!page) {
    notFound();
  }

  return {
    title: (page.data as any).title,
    description: (page.data as any).description,
  };
}

