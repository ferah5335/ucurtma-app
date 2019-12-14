import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';

function ButtonA({ buttonType, fullWidth, variant, children, ...otherProps }) {
  const types = {
    primary: { bg: 'primaryButton', fontWeight: 'regular', size: 'lg' },
  };
  return (
    <Button
      data-testid="button"
      width={fullWidth ? '100%' : 'inherit'}
      bg={buttonType !== 'custom' && types[buttonType].bg}
      fontWeight={buttonType !== 'custom' && types[buttonType].fontWeight}
      size={buttonType !== 'custom' && types[buttonType].size}
      variant={variant}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

ButtonA.defaultProps = {
  buttonType: 'primary',
  fullWidth: true,
};

ButtonA.propTypes = {
  buttonType: PropTypes.oneOf(['primary', 'custom']),
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default ButtonA;
