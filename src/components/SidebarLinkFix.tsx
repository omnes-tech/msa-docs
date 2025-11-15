'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function SidebarLinkFix() {
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    // Extract locale from pathname
    const localeMatch = pathname.match(/^\/docs\/(en|pt)/);
    if (!localeMatch) return;
    
    const currentLocale = localeMatch[1];
    
    // Function to get correct href for any link
    const getCorrectHref = (href: string): string | null => {
      if (!href) return null;


      // Handle /docs/en or /docs/pt (without trailing path)
      if (href === '/docs/en' || href === '/docs/pt') {
        return `/docs/${currentLocale}/index`;
      }

      // Handle /docs/en/index or /docs/pt/index
      if (href === '/docs/en/index' || href === '/docs/pt/index') {
        return `/docs/${currentLocale}/index`;
      }

      // Handle any /docs/en/... or /docs/pt/... path
      if (href.startsWith('/docs/')) {
        const pathMatch = href.match(/^\/docs\/(en|pt)(\/.*)?$/);
        if (pathMatch) {
          const [, wrongLocale, path] = pathMatch;
          if (wrongLocale !== currentLocale) {
            // If no path, it's the index
            if (!path || path === '/') {
              return `/docs/${currentLocale}/index`;
            }
            // Otherwise, use the path with correct locale
            return `/docs/${currentLocale}${path}`;
          }
        } else {
          // Handle cases where href might be just '/docs/' or similar - redirect to correct locale index
          if (href === '/docs/' || href === '/docs') {
            return `/docs/${currentLocale}/index`;
          }
        }
      }

      return null;
    };
    
    // Function to fix a single link
    const fixLink = (link: HTMLAnchorElement) => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const correctHref = getCorrectHref(href);
      if (correctHref && href !== correctHref) {
        link.setAttribute('href', correctHref);
        // Also update data attributes that might be used by Next.js Link
        link.setAttribute('data-href', correctHref);
      }
    };
    
    // Function to fix all links in the sidebar
    const fixSidebarLinks = () => {
      const sidebar = document.querySelector('[data-sidebar]');
      if (!sidebar) return;
      
      const links = sidebar.querySelectorAll('a[href]');
      links.forEach((link) => fixLink(link as HTMLAnchorElement));
      
      // Also check for Next.js Link components (they might have different structure)
      const nextLinks = sidebar.querySelectorAll('[data-nextjs-link]');
      nextLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          const correctHref = getCorrectHref(href);
          if (correctHref && href !== correctHref) {
            link.setAttribute('href', correctHref);
          }
        }
      });
    };
    
    // Intercept clicks on sidebar links - be very aggressive
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      if (!link) return;
      
      const sidebar = document.querySelector('[data-sidebar]');
      if (!sidebar || !sidebar.contains(link)) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      const correctHref = getCorrectHref(href);
      if (correctHref && href !== correctHref) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        router.push(correctHref);
        return false;
      }
    };
    
    // Fix links immediately and repeatedly
    fixSidebarLinks();
    const fixInterval = setInterval(fixSidebarLinks, 200);
    
    // Add click listener to document to intercept all clicks - use capture phase
    document.addEventListener('click', handleClick, true);
    
    // Also fix links when the DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      fixSidebarLinks();
    });
    
    const sidebar = document.querySelector('[data-sidebar]');
    if (sidebar) {
      observer.observe(sidebar, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['href', 'data-href'],
      });
    }
    
    return () => {
      clearInterval(fixInterval);
      document.removeEventListener('click', handleClick, true);
      observer.disconnect();
    };
  }, [pathname, router]);
  
  return null;
}

