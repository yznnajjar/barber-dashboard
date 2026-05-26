import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&family=Cairo:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --color-primary: ${theme.colors.primary};
    --color-bg: ${theme.colors.bg};
    --color-bg-card: ${theme.colors.bgCard};
    --color-text-primary: ${theme.colors.textPrimary};
    --color-text-secondary: ${theme.colors.textSecondary};
    --color-border: ${theme.colors.border};
    --sidebar-width: ${theme.sidebar.width};
    --font-display: ${theme.typography.fontDisplay};
    --font-body: ${theme.typography.fontBody};
    --font-arabic: ${theme.typography.fontArabic};
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: ${theme.colors.bg};
    color: ${theme.colors.textPrimary};
    font-family: ${theme.typography.fontBody};
    font-size: ${theme.typography.size.base};
    line-height: ${theme.typography.leading.normal};
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${theme.colors.bg}; }
  ::-webkit-scrollbar-thumb { background: ${theme.colors.border}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${theme.colors.borderLight}; }

  a { color: inherit; text-decoration: none; }

  button {
    cursor: pointer;
    font-family: ${theme.typography.fontBody};
    border: none;
    outline: none;
    background: none;
  }

  input, textarea, select {
    font-family: ${theme.typography.fontBody};
    outline: none;
  }

  /* Prevent flash of unstyled content */
  #__next { min-height: 100vh; }

  /* Selection */
  ::selection {
    background: ${theme.colors.primary}40;
    color: ${theme.colors.textPrimary};
  }

  /* Focus visible */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* Arabic text utility */
  .arabic {
    font-family: ${theme.typography.fontArabic};
    direction: rtl;
  }

  /* Animated gradient for loading states */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-16px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
