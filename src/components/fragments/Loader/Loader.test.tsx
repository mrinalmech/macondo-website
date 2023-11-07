import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Loader, { LOADING_SCREEN_DURATION } from './Loader';

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.clearAllTimers();
});

describe('Loader', () => {
  test('Expect Loader to be presented', () => {
    render(<Loader appLoaded={false} />);

    expect(screen.getByText('Loading.')).toBeInTheDocument();
  });

  test('Expect loading dots to be presented after time period', () => {
    const loadingDuration = LOADING_SCREEN_DURATION * 1000;

    render(<Loader appLoaded={false} />);

    expect(screen.getByText('Loading.')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(loadingDuration));
    expect(screen.getByText('Loading..')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(loadingDuration));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(loadingDuration));
    expect(screen.getByText('Loading.')).toBeInTheDocument();
  });

  test('Expect Loader to be invisible if appLoaded', () => {
    render(<Loader appLoaded />);

    expect(screen.getByText('Loading.').parentElement).toHaveClass('transparent');
  });
});
