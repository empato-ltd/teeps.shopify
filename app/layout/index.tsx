import {useMatches} from '@remix-run/react';
import {CartReturn} from '@shopify/hydrogen';
import {memo, type ReactNode} from 'react';

import {Header} from '~/components';
import {Categories} from '~/components/categories';
import {Collections} from '~/components/collections';
import {TopBar} from '~/components/topBar';

export const Layout = ({
  children,
  cart,
}: {
  children: ReactNode;
  cart: CartReturn;
}) => {
  const matches = useMatches();
  const currentRoute = matches?.at(1)?.pathname;

  return (
    <>
      {currentRoute === '/' && <Header />}
      {['/catalog', '/comenzi', '/recenzii'].includes(
        currentRoute as string,
      ) && (
        <>
          <TopBar cart={cart} />
          <Categories />
        </>
      )}
      {currentRoute === '/catalog' && <Collections />}
      <Children>{children}</Children>
    </>
  );
};

const Children = memo(({children}: {children: ReactNode}) => {
  return <>{children}</>;
});
