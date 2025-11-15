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
    // First check localStorage for saved preference
    const savedLang = localStorage.getItem('preferred-language') as 'en' | 'pt' | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
      setCurrentLang(savedLang);
    } else {
      // Fallback to pathname detection
      if (pathname?.startsWith('/docs/pt')) {
        setCurrentLang('pt');
      } else {
        setCurrentLang('en');
      }
    }
  }, [pathname]);

  const switchLanguage = (langCode: string) => {
    if (langCode === currentLang) return;

    // Save language preference to localStorage
    localStorage.setItem('preferred-language', langCode);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang: langCode } }));

    // If we're on the home page, just update the language without redirecting
    const currentPath = pathname || '/';
    if (currentPath === '/' || currentPath === '') {
      // Just update the language state, don't redirect
      setCurrentLang(langCode);
      return;
    }

    // For documentation pages, redirect to the same page in the new language
    let newPath = currentPath;
    
    // Ensure pathname is a string before using string methods
    if (typeof newPath !== 'string') {
      newPath = '/docs';
    }
    
    if (newPath.startsWith('/docs/en/')) {
      // Extract the path after /docs/en/
      const pathAfterLocale = newPath.replace('/docs/en/', '');
      newPath = `/docs/${langCode}/${pathAfterLocale}`;
    } else if (newPath.startsWith('/docs/pt/')) {
      // Extract the path after /docs/pt/
      const pathAfterLocale = newPath.replace('/docs/pt/', '');
      newPath = `/docs/${langCode}/${pathAfterLocale}`;
    } else if (newPath === '/docs/en') {
      // Handle /docs/en exactly (main docs page)
      newPath = `/docs/${langCode}/index`;
    } else if (newPath === '/docs/pt') {
      // Handle /docs/pt exactly (main docs page)
      newPath = `/docs/${langCode}/index`;
    } else if (newPath.startsWith('/docs/')) {
      // If no language prefix, add it
      newPath = newPath.replace('/docs/', `/docs/${langCode}/`);
    } else if (newPath === '/docs') {
      newPath = `/docs/${langCode}/getting-started/quick-start`;
    } else {
      // For other pages, don't redirect
      return;
    }

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

