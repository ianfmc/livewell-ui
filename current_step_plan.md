# Current Step Plan: Dashboard Page (Phase 1A)

**Goal:** Build the Dashboard as the primary landing page using mock data that matches the backend API contracts defined in the delivery plan. The Dashboard is the "what matters right now?" view — market regime, today's opportunities, model health summary, and no-trade warnings.

**Baseline:** The app currently loads directly into `DailySignals`. There is no Dashboard, no navigation between pages, and no route structure.

**Delivery plan reference:** Phase 1A — Product Shell and Page Contracts.

---

## Tracks

This step has two independent tracks that can proceed in parallel.

### Track A — Navigation shell

The app needs a navigation structure before a second page can exist.

1. Install React Router (`npm install react-router-dom`)
2. Add route structure in `main.tsx` or a new `router.tsx`:
   - `/` → Dashboard
   - `/signals` → DailySignals
3. Add sidebar or nav links to `App.tsx` (drawer or persistent left nav)
4. Confirm both routes render correctly

### Track B — Dashboard page

Create `src/pages/Dashboard.tsx` with mock data.

**Sections to build:**

1. **Market regime banner** — shows current regime for each tracked market (e.g. EUR/USD: Bullish / Neutral / Bearish) with a no-trade flag where applicable
2. **Opportunity summary** — count of today's candidates, count passing all rules, count flagged for review
3. **Top contract candidates** — 2–3 card previews linking to `/signals`
4. **Model health summary** — training date, data freshness status (stale / current), single health indicator
5. **No-trade warning panel** — shown when zero valid setups exist; should feel informative, not like an error

**Mock data to add** (`src/data/mockDashboard.ts`):
- Market snapshots: instrument, regime, no-trade flag
- Opportunity counts
- Model health: training date, data freshness, status

**MSW handler to add** (`src/mocks/handlers.ts`):
- `GET /api/dashboard` → returns mock dashboard summary

**Hook to add** (`src/hooks/useDashboard.ts`):
- Same pattern as `useSignals`: `{ data, loading, error }`

---

## File Map

| Action | File |
|---|---|
| New | `src/pages/Dashboard.tsx` |
| New | `src/data/mockDashboard.ts` |
| New | `src/hooks/useDashboard.ts` |
| Edit | `src/mocks/handlers.ts` — add `/api/dashboard` handler |
| Edit | `src/main.tsx` or new `src/router.tsx` — add routes |
| Edit | `src/App.tsx` — add navigation |
| Edit | `README.md` — update Next Step |

---

## Definition of Done

- [ ] Navigating to `/` shows the Dashboard; navigating to `/signals` shows Daily Signals
- [ ] Dashboard renders all five sections with mock data
- [ ] "No valid setups" state is handled and renders gracefully
- [ ] `GET /api/dashboard` is intercepted by MSW
- [ ] `useDashboard` hook encapsulates all fetch logic
- [ ] No direct mock data imports in page components
- [ ] Build passes (`npm run build`)
