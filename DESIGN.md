# Design Brief

**Aesthetic**: Brutalist minimalism—stark greyscale only, sharp geometric forms, typographic hierarchy over decoration.

## Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| background | 1.0 0 0 (white) | 0.08 0 0 (near-black) | Page background |
| foreground | 0.1 0 0 (black) | 0.96 0 0 (white) | Body text |
| card | 0.98 0 0 (off-white) | 0.12 0 0 (dark grey) | Card surfaces |
| primary | 0.1 0 0 (black) | 0.92 0 0 (light grey) | CTA buttons |
| secondary | 0.5 0 0 (mid-grey) | 0.45 0 0 (mid-grey) | Secondary actions |
| muted | 0.85 0 0 (light grey) | 0.25 0 0 (dark grey) | Disabled, placeholder |
| border | 0.88 0 0 (soft grey) | 0.22 0 0 (hard grey) | Lines, dividers |
| destructive | 0.55 0.22 25 (muted red) | 0.65 0.19 22 | Error/reject states |

## Typography

| Layer | Font | Size | Use |
|-------|------|------|-----|
| display | Instrument Serif Italic | 3xl | Page titles, emphasis |
| body | DM Sans | 16px | Body copy, form labels |
| mono | Geist Mono | 12px | Code, technical content |

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | `bg-card` + `border-b` thin grey | Navigation, logo, clear separation |
| Content | `bg-background` | Main form/content area |
| Cards | `bg-card` + 1px grey border, no radius | Paper listings, form sections |
| Footer | `bg-muted/10` + `border-t` | Subtle baseline, reduced visual weight |

## Patterns

- **Forms**: Boxed layout with sharp corners, 1px borders, light grey backgrounds for inputs
- **Buttons**: Black (primary) / grey (secondary), 1px borders, no border-radius
- **Cards**: White/light grey background, 1px grey border, zero padding rhythm
- **Hierarchy**: Size + serif italic for titles; weights via DM Sans body variations

## Motion

- **Transitions**: Smooth 0.3s cubic-bezier on hover/focus (opacity, not transform)
- **Constraint**: No animations; speed via typography and space

## Constraints

- **Color**: Pure greyscale—no hues, no accent colors
- **Radius**: 0px (sharp edges only)
- **Shadows**: None (flat, bordered design)
- **Decoration**: Typography and white space carry the design
