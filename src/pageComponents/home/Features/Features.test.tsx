import React from 'react';
import { act, render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import * as reactRedux from 'react-redux';
import * as useHooks from 'usehooks-ts';

import { scroll } from '../../../util/tests';

import Features from './Features';

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
const mockUseStaticQuery = {
  allFile: {
    nodes: [{ name: 'players' }, { name: 'enemies' }, { name: 'upgrades' }],
  },
};

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn().mockImplementation(() => mockDispatch),
}));

jest.mock('usehooks-ts', () => ({
  ...jest.requireActual('usehooks-ts'),
  useIntersectionObserver: jest.fn(),
}));

beforeEach(() => {
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Features', () => {
  test('Expect Features to be presented', () => {
    (reactRedux.useSelector as any).mockReturnValue(false);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: false });

    render(<Features />);

    expect(screen.getByAltText(/feature_1_alt/)).toBeInTheDocument();
    expect(screen.getByText(/feature_1_heading/)).toBeInTheDocument();

    expect(screen.getByAltText(/feature_2_alt/)).toBeInTheDocument();
    expect(screen.getByText(/feature_2_heading/)).toBeInTheDocument();

    expect(screen.getByAltText(/feature_3_alt/)).toBeInTheDocument();
    expect(screen.getByText(/feature_3_heading/)).toBeInTheDocument();
  });

  test('Expect Feature images to be invisible when not in view', () => {
    (reactRedux.useSelector as any).mockReturnValue(false);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: false });

    render(<Features />);

    expect(screen.getByAltText(/feature_1_alt/)?.parentElement).toHaveClass('opacity-0');
    expect(screen.getByAltText(/feature_2_alt/)?.parentElement).toHaveClass('opacity-0');
    expect(screen.getByAltText(/feature_3_alt/)?.parentElement).toHaveClass('opacity-0');
  });

  test('Expect Feature images to be visible when in view', () => {
    (reactRedux.useSelector as any).mockReturnValue(false);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: true });

    render(<Features />);

    expect(screen.getByAltText(/feature_1_alt/)?.parentElement).not.toHaveClass('opacity-0');
    expect(screen.getByAltText(/feature_2_alt/)?.parentElement).not.toHaveClass('opacity-0');
    expect(screen.getByAltText(/feature_3_alt/)?.parentElement).not.toHaveClass('opacity-0');
  });

  test('Expect redux store to be updated when images come into view', () => {
    (reactRedux.useSelector as any).mockReturnValue(false);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: true });

    render(<Features />);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { imgName: 'players', imgsNames: ['players', 'enemies', 'upgrades'] },
      type: 'app/setImageLoaded',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { imgName: 'enemies', imgsNames: ['players', 'enemies', 'upgrades'] },
      type: 'app/setImageLoaded',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { imgName: 'upgrades', imgsNames: ['players', 'enemies', 'upgrades'] },
      type: 'app/setImageLoaded',
    });
  });

  test('Expect Feature images to be visible when not in view and all images have been previously loaded', () => {
    (reactRedux.useSelector as any).mockReturnValue(true);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: false });

    render(<Features />);

    expect(screen.getByAltText(/feature_1_alt/)?.parentElement).not.toHaveClass('opacity-0');
    expect(screen.getByAltText(/feature_2_alt/)?.parentElement).not.toHaveClass('opacity-0');
    expect(screen.getByAltText(/feature_3_alt/)?.parentElement).not.toHaveClass('opacity-0');
  });

  test('Expect steam widget to not be present when not scrolled', () => {
    (reactRedux.useSelector as any).mockReturnValue(false);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: false });

    render(<Features />);

    expect(screen.queryByTitle(/steam-widget/)).not.toBeInTheDocument();
  });

  test('Expect steam widget to be present but not visible when scrolled but out of view', () => {
    (reactRedux.useSelector as any).mockReturnValue(false);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: false });

    render(<Features />);

    expect(screen.queryByTitle(/steam-widget/)).not.toBeInTheDocument();

    act(() => scroll(50));

    expect(screen.getByTitle(/steam-widget/)).toBeInTheDocument();
    expect(screen.getByTitle(/steam-widget/)).toHaveClass('opacity-0');
  });

  test('Expect steam widget to be present and visible when in view', () => {
    (reactRedux.useSelector as any).mockReturnValue(false);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: true });

    render(<Features />);

    act(() => scroll(1));

    expect(screen.getByTitle(/steam-widget/)).toBeInTheDocument();
    expect(screen.getByTitle(/steam-widget/)).not.toHaveClass('opacity-0');
  });

  test('Expect steam widget to be present and visible when not in view and widget has been previously loaded', () => {
    (reactRedux.useSelector as any).mockReturnValue(true);
    (useHooks.useIntersectionObserver as any).mockReturnValue({ isIntersecting: false });

    render(<Features />);

    expect(screen.getByTitle(/steam-widget/)).toBeInTheDocument();
    expect(screen.getByTitle(/steam-widget/)).not.toHaveClass('opacity-0');
  });
});
