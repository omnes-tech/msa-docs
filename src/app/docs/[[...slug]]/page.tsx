/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'next/navigation';

// Redirect old routes to English version
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug || [];

  // If no slug, redirect to index page (protocol explanation)
  if (slug.length === 0) {
    redirect('/docs/en/index');
  }

  // If first slug is a valid locale, redirect to the locale-specific route
  const firstSlug = slug[0];
  if (firstSlug === 'en' || firstSlug === 'pt') {
    // If it's just locale without page, redirect to index
    if (slug.length === 1) {
      redirect(`/docs/${firstSlug}/index`);
    }
    // If second slug is also a locale (e.g., /docs/en/en or /docs/en/pt), redirect to index
    const secondSlug = slug[1];
    if (secondSlug === 'en' || secondSlug === 'pt') {
      redirect(`/docs/${firstSlug}/index`);
    }
    // Otherwise, let the locale-specific route handle it
    redirect(`/docs/${firstSlug}/${slug.slice(1).join('/')}`);
  }

  // Redirect to English version for old routes
  redirect(`/docs/en/${slug.join('/')}`);
}
