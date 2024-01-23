import React from 'react';

import Header from '../../../components/fragments/Header';
import Footer from '../../../components/fragments/Footer';

type Props = {
  children?: React.ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
