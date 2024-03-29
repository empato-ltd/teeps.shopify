import {memo} from 'react';
import teepsLogo from 'public/images/teepsLogo.png';

export const Header = memo(() => {
  return (
    <div className="h-20 flex items-center justify-center shadow-sm">
      <img src={teepsLogo} alt="teeps" style={{maxWidth: 100}} />
    </div>
  );
});
