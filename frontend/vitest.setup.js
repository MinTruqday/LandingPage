import '@testing-library/jest-dom';

const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

window.IntersectionObserver = mockIntersectionObserver;
