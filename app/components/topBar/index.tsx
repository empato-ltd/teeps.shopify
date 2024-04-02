import {Link} from '@remix-run/react';
import {memo} from 'react';
import {TPBagIcon, TPSearchIcon, TPUserIcon} from '~/assets/icons';

export const TopBar = memo(() => {
  return (
    <>
      <div className="py-4 px-4 flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="h-14 w-14 rounded-full bg-black" />
        <div className="flex-1 flex items-center justify-end gap-4">
          <TPSearchIcon />
          <Link to="/cos-cumparaturi">
            <TPBagIcon />
          </Link>
          <TPUserIcon />
        </div>
      </div>
    </>
  );
});
