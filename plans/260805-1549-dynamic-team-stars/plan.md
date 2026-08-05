---
title: "Derive onboarding team stars from quiz scores"
description: "Remove fixed quiz recommendations so map stars only reflect the respondent's answers."
status: completed
priority: P2
effort: 1h
branch: feat/hr-onboarding
tags: [bugfix, frontend, onboarding]
created: 2026-08-05
---

# Dynamic onboarding team stars

## Outcome

The mock discovery quiz remains score-based. Before quiz completion, after reset, and when no option yields a score, no team is marked compatible. After completion, only highest-scoring compatible teams are marked, capped at three as today.

## Scope

- Remove the fixed `quizRecommendedTeamIds` default/fallback.
- Keep the current option `teamIds` scoring model, team map labels, decision cards, and navigation unchanged.
- No backend, persistence, quiz-content, or visual redesign work.

## Phases

| # | Phase | Status | Effort | Link |
|---|---|---|---|---|
| 1 | Use only score-derived recommendations | Complete | 30m | [phase-01](./phase-01-score-derived-recommendations.md) |
| 2 | Verify recommendation state transitions | Complete | 30m | [phase-02](./phase-02-verify-quiz-recommendations.md) |

## Decision

Use `[]` as the sole neutral state. It avoids misleading stars and lets the existing `TeamMap` and decision view naturally render nothing until real quiz answers produce ranked team IDs.

## Dependencies

- Existing `QuizOption.teamIds` entries must remain valid `OnboardingTeam.id` values.
- No task hydration: two phases, below the three-phase threshold.

## Unresolved questions

- None.
