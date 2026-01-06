# FateFlix Design Style Guide

This stylesheet provides a centralized view of the visual identity for the FateFlix project.

## 🎨 Color Palette

### Primary (Cosmic Orange)
The signature accent color used for branding, primary buttons, and cosmic highlights.

| Element | Tailwind Class | Hex Code |
| :--- | :--- | :--- |
| **Primary Accent** | `orange-500` | `#f97316` |
| **Soft Accent** | `orange-400` | `#fb923c` |
| **Light Tint** | `orange-200` | `#fed7aa` |
| **Glow / Shadow** | `rgba(249, 115, 22, 0.1)` | `rgba(249, 115, 22, 0.1)` |

### Foundations (The Void)
The deep background colors that provide the cinematic atmosphere.

| Element | Tailwind Class | Hex Code |
| :--- | :--- | :--- |
| **Base Background** | `zinc-950` | `#09090b` |
| **Card / Surface** | `zinc-900` | `#18181b` |
| **Border / Muted Surface**| `zinc-800` | `#27272a` |
| **Pure Void** | `black` | `#000000` |

### Secondary Accents
Used for selection states and specific visual indicators like the progress bar.

| Element | Tailwind Class | Hex Code |
| :--- | :--- | :--- |
| **Selection / Active** | `cyan-400` | `#22d3ee` |
| **Terminal / Slate** | `slate-50` | `#f8fafc` |

---

## 🔡 Typography

### Display & Retro
Used for the "Home Video" aesthetic in headers, labels, and badges.

- **Font Family**: `HomeVideo` (Local Asset)
- **Usage**: Question titles, badge identifiers, scanline text.
- **Weights**: `Regular` (400), `Bold` (700)

### UI & Content
The primary typeface for readability and survey interactions.

- **Font Family**: `Sans-serif` (Tailwind `font-sans`)
- **Usage**: Body text, paragraph content, instructions.
- **Weights**: `Extralight` (200), `Light` (300), `Medium` (500), `Bold` (700), `Black` (900)

---

## ✨ UI Patterns & Effects

### Cosmic Gradients
- **Header Text**: `bg-gradient-to-br from-white via-orange-200 to-orange-400`
- **Subtle Surface**: `bg-gradient-to-b from-transparent via-orange-500/5 to-transparent`

### Glassmorphism
- **Backdrop Blur**: `backdrop-blur-md` or `backdrop-blur-xl`
- **Border**: `border-white/5` (Subtle 5% white) or `border-orange-500/30`

### Interactive States
- **Hover**: `hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]`
- **Active / Selected**: `ring-1 ring-orange-500/20` with a subtle glow point.
