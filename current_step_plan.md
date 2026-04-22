# Current Step: Phase 1A — Contract Detail Page

**Completed so far in Phase 1A:**
- Daily Signals page (useSignals hook, ContractCard component, status filter)
- Dashboard page (market conditions, opportunity summary, top candidates, model health)
- Test suite (Vitest + RTL + MSW, 21 tests, 96% coverage, 80% threshold enforced)

**Next:** Build the Contract Detail page — a standalone page that explains one contract candidate deeply.

---

## Goal

A dedicated page at `/signals/:instrument` (or similar) that shows everything about one contract: economics, model probability vs. breakeven, edge calculation, reason codes, regime context, and recommendation (take / watch / pass).

This is the page where the system becomes interpretable. The Dashboard says "here are the candidates." Contract Detail says "here's why."

---

## What to build

The contract detail page doesn't exist yet. The closest thing is the `ContractCard` Info dialog, which shows strike/expiry/status only. This page goes much deeper.

**Sections:**
1. **Contract header** — instrument, strike, expiry, status/recommendation chip
2. **Economics panel** — cost, payout, breakeven probability, model probability, estimated edge
3. **Confidence & regime** — confidence tier chip, regime label, no-trade flag if applicable
4. **Reason codes** — why the model likes or dislikes this contract (list of labelled reasons)
5. **Recommendation** — Take / Watch / Pass with a one-line rationale

**What's needed:**
- Extend `ContractCard` type in `src/data/mockData.ts` with the new fields (or create a richer `ContractDetail` type in a new data file)
- Create `GET /api/signals/:instrument` MSW handler (or pass data via route state)
- Create `src/hooks/useContractDetail.ts`
- Create `src/pages/ContractDetail.tsx`
- Add route `/signals/:instrument` to the router
- Link from `ContractCard` (replace or augment the Info button)
- Add tests: `src/pages/ContractDetail.test.tsx`

---

## Open questions to resolve during brainstorming

- Route design: `/signals/:instrument` vs `/contracts/:id` — depends on whether contracts are uniquely identified by instrument+strike+expiry or a synthetic ID
- Navigation: does the Info button on `ContractCard` navigate to the page, or does it remain a dialog for quick-peek and a new "Detail" button links to the page?
- Data source: does `ContractDetail` get its data from a separate endpoint or is it derived from the signals list?

---

## Definition of Done

- [ ] Navigating to a contract detail URL renders the full detail page
- [ ] All 5 sections render with mock data
- [ ] Take/Watch/Pass recommendation is visible
- [ ] Linked from the Daily Signals page
- [ ] `useContractDetail` hook encapsulates fetch logic
- [ ] Tests cover rendering and navigation
- [ ] `npm run build` passes
- [ ] `npm test` passes
