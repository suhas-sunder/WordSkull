# AGENTS.md

## Project

WordSkull is a Remix/Vite word game and content site.

This repository is **Remix/Vite**, not Next.js.

The current working branch is:

```txt
last-best-version
```

This branch is the preferred base because it preserves the blog and lore route families that were missing from later branches.

Important preserved route/content areas:

```txt
app/routes/blog.*
app/routes/lore.*
BlogSidebar.tsx
LoreSidebar.tsx
```

Do **not** switch branches unless explicitly instructed.

---

## Primary Goal

Prepare WordSkull for efficient Netlify deployment with:

- no persistent Express backend
- no production dependency on `server.js`
- no Netlify Functions for normal gameplay/page rendering
- no server-side Cloudflare R2 word fetches during page render
- static-first deployment
- build-time prerendered HTML for SEO-sensitive routes
- preserved blog/lore/game/word-list content
- preserved visual design and gameplay behavior

The desired production target is:

```txt
Netlify static hosting
Remix/Vite build output
build/client as publish directory
build-time prerendered HTML for public routes
client-side/static word loading
Cloudflare R2 used only as public read-only static asset storage
```

---

## High-Level Architecture Rules

### Use static-first Netlify hosting

The preferred deployment model is:

```txt
npm run build
-> Remix/Vite builds client/server artifacts
-> prerender script generates static route HTML
-> Netlify publishes build/client
```

Public route HTML should be generated at build time into paths like:

```txt
build/client/index.html
build/client/blog/index.html
build/client/lore/index.html
build/client/words-list/all-5-letter-words-for-word-games/index.html
```

Do not rely on a persistent backend server for production.

### Avoid plain SPA-only SEO loss

A plain SPA-only deployment is not preferred because it can collapse route-specific HTML, metadata, canonical tags, JSON-LD, and content into a generic `index.html`.

If a route is SEO-sensitive, prefer build-time prerendered HTML.

SEO-sensitive route families include:

```txt
/
blog routes
lore routes
game routes
word-list routes
legal/misc content routes
```

### Do not use Netlify Remix runtime adapter as the default solution

Do not add `@netlify/remix-adapter/plugin` unless explicitly instructed.

That approach implies Netlify runtime/serverless behavior. The current goal is static-first hosting with no normal runtime backend logic.

---

## Non-Negotiable Preservation Rules

Do not delete or degrade:

```txt
app/routes/blog.*
app/routes/lore.*
BlogSidebar.tsx
LoreSidebar.tsx
game routes
word-list routes
sitemap/robots/canonical intent
existing page copy
existing visual design
existing puzzle/game behavior
```

Do not change gameplay behavior unless required to remove backend dependency.

Preserve:

```txt
play button behavior
difficulty/mode behavior
scoring
lives
timer
keyboard behavior
modals
localStorage/localForage persistence
copy/share behavior
route URLs
page styling
SEO intent
```

---

## Backend Removal Rules

The production Netlify deployment must not depend on:

```txt
server.js
server_routes/**
netlify/functions/server.js
Express runtime
database runtime
JWT auth runtime
account/submission API runtime
server-side R2 fetches
server-side dictionary decompression
```

If these files/features are unused by public production routes, delete them instead of preserving dead backend baggage.

Likely backend files to remove if unused:

```txt
server.js
server_routes/accountRouter.js
server_routes/submissionRouter.js
server_routes/config/dbConfig.js
server_routes/middleware/authorization.js
server_routes/utils/jwtGenerator.js
server_routes/utils/validation.js
netlify/functions/server.js
public/netlify.toml
public/_redirects
```

Also remove obsolete client-side backend helpers if unused:

```txt
app/client/components/api/accountAPI.ts
app/client/components/api/submissionAPI.ts
app/client/components/api/cloudflareR2API.ts
app/client/components/api/GetS3Client.ts
app/client/components/utils/requests/PostIndieDevHeaderForm.ts
app/client/components/utils/requests/PostIndieLogin.ts
app/client/components/utils/requests/PostVerifyJWT.ts
app/client/components/utils/requests/PostJSONFromR2.ts
app/client/components/utils/requests/PostIndieDevImgToR2.ts
app/client/components/utils/requests/GetIndieDevJson.ts
app/client/components/utils/validation/VerifyJWTIndieLogin.ts
app/client/components/utils/validation/ValidateIndieGameLinks.ts
app/client/components/utils/validation/ValidateJson.ts
app/client/components/utils/generators/GeneratexAmzDate.ts
app/client/types/authTypes.tsx
app/client/mocks/components/MockDefaultServerAPI.ts
app/client/mocks/components/MockCloudflareR2API.ts
```

Only delete files after confirming no valid production import remains.

---

## Netlify Rules

A valid Netlify setup should use a **root-level** `netlify.toml`.

Do not keep Netlify config under:

```txt
public/netlify.toml
```

Netlify publish directory should be:

```txt
build/client
```

Do not publish:

```txt
public
```

Do not configure production traffic to use:

```txt
server.js
netlify/functions/server.js
```

Root `netlify.toml` should support:

- correct build command
- correct publish directory
- static fallback behavior only if compatible with prerendered route HTML
- immutable cache headers for hashed build assets
- correct 404 behavior

---

## Word Data Rules

The word dictionary is large and may be stored in Cloudflare R2.

Cloudflare R2 may remain the storage source, but it must not be used as a server-render-time backend dependency.

Do not:

```txt
fetch the full word dictionary in app/root.tsx
fetch the full word dictionary in Remix route loaders
proxy the dictionary through Netlify Functions
send the full dictionary through loader data
put the full dictionary in initial HTML
put the full dictionary in the main JS bundle
block first gameplay on a remote dictionary fetch
```

