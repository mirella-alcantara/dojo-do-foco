# Trends in study, focus and productivity apps (2025–2026) and opportunities for Dojo do Foco

Research date: 2026-11-22. Most sources are trade press, Steam listings, app store pages and third-party trackers. Revenue and unit figures from trackers (Gamalytic, AppMagic, Game Revenue Data, Adapty) are modeled estimates, not official numbers.

## 1. Which mechanics went mainstream in 2025–2026 (virtual pets, app blocking, Live Activities, co-studying, desktop companions)?

### Takeaway
The two mechanics that clearly broke out were (a) a **companion that only progresses while you focus** (Focus Friend, July/August 2025, in the line of Finch) and (b) the **"desktop companion" / bottom-of-the-screen idler** on Steam, which became an official Steam tag and its own festival. On iOS, Screen Time blocking plus a Live Activity on the Lock Screen and Dynamic Island is now standard for focus timers. Co-studying (body doubling) is an established niche, not a new breakout.

### Cited Findings
- **Focus Friend** (Hank Green + Honey B Games / Bria Sullivan) soft-launched in July 2025 and reached No. 4 among all free apps and No. 2 in Productivity on the US App Store by mid-August 2025. Its bean companion knits only while you avoid distracting apps. On iOS, "Deep Focus Mode" uses Screen Time to block the apps you choose. Finished sessions earn "socks" (points) that buy room decorations. Coverage compares it to Finch and to Tamagotchi — [TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/hank-greens-focus-friend-app-is-climbing-the-app-store-charts-and-its-extremely-cute)
- The growth came largely from the Green brothers' own posts on Threads, TikTok and YouTube. A creator's audience was the distribution channel — [TechCrunch](https://techcrunch.com/2025/08/18/hank-greens-focus-friend-app-is-climbing-the-app-store-charts-and-its-extremely-cute); [NBC News](https://www.nbcnews.com/tech/tech-news/hank-green-focus-friend-app-rcna225967)
- Product Hunt lists Focus Friend's launch as 2025-08-21, while NBC says July. July was probably the soft launch and August the wider push — [Product Hunt](https://www.producthunt.com/products/focus-friend-by-hank-green/launches); [NBC News](https://www.nbcnews.com/tech/tech-news/hank-green-focus-friend-app-rcna225967)
- **Finch** (self-care bird pet, older than 2025) remains the reference point. Third-party estimates put it around $1M/month in revenue and 600k+ downloads/month. AppGoblin shows 42.1M installs and a 4.95 rating. None of these figures is dated, and the methods are not stated — [Adapty paywall library](https://adapty.io/paywall-library/finch/); [AppGoblin](https://appgoblin.info/apps/1528595748)
- **Desktop companions on Steam:** PC Gamer named the "desktop pet renaissance" the most surprising cozy trend of the year. Valve added an official "Desktop Companion" tag, and Steam sells a "Bottom of your screen" bundle — [PC Gamer](https://www.pcgamer.com/games/the-most-surprising-cozy-game-trend-this-year-was-the-desktop-pet-renaissance); [ComicBook.com](https://comicbook.com/gaming/list/5-best-desktop-companion-games-to-try-now-that-its-a-steam-tag-official-genre/)
- Valve ran a dedicated **Steam Idler Fest** from February 3 to 10, 2025 — [GamerBraves](https://gamerbraves.com/steam-idler-fest-is-coming-february-3-celebrate-the-art-of-passive-gaming); [GamingOnLinux](https://www.gamingonlinux.com/2025/02/heres-all-the-steam-sales-and-fests-for-2025/page=1/)
- The genre is getting crowded. PC Gamer ran a "Steam Week in Review" headlined "54 idle games released on Steam last week, and many look eerily similar" — [PC Gamer](https://pcgamer.com/gaming-industry/steam-week-in-review-54-idle-games-released-on-steam-last-week-and-many-look-eerily-similar)
- The 2025 wave included Ropuka's Idle Island (January 2025), My Little Life, and Tiny Pasture (launched 2025-02-18 with 5,640 concurrent players within hours). Rusty's Retirement fell from 20k+ concurrent players at launch to about 2k — [Gamepressure, 2025-02-18](https://www.gamepressure.com/newsroom/from-rustys-retirement-to-tiny-pasture-the-new-wave-of-desktop-bu/z679b4)
- **iOS integrations as standard:** Opal advertises Lock Screen and Dynamic Island Live Activities for timers and unblocks, built on Apple's Screen Time API. Small timers (SeedFocus, OpenFocus) also list Screen Time blocking and a Dynamic Island countdown — [Opal on the App Store](https://apps.apple.com/us/app/1497465230); [SeedFocus](https://apps.apple.com/app/id6810488625); [OpenFocus](https://apps.apple.com/app/openfocus/id6767189250)
- **Co-studying / body doubling:** Flow Club (hosted groups, roughly 1,700–2,000 sessions a week), Focusmate (one-on-one pairing, the original) and StudyStream (iOS app) are the established players. The Smithsonian reported that Flow Club quadrupled its users after 2023 (pre-2025 data) — [Smithsonian](https://www.smithsonianmag.com/innovation/can-virtual-coworking-platforms-make-us-more-productive-180984439/); [StudyStream App Store](https://apps.apple.com/us/app/studystream/id6461722416?uo=4)
- On Steam, "social body-doubling" and "parasocial co-working" are two of the four archetypes of productivity games. On-Together: Virtual Coworking is the example given — [OP Game Marketing, 2026-02-13](https://opgamemarketing.substack.com/p/the-rise-of-productivity-games-on)

### Inferences
- Dojo already has the core of the winning formula: a companion, progression and a cozy environment. What it lacks compared with Focus Friend is the **direct link between the companion's state and focus**: the companion does something visible only while the timer runs, and it "suffers" or pauses when you leave the tab. A web app can approximate this with the Page Visibility API, and there is no Screen Time on the web.
- Live Activities and Screen Time need a native iOS app, so they are out of reach for a single HTML file. The cheap web equivalents are: a **PWA with notifications**, a **favicon/tab title with a countdown**, and the **Document Picture-in-Picture API** (Chrome) for a small floating timer window. That last one is a web version of the desktop companion.
- The "bottom of the screen" format is the most direct bridge between Dojo and Steam. A small PiP window or strip mode with the companion and the timer would deliver that experience without leaving the web.

### Gaps
- No reliable 2025–2026 data on **wearables** (Apple Watch / Wear OS) in study apps.
- No 2025–2026 download figures for Forest or Focus Friend beyond the chart ranking.
- No confirmation of widely adopted 2025 Dynamic Island features beyond what app stores list.

## 2. How are AI features being used in study apps, and what do users think?

### Takeaway
AI that generates flashcards and quizzes from notes or PDFs (Knowt, Quizlet, Gizmo, StudyFetch) and AI task breakdown for ADHD (Goblin Tools, Tiimo) became table stakes in 2025. At the same time, student and Gen Z sentiment toward AI worsened through 2026: heavy use alongside distrust, fatigue with "AI features nobody asked for", and worry about learning less.

### Cited Findings
- **Knowt** sells itself as an "AI Flashcards & Notes" alternative to Quizlet. It claims 4M students, generates flashcards and practice tests from uploaded notes, and imports Quizlet sets. These are vendor claims — [App Store](https://apps.apple.com/us/app/id6463744184); [SourceForge](https://sourceforge.net/app/knowt/)
- Gizmo turns PDFs, slides, YouTube videos, notes and handwriting into flashcards and quizzes. The source is an affiliate-style comparison — [Blaze Today, 2026](https://blaze.today/blog/knowt-alternatives/)
- The HEPI Student Generative AI Survey (2025), as cited by a secondary source, found that 92% of UK undergraduates use AI tools, up from 66% the year before. The original was not checked — [Guideflow](https://www.guideflow.com/blog/study-tools)
- **Goblin Tools** (Magic ToDo): a free AI tool that breaks tasks into steps for neurodivergent users, with no login. It has an official iOS app called "Goblin Tools - AI ADHD Planner". Critics note it handles only one-off breakdowns and does nothing for routine or time blindness — [App Store](https://apps.apple.com/us/app/id6739871366); [Mutra comparison](https://mutra.pages.dev/compare/versus/goblin-tools-vs-tiimo)
- **Tiimo** (visual planner for neurodivergent users) added AI planning that turns a prompt into a plan with steps. A secondary source says it won Apple's iPhone App of the Year in 2025. This should be checked against Apple's list. Pricing reported at about $54/year — [Tiimo](https://tiimoapp.com/kr/resource-hub/ai-planner); [Habi](https://habi.app/insights/best-adhd-planner-apps/)
- **Sentiment:** a Quizlet report says about 85% of students use AI for school work, but only 25% of students see AI positively, against 47% of teachers and parents. At Brown, 88% of undergraduates worry about the effect on their learning. Lumina-Gallup (2026): 57% of US college students use AI weekly — [Stacker](https://stacker.com/stories/higher-ed/ai-hype-fades-students-still-want-smarter-study-tools); [Yahoo/The Conversation](https://www.yahoo.com/news/university-students-feel-anxious-confused-123430744.html)
- Gallup / Walton Family Foundation (April 2026): Gen Z excitement about AI fell 14 points in a year, and anger rose 9 points — [Stacker](https://stacker.com/stories/higher-ed/ai-hype-fades-students-still-want-smarter-study-tools)
- A Hacker News thread titled "I'm drowning in AI features I never asked for and I hate it" got 300+ points. Decrypt's reading: users are "anti-bad-product", not anti-AI, and they want an opt-out — [Decrypt](https://decrypt.co/346170/ai-backlash-sophisticated-users-getting-sick-techs-latest-obsession?amp=1&rand=52368)
- Critics worry that apps like Turbo AI become a shortcut that removes the "desirable difficulty" of learning. Summaries can also hallucinate — [OPB/NPR, 2025-08-07](https://www.opb.org/article/2025/08/07/so-long-study-guides-the-ai-industry-is-going-after-students/); [Fast Company](https://www.fastcompany.com/91224589/are-ai-study-aids-cheating)

### Inferences
- For Dojo, which is free, has no backend and runs on Netlify, built-in LLM features carry an API cost and a privacy question, and they would compete with Knowt and Quizlet on their home ground. A better fit is **optional, user-controlled AI**: "bring your own key", or simply a "copy prompt" button that generates a task-breakdown prompt to paste into the user's own chatbot. Being "AI-free by default" can itself be a selling point for an audience worn out by AI.
- Task breakdown is the AI feature that best matches the ADHD-friendly design. A non-AI version (manual "next tiny step" templates, quest checklists) already covers much of the value.
- Flashcards from Obsidian notes would be the clearest differentiator (see section 4), but they can be done with classic spaced repetition (SM-2), no LLM needed.

### Gaps
- No neutral study measuring how much people use or keep using AI features inside study apps specifically.
- No data on AI in Brazilian study apps.

## 3. Cozy, pixel-art and lofi aesthetics: what is popular and how it makes money

### Takeaway
Cozy, cute productivity games on Steam proved there is a paying audience. Spirit City: Lofi Sessions and Rusty's Retirement are both estimated in the millions of dollars. The monetization that works is a low price ($7–12), cosmetic DLC and supporter packs, bundles and Steam festivals. Free-to-play is common among the solo "focus companions" (Virtual Cottage, Chill Corner).

### Cited Findings
- **Rusty's Retirement** (solo dev Jordan Morris, released 2024-04-26, pre-2025): priced at $7, with about 140k wishlists before launch. It sold 100k copies in 5 days and about 330k on Steam by August 2024, netting about $5 per unit. It launched just before Steam's Farming Fest. A $4 "Supporter Pack" DLC sold 36k units (about 11% attach rate, about $111k). Asia was more than 45% of sales (26% China, 10% Japan), and it launched in 11 languages — [GameDiscoverCo](https://newsletter.gamediscover.co/p/how-rustys-retirement-idle-farmed)
- Later estimates vary: about 550k–600k copies per press reports, and about 1M copies / $4.4M modeled by a third-party tracker — [EGW News](https://egw.news/gaming/news/29021/rustys-retirement-dev-still-on-the-same-pc-after-h-o0pqqw1yB); [Game Revenue Data](https://gamerevenuedata.pages.dev/games/rustys-retirement/)
- Its marketing ran on Twitter, Instagram Reels and TikTok, plus a stream by Pirate Software in which Twitch viewers spawned on the farm. Because the game was not full screen, streams were tagged "Just Chatting" — [GameDiscoverCo](https://newsletter.gamediscover.co/p/how-rustys-retirement-idle-farmed)
- **Spirit City: Lofi Sessions** (Mooncube Games, released 2024-04-08): a "gamified focus tool" with a lofi soundtrack, priced at $11.99. It has "Overwhelmingly Positive" reviews (about 14.8k in all languages). New DLC kept coming in 2025, including Cozy Kitchen (2025-07-18) and "All Aboard!" — [Steam](https://store.steampowered.com/app/2113850/Spirit_City_Lofi_Sessions/); [SteamDB](https://steamdb.info/app/2113850)
- AppMagic estimates Spirit City and Cast n Chill have each passed $5.3M — [AppMagic, Idle Games 2026](https://appmagic.rocks/blog/idle-steam-games-2026)
- One study (data from 2026-02-05/06) found 34 productivity games on Steam, excluding idlers. Nine have more than 500 reviews and three passed $1M. Spirit City leads with 19+ bundles and 5 DLCs. Virtual Cottage 2 had 58,026 wishlists for 2026. Virtual Cottage and Chill Corner are free. What works: polish, cute art, calm music, selling the fantasy of "finally getting it done" rather than a feature list, bundles and DLC, a Discord for sharing rooms, frequent updates, and cozy press and creators — [OP Game Marketing, 2026-02-13](https://opgamemarketing.substack.com/p/the-rise-of-productivity-games-on)
- The four archetypes in that study: solo focus; gamified habit tracker with customization; social body-doubling; parasocial co-working — [OP Game Marketing](https://opgamemarketing.substack.com/p/the-rise-of-productivity-games-on)
- Focus Friend monetizes with cosmetic bean skins and Pro at $1.99/month, $14.99/year or $29.99 lifetime, with no ads by design — [TechCrunch](https://techcrunch.com/2025/08/18/hank-greens-focus-friend-app-is-climbing-the-app-store-charts-and-its-extremely-cute); [App Store](https://apps.apple.com/US/app/id6742278016)

### Inferences
- Dojo's look (Japanese pixel art, real weather, lofi in breaks, RPG layer) fits squarely in the "solo focus + gamified customization" archetype that already sells on Steam. The differentiators would be: free on the web, in Portuguese, with Obsidian integration.
- The "Supporter Pack" model (about 11% attach rate on a cheap game) suggests that for a free web app, **cosmetic support packs** (a new realm, a companion skin, a music theme) via Ko-fi or Itch.io are the most natural monetization, and they don't conflict with being open source.
- The Steam market is saturated with idlers (54 in one week). Entering Steam only makes sense with a clear hook, and a desktop version would need Electron/Tauri plus about $100 for the Steam Direct fee (not checked in this research).

### Gaps
- No official 2025–2026 sales figures for Spirit City or Chill Corner (only AppMagic and Gamalytic estimates).
- No indie postmortem specific to *web* focus apps with revenue data.

## 4. Note-taking integrations (Obsidian, Notion): what exists and what is missing

### Takeaway
The Obsidian plugin directory has many Pomodoro timers (Pomodoro Plugin with about 17k downloads, Flexible Pomo with about 14k) and some new gamified plugins (Kuro Gamification, Pomodoro Timer Forest, Grind Manager, Pomodoro Flashcards), but most have few downloads. Nothing found combines **a rich visual/cozy environment + RPG + writing sessions into the vault** the way Dojo does.

### Cited Findings
- **Kuro Gamification**: XP, levels, streaks with freeze tokens, loot drops and optional lore. Anything that could escalate is off by default — [Obsidian Community](https://community.obsidian.md/plugins/kuro-gamification)
- **Pomodoro Timer Forest**: a village grows with your timer. Progress is saved to a data file that syncs with the vault — [Obsidian Community](https://community.obsidian.md/plugins/pomodoro-timer-forest)
- **Grind Manager**: gamified tasks inspired by obsidian-tasks, the pomodoro timer and Habitica — [Obsidian Community](https://community.obsidian.md/plugins/grind-manager)
- **Pomodoro Flashcards**: SM-2 spaced repetition in Markdown plus a built-in Pomodoro — [Obsidian Community](https://community.obsidian.md/plugins/pomodoro-flashcards)
- **Gentle Pomo**: an image shifts from day to night as you focus, and sessions can be logged against Tasks-plugin items. **Thinkers**: writes each session to a Markdown note in the vault — [Gentle Pomo](https://community.obsidian.md/plugins/gentle-pomo); [Thinkers](https://community.obsidian.md/plugins/thinkers)
- Established timers: Pomodoro Plugin (tokuhirom, about 17k downloads) and Flexible Pomo (about 14k), both minimal — [Pomodoro Plugin](https://community.obsidian.md/plugins/obsidian-pomodoro-plugin); [Flexible Pomo](https://community.obsidian.md/plugins/obsidian-flexible-pomo)

### Inferences
- The gap Dojo can fill: **the Obsidian vault as the RPG's save file** (sessions, XP and realms as Markdown or frontmatter readable by Dataview), plus reading `- [ ]` tasks from a note as the session's "quests". Dojo already saves to the vault through a local server, and documenting it well (example Dataview queries) would be cheap and valuable.
- A minimal **Obsidian plugin** that opens Dojo in a pane, or an "Obsidian URI" link, could be a distribution channel into a community that installs plugins. This needs review in the official directory.
- Pairing with flashcards (Pomodoro Flashcards model): use breaks to review cards from the vault without AI.

### Gaps
- Did not research Notion integrations (widgets or embeds of Pomodoro timers in Notion, such as WidgetBox or Indify). Not covered.
- No overall download trend data for Obsidian plugins in 2025–2026.

## 5. Distribution channels for indie study tools

### Takeaway
The proven channels in 2025–2026 are: **creators and short video** (TikTok, Reels, YouTube; Focus Friend and Rusty's Retirement), **Steam themed festivals** (Idler Fest, Farming Fest, Next Fest) and **cozy press and streamers**. Discord Activities have been open to all developers since September 2024 (embedded web apps), which suits a web app. In Brazil, the concurseiro market is already served by cycle and net-hours apps (Gran, Estudaqui, Aprovado, QConcursos with rankings), without a cozy or gamified option.

### Cited Findings
- Focus Friend climbed the charts on its creators' TikTok, Threads and YouTube posts — [TechCrunch](https://techcrunch.com/2025/08/18/hank-greens-focus-friend-app-is-climbing-the-app-store-charts-and-its-extremely-cute)
- Rusty's Retirement: TikTok, Reels and Twitter, a well-timed Steam festival, and a big streamer. Small discounts triggered wishlist emails and sales bumps — [GameDiscoverCo](https://newsletter.gamediscover.co/p/how-rustys-retirement-idle-farmed)
- A demo during Steam Next Fest was a "breakout" for an idle game that takes up only part of the screen. PC Gamer ran 45 idle demos from Next Fest at once — [Kotaku](https://kotaku.com/steam-next-fests-most-unlikely-breakout-only-requires-a-fraction-of-your-screen-and-attention-2000639943); [PC Gamer](https://pcgamer.com/games/i-ran-45-idle-game-demos-from-steam-next-fest-all-at-once-for-a-desktop-companion-battle-royale/)
- **Discord Activities**: opened to all developers in September 2024. They are web apps in an iframe using the Embedded App SDK (npm), with in-app purchase options (Durable and Consumable SKUs). The new monetization was limited at first to the US, UK and EU on desktop — [GamesBeat](https://gamesbeat.com/discord-opens-activities-in-app-games-and-features-to-all-developers/); [Discord docs](https://docs.discord.com/developers/activities/overview); [Gigazine, 2024-09-27](https://gigazine.net/gsc_news/en/20240927-discord-new-monetization-feature)
- **Brazil (concursos):** Aprovado (free, timer and study cycles), Gran Gerenciador de Estudos (timer for "net hours"), Estudaqui (cycles or weekly schedule) and QConcursos "Ranking Elite" (paid weekly ranking against people studying for the same exam, page from January 2026). Gamification exists in question apps (Acertei, with levels) — [Ache Concursos](https://www.acheconcursos.com.br/artigos/aplicativos-gratuitos-para-concursos-publicos-87021); [Gran App Store](https://apps.apple.com/us/app/id1535120105); [Estudaqui](https://apps.apple.com/br/app/estudaqui-seu-plano-de-estudo/id1445700738); [QConcursos](https://folha.qconcursos.com/n/ranking-elite-ferramenta-de-estudo); [Tecnoblog](https://tecnoblog.net/responde/5-aplicativos-para-estudar-para-concurso-publico/)
- Product Hunt hosts launches of focus apps (Focus Friend, 2025-08-21) — [Product Hunt](https://www.producthunt.com/products/focus-friend-by-hank-green/launches)

### Inferences
- **Discord Activity** is the most natural channel for Dojo: it is already a web app, and it would turn the dojo into a shared study room (body doubling) inside Brazilian study servers. It needs the SDK and a tunnel or server for OAuth, which adds complexity but is feasible for one developer.
- For concurseiros, the vocabulary that sells is "**horas líquidas**" (net hours), "**ciclo de estudos**" (study cycle) and per-subject logging. Adding a mode to log sessions by subject, with weekly totals, speaks to that audience. Being free, with no account and saving to Obsidian, sets Dojo apart from Gran and QConcursos, which are tied to paid courses.
- On TikTok/StudyTok, the format that fits Dojo is "study with me" with the Dojo on screen (rain, sunset, lofi). It costs nothing to make and serves as a demo of the product.
- A PWA (installable, offline) and a "mini window" mode are the cheap web versions of the desktop companion.

### Gaps
- No 2025–2026 data on the **Brazilian StudyTok** (top creators, "estude comigo" formats) or on r/concursospublicos and Telegram groups.
- No data on how effective **Chrome extensions** or **PWAs** are as a channel for focus apps in 2025–2026.
- Product Hunt: no data on results for study tools specifically.

## 6. Business models that work for indie focus apps

### Takeaway
What has worked: (1) a cheap one-time purchase on Steam ($7–12) plus cosmetic DLC and supporter packs; (2) free plus cosmetics and an optional subscription or lifetime deal (Focus Friend: $1.99/month, $14.99/year, $29.99 lifetime, no ads); (3) free-to-play on Steam for solo companions. Not enough sourced data was found on Ko-fi or Patreon or on open source as a revenue model.

### Cited Findings
- Rusty's Retirement: $7, about $5 net per unit, a $4 Supporter Pack with about 11% attach rate (about $111k) — [GameDiscoverCo](https://newsletter.gamediscover.co/p/how-rustys-retirement-idle-farmed)
- Spirit City: $11.99 base price, 5 DLCs, 19+ bundles, an estimated $5.3M+ — [Steam](https://store.steampowered.com/app/2113850/Spirit_City_Lofi_Sessions/); [OP Game Marketing](https://opgamemarketing.substack.com/p/the-rise-of-productivity-games-on); [AppMagic](https://appmagic.rocks/blog/idle-steam-games-2026)
- Focus Friend: free, with cosmetic skins and Pro ($1.99/month, $14.99/year, $29.99 lifetime). Green says "the mobile ad ecosystem kinda blows" — [NBC News](https://www.nbcnews.com/tech/tech-news/hank-green-focus-friend-app-rcna225967); [TechCrunch](https://techcrunch.com/2025/08/18/hank-greens-focus-friend-app-is-climbing-the-app-store-charts-and-its-extremely-cute)
- Virtual Cottage and Chill Corner are free-to-play on Steam — [OP Game Marketing](https://opgamemarketing.substack.com/p/the-rise-of-productivity-games-on)
- Goblin Tools: the web version is free, and the mobile app is paid separately (vendor data) — [App Store](https://apps.apple.com/us/app/id6739871366)

### Inferences
- For Dojo (free, open source, web): **free core + optional cosmetic support** (Ko-fi, Itch.io "pay what you want" with a cosmetic pack or an exclusive realm) follows the Supporter Pack pattern without paywalling features. Steam with a $5–7 Electron/Tauri build would be the next step only after there is an audience (wishlists), given how crowded the genre is.
- Being "no ads, no account, no AI by default, your data in your own vault" is a positioning that matches the 2025–2026 fatigue (section 2) and the privacy appeal of Obsidian users.

### Gaps
- No sourced 2025–2026 postmortems on Ko-fi or Patreon revenue for focus apps.
- No data on open source as a lever (GitHub Sponsors) for productivity apps.
