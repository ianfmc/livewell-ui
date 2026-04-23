import { http, HttpResponse } from 'msw';
import { mockData, mockContractDetails } from '../data/mockData';
import { mockDashboard } from '../data/mockDashboard';

export const handlers = [
  http.get('/api/signals', () => {
    return HttpResponse.json(mockData);
  }),
  http.get('/api/dashboard', () => {
    return HttpResponse.json(mockDashboard);
  }),
  http.get('/api/signals/:instrument/:strike', ({ params }) => {
    const instrument = (params.instrument as string).replace(/-/g, '/');
    const strike = params.strike as string;
    const detail = mockContractDetails.find(
      (d) => d.instrument === instrument && d.strike === strike
    );
    if (!detail) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),
];
