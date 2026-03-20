# AGENTS.md — Architecture & Code Quality Rules

This file defines the mandatory rules and patterns every AI agent (and developer) must follow when working on this project. These rules enforce clean architecture, consistency, and production-grade quality across the codebase.

---

## Tech Stack

- **React Native** 0.84.1 · **TypeScript** 5.x
- **State**: Redux Toolkit + React Context (auth)
- **Navigation**: React Navigation (native-stack + bottom-tabs)
- **Forms**: react-hook-form + Zod
- **Storage**: react-native-mmkv (non-sensitive) + react-native-keychain (sensitive)
- **Networking**: Axios + @react-native-community/netinfo
- **i18n**: i18next + react-i18next
- **Logging**: react-native-logs
- **Sync**: SyncQueue + SyncManager + react-native-background-fetch

---

## 1. Feature-Based Architecture

**All new features must live inside `src/features/<feature-name>/`.**

Each feature folder follows this structure:

```
src/features/<feature-name>/
  api/          → API calls (Axios)
  components/   → Feature-specific UI components
  screens/      → Screen components registered in navigation
  slice/        → Redux slice (state + thunks)
  sync/         → Offline sync service for this feature
  types.ts      → Feature-specific interfaces and types
```

**References:**
- `src/features/auth/` — authentication feature (full example)
- `src/features/jobs/` — jobs feature (offline-first example)

> Do NOT place feature logic in `src/screens/`, `src/core/`, or `src/components/` unless it is genuinely reusable across multiple features.

---

## 2. Reusable Components

**Reusable, cross-feature UI components go in `src/components/`.**

Before creating a new component, check if something similar already exists:
- `src/components/common/Spacer.tsx` — spacing between elements
- `src/components/loader/LoadingOverlay.tsx` — full-screen loading modal
- `src/components/dialogs/` — all dialog/alert UIs

When a component is used by more than one feature, extract it to `src/components/`.
Feature-specific components stay inside `src/features/<feature>/components/`.

---

## 3. Dialogs — Never Use `Alert.alert()`

**Always use the dialog system from `src/components/dialogs/` instead of native `Alert.alert()`.**

Available dialog components:
- `src/components/dialogs/AlertDialog.tsx` — imperative singleton (use `AlertDialogManager`)
- `src/components/dialogs/CustomDialog.tsx` — composable dialog wrapper
- `src/components/dialogs/dialog-UIs/SuccessDialogUI.tsx` — success state UI
- `src/components/dialogs/dialog-UIs/WarningDialogUI.tsx` — warning state UI
- `src/components/dialogs/dialog-UIs/ErrorDialogUI.tsx` — error state UI

```tsx
// WRONG
Alert.alert('Error', 'Something went wrong');

// CORRECT — use CustomDialog + ErrorDialogUI or AlertDialogManager
```

---

## 4. Loading States — Use `LoadingOverlay`

**Always use `LoadingOverlay` for async loading states. Never use inline spinners inside screen-level containers unless it is a partial/section loader.**

```tsx
import LoadingOverlay from 'src/components/loader/LoadingOverlay';

// In your screen:
<LoadingOverlay isVisible={isLoading} />
```

File: `src/components/loader/LoadingOverlay.tsx`

---

## 5. Theming — No Hardcoded Colors or Repeated Styles

**Every color value must come from the theme. No hex codes, no `'red'`, no `'#fff'` inline.**

```tsx
// WRONG
style={{ backgroundColor: '#FFFFFF', color: '#333' }}

// CORRECT
const { colors } = useAppTheme();
style={{ backgroundColor: colors.primaryBackground, color: colors.primaryText }}
```

**Before writing a new `StyleSheet` rule, check `src/core/theme/useGlobalStyles.ts` first.**
If a matching style already exists (e.g., `globalText14`, `mainPaddingH`, `fullFlex`, `errorText`), reuse it — do not redefine it.

```tsx
const globalStyles = useGlobalStyles();
// Then use: globalStyles.globalText14, globalStyles.mainPaddingH, etc.
```

