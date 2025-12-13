'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Always check pathname first to get the current language from URL
    if (pathname?.startsWith('/docs/pt')) {
      setCurrentLang('pt');
      // Also save to localStorage
      localStorage.setItem('preferred-language', 'pt');
    } else if (pathname?.startsWith('/docs/en')) {
      setCurrentLang('en');
      // Also save to localStorage
      localStorage.setItem('preferred-language', 'en');
    } else {
      // Fallback to localStorage for saved preference
      const savedLang = localStorage.getItem('preferred-language') as 'en' | 'pt' | null;
      if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
        setCurrentLang(savedLang);
      } else {
        setCurrentLang('en');
      }
    }
  }, [pathname]);

  const switchLanguage = (langCode: string) => {
    if (langCode === currentLang) return;

    // Save language preference to localStorage
    localStorage.setItem('preferred-language', langCode);
    
    // Update state immediately for UI feedback
    setCurrentLang(langCode);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang: langCode } }));

    // If we're on the home page, just update the language without redirecting
    const currentPath = pathname || '/';
    if (currentPath === '/' || currentPath === '') {
      // Just update the language state, don't redirect
      return;
    }

    // For documentation pages, redirect to the same page in the new language
    let newPath = currentPath;
    
    // Ensure pathname is a string before using string methods
    if (typeof newPath !== 'string') {
      newPath = '/docs';
    }
    
    // Handle different path patterns
    if (newPath.startsWith('/docs/en/')) {
      // Extract the path after /docs/en/
      const pathAfterLocale = newPath.replace('/docs/en/', '');
      // If empty, it's the index page
      newPath = pathAfterLocale ? `/docs/${langCode}/${pathAfterLocale}` : `/docs/${langCode}/index`;
    } else if (newPath.startsWith('/docs/pt/')) {
      // Extract the path after /docs/pt/
      const pathAfterLocale = newPath.replace('/docs/pt/', '');
      // If empty, it's the index page
      newPath = pathAfterLocale ? `/docs/${langCode}/${pathAfterLocale}` : `/docs/${langCode}/index`;
    } else if (newPath === '/docs/en' || newPath === '/docs/en/') {
      // Handle /docs/en exactly (main docs page)
      newPath = `/docs/${langCode}/index`;
    } else if (newPath === '/docs/pt' || newPath === '/docs/pt/') {
      // Handle /docs/pt exactly (main docs page)
      newPath = `/docs/${langCode}/index`;
    } else if (newPath.startsWith('/docs/')) {
      // If no language prefix, add it
      const pathAfterDocs = newPath.replace('/docs/', '');
      newPath = pathAfterDocs ? `/docs/${langCode}/${pathAfterDocs}` : `/docs/${langCode}/index`;
    } else if (newPath === '/docs' || newPath === '/docs/') {
      newPath = `/docs/${langCode}/index`;
    } else {
      // For other pages, don't redirect
      return;
    }

    // Use router.push with replace to avoid adding to history
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLang}
        onChange={(e) => switchLanguage(e.target.value)}
        className="appearance-none bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

