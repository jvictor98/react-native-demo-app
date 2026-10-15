# React Native Demo App

A cross-platform (Android and iOS) mobile app built with **React Native**, **Expo** and **TypeScript**, showing a complete authentication flow, a data dashboard and a settings page.

## Features

- **Login** with email/password validation, loading and error states, and a persisted session (the user stays signed in between launches)
- **Protected routes**: authenticated screens are only reachable after sign-in
- **Dashboard** with KPI cards, a weekly bar chart and a recent activity list, plus pull-to-refresh and a retry state on errors
- **Settings** with dark mode, notifications and language (English/Portuguese), all persisted on the device
- **Dark and light themes**, following the system by default
- Accessibility labels and roles on interactive elements, responsive layout for phones and tablets

## Tech stack

- React Native 0.86 + Expo SDK 57
- TypeScript (strict mode)
- Expo Router (file-based navigation, tabs and protected routes)
- React Context for auth and settings state
- AsyncStorage for local persistence
- ESLint (`eslint-config-expo`)

## Project structure

```
src/
  app/                  # Screens (Expo Router)
    _layout.tsx         # Providers, splash handling and auth guard
    sign-in.tsx         # Login screen
    (app)/              # Authenticated area with bottom tabs
      _layout.tsx
      index.tsx         # Dashboard
      settings.tsx      # Settings
  components/           # Reusable UI: Button, TextField, Card, StatCard, BarChart, SettingRow
  context/              # AuthContext and SettingsContext
  data/api.ts           # Mock API with simulated latency
  i18n/strings.ts       # Translations (en, pt)
  theme/colors.ts       # Light and dark themes
```

## Getting started

```bash
npm install
npx expo start
```

Then scan the QR code with **Expo Go** on your phone, or press `i` (iOS simulator) or `a` (Android emulator).

Demo credentials: `admin@demo.com` / `123456`

## Scripts

```bash
npm start          # start the dev server
npm run typecheck  # TypeScript check
npx expo lint      # lint
```

## Next steps

The API layer in `src/data/api.ts` is mocked. Replacing those functions with real `fetch` calls is all that's needed to connect a backend.
