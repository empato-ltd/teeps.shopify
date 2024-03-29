import {memo} from 'react';

interface SeparatorProps {
  text: string;
  className?: string;
}

export const Separator = memo((props: SeparatorProps) => {
  const {text, className} = props;

  return (
    <div className={`flex gap-6 items-center w-full ${className}`}>
      <div className="flex-1 w-full border border-secondary" />
      <p className="text-sm font-poppins">{props.text}</p>
      <div className="flex-1 w-full border border-secondary" />
    </div>
  );
});
