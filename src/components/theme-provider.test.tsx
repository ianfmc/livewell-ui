import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './theme-provider';

const ThemeDisplay = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('defaults to light theme', () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
  });

  it('restores theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });

  it('applies theme class to document root', async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);

    await act(async () => {
      screen.getByRole('button', { name: 'Set Dark' }).click();
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('persists theme change to localStorage', async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Set Dark' }).click();
    });
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('useTheme throws when used outside ThemeProvider', () => {
    const originalError = console.error;
    console.error = () => {};
    expect(() => render(<ThemeDisplay />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
    console.error = originalError;
  });
});
