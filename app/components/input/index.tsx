import {
  memo,
  forwardRef,
  type InputHTMLAttributes,
  type ForwardedRef,
} from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string;
}

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {className, ...restProps} = props;

    return (
      <input
        {...restProps}
        ref={ref}
        className={`border border-secondary rounded-[20px] h-10 w-full bg-white font-poppins text-black text-xs text-center outline-none ring-0 ${className}`}
      />
    );
  },
);
