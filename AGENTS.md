# AGENTS.md

## Project

This repository is for **I Love Word Search**, a production-grade, SEO-first, ad-ready word search website for:

`www.iLoveWordSearch.com`

The product is not a thin one-page generator. It is a content-rich word search library plus a best-in-class builder, with the builder placed above the fold on every indexable page.

The site should feel:

- professional
- clean
- fast
- trustworthy
- easy to use in under a minute
- useful for teachers, parents, homeschoolers, ESL tutors, party planners, adult puzzle users, and seniors
- scalable into specialty token-based word search modes later

The final product should be a cleaner, more modern alternative to old worksheet generators and a stronger SEO architecture than cluttered UGC puzzle sites.

## Core Build Principles

Before making changes:

- Inspect the relevant files before editing.
- Follow the existing architecture, naming, routing, state, and styling patterns.
- Do not guess when reference code exists. Read the reference code first.
- Prefer shared components, shared utilities, and structured data over one-off route implementations.
- Do not change unrelated files.
- Do not rename existing functions, variables, routes, exports, or public APIs unless clearly required.
- Do not add dependencies unless the task cannot be implemented safely without them.
- If a dependency is needed, document why it is needed.
- Keep the implementation production-ready, not demo-quality.
- Preserve SEO, printability, accessibility, and puzzle correctness.
- Do not claim success unless the feature or route was actually tested.

## Tech Stack

Use:

- Next.js 15+ with App Router
- TypeScript
- Tailwind CSS
- `next/font/google`
- `zod` for schema validation
- static generation for curated indexable pages
- deterministic seeded puzzle generation
- server-rendered HTML for SEO pages
- selective hydration only where interactivity is required
- structured content collections using JSON, TS objects, or MDX-backed data
- print CSS as a first-class feature
- SVG puzzle rendering as the source of truth
- PDF/PNG exports derived from the same source-of-truth puzzle state

Avoid:

- giant component libraries
- unnecessary client-side hydration
- heavy visual effects
- fragile route-local duplication
- hardcoded content spread across components
- ad hoc puzzle state that cannot reproduce the same puzzle later

## Product Rules

The builder must appear at the top of every indexable page.

Every indexable page should provide real value. Do not create thin SEO pages, synonym pages, shuffled variants, or indexed filter combinations.

Do not publish topic pages unless they have:

- curated word lists
- unique intro/context
- actual utility
- related links
- a useful builder preset
- enough distinct value to justify the page

Do not promise features that are not implemented.

Do not make medical or cognitive-health claims unless specifically sourced and intentionally approved later.

Do not use patronizing copy for adults or seniors.

Do not create a toy-like classroom clipart aesthetic.

Do not let ads interfere with the builder, puzzle grid, print, or PDF output.

## Design Direction

The design must be professional, clean, calm, and highly legible.

Use owner-provided styling images as taste references only. Do not copy any reference image 1:1. Identify the common design choices across the references, then build an original visual system that fits `www.iLoveWordSearch.com`.

Use:

- white page background
- neutral grayscale palette
- one restrained accent color
- clear typography
- calm spacing
- 1px borders for structure
- very light shadows only where useful
- professional inputs
- simple clear buttons
- strong readable puzzle grids

Avoid:

- gradients
- glassmorphism
- loud classroom colors
- generic SaaS dashboard visuals
- giant rounded toy UI
- unnecessary background color blocks
- nested card-inside-card layouts
- decorative clutter
- heavy shadows
- playful/sloppy form styling

Use spacing, typography, borders, and restrained elevation to create hierarchy.

## Fonts

Use free fonts.

Use:

- Inter for UI, controls, forms, nav, and body copy
- Source Serif 4 for page headings and editorial sections
- Atkinson Hyperlegible Next for puzzle grids, answer keys, and accessibility-sensitive labels

Do not use one font for everything.

## Layout Rules

- Desktop content width should be around 1120 to 1200px.
- Builder should be a single unified surface with internal dividers, not a stack of nested cards.
- On desktop, builder controls should be on the left and live preview on the right.
- On mobile, preview should be immediately visible and controls should be grouped into clear sections.
- Sticky primary actions are acceptable on mobile if they do not cover content.
- Keep the above-the-fold experience clean.
- Do not bury the builder under SEO copy.
- Do not let the builder become a cluttered settings wall.
- Keep the workflow clear enough that a new user can generate and print within one minute.

## Button and Interaction Rules

