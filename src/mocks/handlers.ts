import { http, HttpResponse } from 'msw';
import { mockData } from '../data/mockData';

export const handlers = [
  http.get('/api/signals', () => {
    return HttpResponse.json(mockData);
  }),
];
