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

      // Handle /docs/en or /docs/pt (without trailing path or index)
      if (href === '/docs/en' || href === '/docs/pt' || href === '/docs/en/' || href === '/docs/pt/') {
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
            // If no path or just '/', it's the index
            if (!path || path === '/' || path === '') {
              return `/docs/${currentLocale}/index`;
            }
            // Otherwise, use the path with correct locale
            return `/docs/${currentLocale}${path}`;
          }
          // Even if locale matches, ensure index pages are explicit
          if (!path || path === '/' || path === '') {
            return `/docs/${currentLocale}/index`;
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
      
      // Special handling for /docs/pt or /docs/en (without /index)
      // These should always be /docs/{locale}/index
      if (href === '/docs/pt' || href === '/docs/en' || href === '/docs/pt/' || href === '/docs/en/') {
        const correctHref = `/docs/${currentLocale}/index`;
        link.setAttribute('href', correctHref);
        link.setAttribute('data-href', correctHref);
        // Also update any Next.js Link internal attributes
        if (link.hasAttribute('data-nextjs-link')) {
          link.setAttribute('data-nextjs-link', correctHref);
        }
        return;
      }
      
      const correctHref = getCorrectHref(href);
      if (correctHref && href !== correctHref) {
        link.setAttribute('href', correctHref);
        // Also update data attributes that might be used by Next.js Link
        link.setAttribute('data-href', correctHref);
        // Also update any Next.js Link internal attributes
        if (link.hasAttribute('data-nextjs-link')) {
          link.setAttribute('data-nextjs-link', correctHref);
        }
      }
    };
    
    // Function to fix all links in the sidebar
    const fixSidebarLinks = () => {
      // Try multiple selectors to find the sidebar
      const sidebarSelectors = [
        '[data-sidebar]',
        'aside',
        '[role="complementary"]',
        'nav[aria-label*="sidebar" i]',
        'nav[aria-label*="navigation" i]'
      ];
      
      let sidebar: Element | null = null;
      for (const selector of sidebarSelectors) {
        sidebar = document.querySelector(selector);
        if (sidebar) break;
      }
      
      if (!sidebar) return;
      
      // Fix all anchor tags
      const links = sidebar.querySelectorAll('a[href]');
      links.forEach((link) => fixLink(link as HTMLAnchorElement));
      
      // Also check for Next.js Link components (they might have different structure)
      const nextLinks = sidebar.querySelectorAll('[data-nextjs-link], [href]');
      nextLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Special handling for /docs/pt or /docs/en (without /index)
        if (href === '/docs/pt' || href === '/docs/en' || href === '/docs/pt/' || href === '/docs/en/') {
          const correctHref = `/docs/${currentLocale}/index`;
          link.setAttribute('href', correctHref);
          link.setAttribute('data-href', correctHref);
          if (link.hasAttribute('data-nextjs-link')) {
            link.setAttribute('data-nextjs-link', correctHref);
          }
          return;
        }
        
        const correctHref = getCorrectHref(href);
        if (correctHref && href !== correctHref) {
          link.setAttribute('href', correctHref);
          // Also update data attributes
          link.setAttribute('data-href', correctHref);
          if (link.hasAttribute('data-nextjs-link')) {
            link.setAttribute('data-nextjs-link', correctHref);
          }
        }
      });
      
      // Fix any elements that might have href in data attributes
      const elementsWithHref = sidebar.querySelectorAll('[data-href]');
      elementsWithHref.forEach((el) => {
        const href = el.getAttribute('data-href');
        if (href) {
          const correctHref = getCorrectHref(href);
          if (correctHref && href !== correctHref) {
            el.setAttribute('data-href', correctHref);
            // Also update href if it exists
            if (el.hasAttribute('href')) {
              el.setAttribute('href', correctHref);
            }
          }
        }
      });
    };
    
    // Intercept clicks on sidebar links - be very aggressive
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href], [href], [data-href]') as HTMLElement;
      if (!link) return;
      
      // Try multiple selectors to find the sidebar
      const sidebarSelectors = [
        '[data-sidebar]',
        'aside',
        '[role="complementary"]',
        'nav[aria-label*="sidebar" i]',
        'nav[aria-label*="navigation" i]'
      ];
      
      let sidebar: Element | null = null;
      for (const selector of sidebarSelectors) {
        sidebar = document.querySelector(selector);
        if (sidebar && sidebar.contains(link)) break;
      }
      
      if (!sidebar || !sidebar.contains(link)) return;
      
      const href = link.getAttribute('href') || link.getAttribute('data-href');
      if (!href) return;
      
      // Special handling for /docs/pt or /docs/en (without /index)
      // These should always go to /docs/{locale}/index
      if (href === '/docs/pt' || href === '/docs/en' || href === '/docs/pt/' || href === '/docs/en/') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        router.push(`/docs/${currentLocale}/index`);
        return false;
      }
      
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
    const fixInterval = setInterval(fixSidebarLinks, 100);
    
    // Add click listener to document to intercept all clicks - use capture phase
    // Use capture phase to intercept before Next.js Link handles it
    document.addEventListener('click', handleClick, true);
    
    // Also intercept on mousedown to catch it even earlier
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href], [href], [data-href]') as HTMLElement;
      if (!link) return;
      
      // Try multiple selectors to find the sidebar
      const sidebarSelectors = [
        '[data-sidebar]',
        'aside',
        '[role="complementary"]',
        'nav[aria-label*="sidebar" i]',
        'nav[aria-label*="navigation" i]'
      ];
      
      let sidebar: Element | null = null;
      for (const selector of sidebarSelectors) {
        sidebar = document.querySelector(selector);
        if (sidebar && sidebar.contains(link)) break;
      }
      
      if (!sidebar || !sidebar.contains(link)) return;
      
      const href = link.getAttribute('href') || link.getAttribute('data-href');
      if (!href) return;
      
      // Special handling for /docs/pt or /docs/en (without /index)
      if (href === '/docs/pt' || href === '/docs/en' || href === '/docs/pt/' || href === '/docs/en/') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Use setTimeout to ensure navigation happens after event propagation
        setTimeout(() => {
          router.push(`/docs/${currentLocale}/index`);
        }, 0);
        return false;
      }
      
      const correctHref = getCorrectHref(href);
      if (correctHref && href !== correctHref) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Use setTimeout to ensure navigation happens after event propagation
        setTimeout(() => {
          router.push(correctHref);
        }, 0);
        return false;
      }
    };
    
    document.addEventListener('mousedown', handleMouseDown, true);
    
    // Also fix links when the DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      fixSidebarLinks();
    });
    
    // Try multiple selectors to find the sidebar for observer
    const sidebarSelectors = [
      '[data-sidebar]',
      'aside',
      '[role="complementary"]',
      'nav[aria-label*="sidebar" i]',
      'nav[aria-label*="navigation" i]'
    ];
    
    let sidebarForObserver: Element | null = null;
    for (const selector of sidebarSelectors) {
      sidebarForObserver = document.querySelector(selector);
      if (sidebarForObserver) break;
    }
    
    if (sidebarForObserver) {
      observer.observe(sidebarForObserver, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['href', 'data-href'],
      });
    }
    
    return () => {
      clearInterval(fixInterval);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mousedown', handleMouseDown, true);
      observer.disconnect();
    };
  }, [pathname, router]);
  
  return null;
}

