import { render, screen, fireEvent } from '@testing-library/react';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import DailySignals from './DailySignals';

describe('DailySignals', () => {
  it('renders contract cards after load', async () => {
    render(<DailySignals />);
    expect(await screen.findByText('EUR/USD')).toBeInTheDocument();
    expect(screen.getByText('GBP/USD')).toBeInTheDocument();
    expect(screen.getByText('USD/JPY')).toBeInTheDocument();
  });

  it('shows spinner while loading', () => {
    render(<DailySignals />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('status filter reduces visible cards', async () => {
    render(<DailySignals />);
    await screen.findByText('EUR/USD');

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(await screen.findByRole('option', { name: 'Open' }));

    expect(screen.getByText('EUR/USD')).toBeInTheDocument();
    expect(screen.getByText('GBP/USD')).toBeInTheDocument();
    expect(screen.queryByText('USD/JPY')).not.toBeInTheDocument();
  });

  it('shows error alert on fetch failure', async () => {
    server.use(
      http.get('/api/signals', () => HttpResponse.json({ message: 'error' }, { status: 500 }))
    );
    render(<DailySignals />);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('filter reset to All shows all cards', async () => {
    render(<DailySignals />);
    await screen.findByText('EUR/USD');

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(await screen.findByRole('option', { name: 'Review' }));
    expect(screen.queryByText('EUR/USD')).not.toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(await screen.findByRole('option', { name: 'All' }));
    expect(screen.getByText('EUR/USD')).toBeInTheDocument();
    expect(screen.getByText('GBP/USD')).toBeInTheDocument();
    expect(screen.getByText('USD/JPY')).toBeInTheDocument();
  });
});
