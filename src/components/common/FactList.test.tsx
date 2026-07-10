import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { FactList } from './FactList';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('FactList', () => {
  it('renders each label and value', () => {
    render(
      <FactList
        facts={[
          { label: 'Current role', value: 'Eng. Manager' },
          { label: 'Company', value: 'Freshpaint' },
        ]}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByText('Current role')).toBeInTheDocument();
    expect(screen.getByText('Eng. Manager')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Freshpaint')).toBeInTheDocument();
  });
});
