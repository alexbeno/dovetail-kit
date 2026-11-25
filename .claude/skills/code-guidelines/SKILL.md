---
name: code-guidelines
description: Mandatory code standards for all TypeScript/React code in this project. Use every time you write, edit, review or refactor TypeScript/React code, not only when the request mentions conditionals or specific patterns.
user-invocable: false
paths: ["src/**", "html/**", ".storybook/**"]
---

# Code standards

Apply these rules always, even when the code would be shorter without them.

## Enforced by ESLint

The hook reports these on every edit. Fix the code, never disable the rule.

| Rule                                                 | ESLint rule                  |
| ---------------------------------------------------- | ---------------------------- |
| Every `if` uses curly braces, no one-liner           | `curly`                      |
| `function name() {}`, not `const name = () => {}`    | `func-style`                 |
| No nested ternaries                                  | `no-nested-ternary`          |
| Conditional rendering with a ternary, never `&&`     | `react/jsx-no-leaked-render` |
| Named exports only (except stories and config files) | `no-restricted-exports`      |
| `kebab-case` files and folders                       | `check-file/*`               |
| No `console.log` left behind                         | `no-console`                 |
| No `any`, no `@ts-ignore`                            | `@typescript-eslint/*`       |
| Import direction between `components/ui/` and `lib/` | `boundaries/dependencies`    |

```tsx
// ❌ {items.length && <List items={items} />}
// ✅ {items.length > 0 ? <List items={items} /> : null}
```

## Not checked by a tool: apply them yourself

### 1. No callbacks with logic inline in JSX

Extract a named handler above the `return`. A trivial single expression is fine: `onClick={() => setOpen(true)}`.

```tsx
// ❌
<button
  onClick={() => {
    track();
    if (isDirty) {
      save();
    }
  }}
/>;

// ✅
function handleClick() {
  track();
  if (isDirty) {
    save();
  }
}

return <button onClick={handleClick} />;
```

### 2. No ternary to compute a non-trivial constant

When a derived value needs more than a simple lookup, extract a named function.

```ts
// ❌
const items =
  data == null
    ? []
    : data.posts.map((post) => ({ key: post.slug, value: post.title }));

// ✅
function getItems(data?: PostsResponse) {
  if (data == null) {
    return [];
  }
  return data.posts.map((post) => ({ key: post.slug, value: post.title }));
}

const items = getItems(data);
```

### 3. No complex ternary condition

If the condition combines several operators (`&&`, `||`, `!`, comparisons), give it a name first.

```ts
// ❌
const badge = isPublished && tag === "new" && views < 100 ? "Fresh" : null;

// ✅
const isFresh = isPublished && tag === "new" && views < 100;
const badge = isFresh ? "Fresh" : null;
```

### 4. Prefer early returns

Return as soon as a condition fails instead of nesting `if/else`.

```ts
// ❌
if (user !== null) {
  if (user.isActive) {
    return render(user);
  }
}
return null;

// ✅
if (user === null) {
  return null;
}
if (!user.isActive) {
  return null;
}
return render(user);
```

### 5. Components

- Props typed with an interface. `children` typed with `PropsWithChildren`, not `ReactNode`.
- A component has no business logic and no data fetching: it receives everything through props.
- Its classes come from its recipe in `src/lib/recipes.ts`; only one-off layout classes are written in the `.tsx`.
- Every `useEffect` that subscribes, listens or sets a timer returns a cleanup.
- Accessible by default: semantic elements, labels on inputs, `alt` on images, keyboard reachable.
- Do not duplicate business logic: extract it and test it.

## Naming

| Use case           | Convention                      | Examples                           |
| ------------------ | ------------------------------- | ---------------------------------- |
| JSX event handlers | `handle` + Event                | `handleClick`, `handleSubmit`      |
| Boolean values     | `is` / `has` / `can` / `should` | `isFresh`, `canEdit`, `shouldShow` |
| Derived data       | `get` + Noun                    | `getItems`, `getLabel`             |
| Files and folders  | `kebab-case`                    | `post-card.tsx`, `use-filters.ts`  |
| Components         | PascalCase named export         | `export function PostCard()`       |
| Hooks              | camelCase, `use` prefix         | `export function useFilters()`     |

## Checklist before finishing

- [ ] No logic-containing callback inline in JSX
- [ ] No `const x = cond ? <complex> : <complex>`
- [ ] No multi-operator condition inside a ternary
- [ ] Early returns instead of nested `if/else`
- [ ] New business logic and utils have a test
- [ ] A new or changed component is covered in all five places (see `kit-patterns`)
- [ ] Checked in paper and in blueprint
