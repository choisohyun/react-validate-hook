import React from 'react';
import InputRow from '@/components/inputRow';
import ValidateInput from '@/components/validateInput';
import { useBlurInput } from '@/hooks';

const ID_REG_KEY_NOT_ACCESS = /[^a-zA-Z0-9@._-]/g;
const ID_REG_KEY_ACCESS = /[a-zA-Z0-9@._-]/g;

const BlurValidation = () => {
  const [status, changeStatus] = useBlurInput();

  return (
    <>
      <InputRow {...status}>
        <label htmlFor="id">ID</label>
        <ValidateInput
          type="text"
          placeholder="ex. hong gildong"
          id="id"
          autoComplete="off"
          maxLength={35}
          regKey={ID_REG_KEY_NOT_ACCESS}
          blur={{
            regex: ID_REG_KEY_ACCESS,
            successMessage: 'success id',
            errorMessage: 'error id. try again',
            changeStatus,
          }}
        />
      </InputRow>
    </>
  );
};

export default BlurValidation;