**References:**
- `src/core/theme/ThemeContext.tsx` — `useAppTheme()` hook, light/dark color tokens
- `src/core/theme/ColorPalettes.ts` — base color palette
- `src/core/theme/useGlobalStyles.ts` — shared StyleSheet rules
- `src/core/theme/ThemeConfiguration.ts` — font family (`ThemeConfiguration.fontFamily`), status bar helper

---

## 6. Localization — No Hardcoded Strings

**Every user-visible string must be translated via `useTypedTranslation`. Never hardcode display text.**

```tsx
// WRONG
<Text>Welcome back</Text>

// CORRECT
const { t } = useTypedTranslation();
<Text>{t('auth.welcomeBack')}</Text>
```

**Adding new strings:**
1. Add the key+value to the appropriate JSON file under `src/core/localization/translations/en/<namespace>/`
   - `common.json` — general UI labels (buttons, shared terms)
   - `auth.json` — authentication screens
   - `errors.json` — error messages
   - `settings.json` — settings screen
   - `validation.json` — form validation messages
2. If adding a new namespace, register it in `src/core/localization/translations/en/translation.ts`
3. TypeScript will automatically pick up the new keys via `KeyType` in `useTypedTranslation.ts`

**References:**
- `src/core/localization/useTypedTranslation.ts` — typed `t()` hook
- `src/core/localization/i18n.ts` — i18next initialization
- `src/core/localization/i18nUtils.ts` — language switching utilities

---

## 7. Logging — Never Use `console.log`

**Always use the project logger. Never use `console.log`, `console.warn`, or `console.error`.**

```tsx
// WRONG
console.log('User data:', user);
console.error('Failed:', error);

// CORRECT
import { logger } from 'src/core/logger/Logger';

logger.debug('User data:', user);
logger.info('[AuthContext] Session restored');
logger.warn('[SyncManager] No handler for entity:', entity);
logger.error('[AuthContext] Failed to restore session', error);
```

The logger respects the `__DEV__` flag and `EnvironmentConfig.enableLogs`. Logs are suppressed in production unless explicitly enabled.

File: `src/core/logger/Logger.ts`

---

## 8. Navigation

**Always use typed navigation. Never pass raw string route names without type coverage.**

```tsx
// Typed screen props
import { HomeScreenProps } from 'src/core/navigation/NavigationPropTypes';

const HomeScreen = ({ navigation }: HomeScreenProps) => { ... };

// Navigation helpers (preferred over inline navigation calls)
import { AppNavigationUtils } from 'src/core/navigation/AppNavigationUtils';
AppNavigationUtils.goToHome(navigation);

// Non-component navigation (from services, redux thunks, etc.)
import * as NavigationRef from 'src/core/navigation/NavigationRef';
NavigationRef.navigate('LoginScreen');
```

**Adding a new screen:**
1. Add the route name and params to `RootStackParamList` in `src/core/navigation/NavigationPropTypes.ts`
2. Register the screen in `src/core/navigation/AppNavigationRoutes.tsx` (or `tabs/BottomTabRoutes.tsx` for tab screens)
3. Add a navigation helper in `src/core/navigation/AppNavigationUtils.ts` if it will be navigated to from multiple places

**References:**
- `src/core/navigation/NavigationPropTypes.ts` — route param types
- `src/core/navigation/AppNavigationUtils.ts` — navigation helpers
- `src/core/navigation/NavigationRef.ts` — imperative navigation ref
- `src/core/navigation/AppNavigationRoutes.tsx` — root navigator setup
- `src/core/navigation/tabs/BottomTabRoutes.tsx` — tab navigator

---

## 9. API Layer

**Each feature owns its API module. All HTTP calls go through `axiosInstance`.**

```
src/features/<feature>/api/<feature>Api.ts
```

```tsx
// Pattern from src/features/jobs/api/jobsApi.ts
import axiosInstance from 'src/core/api/axiosInstance';

export const jobsApi = {
  fetchJobs: async (): Promise<Job[]> => {
    const { data } = await axiosInstance.get<Job[]>('/jobs');
    return data;
  },
  createJob: async (payload: CreateJobPayload): Promise<Job> => {
    const { data } = await axiosInstance.post<Job>('/jobs', payload);
    return data;
  },
};
```

