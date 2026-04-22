import { http, HttpResponse } from 'msw';
import { mockData } from '../data/mockData';
import { mockDashboard } from '../data/mockDashboard';

export const handlers = [
  http.get('/api/signals', () => {
    return HttpResponse.json(mockData);
  }),
  http.get('/api/dashboard', () => {
    return HttpResponse.json(mockDashboard);
  }),
];
