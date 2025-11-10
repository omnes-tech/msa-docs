import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

export const baseOptions: BaseLayoutProps = {
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
    url: '/', // Ensure url is always defined
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    {
      text: '',
      children: <LanguageSwitcher />,
    },
  ],
};