- Never use `fetch()` directly — always `axiosInstance`
- Token refresh and auth interceptors are handled in `src/core/api/interceptors.ts` — do not duplicate this logic
- API functions return typed responses; use the feature's `types.ts` for request/response interfaces

---

## 10. State Management (Redux)

**Rule: feature-specific state stays in the feature folder; global/shared state goes in `src/core/redux/`.**

```
src/features/<feature>/slice/<feature>Slice.ts   ← feature state
src/core/redux/<SliceName>.ts                    ← global/shared state
```

**Adding a new feature slice:**
1. Create `src/features/<feature>/slice/<feature>Slice.ts`
2. Export the reducer as default, export actions and thunks as named exports
3. Register the reducer in `src/core/redux/store.ts`
4. Add the state type to the `RootState` interface in `src/core/redux/store.ts`

```tsx
// Always type dispatch and state
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/core/redux/store';

const dispatch = useDispatch<AppDispatch>();
const items = useSelector((state: RootState) => state.jobs.items);
```

**References:**
- `src/core/redux/store.ts` — store config, `RootState`, `AppDispatch`
- `src/features/auth/slice/authSlice.ts` — auth slice example
- `src/features/jobs/slice/jobsSlice.ts` — offline-first slice with sync integration

---

## 11. Storage

**Use `StorageService` as the single entry point for all local persistence.**

```tsx
import { StorageService } from 'src/core/storage/StorageService';

// Non-sensitive data (MMKV)
StorageService.setString('key', 'value');
StorageService.getObject<MyType>('key');
StorageService.remove('key');

// Sensitive data (Keychain)
await StorageService.setSecure('username', 'secret');
const creds = await StorageService.getSecure();
await StorageService.clearSecure();
```

- **MMKV** (`src/core/storage/MMKVStorage.ts`) — fast, synchronous, for non-sensitive data
- **Keychain** (`src/core/storage/KeychainService.ts`) — secure enclave, for tokens and credentials
- Feature-specific storage wrappers follow the pattern of `AppThemeStorageService` and `AppLanguageStorageService`

**References:**
- `src/core/storage/StorageService.ts` — unified storage API
- `src/core/storage/MMKVStorage.ts` — MMKV wrapper
- `src/core/storage/KeychainService.ts` — keychain wrapper
- `src/core/storage/AppThemeStorageService.ts` — example domain storage service
- `src/core/storage/AppLanguageStorageService.ts` — example domain storage service

---

## 12. Network Status

**Always check network status before performing network-dependent operations.**

```tsx
// In components/hooks:
import { useNetworkStatus } from 'src/core/network/useNetworkStatus';
const isOnline = useNetworkStatus();

// In services/thunks:
import { NetworkService } from 'src/core/network/NetworkService';
if (!NetworkService.isOnline()) {
  // queue for later sync or show offline message
  return;
}
```

**References:**
- `src/core/network/NetworkService.ts` — singleton service with listener support
- `src/core/network/useNetworkStatus.ts` — React hook for components

---

## 13. Offline Sync

**All offline-first operations must use the SyncQueue + SyncManager system.**

```tsx
import { SyncQueue } from 'src/core/sync/SyncQueue';
import { SyncManager } from 'src/core/sync/SyncManager';

// Enqueue an operation when offline or for optimistic updates
SyncQueue.enqueue({
  entity: 'jobs',
  operation: 'create',
  payload: newJobData,
});

// Register a handler for your entity (do this at app startup or feature init)
SyncManager.register('jobs', async (item) => {
  await jobsApi.createJob(item.payload);
});
```

**Feature sync services** go in `src/features/<feature>/sync/<feature>SyncService.ts`.
See `src/features/jobs/sync/jobsSyncService.ts` as a reference implementation.

Background sync is automatically triggered via `src/core/sync/BackgroundSync.ts` (15-minute intervals). Do not create custom background task registrations — extend the existing system.

**References:**
- `src/core/sync/SyncQueue.ts` — queue with retry logic (max 3 retries, exponential backoff)
- `src/core/sync/SyncManager.ts` — orchestrates sync handlers
- `src/core/sync/BackgroundSync.ts` — background fetch integration
- `src/features/jobs/sync/jobsSyncService.ts` — reference implementation

