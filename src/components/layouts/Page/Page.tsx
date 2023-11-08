import React from 'react';
import Header from '../../fragments/Header';
import Footer from '../../fragments/Footer';

type Props = {
  children?: React.ReactNode;
  fixedHeader?: boolean;
};

export default function Page({ children, fixedHeader }: Props) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header fixed={fixedHeader} />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}
