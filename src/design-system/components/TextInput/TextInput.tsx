import { forwardRef, type InputHTMLAttributes } from 'react';
import { textInput } from '@/design-system/components/TextInput/TextInput.css';
import { cx } from '@/design-system/utils/cx';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, ...rest }, ref) {
    return <input ref={ref} className={cx(textInput, className)} {...rest} />;
  },
);
