import {memo, type InputHTMLAttributes} from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string;
}

export const Input = memo((props: InputProps) => {
  const {className, ...restProps} = props;

  return (
    <input
      {...restProps}
      className={`border border-secondary rounded-[20px] h-10 w-full bg-white font-poppins text-black text-xs text-center outline-none ring-0 ${className}`}
    />
  );
});
