# Plan: Add an Admin CMS for Blog Posts

## Current state inspection

1. **Framework and routing**
   - TanStack Start v1 with React 19.
   - TanStack Router file-based routing (`src/routes/*.tsx` → `src/routeTree.gen.ts`).
   - Vite 7 + Tailwind CSS v4.

2. **Where posts/articles data lives**
   - Hard-coded static arrays only:
     - `src/routes/blog.tsx` — `articles` array (the `/blog` page).
     - `src/routes/index.tsx` — `blogPosts` array (homepage "Latest Updates" section).
   - No database, no CMS, no persisted content.

3. **Routes that display posts**
   - `/blog` — rendered by `src/routes/blog.tsx`.
   - `/` (homepage) — renders the static `blogPosts` list in `src/routes/index.tsx`.

4. **Supabase connected?**
   - No. No `src/integrations/supabase`, no Supabase env vars, no Supabase references in the codebase.

5. **Authentication configured?**
   - No. There is a `/join` page (`src/routes/join.tsx`) but it is only a UI mock with no real auth backend.

6. **Files that would need to change to add an admin CMS**
   - Enable Lovable Cloud (Supabase) to get a database + auth.
   - Add a `posts` table migration (schema + RLS + grants + policies).
   - Create server functions for CRUD operations.
   - Convert `/blog` to load posts from the database.
   - Convert the homepage blog section to load posts from the database.
   - Add an admin area under `src/routes/_authenticated/admin/` for creating/editing posts.
   - Update `src/start.ts` if auth bearer middleware is needed.

## Proposed implementation

### Phase 1: Enable backend (Lovable Cloud)
- Enable Lovable Cloud so the project gets a managed Supabase project (database + auth).
- This unlocks tables, auth users, and server functions.

### Phase 2: Database schema
- Create a migration that adds:
  ```text
  public.posts
    id uuid primary key default gen_random_uuid()
    title text not null
    slug text unique not null
    excerpt text
    content text
    category text
    read_time text
    published boolean default false
    created_at timestamptz default now()
    updated_at timestamptz default now()
    author_id uuid references auth.users(id)
  ```
- Add GRANT statements, enable RLS, and write policies:
  - Anyone can read published posts.
  - Authenticated admins can create/update/delete posts.

### Phase 3: User roles
- Create `public.user_roles` table with an `admin` role.
- Add a `has_role` security-definer helper function.
- Use RLS policies that check `has_role(auth.uid(), 'admin')` for write access.

### Phase 4: Server functions
Create `src/lib/posts.functions.ts` with public and protected server functions:
- `getPosts()` — list published posts.
- `getPostBySlug(slug)` — single published post.
- `createPost(input)` — admin only.
- `updatePost(id, input)` — admin only.
- `deletePost(id)` — admin only.

### Phase 5: Public routes
- Refactor `src/routes/blog.tsx` to load posts from `getPosts()` / `getPostBySlug()` instead of the static `articles` array.
- Add `src/routes/blog.$slug.tsx` for individual post detail pages.
- Refactor the homepage in `src/routes/index.tsx` to use the latest posts from the server function instead of `blogPosts`.

### Phase 6: Admin CMS
- Add `src/routes/_authenticated/route.tsx` (managed auth gate — only if it does not already exist).
- Add `src/routes/_authenticated/admin.tsx` for the admin dashboard.
- Add `src/routes/_authenticated/admin/posts.tsx` to list posts.
- Add `src/routes/_authenticated/admin/posts.new.tsx` to create a post.
- Add `src/routes/_authenticated/admin/posts.$slug.edit.tsx` to edit a post.

### Phase 7: Auth wiring
- Ensure `src/start.ts` has the Supabase bearer-token attacher in `functionMiddleware` so protected server functions receive the session.
- The `/join` page can be wired to real Supabase auth, or replaced by a proper `/auth` route.

## Files that would change

| File | Change |
| --- | --- |
| `.lovable/` (Cloud activation) | Enable Lovable Cloud / Supabase project |
| Supabase migration file | Create `posts` and `user_roles` tables with RLS/grants |
| `src/start.ts` | Add Supabase auth bearer middleware if missing |
| `src/lib/posts.functions.ts` | New server functions for post CRUD |
| `src/routes/blog.tsx` | Load posts from database |
| `src/routes/blog.$slug.tsx` | New individual post detail route |
| `src/routes/index.tsx` | Load homepage blog section from database |
| `src/routes/_authenticated/route.tsx` | Auth layout (created if missing) |
| `src/routes/_authenticated/admin.tsx` | New admin dashboard |
| `src/routes/_authenticated/admin/posts.tsx` | New post list |
| `src/routes/_authenticated/admin/posts.new.tsx` | New create-post form |
| `src/routes/_authenticated/admin/posts.$slug.edit.tsx` | New edit-post form |
| `src/routes/join.tsx` | Optionally replace mock auth with real auth flow |

## No code changes have been made yet

This is a read-only plan. Implementation will start only after you approve it.
