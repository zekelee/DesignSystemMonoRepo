import React from 'react';
import { styled } from '../../..//utils/stitches';
import type { ButtonProps } from './Button.types';

const Root = styled('button', {
  padding: '8px 12px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '$primary',
  color: 'white',
  cursor: 'pointer'
});

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <Root onClick={onClick} disabled={disabled}>
      {children}
    </Root>
  );
};

export default Button;
