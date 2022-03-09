import React, { forwardRef, InputHTMLAttributes, ReactNode, Ref } from 'react';
import { useChangeInput } from '@/hooks';
import { onEnter } from '@/utils';

interface ValidateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  regKey?: RegExp;
  initValue?: string;
  children?: ReactNode;
  blur?: {
    validate?: (value: string) => boolean;
    regex?: RegExp;
    successMessage?: string;
    errorMessage?: string;
    changeStatus?: (isSuccess: boolean, message: string) => void;
  };
}

const ValidateInput = forwardRef(
  ({ regKey, onKeyPress, onBlur, blur, initValue = '', ...props }: ValidateInputProps, ref: Ref<HTMLInputElement>) => {
    const [value, handleChange] = useChangeInput(initValue, regKey);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!onEnter(event.code)) return;
      event.preventDefault();
      onKeyPress?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault();
      onBlur?.(event);
      if (!blur || !blur?.validate || !blur?.regex) return;

      const isSuccess = blur.validate(value) || blur.regex.test(value);
      const message = isSuccess ? blur.successMessage : blur.errorMessage;
      blur.changeStatus?.(isSuccess, message ?? '');
    };

    return (
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        {...props}
      />
    );
  },
);

export default ValidateInput;
