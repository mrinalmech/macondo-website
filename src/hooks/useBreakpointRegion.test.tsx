import React from 'react';
import { act, render, screen } from '@testing-library/react';

import { useBreakpointRegion } from './useBreakpointRegion';

import { resize } from '../util/tests';

const BreakpointComponent = () => {
  const breakpointRegion = useBreakpointRegion();

  return <div>{breakpointRegion}</div>;
};

describe('useBreakpointRegion', () => {
  test('Expect useBreakpointRegion to return correct data', () => {
    act(() => resize(639));

    render(<BreakpointComponent />);

    expect(screen.getByText(/xs/)).toBeInTheDocument();

    act(() => resize(767));

    expect(screen.queryByText(/xs/)).not.toBeInTheDocument();
    expect(screen.getByText(/sm/)).toBeInTheDocument();

    act(() => resize(1023));

    expect(screen.queryByText(/sm/)).not.toBeInTheDocument();
    expect(screen.getByText(/md/)).toBeInTheDocument();

    act(() => resize(1279));

    expect(screen.queryByText(/md/)).not.toBeInTheDocument();
    expect(screen.getByText(/lg/)).toBeInTheDocument();

    act(() => resize(1281));

    expect(screen.queryByText(/lg/)).not.toBeInTheDocument();
    expect(screen.getByText(/xl/)).toBeInTheDocument();
  });
});
