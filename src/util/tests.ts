export function resize(width: number) {
  const event = new Event('resize', { bubbles: true, cancelable: true });

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(event);
}

export function scroll(scrollY: number) {
  const event = new Event('scroll', { bubbles: true, cancelable: true });

  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: scrollY,
  });
  window.dispatchEvent(event);
}
