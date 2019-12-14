import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Select,
  Textarea,
} from '@chakra-ui/core';
import { useField } from 'formik';

function InputA({ label, type, controlProps, ...props }) {
  const [field, meta] = useField(props);
  let InputComponent = Input;
  if (type === 'select') InputComponent = Select;
  if (type === 'textarea') InputComponent = Textarea;
  return (
    <FormControl
      width="100%"
      isInvalid={meta.error && meta.touched}
      mb={4}
      {...controlProps}
    >
      {label && (
        <FormLabel color="paragraph" htmlFor={field.name}>
          {label}
        </FormLabel>
      )}
      <InputComponent
        aria-label={label || field.name}
        aria-describedby={label || field.name}
        type={type || 'text'}
        errorBorderColor="red.300"
        isInvalid={meta.touched && !!meta.error}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

InputA.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  controlProps: PropTypes.string,
};

export default InputA;
