'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const translations = {
  en: {
    title: 'MSA API Documentation',
    description: 'Create and manage Account Abstraction wallets with multi-signature validation, passkey authentication, and HSM/MPC signing.',
    quickStart: 'Quick Start',
    quickStartDesc: 'Create your first wallet in 5 minutes',
    interactiveAPI: 'Interactive API',
    interactiveAPIDesc: 'Try the API directly in your browser',
    typescriptSDK: 'TypeScript SDK',
    typescriptSDKDesc: 'Integrate with type-safe code',
    exploreDocs: 'Explore Documentation',
    contactUs: 'Contact Us',
    visitOmnes: 'Visit omnes.dev',
    sendEmail: 'Send Email',
    scheduleMeeting: 'Schedule a Meeting',
    builtBy: 'Built with ❤️ by the Omnes Team',
    makingAA: 'Making Account Abstraction accessible to developers worldwide',
  },
  pt: {
    title: 'Documentação da API MSA',
    description: 'Crie e gerencie carteiras Account Abstraction com validação multi-assinatura, autenticação passkey e assinatura HSM/MPC.',
    quickStart: 'Início Rápido',
    quickStartDesc: 'Crie sua primeira carteira em 5 minutos',
    interactiveAPI: 'API Interativa',
    interactiveAPIDesc: 'Teste a API diretamente no seu navegador',
    typescriptSDK: 'SDK TypeScript',
    typescriptSDKDesc: 'Integre com código com segurança de tipos',
    exploreDocs: 'Explorar Documentação',
    contactUs: 'Entre em Contato',
    visitOmnes: 'Visite omnes.dev',
    sendEmail: 'Enviar Email',
    scheduleMeeting: 'Agendar Reunião',
    builtBy: 'Construído com ❤️ pela Equipe Omnes',
    makingAA: 'Tornando Account Abstraction acessível para desenvolvedores em todo o mundo',
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'pt'>('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('preferred-language') as 'en' | 'pt' | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
      setLang(savedLang);
    } else {
      // Default to browser language or 'en'
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) {
        setLang('pt');
      } else {
        setLang('en');
      }
    }

    // Listen for language changes from LanguageSwitcher
    const handleLanguageChange = (event: CustomEvent<{ lang: 'en' | 'pt' }>) => {
      setLang(event.detail.lang);
    };

    window.addEventListener('language-changed', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('language-changed', handleLanguageChange as EventListener);
    };
  }, []);

  const t = translations[lang];
  const docsPrefix = `/docs/${lang}`;

  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
      <div className="mb-8">
        <Image
          src="/logo-omnes.svg"
          alt="Omnes Logo"
          width={180}
          height={180}
          className="mx-auto mb-6"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-xl text-fd-muted-foreground max-w-2xl mx-auto mb-8">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        <Link
          href={`${docsPrefix}/getting-started/quick-start`}
          className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold mb-2">{t.quickStart}</h3>
          <p className="text-sm text-fd-muted-foreground">
            {t.quickStartDesc}
          </p>
        </Link>

        <Link
          href={`${docsPrefix}/api-reference/interactive-docs`}
          className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-3xl mb-2">🔧</div>
          <h3 className="font-semibold mb-2">{t.interactiveAPI}</h3>
          <p className="text-sm text-fd-muted-foreground">
            {t.interactiveAPIDesc}
          </p>
        </Link>

        <Link
          href={`${docsPrefix}/sdk/typescript-sdk`}
          className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-3xl mb-2">📦</div>
          <h3 className="font-semibold mb-2">{t.typescriptSDK}</h3>
          <p className="text-sm text-fd-muted-foreground">
            {t.typescriptSDKDesc}
          </p>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
        <Link
          href={`${docsPrefix}/getting-started/quick-start`}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {t.exploreDocs}
        </Link>
        <a
          href="https://calendly.com/omnes-blockchain/30min?month=2025-11"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          {t.contactUs}
        </a>
      </div>

      <footer className="mt-12 w-full border-t pt-8 pb-6">
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-fd-muted-foreground">
            <a
              href="https://omnes.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {t.visitOmnes}
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="mailto:gus@omnes.dev"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {t.sendEmail}
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://calendly.com/omnes-blockchain/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {t.scheduleMeeting}
            </a>
          </div>
          <p className="text-sm text-fd-muted-foreground">
            {t.builtBy}
          </p>
          <p className="text-sm text-fd-muted-foreground">
            {t.makingAA}
          </p>
        </div>
      </footer>
    </main>
  );
}
