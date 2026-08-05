# Phase 1 — Use only score-derived recommendations

## Overview

- Priority: P2
- Status: Complete
- Effort: 30m

Remove every fixed default/fallback that can mark a team as compatible without a respondent selection.

## Related files

- Modify: `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/components/onboarding/data/onboarding-fake-data.ts` — delete the hard-coded recommendation constant.
- Modify: `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/components/onboarding/step-team-discovery.tsx` — make the scorer return only IDs with the maximum positive score; return `[]` for empty/no-score input.
- Modify: `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/pages/onboarding.tsx` — initialize and reset `recommendedTeamIds` to `[]`, not preset teams.

## Implementation steps

1. Remove `quizRecommendedTeamIds` from fake onboarding data and its imports.
2. Retain the existing reduction over `option.teamIds`, descending score sort, top-score tie selection, and three-team cap.
3. Replace the scorer fallback with an empty array. Do not substitute arbitrary teams when no positive score exists.
4. Set page-level recommendation state to `[]` initially and in `resetToViewerState`.
5. Leave `StepTeamDecision` and `TeamMap` props unchanged; they already derive their UI from `recommendedTeamIds` and naturally handle an empty list.

## Acceptance criteria

- [x] No fixed recommended-team ID list remains in onboarding quiz code.
- [x] Before a completed quiz, no map team carries the compatible-team badge.
- [x] Quiz completion marks only highest-scoring team IDs from selected options.
- [x] Equal highest scores remain supported; result contains no more than three IDs.
- [x] Reset/viewer flow clears compatible-team badges.

## Risk and mitigation

- Risk: an option contains no `teamIds`; mitigation: keep optional chaining and return `[]` if all selections lack scores.
- Risk: stale recommendations after navigation; mitigation: keep the existing callback as the only write after quiz completion and explicitly clear page state on reset.

## Security/performance

No new data or external I/O. Computation is linear in selected option mappings and trivial for this mock quiz.

## Unresolved questions

- None.
