import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// jsdom doesn't implement matchMedia; Chakra's responsive style props rely
// on it, so tests that render Chakra components need this polyfilled.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
