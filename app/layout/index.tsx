import {type ReactNode} from 'react';

import {Header} from '~/components';

export const Layout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
