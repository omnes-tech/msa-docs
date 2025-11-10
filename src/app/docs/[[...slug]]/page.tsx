/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'next/navigation';

// Redirect old routes to English version
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug || [];
  
  // Redirect to English version
  redirect(`/docs/en/${slug.join('/')}`);
}
