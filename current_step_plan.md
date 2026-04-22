# Current Step Plan: API Integration via MSW

**Goal:** Replace direct mock data usage with an async API call, using Mock Service Worker (MSW) to simulate a real backend. Introduce a `useSignals` hook and add loading/error states.

**Baseline:** `DailySignals.tsx` imports `mockData` directly. No async behavior, no loading/error handling.

---

## Steps

### 1. Install MSW
```
npm install msw --save-dev
```

### 2. Copy MSW service worker to public/
```
npx msw init public/ --save
```
This writes `public/mockServiceWorker.js` (required by MSW at runtime) and records the path in `package.json`.

### 3. Define mock handler
Create `src/mocks/handlers.ts`:
- Handle `GET /api/signals`
- Return the existing mock data from `mockData.ts` as the response body
- This becomes the single source of truth for mock API responses

### 4. Set up MSW browser worker
Create `src/mocks/browser.ts`:
- Import handlers and call `setupWorker(...handlers)`
- Export the `worker` instance

### 5. Start MSW in development
Update `src/main.tsx`:
- Conditionally import and start the worker when `import.meta.env.DEV` is true
- Start the worker before rendering React (worker must be ready before first fetch)

### 6. Create `useSignals` hook
Create `src/hooks/useSignals.ts`:
- Internal state: `data: ContractCard[]`, `loading: boolean`, `error: string | null`
- `useEffect` fires once on mount, calls `fetch('/api/signals')`, parses JSON, sets state
- Returns `{ data, loading, error }`

### 7. Update `DailySignals.tsx`
- Remove the `mockData` import
- Call `useSignals()` to get `{ data, loading, error }`
- Replace `mockData` references with `data`
- Render a loading indicator while `loading` is true
- Render an error message if `error` is set

### 8. Update README
- Mark `[ ] API integration` as `[✓]`
- Update **Next Step** to: *Extract backend — move mock handlers toward a real Express/FastAPI server*

---

## File Map

| Action | File |
|--------|------|
| New    | `src/mocks/handlers.ts` |
| New    | `src/mocks/browser.ts` |
| New    | `src/hooks/useSignals.ts` |
| New    | `public/mockServiceWorker.js` (generated) |
| Edit   | `src/main.tsx` |
| Edit   | `src/pages/DailySignals.tsx` |
| Edit   | `README.md` |

---

## Definition of Done

- [ ] `DailySignals.tsx` makes a `fetch('/api/signals')` call (no direct mock data import)
- [ ] MSW intercepts the call and returns mock data in dev
- [ ] Loading state is visible while the fetch is in flight
- [ ] Error state renders if the fetch fails
- [ ] `useSignals` hook encapsulates all fetch logic
- [ ] README updated