All interactive elements must have:

- clear default state
- clear hover state
- clear active state
- clear focus-visible state
- clear disabled state
- `cursor-pointer` where applicable
- keyboard accessibility
- sufficient contrast

Do not create hover states that reduce readability.

Do not rely on color alone to indicate state.

Do not add animation that hurts usability. Respect reduced motion.

## Puzzle Engine Rules

The puzzle engine must be deterministic and token-based.

Do not assume every grid cell is a single A-Z character.

The engine should support alphabet packs that define:

- normalization rules
- valid input formats
- display tokens
- filler token generation
- print renderer
- interactive selection logic
- accessibility labels

This architecture must support future or specialty modes such as:

- Morse tokens
- Braille cells
- ASL fingerspelling glyphs
- binary strings
- hexadecimal tokens
- Greek letters
- Kana
- emoji-like symbols if enabled later

The preview, PDF, printout, answer key, share link, and QR-code destination must reproduce the same puzzle from the same state and seed.

## Puzzle Logic Requirements

Handle:

- deterministic seeded generation
- reproducible output from the same state
- manual rows and columns
- auto-fit grid sizing
- square and rectangular grids
- difficulty presets
- direction toggles
- overlap/crossing rules
- multi-word phrases
- punctuation normalization
- diacritics normalization where appropriate
- duplicate words
- empty lines
- comma-separated paste
- TSV/CSV/TXT upload
- unsupported characters
- words too long for the grid
- too many words for the grid
- hidden message constraints
- specialty token modes
- filler alphabet rules
- large print constraints
- answer key overlays
- word bank ordering
- online selection behavior
- touch selection on mobile
- keyboard accessibility
- screen-reader labels

If a puzzle cannot fit, do not silently fail.

Show:

- which words were placed
- which words were excluded
- practical fixes such as increasing grid size, reducing word count, allowing more directions, allowing overlap, or shortening phrases

Never allow mismatches where:

- preview differs from PDF
- answer key differs from the puzzle
- share link regenerates a different puzzle
- QR code opens a state that produces a different puzzle
- print output differs from the generated preview

## Builder Requirements

The builder should support:

- one word per line
- comma-separated paste
- TSV/CSV/TXT upload
- de-dupe
- trim whitespace
- preserve multi-word phrases
- clue mode using `answer | clue`
- batch paste cleanup
- unsupported character warnings
- max-length guidance
- auto size
- manual rows and columns
- square or rectangle layouts
- difficulty presets
- individual direction toggles
- allow/disallow overlap
- rare-letter or harder filler options
- uppercase/lowercase/title-preserving labels
- puzzle title
- optional subtitle/instructions
- word bank on/off
- word bank position
- word bank sort options
- font size controls
- border weight
- cell spacing
- line weight
- show/hide grid coordinates
- name/date line
- teacher copy vs student copy
- answer key overlay
- hidden message mode
- themed alphabet packs
- symbol packs for specialty generators
- print
- PDF
- PNG
- SVG
- answer key export
- direct share link
- embed code
- deterministic seed
- shuffle/regenerate same word list
- local save/recent puzzles

Use debounced live preview.

Persist latest builder state in local storage.

If local storage is unavailable, fail gracefully.

## QR Code and Branding Rules

Every generated puzzle page and printout must include clean website branding and a QR code.

Branding:

- Use `www.iLoveWordSearch.com`
- Keep branding professional and subtle.
- Do not let branding dominate the puzzle.
- Do not interfere with classroom or personal print use.

QR code:

- Must take the user to the exact builder page/state used to create the puzzle.
- Must preserve the puzzle settings, topic, word list or state ID, seed, difficulty, grid size, alphabet pack, and output mode needed to reproduce the same puzzle.
- If the URL becomes too long, use a deterministic short-link/state system or encoded server-side state.
- Must be printable and scannable.
- Must appear in a clean footer or utility area.
- Must not appear inside the puzzle grid or word bank.
- Must be included on student puzzle pages, answer key pages, and PDF/print surfaces where appropriate.

Verify:

- QR code renders
- QR code points to a valid URL
- linked state reproduces the same puzzle
- QR code appears in print/PDF
- QR code does not cause clipping or layout issues

## Print and PDF Rules

Print and PDF are first-class features.

The output must match what teachers, parents, homeschool users, and casual puzzle users expect.

Support:

