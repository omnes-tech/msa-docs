import { docsPt } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

// Portuguese source
export const sourcePt = loader({
  baseUrl: '/docs/pt',
  source: createMDXSource(docsPt),
  i18n: {
    defaultLanguage: 'pt',
    translations: {
      pt: {
        toc: 'Sumário',
        search: 'Buscar',
        searchNoResult: 'Nenhum resultado encontrado',
        lastUpdate: 'Última atualização',
        previousPage: 'Página anterior',
        nextPage: 'Próxima página',
        chooseTheme: 'Escolher tema',
        lightMode: 'Modo claro',
        darkMode: 'Modo escuro',
        systemMode: 'Modo sistema',
        close: 'Fechar',
        openSidebar: 'Abrir barra lateral',
        closeSidebar: 'Fechar barra lateral',
        tableOfContents: 'Índice',
        onThisPage: 'Nesta página',
        backToTop: 'Voltar ao topo',
        quickNavigation: 'Navegação Rápida',
        copy: 'Copiar',
        copied: 'Copiado',
        link: 'Link',
        edit: 'Editar',
        editOnGitHub: 'Editar no GitHub',
        reportIssue: 'Reportar problema',
      },
    },
  },
});

