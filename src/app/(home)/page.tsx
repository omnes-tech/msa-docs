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
    <main className="flex flex-1 flex-col justify-center items-center text-center px-6 py-12">
      <div className="mb-8">
        <Image
          src="/logo-omnes.svg"
          alt="Omnes Logo"
          width={180}
          height={180}
          className="mx-auto mb-6"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        <Link
          href={`${docsPrefix}/getting-started/quick-start`}
          className="group block p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            {t.quickStart}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            {t.quickStartDesc}
          </p>
        </Link>

        <Link
          href={`${docsPrefix}/api-reference/interactive-docs`}
          className="group block p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🔧</div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            {t.interactiveAPI}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            {t.interactiveAPIDesc}
          </p>
        </Link>

        <Link
          href={`${docsPrefix}/sdk/typescript-sdk`}
          className="group block p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📦</div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            {t.typescriptSDK}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            {t.typescriptSDKDesc}
          </p>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
        <Link
          href={`${docsPrefix}/getting-started/quick-start`}
          className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base"
        >
          {t.exploreDocs}
        </Link>
        <a
          href="https://calendly.com/omnes-blockchain/30min?month=2025-11"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base"
        >
          {t.contactUs}
        </a>
      </div>

      <footer className="mt-16 w-full border-t border-gray-200 dark:border-gray-700 pt-10 pb-8">
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href="https://omnes.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t.visitOmnes}
            </a>
            <span className="hidden sm:inline text-gray-400 dark:text-gray-500">•</span>
            <a
              href="mailto:gus@omnes.dev"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t.sendEmail}
            </a>
            <span className="hidden sm:inline text-gray-400 dark:text-gray-500">•</span>
            <a
              href="https://calendly.com/omnes-blockchain/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t.scheduleMeeting}
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.builtBy}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.makingAA}
          </p>
        </div>
      </footer>
    </main>
  );
}
