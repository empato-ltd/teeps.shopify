import {useMatches} from '@remix-run/react';
import {type ReactNode} from 'react';

import {Header} from '~/components';
import {Categories} from '~/components/categories';
import {Collections} from '~/components/collections';
import {TopBar} from '~/components/topBar';

export const Layout = ({children}: {children: ReactNode}) => {
  const matches = useMatches();
  const currentRoute = matches?.at(1)?.pathname;

  return (
    <>
      {currentRoute === '/' && <Header />}
      {['/catalog', '/comenzi', '/recenzii'].includes(
        currentRoute as string,
      ) && (
        <>
          <TopBar />
          <Categories />
        </>
      )}
      {currentRoute === '/catalog' && <Collections />}
      {children}
    </>
  );
};
