## Code Review Summary

### Scope

- File: `src/components/onboarding/onboarding-stepper.tsx`
- Focus: fixed six-track stepper layout only.
- Scout: six `grid-cols-6` tracks are shrinkable; absolute connectors do not add row width. At 320px, tracks remain wider than the 28px markers.

### Overall Assessment

Approved for the stated no-horizontal-scroll requirement. No must-fix issues found.

### Accessibility

- Each marker retains a computed accessible name and active state retains `aria-current="step"`.
- Future steps remain native disabled buttons; reached steps retain click/keyboard operation.
- Decorative connectors are hidden from the accessibility tree.

### Verification

- `npm run build`: passed.

### Unresolved Questions

None.
