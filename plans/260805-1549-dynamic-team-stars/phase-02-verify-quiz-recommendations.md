# Phase 2 — Verify quiz recommendation transitions

## Overview

- Priority: P2
- Status: Complete
- Effort: 30m

Confirm the changed state flow in the browser and build output. The repository currently exposes no test script, so use focused manual checks plus the normal production build.

## Related files

- Verify: `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/components/onboarding/step-team-discovery.tsx`
- Verify: `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/components/onboarding/team-map.tsx`
- Verify: `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/pages/onboarding.tsx`

## Verification steps

1. Run `npm run build` to catch TypeScript/import errors after deleting the constant.
2. Start the onboarding flow and inspect the map before quiz completion or after reset: no `Team phù hợp` badge.
3. Complete the quiz with a known answer set; calculate expected counts from those selected options and confirm badges and decision cards match only top-scoring teams.
4. Repeat with a tie-producing answer set; confirm all tied leaders appear, capped at three, and nonleaders are unstarred.
5. Verify registered-team checkmarks still take precedence over the compatibility badge, as already implemented.

## Acceptance criteria

- [x] `npm run build` passes.
- [x] Manual cases match score-derived IDs only.
- [x] Existing map selection, registration, and navigation remain functional.

## Unresolved questions

- None.