Preferred direction:

```txt
bundled first-session target/validation word packs
client-side static word source manager
localForage/IndexedDB cache
public read-only R2/CDN fetches
length-specific word chunks
background loading
```

Gameplay must start without waiting for the remote dictionary.

Word-list pages may load full lists client-side because the user explicitly requested a list page.

---

## Remix Loader and Action Rules

Remove runtime loaders/actions where they only exist for backend data, R2 word data, API proxying, or server-only behavior.

Particular files to inspect carefully:

```txt
app/root.tsx
app/routes/$.tsx
app/routes/words-list.all-3-letter-words-for-word-games.tsx
app/routes/words-list.all-4-letter-words-for-word-games.tsx
app/routes/words-list.all-5-letter-words-for-word-games.tsx
app/routes/words-list.all-6-letter-words-for-word-games.tsx
app/routes/words-list.all-7-letter-words-for-word-games.tsx
app/routes/words-list.all-8-letter-words-for-word-games.tsx
app/routes/words-list.all-9-letter-words-for-word-games.tsx
app/routes/words-list._index.tsx
game routes
```

`app/root.tsx` should not contain:

```txt
runtime word loader
server word cache
GetWordsForSkull import
no-store headers for normal static pages
server-side R2 fetch
server dictionary decompression
```

Keep root layout behavior, providers, nav/footer, styling, analytics/ads, and scroll behavior.

---

## Client/Server Boundary Rules

Do not place server-only logic under `app/client`.

Client code must not use:

```txt
private process.env values
JWT_SECRET
R2 secret keys
S3 credentials
@aws-sdk/client-s3
Buffer for server upload logic
Express request/response logic
database access
server cookies
```

Allowed client-side persistence:

```txt
localStorage
sessionStorage
localForage
IndexedDB
public read-only fetches
static JSON assets
bundled first-session data packs
```

---

## SEO Rules

Preserve route-specific SEO as much as possible.

Maintain:

```txt
titles
meta descriptions
canonical URLs
Open Graph URLs
JSON-LD where already present
sitemap
robots.txt
internal links
blog/lore route content
word-list route content
```

Use:

```txt
https://www.wordskull.com
```

as the canonical production origin.

Remove placeholder sitemap references like:

```txt
https://yourdomain.com/sitemap.xml
```

Sitemap generation should use an explicit route registry rather than unreliable filesystem guessing where possible.

Recommended shared config files:

```txt
app/shared/routes.ts
app/shared/seo.ts
app/client/config/site.ts
```

---

## Prerendering Rules

Add or maintain a build-time prerender script such as:

```txt
scripts/prerenderStaticRoutes.mjs
```

The script should:

- run after the Remix/Vite build
- render public canonical routes at build time
- write static HTML into `build/client`
- generate `404.html`
- include blog routes
- include lore routes
- include game routes
- include word-list routes
- include legal/misc routes
- not require a production Express server
- not require Netlify Functions
- not fetch R2 word data at page-render time

---

## Dependency Cleanup Rules

After removing backend code, inspect `package.json`.

Remove unused backend/runtime dependencies if no longer imported:

```txt
express
cors
body-parser
cookie-parser
jsonwebtoken
bcrypt
database drivers
@aws-sdk/client-s3
axios if only used for old backend/static fetches
@remix-run/netlify if unused
```

Do not remove dependencies still required by the actual app.

Do not add fake tests just to make a command pass.

---

## Testing and Validation

After changes, run:

```bash
npm run build
npm run typecheck
npm run lint
```

Run `npm ci` if dependencies changed.

If tests are missing, report that honestly. Do not invent fake passing tests.

Manually verify:

```txt
/
blog
lore
one individual blog route if present
one individual lore route if present
one game route
one word-list route
404
play button
first game start
copy/share behavior
localStorage/localForage behavior
```

Inspect generated files:

```txt
build/client/index.html
build/client/blog/index.html
build/client/lore/index.html
build/client/404.html
```

Confirm:

```txt
root netlify.toml exists
publish directory is build/client
public/netlify.toml is gone
netlify/functions/server.js is gone
server.js is not used by production
no normal page/game render depends on Express
no normal page/game render depends on Netlify Functions
no root/route loader fetches Cloudflare R2 word data
blog/lore files still exist
build passes
typecheck passes or failures are listed with file/line/reason
lint passes or failures are listed with file/line/reason
```

---

## Response Format for Codex

When completing a task, report:

```txt
1. Files changed
2. Files deleted
3. Dependencies removed/added
4. Architecture/design decisions
5. UX changes
6. SEO changes
7. Puzzle/game logic changes
8. Netlify changes
9. Validation commands run and results
10. Remaining risks
```

Be explicit. Do not claim validation passed unless the command was actually run.

---

## Safety Rules

Do not make broad rewrites when targeted refactors are enough.

Do not delete blog/lore content.

Do not silently remove SEO routes.

Do not silently change gameplay.

Do not introduce new backend runtime logic to solve static hosting issues.

Do not use a fake success state for tests/typecheck/lint.

Do not hardcode production API origins in client files.

Do not expose private R2/S3/JWT credentials to the browser.

Do not change branches unless explicitly instructed.

---

## Definition of Done

A refactor is complete only when:

```txt
Netlify can publish build/client
root netlify.toml is correct
public/netlify.toml is removed
production does not depend on Express
production does not depend on broken Netlify server functions
normal gameplay/page rendering does not use server-side R2/API logic
blog/lore content remains present
public routes have build-time static HTML where practical
game starts and plays correctly
SEO files use https://www.wordskull.com
build result is validated
typecheck/lint status is reported honestly
remaining risks are listed
```
