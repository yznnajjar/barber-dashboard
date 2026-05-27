import { createGlobalStyle } from 'styled-components';
import { COLORS, FONT, FONT_SIZE, LINE_HEIGHT } from '@/design-system';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --color-primary: ${COLORS.PRIMARY};
    --color-bg: ${COLORS.BG};
    --color-bg-card: ${COLORS.BG_CARD};
    --color-text-primary: ${COLORS.TEXT_PRIMARY};
    --color-text-secondary: ${COLORS.TEXT_SECONDARY};
    --color-border: ${COLORS.BORDER};
    --font-display: ${FONT.DISPLAY};
    --font-body: ${FONT.BODY};
    --font-arabic: ${FONT.ARABIC};
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${COLORS.BG};
    color: ${COLORS.TEXT_PRIMARY};
    font-family: ${FONT.BODY};
    font-size: ${FONT_SIZE.BASE};
    line-height: ${LINE_HEIGHT.NORMAL};
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.BG}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.BORDER}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${COLORS.BORDER_HOVER}; }

  a { color: inherit; text-decoration: none; }

  ::selection {
    background: ${COLORS.PRIMARY}40;
    color: ${COLORS.TEXT_PRIMARY};
  }
`;
