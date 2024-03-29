import {type ButtonHTMLAttributes, memo, type ReactNode} from 'react';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'title'> {
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  layout: 'primary' | 'secondary';
}

export const Button = memo((props: ButtonProps) => {
  const {title, icon, className, layout, ...restProps} = props;

  return (
    <button
      {...restProps}
      className={`h-10 rounded-[20px] w-full flex items-center justify-center gap-2 border border-primary ${
        layout === 'primary'
          ? 'bg-primary text-white'
          : 'bg-transparent text-primary'
      } font-poppins text-sm leading-none ${className}`}
    >
      {icon}
      {title}
    </button>
  );
});
