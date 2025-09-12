import React from 'react';
import { styled } from '../../..//utils/stitches';
import type { ButtonProps, ButtonSize, ButtonTone } from './Button.types';

const Root = styled('button', {
  appearance: 'none',
  border: 'none',
  borderRadius: '$radii$2',
  fontFamily: '$fonts$body',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,

  // default tokens
  padding: '8px 12px',
  backgroundColor: '$colors$primary',
  color: '$colors$textOnPrimary',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  variants: {
    size: {
      small: { fontSize: 12, padding: '6px 10px' },
      medium: { fontSize: 14, padding: '8px 12px' },
      large: { fontSize: 16, padding: '10px 16px' },
    },
    tone: {
      primary: {
        backgroundColor: '$colors$primary',
        color: '$colors$textOnPrimary',
      },
      neutral: {
        backgroundColor: '$colors$surface',
        color: '$colors$text',
        border: '1px solid $colors$border',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    tone: 'primary',
  },
});

export const Button: React.FC<ButtonProps & { size?: ButtonSize; tone?: ButtonTone }> = ({
  children,
  onClick,
  disabled = false,
  size = 'medium',
  tone = 'primary',
}) => {
  return (
    <Root onClick={onClick} disabled={disabled} size={size} tone={tone}>
      {children}
    </Root>
  );
};

export default Button;
