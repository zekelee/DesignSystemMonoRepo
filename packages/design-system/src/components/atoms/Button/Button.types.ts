export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonTone = 'primary' | 'neutral';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: ButtonSize;
  tone?: ButtonTone;
}

// If you'd like to import token types directly, we can export a Tokens TS type from `stitches.ts` later.