---

## 14. Models

**General interfaces and enums go in `src/models/`. Feature-specific types stay in the feature.**

```
src/models/interfaces/   → Shared interfaces used across features
src/models/enums/        → Shared enums (ScriptDirectionType, FileExtensionType, etc.)

src/features/<feature>/types.ts   → Types used only within that feature
```

Do not place feature-specific types in `src/models/`.

---

## 15. Utilities

**Always check existing utility files before writing new helper functions.**

| File | Purpose |
|------|---------|
| `src/utils/ValidationUtils.ts` | Zod schemas, field validators (email, phone, password, URL) |
| `src/utils/StringUtils.ts` | String manipulation (capitalize, format arrays, HTML parsing) |
| `src/utils/DateTimeUtils.ts` | Date formatting and parsing |
| `src/utils/NumberUtils.ts` | Number formatting and parsing |
| `src/utils/AppUtils.ts` | General helpers (`delay()`, `removeKey()`) |
| `src/utils/GlobalUtils.ts` | Global state (language code) |
| `src/utils/RegExUtils.ts` | Shared regex patterns |
| `src/utils/ImageUtils.ts` | Image picking and handling |
| `src/utils/FilesManageUtils.ts` | File operations |
| `src/utils/PermissionsUtils.ts` | Runtime permission requests |
| `src/utils/AlertUtils.ts` | Alert/toast helpers |
| `src/utils/ToastUtils.ts` | Toast notifications |

If you need a new utility, add it to the most relevant existing file. Only create a new utility file if the concern is entirely new and doesn't fit any existing category.

**Validation schemas must use `ValidationUtils` with i18n messages — never raw Zod with hardcoded English error strings.**

---

## 16. Forms

**Use `react-hook-form` with `Controller` for all forms. Validate with Zod schemas from `ValidationUtils`.**

```tsx
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { ValidationUtils } from 'src/utils/ValidationUtils';

const schema = z.object({
  email: ValidationUtils.emailField(),
  password: ValidationUtils.passwordField(),
});

type FormValues = z.infer<typeof schema>;
```

See `src/features/auth/components/LoginForm.tsx` for the full pattern.

---

## 17. Post-Implementation Checklist

After implementing any feature or change, **always** run:

```bash
npm run lint
```

Fix **all** lint errors before considering the work complete. Do not suppress lint rules unless there is a documented, unavoidable reason.

Additional checks:
- No `console.log` calls — use `logger`
- No hardcoded strings — use `t()` from `useTypedTranslation`
- No hardcoded colors — use `colors` from `useAppTheme()`
- No duplicate styles — check `useGlobalStyles` first
- No `Alert.alert()` — use dialog components
- All new Redux reducers registered in `store.ts`
- All new screens registered in navigation
- All new translation keys added to the correct JSON file

---

## Quick Reference — Import Paths

```tsx
// Theme
import { useAppTheme } from 'src/core/theme/ThemeContext';
import useGlobalStyles from 'src/core/theme/useGlobalStyles';
import { ThemeConfiguration } from 'src/core/theme/ThemeConfiguration';

// Localization
import { useTypedTranslation } from 'src/core/localization/useTypedTranslation';

// Logger
import { logger } from 'src/core/logger/Logger';

// Navigation
import { AppNavigationUtils } from 'src/core/navigation/AppNavigationUtils';
import * as NavigationRef from 'src/core/navigation/NavigationRef';

// Storage
import { StorageService } from 'src/core/storage/StorageService';

// Network
import { NetworkService } from 'src/core/network/NetworkService';
import { useNetworkStatus } from 'src/core/network/useNetworkStatus';

// Sync
import { SyncQueue } from 'src/core/sync/SyncQueue';
import { SyncManager } from 'src/core/sync/SyncManager';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/core/redux/store';

// Dialogs & Loader
import LoadingOverlay from 'src/components/loader/LoadingOverlay';
import CustomDialog from 'src/components/dialogs/CustomDialog';

// Utilities
import { ValidationUtils } from 'src/utils/ValidationUtils';
import { StringUtils } from 'src/utils/StringUtils';
import { AppUtils } from 'src/utils/AppUtils';
```
