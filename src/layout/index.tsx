import React, { useId } from 'react';
import Header from './Header';
import Footer from './Footer';
import BodyWrapper from './BodyWrapper';

function BaseLayout({ children }: { children: React.ReactNode }) {
  const id = useId();
  return (
    <div key={id} className="flex flex-col min-w-screen h-full min-h-screen bg-gray-100">
      <Header />
      <BodyWrapper>{children}</BodyWrapper>
      <Footer />
    </div>
  );
}

export default BaseLayout;
