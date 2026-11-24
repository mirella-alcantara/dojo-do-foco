# Technical improvements for Dojo do Foco (code audit + web-platform research, Nov 2026)

Audit basis: `index.html` (3,407 lines, 267,868 bytes), `server.js`, `lib/page.js`, `scripts/build.js`, `netlify.toml`, `package.json`, `decisoes/2026-11-22-desempenho.md`. Line numbers are from commit `fd761a2`. Sources marked "(reference doc)" are canonical spec or MDN pages cited for the reader but not re-fetched in this session. Every other web claim was checked in this session.

**Suggested priority order (my judgment, explained under each question):**
1. **P0, security.** The local server accepts cross-site writes and allows path traversal (server.js:128, :190-205). Fix it in about 1 hour.
2. **P0, data.** Saving fails silently (index.html:910), the app has no export or import, and it never calls `storage.persist()`. Fix it in 2-4 hours.
3. **P1, timer.** Completion in background tabs depends on a throttled `setInterval`, and nothing notifies the user (index.html:3401, :1162). The Notifications API plus a document Picture-in-Picture timer would take 1-2 days.
4. **P1, accessibility.** Fix the dialog semantics, the toast and phase-change announcements, contrast, target sizes, and live `prefers-reduced-motion`. That is 1-2 days.
5. **P1, PWA.** Add a manifest, a service worker that caches three.js and the fonts, and icons. That is 1 day.
6. **P2.** Add a CSP and SRI in netlify.toml (half a day), Playwright smoke and visual tests with CI (1 day), and module splitting (2-4 days, incremental).
7. **P3.** Performance leftovers, i18n, and og:image.

---

## 1. PWA: manifest, service worker, offline, installability (Android/iOS/desktop), iOS limits

### Takeaway
The game has no manifest, no service worker and no app icons. Only an inline SVG favicon exists (lib/page.js:5-11, :21). Offline play therefore fails: three.js comes from cdnjs (index.html:2316) and the fonts from Google Fonts (index.html:3-5). Since iOS 26, every site added to the Home Screen opens as a web app by default. A proper manifest and service worker now pay off on all three platforms.

