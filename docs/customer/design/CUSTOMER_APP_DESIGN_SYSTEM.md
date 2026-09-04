# GoRush Customer App Design System

## 1. Brand Tokens (Derived from Admin Panel)
The Customer App design language is built upon the same visual identity as the Admin Panel (`frontend/globals.css`), translating desktop analytics tokens into premium mobile UX.

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Brand Primary** | `#E85D04` | Primary CTAs (Book Ride, Confirm, Login) |
| **Brand Hover** | `#CC5204` | Active/Pressed states |
| **Charcoal** | `#222222` | Primary Text, Display Headers |
| **Charcoal Light**| `#333333` | Secondary buttons, Card Borders |
| **Background** | `#F8F9FA` | App Scaffold Background |
| **Surface** | `#FFFFFF` | Cards, Bottom Sheets, Inputs |

## 2. Typography Hierarchy (`gorush_typography.dart`)
We use **Inter** (or system fallback) to maintain the clean, technical feel of a modern mobility startup.

- **Display**: 32px, Bold, Charcoal (For major greetings "Where to?")
- **Heading**: 24px, Semi-Bold, Charcoal (For section titles)
- **Title**: 18px, Semi-Bold, Charcoal (For list items, driver names)
- **Body**: 14px, Regular, Charcoal (Standard text)
- **Label**: 12px, Semi-Bold, Secondary (Input labels, overlines)

## 3. UI Components (`lib/shared/`)
- **`GoRushButton`**: A tactile button with internal loading state support. Avoids raw `ElevatedButton` across the codebase.
- **`GoRushCard`**: Features a pristine white surface, subtle `#333333` border in light mode, and a soft shadow `rgba(0,0,0,0.04)` for elevation.
- **`GoRushTextField`**: Clean, accessible touch targets (min 48px height) with Charcoal borders that turn Brand Orange on focus.

## 4. Mobile UX Principles
- **No Full-Screen Blocking**: Bottom sheets are preferred for Search and Ride Selection, keeping the Map (the core utility) visible underneath.
- **Semantic Status**: Errors use `#EF4444`, Success uses `#10B981`. Red is never used for brand accents to avoid confusing a user in a panic/SOS situation.
