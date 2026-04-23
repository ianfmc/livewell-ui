# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

LIVEWELL is a decision-support UI for trading NADEX binary options. It transforms raw market data into scored, filterable signals that guide disciplined trade decisions. The project is built product-first and evolves incrementally toward a full system with a real backend, ML models, and agent workflows.

## Commands

```bash
npm run dev           # Start dev server at http://localhost:5173
npm run build         # Type-check (tsc -b) then bundle (vite build)
npm run lint          # ESLint across the project
npm test              # Vitest in watch mode — reruns affected tests on save
npm run test:coverage # Single run with coverage report (80% line threshold enforced)
```

Run a single test file: `npx vitest run src/hooks/useSignals.test.ts`

## Architecture

**Data flow:** `src/data/mockData.ts` defines the `ContractCard` type and seed data → `src/mocks/handlers.ts` exposes it as `GET /api/signals` via MSW → `src/hooks/useSignals.ts` fetches that endpoint → `src/pages/DailySignals.tsx` renders the result.

**MSW in dev:** `src/main.tsx` conditionally starts the MSW service worker before mounting React (`import.meta.env.DEV` guard). All unhandled requests are bypassed (`onUnhandledRequest: "bypass"`). The worker file lives at `public/mockServiceWorker.js`. Adding a new mock endpoint means adding a handler in `src/mocks/handlers.ts` only.

**Theme:** `src/components/theme-provider.tsx` wraps the app in a React context that persists `"light" | "dark"` to `localStorage` and toggles a class on `<html>`. Access it with `useTheme()`. MUI theming is not yet wired to this — the toggle currently drives manual `bgcolor` switches in `App.tsx`.

**Pages vs components:** Pages (`src/pages/`) own data fetching and page-level layout. Components (`src/components/`) are presentational and receive props.

**Testing:** Vitest + React Testing Library. Test files live next to the code they test (`useSignals.test.ts` beside `useSignals.ts`). MSW intercepts `fetch` in tests via `src/mocks/server.ts` (Node runtime), reusing the same `src/mocks/handlers.ts` as the dev service worker. `src/test/setup.ts` runs before every test file and manages the MSW lifecycle. Use `renderHook` for hooks, `render` + `screen` for components and pages. Dashboard tests require `MemoryRouter` wrapper (component uses `Link`). `ThemeProvider` is excluded from coverage — infrastructure with no product logic.

## Data Store (settled)

- **DynamoDB** — operational records: scored signals, trade outcomes, model runs, model metadata
- **S3** — analytical data: historical price data (Parquet), model artifacts, backtest results, feature tables
- RDS/PostgreSQL was considered and rejected in favour of serverless end-to-end.
- The **DynamoDB MCP server** (`awslabs.dynamodb-mcp-server`) will be used to design table schemas and generate CDK + Python access layer code before backend implementation begins.

## Worktrees

Worktree directory: `.worktrees/` (project-local, hidden). Always use this location when creating git worktrees for feature branches.

## Key Conventions

- MUI components are imported individually (`import Button from '@mui/material/Button'`), not from the barrel (`@mui/material`).
- Hooks live in `src/hooks/` and return a typed result object (`{ data, loading, error }`).
- The `ContractCard` type (instrument, strike, expiry, status) is the core domain type. It lives in `src/data/mockData.ts` and is imported by the hook — not by pages directly.
