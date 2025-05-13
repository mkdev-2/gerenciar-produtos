import '@testing-library/jest-dom';
import { jsx, jsxs } from 'react/jsx-runtime';

global.React = {
  createElement: jest.fn((type, props, ...children) => {
    return { type, props, children };
  })
};

jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props) => {
      const { alt, ...otherProps } = props;
      return jsx('img', { alt: alt || '', ...otherProps });
    }
  };
});

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // para compatibilidade com versões antigas
    removeListener: jest.fn(), // para compatibilidade com versões antigas
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.scrollTo = jest.fn();

global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  warn: console.warn,
  error: console.error,
};