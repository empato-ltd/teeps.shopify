import {memo, useEffect, useState} from 'react';
import {Link} from '@remix-run/react';
import {type CartReturn} from '@shopify/hydrogen';

import {TPBagIcon, TPSearchIcon, TPUserIcon} from '~/assets/icons';
import testamentLogo from 'public/images/testamentLogo.png';

export const TopBar = memo(({cart}: {cart: CartReturn}) => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`py-4 px-4 flex justify-between items-center sticky top-0 bg-white ${
          isAtTop ? '' : 'shadow-md'
        } z-[999]`}
      >
        <div className="flex-1"></div>
        <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center">
          <img src={testamentLogo} alt="t" width={40} height={40} />
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          <TPSearchIcon />
          <Link to="/cos-cumparaturi" className="relative">
            <TPBagIcon />
            {cart?.totalQuantity && (
              <span
                className={`absolute w-5 h-5 rounded-full bg-primary top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center ${
                  cart.totalQuantity > 10 ? 'text-[10px]' : 'text-xs'
                }`}
              >
                {cart?.totalQuantity}
              </span>
            )}
          </Link>
          <TPUserIcon />
        </div>
      </div>
    </>
  );
});
