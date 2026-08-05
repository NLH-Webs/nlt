---
title: "Fit the onboarding stepper on every viewport"
description: "Remove horizontal scrolling from the six-step onboarding header while preserving accessible step context."
status: completed
priority: P2
effort: 30m
branch: feat/hr-onboarding
tags: [bugfix, frontend, accessibility]
created: 2026-08-05
---

# Fixed Onboarding Stepper Plan

## Outcome

The `/onboarding` header always renders all six steps within the viewport. It must not horizontally scroll or respond to horizontal swipe. Narrow viewports show compact numbered markers; labels remain visible from the existing `sm` breakpoint upward.

## Findings

- Target: `D:\Projects\NhiLe Holding Workspace\NhiLe Team\nlt\nlt\src\components\onboarding\onboarding-stepper.tsx`.
- Current header row uses `overflow-x-auto`, enabling the unwanted scroll/swipe.
- Step labels already use `hidden sm:inline`; each button has an `aria-label`, and the active step has `aria-current="step"`.
- Only presentational Tailwind classes need change. No state, route, step data, dependency, or new component required.

## Chosen Design

Replace the scrollable flex row with a fixed, six-track layout. Every track may shrink (`min-w-0`); its marker stays fixed-size. Use a connector that consumes only available space between markers (or is positioned within its track), never a fixed row width that forces overflow.

Keep the current breakpoint behavior: on widths below `sm`, hide visible labels but retain the button's computed `aria-label`, marker number/check, disabled state, click behavior, and `aria-current`.

## Implementation

1. In `src/components/onboarding/onboarding-stepper.tsx`, remove `overflow-x-auto` and any row child sizing/spacing that creates a minimum content width.
2. Make the inner header layout exactly six equal shrinkable tracks (`grid-cols-6` or equivalent `flex-1 min-w-0` pattern); center each step marker in its track.
3. Render connecting lines without contributing fixed horizontal width beyond their track. Preserve the current completed/active gradient and omit the connector after step six.
4. Keep labels visually hidden below `sm`; ensure the numeric/check marker stays visible at every breakpoint and labels remain exposed through the existing accessible button name.
5. Preserve current interaction rules: only reached steps are enabled; enabled steps invoke `onStepClick`; the current step exposes `aria-current="step"`.

## Acceptance Criteria

- At desktop, tablet, and narrow mobile widths, all six step markers are visible simultaneously; header/container has no horizontal overflow.
- Horizontal swipe over the header does not move it or reveal additional content.
- Below `sm`, no visible step labels; six ordered markers remain visible and legible.
- At `sm` and above, labels display without reintroducing overflow.
- Keyboard focus/click behavior, disabled future steps, `aria-label`, and `aria-current` remain unchanged.
- `npm run build` passes after implementation. Perform manual responsive checks at 320px, 375px, 768px, and desktop width.

## Scope

| File | Action | Reason |
|---|---|---|
| `D:\Projects\NhiLe Holding Workspace\NhiLe Team\nlt\nlt\src\components\onboarding\onboarding-stepper.tsx` | Modify | Remove scroll affordance; use shrinkable six-step layout. |

No files created/deleted. No data, behavior, or breakpoint policy changes outside the header.

## Completion Record

- [x] Header now uses six equal, shrinkable grid tracks (`grid-cols-6` + `min-w-0`).
- [x] Horizontal scrolling removed; header uses `overflow-hidden`.
- [x] Connectors are absolutely positioned inside available track space; no connector after step six.
- [x] Existing compact-label, accessible-name, current-step, disabled-step, and click behavior retained.
- [x] Quality gates passed: build, lint, code review.

## Risks and Guards

- Connectors can cause overflow if fixed-width: constrain them to their grid/flex track, not fixed `w-*` spacing.
- Icon/label removal could weaken accessibility: keep the current full `aria-label` and active-step `aria-current`.
- Very narrow screens can clip markers if tracks lack `min-w-0`: apply it at the track level and keep markers `shrink-0`.

## Unresolved Questions

None.
