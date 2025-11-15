import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Layout({ children }: { children: ReactNode }) {
  // Create minimal safe options for home layout
  // HomeLayout needs nav with url as a string (not undefined)
  // The error is coming from BaseLinkItem trying to call isActive with undefined url
  // We need to ensure all links have url defined, or pass undefined for links
  const homeOptions = {
    nav: {
      title: (
        <>
          <img
            src="/logo-omnes.svg"
            alt="Omnes"
            width={40}
            height={40}
            className="mr-3 inline-block"
            style={{ verticalAlign: 'middle' }}
          />
          <span>MSA API Docs</span>
        </>
      ),
      url: '/', // Point to home page
    },
    // Add language switcher as a link
    links: [
      {
        text: 'Language',
        url: '#', // Must be a string, not undefined
        type: 'custom' as const,
        children: <LanguageSwitcher />,
      },
    ],
  };
  
  return <HomeLayout {...homeOptions}>{children}</HomeLayout>;
}
