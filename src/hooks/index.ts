import React, { useEffect, useState } from 'react';

export const useChangeInput = (initValue = '', changeRegex?: RegExp) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    const changedValue = changeRegex ? value.replace(changeRegex, '') : value;
    setValue(changedValue);
  };

  return [value, handleChange] as const;
};

export const useBlurInput = () => {
  const [status, setStatus] = useState({ isSuccess: false, successMessage: '', isError: false, errorMessage: '' });

  const changeStatus = (isSuccess: boolean, message: string) => {
    isSuccess && setStatus({ isSuccess: true, successMessage: message, isError: false, errorMessage: message });
    !isSuccess && setStatus({ isSuccess: false, successMessage: '', isError: true, errorMessage: '' });
  };

  return [status, changeStatus] as const;
};
