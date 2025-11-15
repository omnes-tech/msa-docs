import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { getSource } from '@/lib/source';
import { SidebarLinkFix } from '@/components/SidebarLinkFix';

// Helper function to normalize pageTree URLs to use the correct locale
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePageTreeUrls(tree: any, locale: string): any {
  if (!tree || !Array.isArray(tree)) {
    return tree;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return tree.map((item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const normalized: any = { ...item };
    
    // Fix the URL to use the correct locale
    // Check multiple possible URL properties (Fumadocs may use different names)
    const urlProperties = ['url', 'href', 'link', 'path', 'slug'];
    let urlProperty: string | undefined;
    
    for (const prop of urlProperties) {
      if (normalized[prop] && typeof normalized[prop] === 'string') {
        urlProperty = normalized[prop];
        break;
      }
    }
    
    // If no URL property found, check if there's a nested item
    if (!urlProperty && normalized.item) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item = normalized.item as any;
      for (const prop of urlProperties) {
        if (item[prop] && typeof item[prop] === 'string') {
          urlProperty = item[prop];
          // Also update the normalized object to have this URL
          normalized[prop] = item[prop];
          break;
        }
      }
    }
    
    if (urlProperty) {
      // Check if this URL already has the correct locale
      const hasCorrectLocale = urlProperty.startsWith(`/docs/${locale}/`);
      const hasWrongLocale = urlProperty.includes('/docs/en/') || urlProperty.includes('/docs/pt/');

      // Check if this is the index page
      const isIndexPage = normalized.name === 'index' ||
                         normalized.title === 'Documentação da API MSA' ||
                         normalized.title === 'MSA API Documentation';


      // Only normalize if it has wrong locale OR if it's the index page that needs specific handling
      const needsNormalization = hasWrongLocale || (!hasCorrectLocale && isIndexPage);

      if (needsNormalization) {
        let path = urlProperty;
      
      // Remove any existing locale prefix (/docs/en/ or /docs/pt/)
      path = path.replace(/^\/docs\/(en|pt)\//, '/');
      path = path.replace(/^\/docs\/(en|pt)$/, '');
      
      // Handle relative paths (starting with ./ or just the path)
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      
      // Remove leading slash if present
      path = path.startsWith('/') ? path.slice(1) : path;
      
        // Handle empty path or index - this is the main index page
        const fixedUrl = (path === 'index' || path === '' || path === '/')
          ? `/docs/${locale}/index`
          : `/docs/${locale}/${path}`.replace(/\/+/g, '/');

        // FORCE update all URL properties to ensure consistency - even if they don't exist yet
        for (const prop of urlProperties) {
          normalized[prop] = fixedUrl;
        }

        // Also check for nested properties that might contain URLs
        if (normalized.item) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const item = normalized.item as any;
          for (const prop of urlProperties) {
            item[prop] = fixedUrl;
          }
        }

        // Also check for 'name' property which might be used as slug
        if (normalized.name && normalized.name === 'index') {
          // Ensure name doesn't interfere with URL generation
          normalized.name = 'index';
        }
      }
    } else {
      // If no URL property found but this might be the index page, add it
      // Check if it's the first item or has a name/title that suggests it's the index
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isIndex = (normalized.name === 'index' || 
                       normalized.title === 'Documentação da API MSA' || 
                       normalized.title === 'MSA API Documentation' ||
                       (!normalized.children && !normalized.items));
      
      if (isIndex) {
        const fixedUrl = `/docs/${locale}/index`;
        for (const prop of urlProperties) {
          normalized[prop] = fixedUrl;
        }
      }
    }
    
    // Recursively normalize children
    if (normalized.children && Array.isArray(normalized.children)) {
      normalized.children = normalizePageTreeUrls(normalized.children, locale);
    }
    
    // Also normalize items array if present
    if (normalized.items && Array.isArray(normalized.items)) {
      normalized.items = normalizePageTreeUrls(normalized.items, locale);
    }
    
    return normalized;
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const source = getSource(locale);
  
  // Normalize pageTree URLs to ensure they use the correct locale
  let normalizedTree = normalizePageTreeUrls(source.pageTree, locale);


  // Force the first item (index page) to have the correct URL
  // This is critical because the index page is the main entry point
  if (normalizedTree && normalizedTree.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const firstItem = normalizedTree[0] as any;
    const indexUrl = `/docs/${locale}/index`;
    
    
    // Force all URL properties to use the correct locale for index
    const urlProperties = ['url', 'href', 'link', 'path', 'slug', 'name'];
    for (const prop of urlProperties) {
      if (prop === 'name' && firstItem[prop] === 'index') {
        // Keep name as 'index' but ensure URL is correct
        continue;
      }
      firstItem[prop] = indexUrl;
    }
    
    // Also update nested item if present
    if (firstItem.item) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item = firstItem.item as any;
      for (const prop of urlProperties) {
        if (prop !== 'name') {
          item[prop] = indexUrl;
        }
      }
    }
    
    // Also check for 'data' property which might contain URL info
    if (firstItem.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = firstItem.data as any;
      for (const prop of urlProperties) {
        if (prop !== 'name' && data[prop]) {
          data[prop] = indexUrl;
        }
      }
    }
    
    // Also check for any nested structures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deepNormalize = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      for (const key in obj) {
        if (urlProperties.includes(key) && key !== 'name' && typeof obj[key] === 'string') {
          if (obj[key].includes('/docs/en/') || obj[key].includes('/docs/pt/')) {
            obj[key] = indexUrl;
          }
        } else if (typeof obj[key] === 'object') {
          deepNormalize(obj[key]);
        }
      }
    };
    deepNormalize(firstItem);
    
    // Log AFTER normalization to verify
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Layout ${locale}] First item AFTER normalization:`, JSON.stringify(firstItem, null, 2));
    }
  }

  return (
    <>
      <SidebarLinkFix />
      <DocsLayout tree={normalizedTree} {...baseOptions}>
        {children}
      </DocsLayout>
    </>
  );
}