### Cited Findings
- **Code: no install metadata.** `wrapPage()` emits only charset, viewport, description, theme-color and a data-URI SVG icon (lib/page.js:19-27). It has no `<link rel="manifest">` and no `apple-touch-icon`. `scripts/build.js` writes only `dist/index.html`, so there is no `sw.js` and no `manifest.webmanifest`.
- **Code: external runtime dependencies.** three.js is loaded with `import('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.module.min.js')` (index.html:2316, :2326). The fonts are four Google Fonts families (index.html:3-5). Offline, the 3D fails; the code handles this gracefully through `S3.failed`, but the fonts fall back to system fonts.
- **iOS 26 behavior.** Every website added to the Home Screen on iPhone or iPad now opens as a web app, even if it was never set up as one. The user can turn off "Open as Web App" in the add dialog. — [heise](https://heise.de/-10749652); [iDownloadBlog](https://www.idownloadblog.com/?p=1042117); [WebKit Safari 26.0 features](https://webkit.org/?p=17333)
- **iOS push and badges.** Since iOS 16.4, push and the app-icon badge work only after the user adds the site to the Home Screen and grants notification permission. iOS 18.4 added Declarative Web Push. — [WebKit: Badging for Home Screen Web Apps](https://webkit.org/blog/14112/badging-for-home-screen-web-apps/); [MobiLoud overview (secondary)](https://www.mobiloud.com/blog/progressive-web-apps-ios)
- **Storage parity.** A standalone web app (Home Screen on iOS, Dock on macOS) gets the same origin and overall quotas as when it runs in Safari. — [WebKit: Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)
- **How-to references.** [web.dev Learn PWA](https://web.dev/learn/pwa/); [MDN: Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) (reference docs)

### Inferences
- **Approach.**
  - Have `scripts/build.js` emit `manifest.webmanifest` with `name`, `short_name`, `start_url: "/#dojo"`, `display: "standalone"`, `background_color`/`theme_color: #160f2b`, and 192/512 PNG plus maskable icons.
  - Generate the icons from the existing pixel torii SVG.
  - Emit a small hand-written `sw.js` (no Workbox needed):
    - precache `/` and the icons;
    - use runtime cache-first for `cdnjs.cloudflare.com/.../three.module.min.js`, which is versioned and immutable, and for `fonts.gstatic.com`;
    - use stale-while-revalidate for `fonts.googleapis.com` CSS;
    - use network-only for `api.open-meteo.com`.
  - Register the service worker only when `location.protocol === 'https:'` or on localhost, and never inside claude.ai (the code already detects `IN_CLAUDE`, index.html:2749).
- **Alternative: self-host.** Self-host three.js and the fonts in `dist/`, which build.js can copy from `node_modules`. This removes two third-party origins, simplifies the CSP (section 6) and makes offline trivial. It is preferable to caching cross-origin opaque responses.
- **Cache invalidation.** netlify.toml already sets `max-age=0, must-revalidate` on index.html (netlify.toml:17-20), which is right for an app shell. `sw.js` itself also needs `Cache-Control: no-cache`.
- **Effort.** About 1 day, including icons and testing install on Android Chrome, desktop Chrome/Edge, and iOS Safari 26.

### Gaps
- I did not verify the current Android or desktop Chrome install criteria for 2026, for example whether a service worker is still required for the install prompt.
- I did not verify the exact iOS 26 manifest fields honored, such as `orientation` or `shortcuts`.

---

## 2. Timers in background tabs; Notifications, Web Push, Badging, Wake Lock, Document PiP, Media Session (incl. iOS)

### Takeaway
The timer math is already drift-proof because it uses an absolute `endAt` (index.html:1132, :1239). But completion is detected only by `setInterval(tick, 250)` (index.html:3401). Chrome throttles that hard in hidden tabs, so the completion sound, the XP and the next phase can arrive up to about a minute late. No notification is ever shown. The best no-backend fixes are:
- a local `Notification` fired at completion (and reconciled on `visibilitychange`, which the code already does);
- a document Picture-in-Picture floating timer in Chromium and Firefox desktop;
- the existing Wake Lock.

Web Push needs a sender server, and Notification Triggers never shipped.

### Cited Findings
- **Code: timer loop.** The timer runs on `setInterval(tick, 250)` (index.html:3401). `tick()` computes `left = (T.endAt - Date.now())/1000` and calls `complete()` at 0 (index.html:1236-1247). On `visibilitychange` to visible, it re-runs `tick()` (index.html:3374), so state catches up when the user returns.
- **Code: tab title.** `document.title` shows the countdown, such as "12:34 集 · Dojo do Foco" (index.html:2896). This works as a passive tab indicator, but throttling makes it update slowly in background tabs.
- **Code: no notification.** There is no `Notification`, `serviceWorker` or `mediaSession` code anywhere; a grep for these returned nothing. `complete()` (index.html:1162) plays an sfx and shows a toast, and neither is useful in a hidden tab.
- **Code: Wake Lock.** Wake Lock is implemented. `wake()` uses `navigator.wakeLock.request('screen')` and re-acquires it on visibility (index.html:1037, :3374).
- **Chrome intensive throttling.** Chrome 88+ checks timers on a hidden page once per minute when all of these hold: hidden for more than 5 minutes, timer-chain count of 5 or more, silent for at least 30 seconds, and no WebRTC. — [Chrome: Timer throttling in Chrome 88](https://developer.chrome.com/blog/timer-throttling-in-chrome-88)
- **Quick variant.** A later "Quick intensive timer throttling" reduces the 5-minute grace period to 10 seconds for pages that are fully loaded when hidden. Its intent thread listed desktop milestones around Chrome 104/109. I did not confirm the current default. — [blink-dev Intent to Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/5SZB2CFFGqE)
- **Inference: audio exemption.** The "silent for 30 s" condition means a tab playing the break music through Web Audio (index.html:1104, `MUS.timer = setInterval(musicTick, 60)`) is exempt while audible. Focus phases are silent, so they will be throttled.
- **Notification Triggers.** These were local scheduled notifications with no network, using `showTrigger`. Their Chrome status is "origin trial complete, launch not started", and they never shipped. — [Chrome: Notification Triggers API](https://developer.chrome.com/docs/web-platform/notification-triggers)
- **Document Picture-in-Picture.**
  - Chrome and Edge 116+ support it on desktop only, not Chrome for Android.
  - Firefox 151 (2026) enabled it on desktop. — [Mozilla intent to ship](https://groups.google.com/a/mozilla.org/g/dev-platform/c/ZYhF7VNXwQU); [web.dev: New to the web platform in May 2026](https://web.dev/blog/web-platform-05-2026)
  - Safari, on macOS and iOS, does not support it through 26.5. — [caniuse](https://caniuse.com/mdn-api_documentpictureinpicture); [Chrome guide](https://developer.chrome.com/docs/web-platform/document-picture-in-picture)
- **Badging API.**
  - It works for installed PWAs on Chrome/Edge 81+ on Windows and macOS. Linux shows nothing, and it is not supported on Chromium for Android.
  - Feature-detect `navigator.setAppBadge`.
  - iOS/iPadOS 16.4+ supports it only for Home Screen web apps with notification permission.
  - macOS Safari is listed as supported from Safari 17 on caniuse but not on MDN, so the sources conflict.
  - Sources: [Chrome: Badging API](https://developer.chrome.com/docs/capabilities/web-apis/badging-api); [MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Display_badge_on_app_icon); [caniuse](https://caniuse.com/mdn-api_navigator_setappbadge); [WebKit](https://webkit.org/blog/14112/badging-for-home-screen-web-apps/)
- **Screen Wake Lock.** It is supported in all major browsers. Caniuse marks iOS Safari 16.4+ as supported. WebKit bug 254545 reported that it did not work in Home Screen web apps (2023); a WebKit-side fix landed, and I could not confirm whether the iOS 18.4 entry resolved it for standalone mode. — [web.dev: Wake Lock in all browsers](https://web.dev/blog/screen-wake-lock-supported-in-all-browsers); [caniuse](https://caniuse.com/wake-lock); [WebKit bug 254545](https://bugs.webkit.org/show_bug.cgi?id=254545)
- **Media Session API.** It exposes metadata and play/pause handlers to OS media controls and the lock screen. It only applies while media is playing, here the break music. — [MDN Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) (reference doc)

### Inferences
- **Approach, step by step.**
  - **(a)** On `start()`, ask for `Notification.requestPermission()` once, behind a user gesture and a setting. In `complete()`, if `document.hidden`, call `registration.showNotification()` (via the service worker from section 1) or `new Notification()`, with `tag:'dojo-phase'` and `renotify`.
  - **(b)** Throttling can delay this by up to about 60 s in Chrome. To tighten it, schedule a single `setTimeout(complete, msLeft)` at start and resume. A single timer is not a chain, so it is less affected by intensive throttling than a repeating 250 ms interval. Keep the interval only for the visible UI.
  - **(c)** Add a "floating timer" button that opens `documentPictureInPicture.requestWindow({width:220,height:120})`. Move a mini clock element there, with styles copied, and keep it updated. A PiP window is a visible document, so its timers are not hidden-throttled.
  - **(d)** Call `navigator.setAppBadge(minutesLeft)` when installed (desktop Chromium, iOS Home Screen).
  - **(e)** Set `navigator.mediaSession.metadata` during breaks, with play/pause mapped to `toggle()`.
  - **Effort.** (a)+(b): 3-4 hours. (c): 4-6 hours. (d)+(e): 1-2 hours.
- **iOS Safari.** Background JavaScript is suspended when the app is hidden. Local notifications at an exact time are not possible without push. So on iPhone, the honest UX is the Wake Lock (screen stays on), the title countdown, and "you finished X minutes ago" reconciliation on return, which already happens.
- **Web Push without a backend.** Exact-time reminders on iOS require a sender: a tiny scheduled function (Netlify Scheduled Functions or a Cloudflare Worker cron) plus VAPID keys and stored subscriptions. That is a backend, so this is optional and medium effort (1-2 days).

### Gaps
- I did not confirm the current shipping default for Quick Intensive Throttling (10 s), or Safari and Firefox background-timer policies in 2026.
- I did not confirm Wake Lock in iOS Home Screen mode after 18.4.

---

## 3. Accessibility audit of the actual markup (WCAG 2.2)

### Takeaway
The basics are better than average:
- `:focus-visible` outline (index.html:63);
- `aria-pressed` toggles;
- `aria-current` in the nav (index.html:3152);
- `aria-label` on inputs;
- an `aria-live` dialog box (index.html:447);
- CSS reduced motion (index.html:374);
- many canvas effects gated by `reduced`;
- `lang="pt-BR"` on the wrapper (lib/page.js:21).

The main defects:
- the 3D realm overlay is a fake modal;
- toasts and phase changes are not announced;
- `--faint` text and all `--line` borders fail contrast;
- several targets are below the 24 px minimum;
- the reduced-motion preference is read once and never updated;
- the bottom nav fades to 35% opacity during focus.

### Cited Findings
- **Realm overlay (#realmView).** It is `role="dialog"` with `aria-label` but has no `aria-modal="true"` and no focus trap (index.html:379). The rest of the page is hidden only visually, with `opacity:0;pointer-events:none` (index.html:47), so it stays in the accessibility tree and in the Tab order. Focus moves to `#rvClose` on open and back on close (index.html:2662), and Escape closes it (index.html:3357). Using a native `<dialog>` with `showModal()` would give inertness for free. — [MDN `<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) (reference doc)
- **Toast.** `#toast` is a plain `div` toggled with `hidden` (index.html:657, :975). It has no `role="status"` or `aria-live`, so achievements, the 1-minute warning (index.html:1243) and "level up" are not announced to screen readers.
- **Timer display.** `#clockTime` (index.html:443) is updated every 250 ms and is correctly not live, since announcing it every second would be noisy. But nothing announces phase start and end or the 1-minute warning. Recommendation: one visually-hidden `role="status"` region that receives "Foco terminado. Hora da pausa." from `complete()`, plus the toast text. — [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) (reference doc); WCAG 4.1.3 Status Messages [Understanding 4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) (reference doc)
- **`#dlg` live region.** `#dlg` is `aria-live="polite"`, and its whole `innerHTML` (buttons, inputs) is replaced on each render (index.html:2871). Screen readers may re-read the entire box, and focus is lost if it was inside the box. A smaller live sub-element holding only the master's line would be better.
- **Canvas semantics.** The canvas `#scene` has `aria-label` but no `role="img"` (index.html:437), and canvas has no implicit role. Achievement `.badge` divs carry `aria-label` with no role (index.html:3041), and ARIA labels on generic `div`s are unreliable. Use `role="img"` or a list with visible text.
- **Contrast.** I computed these with the WCAG relative-luminance formula from the CSS tokens at index.html:9, :20, :24.
  - Light theme `--faint #958cb2` on `--panel #fdfbff`: **3.06:1**. This fails 1.4.3 (4.5:1) for `.ex` text at 14 px (index.html:228) and locked badges at 22 px (index.html:263; large text needs 24 px, or 18.66 px bold).
  - Dark theme `--faint` on panel: 3.52:1. This also fails for small text.
  - `--line` borders: 1.39:1 (light) and 1.43:1 (dark). These fail 1.4.11 Non-text Contrast (3:1) wherever the border is the only boundary of an input or icon button (`.ibtn`, index.html:229).
  - `--muted` passes: 7.41 dark, 6.59 light. Light-theme accents pass: gold 4.66, cyan 4.56, matcha 4.80.
  - Standard: [WCAG 2.2 1.4.3 / 1.4.11](https://www.w3.org/TR/WCAG22/) (reference doc)
- **Target size (WCAG 2.2 2.5.8, AA, minimum 24×24 CSS px).** `.q-steps .ibtn` is 24×24 with no border (index.html:233), which is borderline. Small buttons `.btn.sm` (13 px font, 6×11 padding, index.html:160) and `.opts` buttons (index.html:274) need checking. — [Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) (reference doc)
- **Focus Not Obscured (WCAG 2.2 2.4.11).** The fixed bottom nav (`.bnav`, index.html:358) and the fixed toast (index.html:369) can cover focused elements near the bottom; add `scroll-padding-bottom`. During focus mode the nav sits at `opacity:.35` (index.html:364) and restores on `:focus-within` (index.html:365), which is good. — [Understanding 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) (reference doc)
- **Reduced motion.** `const reduced = matchMedia(...).matches` is read once (index.html:671), so changing the OS setting mid-session has no effect. It is used in about 60 places and also throttles the 3D to one frame per 1.5 s (index.html ~2620). Fix: `mq.addEventListener('change', …)` and turn `reduced` into a mutable variable. Also add an in-app "reduce motion" toggle, since some users want it without the OS setting.
- **Keyboard.**
  - Space toggles the timer on the Dojo view, skipping inputs and buttons (index.html:3205-3210). Enter submits plan, distraction and note (index.html:3199-3204).
  - The phase segmented control `#seg` has `aria-label` but no `role="group"` (index.html:427). A `div` with `aria-label` and no role is ignored by many screen readers.
  - Bottom-nav buttons work by click and therefore by keyboard. After `go(v)` (index.html:3148-3155), focus is not moved to the new view's heading; it calls `scrollTo(0)` only. Moving focus to the view's `<h2>` with `tabindex=-1` is the standard SPA pattern.
- **Font sizing.** Many fixed `px` sizes from 10-13 px (index.html:52, 55, 186, 251, 256, 270). Body text is 16 px. Using `rem` would respect browser font-size settings (WCAG 1.4.4 Resize Text).
- **Color-blind safety.** Phase colors (violet, matcha green, cyan) always appear with text labels ("集中 Foco", "休憩 Pausa", index.html:428-430). Pressed states also change the border plus `aria-pressed`, so color is not the only cue, which is fine under 1.4.1. The XP and energy bars have text values (`#xpTxt`, `#hpTxt`). I found no color-only encoding in the markup reviewed; the canvas scene was not audited.

### Inferences
- **Effort and expected impact.**
  - Native `<dialog>` for the realm view: 1-2 hours.
  - `role="status"` announcer and toast live region: 1 hour.
  - Token contrast fixes: raise `--faint` to about #7a7099 on light and about #8a83ad on dark, and give `--line` at least 3:1 for interactive borders. About 2 hours plus visual review.
  - Live reduced-motion listener plus toggle: 1-2 hours.
  - Focus management on tab change: 1 hour.
  - Altogether about 1-2 days to reach a credible WCAG 2.2 AA claim.
- **Tooling.** axe-core through `@axe-core/playwright` in the test suite (section 5) can keep these from regressing.

### Gaps
- No screen-reader testing (VoiceOver or NVDA) was done; this is a static audit.
- Canvas content and the JavaScript-rendered views (Perfil editor, Resumo tables) were only partly reviewed.

---

## 4. Data: localStorage limits, eviction, backup, persist(), sync without accounts, schema versioning

### Takeaway
All progress lives in one localStorage key (`dojo-do-foco-v1`, index.html:672), and the code swallows quota and serialization errors (index.html:910). There is no export or import, and `navigator.storage.persist()` is never called. Safari's ITP can delete script-writable storage after 7 days of Safari use without interaction with the site, which is low risk for a daily user. Persistent mode, which Safari grants heuristically and more readily to Home Screen apps, plus a one-click JSON backup are cheap insurance.

### Cited Findings
- **Code: storage.**
  - `load()` and `save()` use `localStorage` with empty `catch` blocks (index.html:909-910).
  - `save()` runs every 10 s (index.html:3403) and on many actions.
  - `S.log` is capped at 100 entries (index.html:973), but `S.days` grows without bound, one object per day with every session.
  - There is no `storage.persist` and no export button; a grep for Blob, download and `type="file"` found only the `sendBeacon` Blob (index.html:931).
- **Code: schema versioning.**
  - `fresh()` writes `v:3` (index.html:868).
  - `merge()` only migrates `v<2` and then sets `out.v = 2` (index.html:897-904). Because `Object.assign(d, o)` copies the old `v`, data saved as v2 stays labelled `v:2` forever, and there is no v2→v3 step.
  - New fields are back-filled by merging with `fresh()` defaults (index.html:896, :906).
  - The ad-hoc approach works, but there is no ordered migration list, and nothing guards against a future version being loaded by older code.
- **ITP 7-day cap.** Since Safari 13.1, WebKit deletes all of a site's script-writable storage (localStorage, IndexedDB, service-worker registrations) after 7 days of Safari use without user interaction on the site. Home Screen web apps have their own days-of-use counter. — [WebKit: Full Third-Party Cookie Blocking and More](https://webkit.org/?p=10218); [WebKit bug 237350](https://bugs.webkit.org/show_bug.cgi?id=237350). A WebKit engineer said in 2022 that, for Home Screen apps, only JavaScript-created cookies are capped. I found no 2026 source changing the policy.
- **Safari 17+ quotas and persist().**
  - Origin quota: up to 60% of disk for browser apps.
  - `QuotaExceededError` is thrown when the quota is exceeded.
  - `navigator.storage.persist()` is supported and granted by heuristics, such as being opened as a Home Screen web app.
  - Persistent origins and origins with an active page are excluded from eviction.
  - Eviction is least-recently-used, per origin.
  - Source: [WebKit: Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)
- **Reference docs.**
  - [MDN StorageManager.persist()](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist).
  - [MDN File System API / showSaveFilePicker](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker). Chromium only, Safari and Firefox lack the pickers; background knowledge, not re-verified.
  - [MDN Web Storage limits](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria). About 5 MiB per origin for localStorage in most browsers; background knowledge.

### Inferences
- **(1) Do now, about 2 hours.**
  - Make `save()` surface failures: catch `QuotaExceededError` and toast once.
  - Call `navigator.storage.persist()` after the first completed pomodoro, which is a sign of engagement, and show `persisted()` in Jogo → Dados.
  - Add "Exportar backup (.json)" (Blob + `<a download>`) and "Importar backup" (`<input type=file>` → `merge()` with validation), with a weekly reminder toast if no backup in 7+ days.
- **(2) Schema, about 2 hours.**
  - Replace the if-chain with `const MIGRATIONS = {2: o=>…, 3: o=>…}`, run in order, and always set `out.v = CURRENT`.
  - Refuse or warn when `o.v > CURRENT` instead of silently down-converting, for example when an old cached service-worker build loads new data.
  - Keep a `dojo-do-foco-v1.bak` copy of the previous save before migrating.
- **(3) Sync without accounts.**
  - The Obsidian vault server already gives local backup on the desktop.
  - The File System Access API (`showSaveFilePicker` + a stored handle in IndexedDB) can auto-write a JSON file into a synced folder, such as iCloud, Dropbox or the Obsidian vault, in Chromium desktop only.
  - A GitHub Gist sync needs a personal token typed by the user. That works, but it means token handling and is not account-free.
  - CRDT and local-first libraries (Automerge, Yjs) are overkill for one-user, one-blob state; last-writer-wins by `_savedAt` (already stored, index.html:910) is enough.
- **Storage growth.** About 1 KB per active day means localStorage limits are years away. But `JSON.stringify(S)` of the whole state every 10 s costs main-thread time that grows over time; consider saving only when dirty.

### Gaps
- I did not find a 2026 WebKit statement on whether the 7-day cap still exists unchanged.
- I did not verify current File System Access support in Safari and Firefox.
- I did not measure real save sizes, because I did not inspect user data.

---

## 5. Testing and maintainability for a single 260 KB HTML file

### Takeaway
There are no tests, no lint and no CI. `package.json` has only `start` and `build` and no dependencies. The single IIFE (index.html:660-3405) is maintainable only by grep. The low-risk path:
- add Playwright smoke and visual tests against `npm start` and `dist/`, plus ESLint on extracted JS;
- run GitHub Actions on PRs, and use Netlify Deploy Previews for manual review;
- split into native ES modules gradually.

Splitting must keep the claude.ai single-file publish path working (`wrapPage` assumes a head-less HTML body, lib/page.js:1-3), so `build.js` should inline the modules back into one file.

### Cited Findings
- **Code: structure.** Everything is in one `<script>` IIFE starting at index.html:659. The app depends on the `window.claude` hot-reload hooks (index.html:3390, :3405), and the README and `decisoes/2026-11-22-separacao-criacao-desenvolvimento.md` describe a create/develop split. `scripts/build.js` copies and wraps only (build.js:13).
- **Playwright visual comparisons.**
  - `await expect(page).toHaveScreenshot()` creates a baseline on the first run.
  - `threshold` sets per-pixel color sensitivity, from 0 to 1, default 0.2. `maxDiffPixels` sets how many pixels may differ.
  - Baselines are platform-specific (for example `chromium-darwin`), so generate them in the CI environment.
  - Update with `--update-snapshots`.
  - Source: [Playwright: Visual comparisons](https://playwright.dev/docs/test-snapshots)
- **Reference docs.** Netlify Deploy Previews build every PR at a unique URL. — [Netlify docs: Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/) (reference doc). Also [Playwright CI on GitHub Actions](https://playwright.dev/docs/ci-intro) (reference doc).

### Inferences
- **Determinism for canvas tests.** The scene is animated, random-spawned and time-of-day dependent (index.html:1585 onward use `Math.random`, `performance.now`). For stable screenshots:
  - Use `page.clock.install()`/`setFixedTime` (Playwright clock API) and emulate `reducedMotion: 'reduce'`, which already disables most particles.
  - Seed `Math.random` through `addInitScript`.
  - Set `cfg.bg3d=false` and `cfg.sky` to a fixed value through a pre-seeded localStorage state.
  - Mask `#clockPill`.
  - Use `maxDiffPixels` of a few hundred. Snapshot one frame per realm (`SCENES`) and per phase.
- **Smoke tests, about 6 hours.**
  - Boot with no errors in the console.
  - Start the focus timer with a fast-forwarded clock, then complete it: XP rises and the review dialog appears.
  - Add a mission and a step.
  - Reload: the state persists.
  - Import and export round-trip.
  - Server: PUT `/api/state` writes `_dados/dojo-save.json` in a temp vault (`DOJO_VAULT` env, server.js:21).
  - axe-core scan on each tab.
- **Lint.** ESLint flat config with `eslint-plugin-html` lints inline scripts without splitting; add Prettier optionally. Effort about 1-2 hours, plus fixing findings.
- **Module split, 2-4 days, incremental.**
  - Move to `src/` files (`state.js`, `timer.js`, `audio.js`, `scene/*.js`, `three3d.js`, `ui/*.js`, `weather.js`) as native ES modules with `<script type="module">`.
  - Use esbuild, one zero-config dependency, or a 30-line concat script in `build.js` to produce the single-file `index.html` for claude.ai and Netlify.
  - Start with the pure logic (state, `merge`, XP formulas), which can then get fast unit tests with `node --test`, no framework.
- **CI.** GitHub Actions on PRs: `npm ci`, `npm run build`, `npx playwright test`, and `eslint`. Netlify builds the deploy preview in parallel; optionally run Playwright against the preview URL.

### Gaps
- I did not verify the current Playwright clock API names or `toHaveScreenshot` options (`animations`, `mask`); the fetched doc page did not cover them.
- I did not check whether GitHub Actions macOS runners are needed to match the author's darwin baselines.

---

## 6. Security and privacy: CSP on Netlify, geolocation, local server endpoints

### Takeaway
The local server is the most serious issue in the whole audit:
- `PUT`/`POST /api/state` accepts any body from any origin. It never checks `Origin`, `Host` or `Content-Type`.
- It writes `Resumos/<dayKey>.md` using the unvalidated day key, which allows path traversal.

A malicious web page could therefore send a "simple" cross-origin POST to `127.0.0.1:4321`, overwrite the save, and write `.md` files outside the vault. Chrome 142's Local Network Access prompt now partly mitigates this, but other browsers and older Chrome versions do not.

The Netlify site has basic headers but no CSP. A CSP is feasible but needs `'unsafe-inline'` or hashes, because all CSS and JS are inline.

### Cited Findings
- **Code: write endpoint.** server.js:190-210: `/api/state` handles GET, and PUT/POST with `JSON.parse(await readBody(req))`. There is no check of `req.headers.origin`, `host`, or `content-type: application/json`. A `fetch(url, {method:'POST', mode:'no-cors', body: JSON.stringify(...)})` from any site uses `text/plain`, a CORS-safelisted type, so it needs no preflight and the server will process it.
- **Code: read endpoint.** GET returns the full state, including notes, distractions and missions. Without CORS headers, other origins cannot read it. But because `Host` is not validated (server.js:191 uses `req.headers.host` only to build the URL), a DNS-rebinding page could read it.
- **Code: path traversal.**
  - `writeNotes` does `path.join(VAULT, 'Resumos', `${k}.md`)` for every key `k` of `state.days` (server.js:128).
  - Keys are never validated against `/^\d{4}-\d{2}-\d{2}$/`, so `k = "../../../../Desktop/x"` escapes the vault (Node's `path.join` resolves `..`).
  - Character file names do go through `safeName` (server.js:35), which strips `/\:` and other unsafe characters.
  - The `.md` suffix limits the impact, but content is attacker-controlled Markdown, so this is still arbitrary file creation in the user's home.
- **Code: what is already right.** The server binds to `127.0.0.1` (server.js:218), caps the body at 8 MB (server.js:25, :184), writes atomically with tmp+rename (server.js:28-34), and sends `Cache-Control: no-store`. 8 MB is generous for about 100 KB of state; 1 MB would do.
- **Chrome Local Network Access.**
  - Chrome 142 gates requests from public sites to loopback and local addresses behind a permission prompt; the permission is split into `loopback-network` and `local-network`.
  - Pages served from `http://localhost` itself are not affected.
  - LNA permission is auto-denied in insecure `http://` top-level contexts.
  - Sources: [Chrome blog: Local Network Access](https://developer.chrome.com/blog/local-network-access); [Chrome guide](https://developer.chrome.com/docs/modern-web-guidance/guides/security/local-network-access); [blink-dev intent](https://groups.google.com/a/chromium.org/g/blink-dev/c/cwu_RUmBpzY)
- **Netlify headers today.** `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy: geolocation=(self), camera=(), microphone=()` (netlify.toml:12-16). There is no `Content-Security-Policy`, no `Strict-Transport-Security` (Netlify serves HTTPS, but HSTS is opt-in), and no `frame-ancestors`. — [Netlify docs: Custom headers](https://docs.netlify.com/routing/headers/) (reference doc); [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (reference doc)
- **External origins the CSP must allow.**
  - `script-src`: the inline script and `https://cdnjs.cloudflare.com` for the dynamic `import()` (index.html:2316).
  - `style-src`: inline `<style>` plus many `style="…"` attributes and `fonts.googleapis.com`.
  - `font-src`: `fonts.gstatic.com`.
  - `connect-src`: `api.open-meteo.com` and `geocoding-api.open-meteo.com` (index.html:2773, :2778).
  - `img-src`: `data:` for the favicon.
- **SRI for the three.js module.** A dynamic `import()` cannot carry an `integrity` attribute, but import maps can declare `integrity` per module URL. Chrome 127+ supports this, Firefox supports module integrity (bug 1945540), and WebKit landed SRI for module scripts. Unsupported browsers ignore the field. — [JSPM: integrity with import maps](https://jspm.org/js-integrity-with-import-maps); [Shopify Engineering](https://shopify.engineering/shipping-support-for-module-script-integrity-in-chrome-safari); [caniuse importmap integrity](https://caniuse.com/mdn-html_elements_script_type_importmap_integrity)
- **Geolocation.** It is requested only on button click (`#wxGeo`, index.html:596, `askPosition` at index.html:2760, 12 s timeout, 30 min `maximumAge`). It is disabled in the claude.ai embed (`CAN_GEO`, index.html:2750). The coordinates are sent only to Open-Meteo and stored in `S.wx.lat/lon` in localStorage and in the vault JSON. The city name goes to the Open-Meteo geocoding URL as a query parameter (index.html:2773). That is acceptable but deserves a one-line privacy note in the UI.

### Inferences
- **Server fix, about 1 hour.**
  - Reject writes unless the `Origin` header is absent or equals `http://localhost:${PORT}` or `http://127.0.0.1:${PORT}`.
  - Require `Content-Type: application/json`. This forces a CORS preflight for cross-origin callers, and the server never answers preflights. `sendBeacon` with an `application/json` Blob from the same origin is fine.
  - Validate `Host` against `localhost`/`127.0.0.1` to block DNS rebinding.
  - Validate day keys with `/^\d{4}-\d{2}-\d{2}$/` and assert `path.resolve(file).startsWith(VAULT + path.sep)` before every write.
  - Lower `MAX_BODY` to 1-2 MB.
  - Optionally require a random token printed at startup and passed through `?k=` on first load, then stored.
- **CSP on Netlify, about half a day.** Start with `Content-Security-Policy-Report-Only` so nothing breaks. Example, with the hashes generated by build.js:
  ```
  default-src 'self'; script-src 'self' 'sha256-…' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self' https://api.open-meteo.com https://geocoding-api.open-meteo.com; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'
  ```
  - Notes on the policy: `'self'` keeps the module and service-worker scripts allowed; `'unsafe-inline'` covers the `style=` attributes; `form-action 'self'` covers forms that use `type=submit`.
  - Self-hosting three.js and the fonts (section 1) shrinks this to `'self'` plus Open-Meteo.
  - Add `Strict-Transport-Security: max-age=31536000`.
- **innerHTML.** The app uses `innerHTML` with an `esc()` helper (index.html:665) consistently on user strings, from what I sampled (index.html:2958-3043). I found no obvious XSS, but the CSP is the backstop. A future Trusted Types policy is possible in Chromium only.

### Gaps
- I did not verify whether Firefox or Safari shipped Local Network Access or Private Network Access restrictions by late 2026.
- I did not test the CSRF exploit end-to-end; the analysis comes from reading the code and the CORS simple-request rules.
- I did not confirm the exact Safari version supporting import map `integrity`.

---

## 7. Performance leftovers after the 2026-11-22 fix

### Takeaway
The recent fix already covered the main costs:
- canvas capped at 3× and 30 fps;
- 3D at 25 fps;
- `backdrop-filter` removed;
- the scene is not drawn under the realm view;
- `dispose()` on realm change;
- an automatic `PERF` light mode.

What is left is smaller:
- `shadowBlur` neon text and boxes on every frame;
- three.js loading from the CDN on every cold start, with no preload or cache control;
- textures and helpers that may never be freed;
- whole-state `JSON.stringify` every 10 s;
- rendering continuing while the tab is hidden.

### Cited Findings
- **The fix itself** (decisoes/2026-11-22-desempenho.md):
  - scene canvas reduced from 2000×900 to 1200×540 (max 3×), at 30 fps;
  - 3D at 25 fps;
  - blur removed;
  - textures freed with `dispose()`;
  - `PERF` levels 1 and 2 entered automatically when fps stays under 18 in two windows of 3 s;
  - `renderer.render` dropped from about 125 ms to about 6 ms;
  - published site measured at 58.5 fps (clear) and 47.9 fps (storm, p95 33.4 ms) on an Intel UHD 630.
  - The record notes that 1× rendering was rejected because `shadowBlur` neon text gets jagged.
- **Code: shadowBlur.** It is used in the text-neon helper and `neonBox` (index.html:1506, :1508), window glow `shadowBlur = 12*k` (index.html:1514) and an ice glow (index.html:1643). On a 3×-scaled 2D context, `shadowBlur` is a Gaussian blur per draw call, applied every 33 ms. — [MDN: Optimizing canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas) (reference doc; it recommends pre-rendering to an offscreen canvas and avoiding `shadowBlur`)
- **Code: 3D teardown.** `dispose()` covers geometry and materials on world rebuild (index.html:2601). Whether it disposes `material.map` textures (`dotTex()`, `moonTex()`) and the rain `LineSegments` geometry (index.html:2611) cannot be seen from the truncated line, so it needs checking. three.js does not free textures when a material is disposed. — [three.js manual: How to dispose of objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects) (reference doc)
- **Code: hidden tabs.** `frame()` re-schedules through `requestAnimationFrame` (index.html:2694-2695). rAF is paused in hidden tabs by every browser, so hidden-tab cost is low already. `perfSample` correctly ignores hidden or throttled gaps.

### Inferences
- **Glow cache.** Pre-render each neon label and glow once into a small offscreen canvas, keyed by text, color and scale, and `drawImage` it per frame. This cuts the per-frame blur cost to roughly zero and keeps the anti-aliasing quality the decision record wanted. Effort: 2-4 hours.
- **three.js loading.**
  - Add `<link rel="modulepreload" href="…three.module.min.js" crossorigin>` only when `cfg.bg3d` is on, or start the import during idle time.
  - Cache it in the service worker (section 1).
  - The minified module is roughly 600-700 KB (background knowledge, not verified for 0.170). If only a subset is used, a tree-shaken esbuild bundle of the used classes (WebGLRenderer, Scene, PerspectiveCamera, a few Materials, Geometries and Lights) could cut it substantially.
  - Effort: preload 15 minutes, bundle 2-3 hours.
- **Memory.** Run a heap snapshot after cycling through all realms 3 times in Chrome DevTools. Use `renderer.info.memory.textures` and `.geometries` as a cheap leak check, and assert it in a Playwright test. Effort: 1 hour.
- **Saving.** Compare a cheap dirty flag instead of serializing every 10 s (index.html:3403). `vaultSave` already stringifies twice (index.html:919-922).
- **OffscreenCanvas in a Worker.** It could move the 2D scene off the main thread. It is overkill now that the JavaScript costs about 3 ms per frame, as the decision record notes.

### Gaps
- I did not profile memory and did not read the full dispose routine (index.html:2601 is truncated in my view).
- I did not verify the exact three.js 0.170 module size.

---

## 8. Internationalization (pt-BR only) and SEO / social preview

### Takeaway
All UI strings are hard-coded in Portuguese inside HTML and template literals. Japanese glyphs are decorative. `lang="pt-BR"` exists only in the wrapper (lib/page.js:21). There are no Open Graph or Twitter tags, no canonical link and no og:image, so shared links show no preview. Adding OG tags is a 30-minute win. Full i18n is a multi-day refactor best done together with the module split.

### Cited Findings
- **Head metadata.** `wrapPage` emits `<title>` (from index.html:1), a pt-BR `meta description` and `theme-color` only (lib/page.js:21-25). A grep for `og:`, `twitter:`, `manifest` and `apple-touch` found nothing.
- **Hard-coded locale.**
  - Dates are built by hand with `pad()` (index.html:668-670).
  - Weather is requested with `language=pt` (index.html:2773).
  - Server-side notes hard-code Portuguese labels (server.js:42-52) and `dd/mm/yyyy` (server.js:40).
- **The `lang` attribute.** It is a WCAG 3.1.1 requirement, and the Japanese fragments ideally get `lang="ja"` (3.1.2 Language of Parts), for example on the `.jp` spans. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (reference doc)
- **Open Graph.** The protocol needs `og:title`, `og:type`, `og:image` and `og:url`. A 1200×630 image is the common large-card size. — [ogp.me](https://ogp.me/) (reference doc)

### Inferences
- **SEO and social, about 30-60 minutes.**
  - In `wrapPage`, add `og:title`, `og:description`, `og:image` (an absolute URL on the Netlify domain), `og:url`, `og:locale=pt_BR`, `twitter:card=summary_large_image` and `<link rel="canonical">`.
  - Make the og:image a 1200×630 PNG from `docs/banner.png` and copy it to `dist/` in build.js.
  - Add `lang="ja"` to `.jp` spans.
- **i18n, 2-4 days.**
  - Extract the strings into a `pt-BR` dictionary object with a `t(key, vars)` helper.
  - Use `Intl.DateTimeFormat` and `Intl.PluralRules` instead of manual `pad` and the `st === 1 ? 'dia' : 'dias'` pattern (index.html:2817).
  - Derive the language from `navigator.language` with a setting override, and set `document.documentElement.lang` accordingly.
  - Do it after or alongside the module split (section 5), since the strings live in about 3,000 lines of template literals.
  - The vault notes generated by the server would need the same dictionary, which is a good reason for a shared `src/i18n/pt-BR.js` used by both `server.js` and the client.

### Gaps
- I did not look at what Netlify domain or URL is used, so the absolute og:image URL is unknown.
- There is no evidence of demand for other languages; prioritization depends on the author's audience.
