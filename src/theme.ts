import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
  },
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
  },
  semanticTokens: {
    colors: {
      canvas: { default: '#f7f8fb', _dark: '#0f1115' },
      surface: { default: 'white', _dark: 'gray.800' },
      'border-subtle': { default: 'gray.200', _dark: 'gray.700' },
      muted: { default: 'gray.600', _dark: 'gray.400' },
    },
  },
  styles: {
    global: (props: Record<string, unknown>) => ({
      body: {
        bg: 'canvas',
        color: mode('gray.800', 'gray.100')(props),
        backgroundImage: mode(
          `radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12), transparent 55%),
           linear-gradient(rgba(15, 17, 21, 0.05) 1px, transparent 1px),
           linear-gradient(90deg, rgba(15, 17, 21, 0.05) 1px, transparent 1px)`,
          `radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.20), transparent 55%),
           linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
           linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px)`
        )(props),
        backgroundSize: '100% 100%, 42px 42px, 42px 42px',
        backgroundAttachment: 'fixed, fixed, fixed',
        backgroundPosition: 'center top, center, center',
      },
      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': {
          animationDuration: '0.001ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.001ms !important',
          scrollBehavior: 'auto !important',
        },
      },
    }),
  },
});

export default theme;
