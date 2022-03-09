import React from 'react';

interface InputRowProps {
  errorMessage?: string;
  isError?: boolean;
  successMessage?: string;
  isSuccess?: boolean;
  children?: React.ReactNode;
}

const InputRow = ({ errorMessage, isError, successMessage, isSuccess, children }: InputRowProps) => {
  return (
    <p>
      {children}
      {isSuccess && <em>{successMessage}</em>}
      {isError && <em>{errorMessage}</em>}
    </p>
  );
};

export default InputRow;
