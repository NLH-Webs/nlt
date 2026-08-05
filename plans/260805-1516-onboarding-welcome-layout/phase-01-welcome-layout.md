# Phase 1 — Recompose unopened welcome screen

## Overview

- Priority: P2
- Status: Complete
- Target: initial (`!isOpen`) branch only.

## Context

- [Welcome component](../../src/components/onboarding/step-welcome.tsx)
- Artwork: `public/onboarding/red-letter.png` (transparent 847×1264 canvas)
- Layout: `src/components/onboarding/onboarding-layout.tsx`

## Decision

Use normal document flow for copy, CTA, and artwork. Do not overlay the copy on `red-letter.png`; its empty canvas is part of the asset and cannot provide predictable composition across widths. This is the smallest reliable correction.

## Related files

| Action | File | Change |
|---|---|---|
| Modify | `D:\Projects\NhiLe Holding Workspace\NhiLe Team\nlt\nlt\src\components\onboarding\step-welcome.tsx` | Replace the absolute-artwork opening composition. |
| Create/Delete | None | No stylesheet or asset changes. |

## Implementation steps

1. Replace the initial-state outer wrapper with a centered, width-constrained vertical cluster, e.g. `w-full max-w-xl sm:max-w-2xl gap-4 sm:gap-5 py-6 sm:py-8`; retain `onClick={openLetter}` and `cursor-pointer`.
2. Put eyebrow, heading, and two-line invitation in their own normal-flow text group above the artwork. Constrain heading width (`max-w-2xl`) and keep `leading-tight`; preserve existing brand colors and font choice.
3. Keep the envelope as a separate normal-flow visual below the text, using a deliberately small rendered width (`w-48 sm:w-56 md:w-64`) and `h-auto`. Remove `absolute`, `inset-0`, `w-full`, and `max-w-[700px]` so its transparent canvas cannot collide with content.
4. Keep the CTA below the artwork. Stop propagation on its click so outer click handling does not double-invoke; keep button type and `openLetter` call unchanged.
5. Do not alter the open-letter branch, `goldButton`, `goldButtonStyle`, copy, assets, props, or `onNext` behavior.

## Todo

- [x] Reflow copy, envelope, and CTA into three normal-flow regions.
- [x] Retain keyboard-accessible CTA behavior and meaningful image alt text.
- [x] Keep all non-welcome onboarding code untouched.

## Completion notes

- Implemented as a keyboard-accessible envelope button with an explicit accessible label; no outer interactive container needed.
- Open-letter visual sizing/readability received small reviewed adjustments in the same component. No route, state, asset, prop, or `onNext` behavior change.

## Success criteria

- Heading/subheading never overlap visible envelope pixels at 375px, 768px, 1024px, or 1440px.
- The first screen has clear top-to-bottom order: welcome copy → envelope → CTA.
- Clicking background artwork/cluster and clicking CTA both open the letter once.
- No horizontal overflow; initial cluster remains comfortably inside layout scroll area.

## Risks and mitigations

- Transparent image whitespace can make a visual gap look too large. Tune only rendered width/gap after browser inspection; do not reintroduce absolute positioning.
- Outer click handler makes a non-semantic container interactive. Preserve the existing CTA as keyboard path; do not expand scope into interaction refactor.

## Security

No data, auth, or user-input changes.

## Next step

Phase 2 complete.
