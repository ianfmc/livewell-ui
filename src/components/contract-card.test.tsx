import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContractCard from './contract-card';

const props = {
  instrument: 'EUR/USD',
  strike: '1.0850',
  expiry: '10:00 AM',
  status: 'Open',
};

describe('ContractCard', () => {
  it('renders instrument, strike, expiry, and status', () => {
    render(<ContractCard {...props} />);
    expect(screen.getByText('EUR/USD')).toBeInTheDocument();
    expect(screen.getByText(/Strike: 1.0850/)).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('Info button opens detail dialog', async () => {
    const user = userEvent.setup();
    render(<ContractCard {...props} />);
    await user.click(screen.getByRole('button', { name: /Info/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'EUR/USD' })).toBeInTheDocument();
  });

  it('dialog closes on Close button', async () => {
    const user = userEvent.setup();
    render(<ContractCard {...props} />);
    await user.click(screen.getByRole('button', { name: /Info/i }));
    await user.click(screen.getByRole('button', { name: /Close/i }));
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });
});