- Letter and A4
- portrait and landscape
- title
- optional subtitle
- instructions
- puzzle grid
- word bank
- name/date line
- teacher/student copy option
- answer key page
- large print mode
- ink-saving mode
- QR code and branding
- clean margins
- page numbering if multi-page
- high contrast
- readable grid and word bank
- no ads
- no sticky UI
- no browser-only controls
- no clipping

PDF/print must preserve:

- same seed
- same grid
- same word placements
- same hidden message logic
- same specialty tokens
- same answer key
- same title/instructions/word bank behavior
- same QR link target

Use SVG as the puzzle rendering source of truth, with PDF/PNG derived from it.

Do not bolt print CSS on at the end.

## SEO and Routing Rules

Use static HTML for editorial/indexable pages.

Every indexable page needs:

- unique title
- unique meta description
- unique H1
- concise value prop
- builder above the fold
- short unique intro
- route-specific content modules
- related links
- breadcrumbs
- canonical tag
- schema where appropriate

Avoid:

- synonym page duplication
- indexed query-parameter states
- indexed shuffled variants
- indexed user-generated pages by default
- faceted navigation explosion
- orphan pages
- generic repeated paragraphs

Use redirects for close synonyms.

Use noindex for utility routes and query states.

Sitemaps should be split by route family.

Schema:

- SoftwareApplication schema on generator hub
- CollectionPage or ItemList schema on category and collection pages
- breadcrumbs in HTML and schema
- FAQ schema only when the FAQ is visible and genuinely useful
- Open Graph image generation per route where practical

## Canonical Route Structure

Indexable core routes include:

- `/`
- `/word-search-generator`
- `/free-printable-word-searches`
- `/online-word-search`
- `/word-search-pdf`
- `/word-search-worksheets`
- `/word-search-with-answer-key`
- `/easy-word-searches`
- `/hard-word-searches`
- `/large-print-word-searches`
- `/word-searches-for-kids`
- `/word-searches-for-adults`
- `/word-searches-for-seniors`
- `/word-searches-for-teachers`
- `/homeschool-word-searches`
- `/esl-word-searches`
- `/daily-word-search`
- `/categories`
- `/topics`
- `/specialty-word-search-generators`
- `/guides`

Topic pages use:

`/word-searches/[category]/[topic-slug]`

Do not create separate canonical pages for every filter combination such as easy + printable + PDF + kids + topic.

Use one canonical topic page and satisfy modifiers with in-page presets/tabs.

## Noindex Utility Routes

These can exist for UX, but must not become indexable clutter:

- `/print/[id]`
- `/pdf/[id]`
- `/answer-key/[id]`
- `/play/[id]` if separate from canonical topic page
- `/embed/[id]`
- `/custom/[slug]` for user-generated share links
- query-parameter states like `?difficulty=`, `?largePrint=`, `?seed=`, `?print=`
- daily archives unless later justified with real editorial value

Utility routes should canonicalize to the main page where appropriate.

## Content Quality Rules

Editorial content must be:

- clear
- helpful
- honest
- calm
- practical
- human-sounding

Avoid:

- cheesy marketing language
- generic AI-sounding filler
- giant walls of text
- toy-store tone
- patronizing language for adults or seniors
- exaggerated claims
- medical or cognitive-health claims
- unsupported feature promises

Reusable modules are encouraged, but pages must not feel cloned.

Use route-specific examples, word lists, notes, and related links.

## Ad and Affiliate Rules

This site is ad-first and affiliate-second, but UX comes first.

Implement:

- reserved ad slots with fixed heights to reduce CLS
- no ads inside the builder controls
- no ads inside the puzzle grid
- no ads on print/PDF surfaces
- no ads above the fold that crowd out the builder
- affiliate modules only on guide/resource pages, not core puzzle pages

Create hooks for future resource pages such as:

- best printer for worksheets
- best paper for home printables
- classroom printable supplies

Keep core product pages clean.

## Accessibility Rules

Use a WCAG AA mindset.

Implement:

- semantic headings
- labeled controls
- keyboard-usable builder
- keyboard-usable solver
- visible focus states
- descriptive ARIA where useful
- accessible validation messages
- reduced motion support
- high contrast mode
- large print mode
- touch-friendly mobile selection
- no color-only answer indication
- answer keys with clear contrast
- screen-reader-friendly labels for controls and puzzle output where feasible

## Performance Rules

