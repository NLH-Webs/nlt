# Phase 1 — Define scoped font roles

## Scope

Priority: P2 | Status: completed | Effort: 30m

Create one scoped onboarding typography contract. Do not edit individual onboarding step components solely to repeat font declarations.

## Files

| File | Action | Change |
|---|---|---|
| `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/index.html` | Modify | Align the Google Fonts request exactly to reference weights: Be Vietnam Pro 400/500/600/700; Playfair Display 700 normal/italic; Dancing Script 500/700. Keep `display=swap` and preconnects. |
| `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/index.css` | Modify | Add reusable, onboarding-scoped font-role selectors: Be Vietnam Pro default; Playfair Display for `h1`–`h3`; no global heading override. |
| `D:/Projects/NhiLe Holding Workspace/NhiLe Team/nlt/nlt/src/components/onboarding/onboarding-layout.tsx` | Modify | Add the stable scope class to the outer onboarding wrapper; retain its existing body font fallback. |

## Implementation steps

1. Replace the broad Google Fonts URL with the reference URL/weight matrix. Do not add a second stylesheet link.
2. Add selectors scoped below the layout class so all step states, modals, and terminal screen inherit the intended roles.
3. Give the welcome letter its dedicated Dancing Script role; its salutation and body remain handwritten despite the heading selector.
4. Do not modify existing component content, Tailwind sizing, colors, or interaction state.

## Acceptance criteria

- Every onboarding paragraph, form control, button, label, stepper label, and card body resolves to Be Vietnam Pro.
- Every onboarding `h1`, `h2`, `h3` resolves to Playfair Display, unless an explicit Dancing Script inline style is present.
- Handwritten welcome letter salutation and body resolve to Dancing Script.
- Non-onboarding screens retain existing typography.

## Risks / mitigation

- CSS selector could accidentally change other screens: require an onboarding-only wrapper selector.
- Existing concurrent edits may touch the wrapper: merge the single class addition into current code; never overwrite surrounding changes.

## Security

No data/auth impact. Fonts use the existing Google Fonts provider only.

## Todo

- [x] Align font request.
- [x] Add scoped role selectors.
- [x] Add scope class without disturbing active onboarding work.
