import React from 'react';
import clsx from 'clsx';

import Header from '../../../components/fragments/Header';
import Footer from '../../../components/fragments/Footer';

type Props = {
  children?: React.ReactNode;
  overFlowHidden?: boolean;
};

export default function Page({ children, overFlowHidden = false }: Props) {
  return (
    <div className={clsx('h-screen flex flex-col', { 'overflow-hidden': overFlowHidden })}>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
