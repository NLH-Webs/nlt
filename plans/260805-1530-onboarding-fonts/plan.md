---
title: "Match onboarding typography to HR reference"
description: "Apply the reference font families and weights consistently across the onboarding flow."
status: completed
priority: P2
effort: 1h
branch: feat/hr-onboarding
tags: [frontend, onboarding, typography]
created: 2026-08-05
---

# Onboarding Font Parity Plan

## Outcome

Match `https://hr-app-nlt.vercel.app/`: Be Vietnam Pro for UI/body/buttons, Playfair Display for all headings, Dancing Script only for handwritten welcome/letter text.

## Findings

- Reference loads: Be Vietnam Pro 400/500/600/700, Playfair Display 700 (normal/italic), Dancing Script 500/700.
- Google Fonts request now loads only Be Vietnam Pro 400/500/600/700, Playfair Display 700 normal/italic, and Dancing Script 500/700.
- `.onboarding-flow` scopes Be Vietnam Pro defaults and Playfair Display heading roles; `.onboarding-letter` preserves the handwritten letter role.
- Build/type-check, rendered desktop/mobile checks, and code review passed.

## Phases

| # | Phase | Status | Effort | File |
|---|---|---|---:|---|
| 1 | Define reference font assets and scoped roles | Complete | 30m | [phase-01](./phase-01-define-scoped-font-roles.md) |
| 2 | Verify rendered flow | Complete | 30m | [phase-02](./phase-02-verify-rendered-typography.md) |

## Verification

- Build/type-check: passed.
- Desktop/mobile onboarding flow, computed typography, and font loading checks: passed.
- Code review: passed; no unresolved findings.

## Non-goals

- No copy, color, layout, animation, or component-behavior changes.
- No new font package, local font files, or global typography redesign.

## Unresolved questions

- None.