- Home and core hubs should feel instant.
- Category and topic pages should use minimal JS.
- Hydrate only where necessary.
- Avoid expensive puzzle regeneration on every keystroke without debounce.
- Avoid giant component libraries.
- Avoid cumulative layout shift from ads or late UI.
- Prefer SVG where practical.
- Use responsive images sparingly.
- Keep builder interactions fast on low-end devices.

## Specialty Generator Rules

Specialty modes must be real, not gimmicks.

Morse:

- accept plain text and encode to Morse
- accept actual Morse input like `... --- ...`
- normalize dots/dashes and separators
- allow display as dot/dash tokens or styled Morse glyphs
- include optional audio playback if implemented
- include legend
- preserve seed logic
- preserve QR/share state

Braille:

- accept plain text and encode to braille
- accept Unicode braille input
- support 6-dot and optionally 8-dot mode
- render proper braille cells
- include legend/labels
- preserve print spacing and accessibility
- preserve QR/share state

ASL fingerspelling:

- render letters as ASL fingerspelling SVG glyphs
- keep word bank readable in Latin text
- include optional alphabet legend
- support symbol-cell selection
- preserve QR/share state

Binary/hexadecimal:

- encode text to binary or hex tokens
- keep fixed-width token layout
- support print and answer key cleanly

Hidden message:

- allow leftover cells to reveal a message
- validate fit
- preserve hidden message in export and answer key
- preserve QR/share state

If a specialty generator route exists but a mode is not fully implemented, do not pretend it is fully functional.

## Documentation Requirements

Maintain docs for:

- adding a new category
- adding a new topic
- adding a new collection
- adding a new guide
- adding a new alphabet pack
- adding a new specialty generator
- editing redirect/noindex maps
- editing print/PDF templates
- content schema fields
- route generation
- testing puzzle logic
- testing print/PDF output

## Testing Requirements

Add or update tests for:

- puzzle generation determinism
- seed reproducibility
- word placement correctness
- answer key correctness
- fit/exclusion logic
- direction toggle behavior
- overlap behavior
- phrase handling
- specialty alphabet pack behavior
- hidden message behavior
- PDF/print output data consistency
- QR/share link state preservation
- builder validation
- localStorage persistence
- route generation
- sitemap/robots/canonical behavior
- noindex utility surfaces
- accessibility basics
- responsive builder layout
- print CSS
- content schema validation

Try these commands if available:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run test:unit
npm run test:accessibility
npm run test:seo
```

If a command does not exist:

- say it does not exist
- do not claim it passed
- run the closest available validation command if appropriate

Browser QA should test at least:

- `/`
- `/word-search-generator`
- `/free-printable-word-searches`
- `/online-word-search`
- `/word-search-pdf`
- `/word-search-worksheets`
- `/large-print-word-searches`
- `/word-searches-for-kids`
- `/word-searches-for-adults`
- `/word-searches-for-teachers`
- one category hub
- one topic page
- one collection page
- one guide page
- `/specialty/morse-code-word-search-generator`
- `/specialty/braille-word-search-generator`
- `/specialty/hidden-message-word-search-generator`

Viewport QA:

- 390px mobile
- 768px tablet
- 1024px laptop
- 1280px desktop
- 1440px desktop
- 1920px wide

For each key route and viewport, verify:

- builder appears above the fold
- builder workflow is clear
- preview remains readable
- controls do not overflow
- sticky actions do not cover content
- print/PDF controls are accessible
- no horizontal scroll
- no excessive vertical bloat
- typography remains readable
- CTA buttons are clear
- ads do not crowd the builder
- QR code does not break print layout
- page content does not feel cloned

## Final Response Format for Codex

When finishing a task, report:

1. Files changed
   - exact files
   - why each changed

2. Architecture/design decisions
   - shared components changed
   - data/schema changes
   - route generation changes
   - puzzle engine changes

3. UX/design changes
   - builder layout
   - page layout
   - print/PDF layout
   - accessibility changes

4. SEO changes
   - metadata
   - canonicals
   - sitemap/robots
   - redirects/noindex
   - schema

5. Puzzle logic changes
   - generation behavior
   - seed behavior
   - answer key behavior
   - edge cases handled

6. QR/print/PDF changes
   - QR state preservation
   - branding placement
   - print/PDF verification

7. Validation
   - exact command run
   - pass/fail
   - explanation for missing or failing commands

8. Remaining risks
   - only real unresolved risks
   - if none, say none

Do not say the task is complete if build, tests, print/PDF, QR/share-state reproduction, or key route QA was skipped without explanation.
