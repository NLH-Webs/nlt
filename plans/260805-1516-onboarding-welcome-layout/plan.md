---
title: "Fix onboarding welcome layout"
description: "Separate welcome copy from the envelope artwork so neither overlaps and the opening screen reads as one balanced cluster."
status: completed
priority: P2
effort: 1h
branch: feat/hr-onboarding
tags: [bugfix, frontend, onboarding]
created: 2026-08-05
---

# Fix onboarding welcome layout

## Goal

Fix only the unopened welcome state. Keep copy, artwork, click-to-open behavior, open-letter state, and route state unchanged.

## Findings

- `red-letter.png` is 847×1264 with a large transparent canvas; its visible envelope occupies only the middle. Absolute `w-full max-w-[700px]` sizing makes it a poor text background.
- Current copy is in the same centered layer as the artwork, so title/subtitle sit over the envelope.
- No onboarding-specific stylesheet exists. Current styling is Tailwind classes plus local inline brand colors.

## Phases

| # | Phase | Status | Effort | File |
|---|---|---|---|---|
| 1 | Recompose unopened welcome screen | Complete | 40m | [phase-01-welcome-layout.md](./phase-01-welcome-layout.md) |
| 2 | Validate responsive visual behavior | Complete | 20m | [phase-02-visual-validation.md](./phase-02-visual-validation.md) |

## Scope

- Modify: `D:\Projects\NhiLe Holding Workspace\NhiLe Team\nlt\nlt\src\components\onboarding\step-welcome.tsx`
- No new components, assets, dependencies, state, or CSS files.
- Preserve other existing worktree edits; this source file is already modified.

## Dependency

Phase 2 follows Phase 1. No API, auth, security, or data-model impact.

## Completion

- Phase 1: complete. Unopened screen recomposed around a semantic envelope button; copy, envelope, and CTA now have separate visual regions.
- Phase 2: complete. Production build, responsive visual inspection, console checks, interaction checks, and code review all passed; review findings resolved.

## Unresolved questions

- None.
