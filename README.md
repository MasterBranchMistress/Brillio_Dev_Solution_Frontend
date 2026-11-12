# Frontend Feature Development Playbook

## 1. Purpose

This playbook establishes a consistent workflow for implementing new frontend features.

The goal is to maintain:
- Reusable, modular components.
- Separation of presentation and business logic.
- Consistent API communication.
- Predictable state management.
- Type safety across the application.
- Clean, maintainable UI implementations.

### Technology Stack

| Technology | Responsibility |
|---|---|
| Next.js | Application framework |
| React | Component architecture and state |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | Reusable UI components |
| Spring Boot | Backend REST API |

---

## 2. Project Structure

Organize features by responsibility.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                   # shadcn components
│   ├── layout/               # Shared layout components
│   └── Listing/              # Feature-specific components
│       ├── ListingCard.tsx
│       ├── ListingFilters.tsx
│       └── ListingResults.tsx
│
├── lib/
│   ├── api.ts                # API communication
│   └── utils.ts              # Shared utilities
│
└── types/
    └── listing.ts            # Shared TypeScript interfaces
```

**Guidelines:**
- Keep feature-specific components together.
- Keep shared UI components in `components/ui`.
- Keep API communication outside presentation components.
- Define shared interfaces in `types`.
- Avoid placing unrelated functionality inside existing components.

---

## 3. Feature Development Workflow

### Step 1 — Understand the Requirement

Before writing code, identify:

1. What functionality is being introduced?
2. Which existing components are affected?
3. Does the feature require new API endpoints?
4. Does the backend response need additional fields?
5. Does the feature introduce new state or validation requirements?

Determine whether the feature is frontend-only or requires backend changes.

### Step 2 — Define the Data Contract

Define or update TypeScript interfaces before implementing the UI.

Example:

```typescript
export interface Listing {
  id: string;
  source: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

export interface ListingSearchParams {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  city?: string;
  keyword?: string;
  targetBudget?: number;
  page?: number;
  pageSize?: number;
}
```

**Guidelines:**
- Match backend DTOs and response structures.
- Use optional properties for optional query parameters.
- Avoid using `any`.
- Reuse existing interfaces when possible.
- Update types whenever the backend contract changes.

### Step 3 — Implement API Communication

Use the centralized API client in `lib/api.ts`.

Example:

```typescript
export async function getFeatureData(): Promise<FeatureResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/feature`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
```

**Guidelines:**
- Do not hardcode API URLs inside components.
- Use environment variables for API configuration.
- Define return types explicitly.
- Handle unsuccessful HTTP responses.
- Keep request construction and response parsing inside the API layer.

### Step 4 — Build Reusable Components

Create components based on their responsibility.

For example:

| Component | Responsibility |
|---|---|
| FeatureFilters | Collect user input |
| FeatureCard | Display an individual record |
| FeatureResults | Render a collection of records |
| FeaturePagination | Navigate result pages |

**Component guidelines:**
- Keep components focused on one responsibility.
- Use props to pass data and callbacks.
- Avoid duplicating UI logic.
- Use shadcn/ui components where appropriate.
- Prefer composition over oversized components.

Example:

```tsx
interface FeatureCardProps {
  item: Feature;
}

export default function FeatureCard({ item }: FeatureCardProps) {
  return (
    <Card>
      <CardContent>
        <h2>{item.name}</h2>
      </CardContent>
    </Card>
  );
}
```

### Step 5 — Manage Application State

Use React state and hooks according to the component's responsibility.

| Hook | Purpose |
|---|---|
| useState | Local component state |
| useEffect | Synchronize with external systems |
| useMemo | Cache expensive calculations |
| useCallback | Stabilize callback references |

**Guidelines:**
- Keep state as close as practical to where it is used.
- Lift state when multiple components need access.
- Avoid duplicating derived state.
- Keep API operations in the appropriate parent or feature-level data layer.
- Avoid unnecessary page reloads.

Example:

```tsx
const [results, setResults] = useState<FeatureResponse | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Step 6 — Respect Server and Client Components

Next.js uses Server Components by default.

Use `"use client"` when a component requires:
- React state or lifecycle hooks.
- Event handlers.
- Browser APIs.
- Interactive user input.

Example:

```tsx
"use client";

import { useState } from "react";

export default function Feature() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
```

**Important:**
- Do not pass ordinary function callbacks from Server Components to Client Components.
- Keep static content server-rendered when practical.
- Keep interactive functionality within client boundaries.
- Avoid converting the entire application to Client Components unnecessarily.

### Step 7 — Implement Loading and Error States

Every asynchronous feature should account for:

1. Initial loading.
2. Successful response.
3. Empty results.
4. Failed requests.
5. Subsequent requests.

Example:

```tsx
{loading && <Skeleton />}

{error && (
  <p className="text-destructive">{error}</p>
)}

{!loading && results?.content.length === 0 && (
  <p>No results found.</p>
)}
```

Use shadcn Skeleton components for loading placeholders where appropriate.

### Step 8 — Validate User Input

Validate inputs before submitting requests.

Consider:
- Required fields.
- Numeric boundaries.
- Invalid ranges.
- Empty strings.
- Invalid combinations of filters.

Frontend validation improves usability, but backend validation remains authoritative.

Do not rely on client-side validation for data integrity.

---

## 4. UI and Styling Guidelines

### Component Library

Prefer shadcn/ui components for common interface elements.

Examples:
- Button
- Input
- Select
- Card
- Badge
- Dialog
- Skeleton
- Separator

Avoid introducing additional UI libraries unless there is a clear requirement.

### Styling

Use Tailwind utility classes for layout and presentation.

Guidelines:
- Maintain consistent spacing.
- Use responsive grid layouts.
- Avoid excessive custom CSS.
- Use semantic HTML elements.
- Maintain readable typography.
- Ensure interactive elements have visible focus states.

### Accessibility

- Use labels for form inputs.
- Provide meaningful button text.
- Include appropriate image alt text.
- Support keyboard navigation.
- Use sufficient color contrast.
- Avoid communicating important information through color alone.

---

## 5. Testing and Verification

Before considering a feature complete, verify the following.

### Functional Testing

- [ ] Feature behaves as expected.
- [ ] API requests contain the correct parameters.
- [ ] Returned data is rendered correctly.
- [ ] Empty results are handled.
- [ ] Loading states are displayed.
- [ ] API errors are handled.
- [ ] User input is validated.
- [ ] Existing functionality remains intact.

### Responsive Testing

- [ ] Desktop layout.
- [ ] Tablet layout.
- [ ] Mobile layout.
- [ ] No unintended horizontal scrolling.
- [ ] Components remain usable at smaller widths.

### Code Quality

- [ ] No TypeScript errors.
- [ ] No unnecessary console errors.
- [ ] No duplicated functionality.
- [ ] Components have clear responsibilities.
- [ ] API logic remains centralized.
- [ ] No unused imports or variables.

Run the project's available checks:

```bash
npm run lint
npm run build
```

Run tests if the project has a configured test suite.

---

## 6. Feature Completion Checklist

A feature is considered complete when:

- [ ] Requirements are satisfied.
- [ ] TypeScript interfaces are updated.
- [ ] API integration is implemented when required.
- [ ] Components are reusable and properly organized.
- [ ] State management is appropriate.
- [ ] Loading, error, and empty states are implemented.
- [ ] Validation is handled.
- [ ] Responsive behavior is verified.
- [ ] Linting and build checks pass.
- [ ] Existing features remain functional.

---

## 7. General Development Principles

1. **Keep it modular.** Avoid building entire features inside a single component.
2. **Keep it typed.** Define interfaces rather than relying on implicit or loosely typed data.
3. **Separate responsibilities.** Presentation, state management, and API communication should have clear boundaries.
4. **Reuse before duplicating.** Extend existing components when their responsibilities align.
5. **Keep dependencies minimal.** Prefer existing project libraries.
6. **Build for change.** New requirements should not require rewriting unrelated components.
7. **Prioritize functionality.** Visual polish should support usability rather than distract from requirements.

The objective is not to create the most complicated frontend architecture. It is to create a frontend that is straightforward to understand, extend, test, and maintain.