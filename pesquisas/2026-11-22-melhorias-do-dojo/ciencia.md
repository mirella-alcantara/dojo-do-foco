# Scientific evidence for designing an ADHD-friendly, gamified Pomodoro study app (Dojo do Foco)

Evidence-strength legend used below: **[MA]** meta-analysis / systematic review; **[RCT]** randomized controlled trial; **[EXP]** single controlled experiment (often small); **[OBS]** observational / field; **[PRE]** preprint, not peer-reviewed; **[IND]** industry / company material; **[ANEC]** anecdote or popular claim. Items marked "(from memory, DOI link, not re-fetched this session)" are well-known papers cited via DOI that I did not re-open during this research pass. The report writer should treat them as slightly less verified.

## 1. Pomodoro / structured breaks: what do controlled studies say?

### Takeaway
Fixed, timer-driven breaks beat purely self-regulated breaks on mood (fatigue, distraction, motivation) in one small field study (Biwer et al. 2023). A 2025 follow-up found no difference in task completion between Pomodoro, Flowtime and self-regulated breaks, and fatigue rose faster under strict 25/5. Microbreaks reliably raise vigor and lower fatigue (small effects, d ≈ 0.35), but their effect on cognitive performance is not significant. So the evidence supports "structured breaks are good for how you feel and roughly neutral for output". It does not support the idea that 25/5 is optimal.

### Cited Findings
- **Biwer et al. 2023 [EXP, field, n = 87, 1 day]:** students studied for one real self-study day under three conditions: self-regulated breaks (n = 35), 24-min study + 6-min break (n = 25), or 12 + 3 (n = 27). Self-regulators had longer study sessions and longer breaks, along with higher fatigue and distractedness and lower concentration and motivation. The systematic conditions reached similar task completion in less time, which the authors call mood and "efficiency" benefits. — [PubMed 36859717](https://pubmed.ncbi.nlm.nih.gov/36859717/); [Maastricht CRIS](https://cris.maastrichtuniversity.nl/en/publications/understanding-effort-regulation-comparing-pomodoro-breaks-and-sel)
- **Smits, Wenzel & de Bruin 2025 [EXP, field, online, n = 94 analysed, 93% women, all Dutch psychology students]:** compared self-regulated (n = 25), Pomodoro 4×25/5 (n = 36) and Flowtime (n = 33; self-chosen break timing, with break length scaled to the block: 5 min after ≤25 min, 8 min after 25–50 min, 10 min after >50 min) over 2 h of real study. Results:
  - No overall group differences in fatigue, motivation, productivity, flow or task completion (70.3% / 69.4% / 67.1%, p = .854).
  - Fatigue rose faster in Pomodoro (interaction p = .025). At about 120 min since the last break, Pomodoro fatigue was higher than Flowtime (p = .028).
  - Motivation declined faster in Pomodoro (p = .008) and Flowtime (p = .039) than in the self-regulated condition.
  - Authors: "no one of these break-taking techniques should be more highly recommended over the others."
  - Limitations: single-item measures, break activities not recorded, a homogeneous and possibly underpowered sample. — [PMC12292963](https://pmc.ncbi.nlm.nih.gov/articles/PMC12292963/); [Maastricht CRIS](https://cris.maastrichtuniversity.nl/en/publications/investigating-the-effectiveness-of-self-regulated-pomodoro-and-fl/)
- **The two studies conflict on fatigue.** Biwer found self-regulated breaks produced more fatigue. Smits found Pomodoro produced a faster fatigue increase than Flowtime. Neither found a task-completion advantage for one technique. — [PubMed 36859717](https://pubmed.ncbi.nlm.nih.gov/36859717/); [PMC12292963](https://pmc.ncbi.nlm.nih.gov/articles/PMC12292963/)
- **Albulescu et al. 2022, "Give me a break!" [MA, 22 samples / 19 records, N = 2,335]:**
  - Micro-breaks (≤10 min) increased vigor (d = .36, k = 9, n = 913) and reduced fatigue (d = .35, k = 9, n = 803).
  - The overall performance effect was not significant (d = .16, p = .116, k = 15).
  - Performance benefits appeared for less cognitively demanding tasks (clerical, creative), not for cognitive tasks.
  - In a meta-regression, longer breaks gave larger performance boosts.
  - Small evidence base. — [PMC9432722](https://pmc.ncbi.nlm.nih.gov/articles/PMC9432722/); [BPS Research Digest summary](https://bps.org.uk/research-digest/gimme-microbreak)

### Inferences (design implications)
- **KEEP** structured, timer-led breaks. They offload the "when should I stop?" decision, which is the mood benefit Biwer found and is plausibly larger for ADHD users with weak time monitoring (see §3).
- **CHANGE** the strict 25/5 default into adjustable presets: 25/5, a shorter 15/3 for low-energy days or the "only 5 minutes" start, and a Flowtime-like mode where break length scales with the focus block. The evidence gives no reason to sanctify 25 minutes, and fatigue may build faster under rigid 25/5.
- **ADD** an end-of-block energy and focus check-in (1 tap). Use it to suggest a longer break or ending the session, since fatigue accumulates over about 2 h.
- **AVOID** marketing claims that Pomodoro "boosts performance". Honest framing: it helps you feel less drained and keeps you starting and stopping on time.

### Gaps
- No controlled study found that tests Pomodoro specifically in people with ADHD.
- No study found that compares break activity types (movement vs. phone vs. rest) inside a Pomodoro protocol. Smits et al. explicitly did not record break activities.
- Long-term (weeks or months) studies of Pomodoro use are absent. All studies found cover 1 day or 2 hours.

## 2. Gamification for learning and productivity: points, badges, leaderboards, novelty, overjustification, SDT

### Takeaway
Gamification has small-to-moderate positive average effects on learning. Sailer & Homner 2020: cognitive g = .49, motivational g = .36. Only the cognitive effect is robust in high-rigor studies, and a 2023 meta-analysis puts the effect at g ≈ 0.26. Effects fade after a few weeks in several longitudinal studies. Badges, leaderboards and coins can reduce intrinsic motivation in classroom settings, and expected tangible rewards reliably undermine intrinsic motivation. Design should favor informational feedback, autonomy and competence over controlling, expected, contingent rewards.

### Cited Findings
- **Sailer & Homner 2020 [MA, Educational Psychology Review]:** random-effects estimates found significant effects on cognitive (g = .49, 95% CI [.30, .69], k = 19, N = 1,686), motivational (g = .36, [.18, .54], k = 16, N = 2,246) and behavioral outcomes. Only the cognitive effect was stable in the high-rigor subsplit. Game fiction and social interaction moderated behavioral outcomes, and intervention duration did not significantly moderate behavioral effects. — [Springer](https://link.springer.com/article/10.1007/s10648-019-09498-w); [Open-access PDF (Augsburg)](https://opus.bibliothek.uni-augsburg.de/opus4/files/109056/109056.pdf)
- **2023 meta-analysis (35 interventions, ETR&D):** overall effect small but significant, Hedges' g = 0.257. — [Springer s11423-023-10337-7](https://link.springer.com/article/10.1007/s11423-023-10337-7)
- **Hanus & Fox 2015 [OBS/quasi-experimental, n = 71, 16 weeks, 4 time points]:** students in a course gamified with badges, a leaderboard and coins showed lower intrinsic motivation, satisfaction and empowerment over time than students in a non-gamified course. Through lower intrinsic motivation, they also had lower final exam scores. — [Computers & Education, via dblp](https://dblp.org/rec/journals/ce/HanusF15); [PDF](https://www.smhp.psych.ucla.edu/pdfdocs/gamil.pdf)
- **Novelty effects:**
  - Koivisto & Hamari 2014 [OBS]: in a gamified exercise app, perceived enjoyment, playfulness and usefulness declined with time of use.
  - Rodrigues et al. 2022 [OBS, longitudinal, 14 weeks, CS1 students]: the gamification effect began to decrease after about 4 weeks and recovered somewhat later ("novelty effect" then "familiarization effect"). — [Int J Ed Tech in Higher Ed](https://link.springer.com/article/10.1186/s41239-021-00314-6)
  - Physical-activity gamification [MA, JMIR 2022]: effects persisted but were weaker at an average follow-up of 14 weeks, so they are not purely novelty. — [JMIR 2022 e26779](https://www.jmir.org/2022/1/e26779)
- **Deci, Koestner & Ryan 1999 [MA, 128 studies]:** expected tangible rewards undermined free-choice intrinsic motivation. Effects were d = −0.40 for engagement-contingent, −0.36 for completion-contingent and −0.28 for performance-contingent rewards. Unexpected rewards are not predicted to undermine motivation. Cameron & Pierce (1994) had disputed the size of the undermining effect, and the debate continued in commentaries. — [PubMed 10589297](https://pubmed.ncbi.nlm.nih.gov/10589297/); [Full PDF](https://depts.washington.edu/techdocs/papers/deciExtrinsicRewardsAndIntrinsicMotivation99.pdf)
- **Deci, Koestner & Ryan 2001** restated these findings for education settings. — [SDT PDF](https://www.selfdeterminationtheory.org/SDT/documents/2001_DeciKoestnerRyan.pdf)

### Inferences (design implications)
- **KEEP** XP and levels, framed as informational feedback on effort ("you did 3 focus blocks this week") rather than as controlling evaluation. SDT and cognitive evaluation theory predict that informational feedback supports competence, while controlling rewards undermine autonomy.
- **KEEP, with care, the user-chosen real rewards.** Self-chosen rewards protect autonomy, but they are expected and contingent, which is the pattern that undermined motivation in Deci 1999. Mitigations:
  - frame them as "celebrations" chosen by the user;
  - attach them to effort or showing up (engagement), not to perfect performance;
  - add occasional unexpected surprises (a companion gift or a cosmetic item), which do not undermine motivation.
  - ADHD users have a specific need for immediate rewards (§3), so the trade-off is defensible.
- **AVOID** competitive leaderboards. Hanus & Fox found that leaderboards plus badges plus coins lowered intrinsic motivation. If any social feature is added, make it cooperative, such as group study rooms or shared goals. Social interaction was a positive moderator in Sailer & Homner.
- **ADD** game fiction and narrative. The companion character and dojo story are supported, since game fiction moderated behavioral effects in Sailer & Homner.
- **PLAN FOR NOVELTY DECAY** at about 4 weeks. Rotate content, unlock new realms or scenes, add seasonal events, and let the companion evolve, so motivation does not rely on the same points loop. Gradually shift the emphasis from rewards to self-referenced mastery ("your typical block length grew from 10 to 20 min").
- **AVOID** coins as the main currency of value. Coins were part of the Hanus & Fox bundle that underperformed. Keep coins cosmetic and low-stakes.

### Gaps
- No meta-analysis found that isolates specific elements (badges vs. points vs. narrative) with adequate power. Mekler et al. 2017 is relevant here: points, levels and leaderboards raised performance quantity but did not change intrinsic motivation ([DOI 10.1016/j.chb.2015.08.048](https://doi.org/10.1016/j.chb.2015.08.048), from memory, not re-fetched).
- No gamification studies found that specifically target ADHD adults in a study app.

## 3. ADHD: time blindness, timers, task initiation, implementation intentions, delay aversion, body doubling, noise/music, digital interventions

### Takeaway
- **Robust:** people with ADHD perceive time less accurately and less precisely (g ≈ 0.4–0.66, children and adolescents). They discount delayed rewards more steeply and are delay-averse (g ≈ 0.5).
- **Promising but small:** if-then plans improved inhibition in ADHD children to control levels in lab tasks. White or pink noise gives a small benefit on lab attention tasks for ADHD (g ≈ 0.25), with a negative effect in non-ADHD people.
- **Weak:** body doubling has almost no controlled evidence, and early tests are null or mixed. Digital ADHD interventions show modest benefits from few RCTs. App-delivered (mHealth) interventions were non-significant in one pooled analysis.

### Cited Findings
- **Time perception:**
  - Zheng et al. 2020/2022 [MA, 27 studies, children and adolescents]: ADHD groups perceived time less accurately (g > 0.40) and less precisely (g = 0.66), and tended to overestimate time. — [J Atten Disord summary, CADDRA](https://www.caddra.ca/time-perception-deficits-in-children-and-adolescents-with-adhd-a-meta-analysis/); [HKU repository](https://hub.hku.hk/handle/10722/309307)
  - Marx, Cortese et al. [MA, 55 studies, JAACAP]: deficits in time estimation and production accuracy, consistent with an accelerated internal clock. — [Southampton ePrints 456003](https://eprints.soton.ac.uk/456003)
- **Delay discounting and delay aversion:**
  - Patros et al. 2016 [MA, 21 investigations / 25 case-control comparisons, N = 3,913]: delay discounting was significantly elevated in ADHD. — [PubMed 27722208](https://www.pubmed.gov/27722208/)
  - An earlier Patros et al. 2015 meta-analysis reported delay of gratification g = .47 and delay discounting g = .50 (as cited in later literature; primary URL not retrieved).
  - Marx et al. 2018/2021 [MA, 37 comparisons, N = 3,763]: stronger delay aversion plus a demotivating effect of hypothetical rewards. Real rewards nearly doubled the odds ratio in ADHD groups (from search abstracts; primary URL not verified, see Gaps).
- **Implementation intentions in ADHD:**
  - Gawrilow & Gollwitzer 2008 [EXP, small samples, children]: children with ADHD who added if-then plans to a suppression goal improved Go/No-Go inhibition to the level of non-ADHD children. If-then plans plus stimulant medication gave the best performance. — [Konstanz PDF](https://www.socmot.uni-konstanz.de/sites/default/files/08_Gawrilow_Gollwitzer_Implementation_intentions_facilit.pdf)
  - Follow-ups: if-then plans reduced perseverative errors in task switching (JSCP 2011) and helped delay of gratification in children with and without ADHD. — [Konstanz JSCP 2011 PDF](https://www.socmot.uni-konstanz.de/sites/default/files/Gawrilow_Gollwitzer_Oettingen_Executive_Function_JSCP_2011.pdf); [Delay 2011 PDF](https://www.socmot.uni-konstanz.de/sites/default/files/Gawrilow_Gollwitzer_Oettingen_Delay_2011-2.pdf)
- **Noise:**
  - Nigg et al. 2024 [MA, 13 studies, 335 participants, JAACAP]: white or pink noise gave a small, significant benefit on task performance for ADHD or high-symptom children and young adults (g = 0.249, 95% CI .135–.363). The effect was negative in non-ADHD groups. Heterogeneity was minimal and no publication bias was found. Studies were small and short, often lacked good control conditions, and **no studies of brown noise** were found. — [PubMed 38428577](https://pubmed.ncbi.nlm.nih.gov/38428577/); [BPS critique](https://www.bps.org.uk/research-digest/does-pink-noise-really-help-you-focus)
  - Söderlund et al. 2024 (clinical ADHD children, "who benefits and who performs worse") shows response to noise varies by individual. I did not retrieve its numeric results. — [DOAJ](https://doaj.org/article/e04e701f44bc4681a5551415e6f18c6e)
- **Body doubling:**
  - A 2025 CCSC poster (BCI study, with and without ADHD) found no significant effect on performance, focus or calm. — [CCSC 2025](https://ccsc.org/centralplains/2025/talks/talk-poster16)
  - Ara et al. 2025 [PRE] is a VR study of human vs. AI body doubles. Its authors state that no peer-reviewed controlled trials existed for adults with ADHD. — [arXiv 2509.12153](https://arxiv.org/abs/2509.12153)
  - CHADD (Feb 2025): there "hasn't been significant research to validate the benefits." — [CHADD](https://chadd.org/adhd-weekly/could-a-body-double-help-you-increase-your-productivity/)
  - Popular claims of a positive 2024 study [ANEC/unverified]. — [Healthline](https://www.healthline.com/health/adhd/body-double-adhd)
- **Digital interventions:**
  - 2022 [MA, only 6 RCTs, 261 patients]: online interventions for ADHD, a thin evidence base. — [PMC9274127](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9274127/)
  - 2025 [MA, 23 RCTs, N = 1,472, all ages]: combination interventions worked better than neurofeedback. Telehealth and mHealth showed no significant effect. — [PMC12016436](https://pmc.ncbi.nlm.nih.gov/articles/PMC12016436/)
  - Digital CBT apps [systematic review]: an 8-week RCT of a CBT-informed app (N = 154 adults) reported better quality of life and organizational skills vs. waitlist. The sample was mostly female and college-educated. — [PMC12436941](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12436941/)
  - Strathclyde 2024: commercial ADHD apps usually lack RCTs in adults. — [Strathprints PDF](https://strathprints.strath.ac.uk/89559/7/Bosnic-etal-DHI-2024-Evaluating-Digital-Interventions-for-ADHD-Diagnosis-and-Management.pdf)

### Inferences (design implications)
- **KEEP** a highly visible external timer. Time-perception deficits are robust, and an external clock compensates. ADD a visual "time remaining" display that does not depend on reading numbers (a shrinking ring or a candle) and optional gentle audio cues at the midpoint and 1 minute left.
- **KEEP** immediate micro-rewards (XP on block completion, companion reactions). Delay aversion and steep discounting mean distant rewards ("good grades") motivate ADHD users less. Make feedback instant, and break real rewards into smaller, nearer milestones.
- **KEEP and strengthen** the "only 5 minutes" start. This is an inference from delay aversion and task-initiation difficulty; no direct study was found. Pair it with an if-then plan prompt ("When I sit down after lunch, I'll open chapter 3").
- **CHANGE** the companion's claims. Present the companion as a cozy presence, not as "scientifically proven body doubling". Evidence for body doubling is null or absent. Keep it because it is pleasant and low-cost, and consider A/B testing whether it improves session completion.
- **ADD** optional white or pink noise as a focus-time sound option (off by default, user-toggled, with volume caps). Meta-analytic evidence is small but positive for ADHD and negative for non-ADHD, so it must be a personal choice. Do not advertise brown noise as evidence-based. Keeping lo-fi music only for breaks is consistent with this and is a cautious, defensible choice (see Gaps on music).
- **AVOID** clinical claims. Digital ADHD app evidence is thin, so position the app as a study aid, not as treatment.

### Gaps
- Marx et al. delay-aversion meta-analysis: I could not verify the primary URL. The figures above (37 comparisons, N = 3,763, real rewards nearly doubling the odds ratio) come from search abstracts only.
- No controlled study found on "start with just 5 minutes" (a micro-commitment or foot-in-the-door approach) for ADHD task initiation.
- No good meta-analysis found on music with lyrics vs. without, or lo-fi specifically, in ADHD. This was not searched in depth.
- Adult ADHD time-perception data are less abundant than child data in the sources found.

## 4. Planning and reflection: implementation intentions, goal-setting, metacognitive reflection, planning fallacy

### Takeaway
Implementation intentions (if-then plans) are one of the best-supported self-regulation tools: d = 0.65 across 94 tests and more than 8,000 participants. The planning fallacy is robust: people underestimate their own task durations. Breaking tasks into steps is a known mitigation, and ADHD users' time-perception deficits amplify the need. The app's plan-before / review-after loop is well aligned with this evidence.

### Cited Findings
- **Gollwitzer & Sheeran 2006 [MA, 94 independent tests, >8,000 participants]:** implementation intentions had a medium-to-large effect on goal attainment (d = .65) and on shielding goal striving from derailment (d = .77). Most comparisons were against a goal-intention control, so the baseline was active. — [Konstanz repository](https://kops.uni-konstanz.de/entities/publication/2e749bfb-8533-437c-8203-7e788c910c5f); [Frontiers review citing it](https://www.frontiersin.org/articles/10.3389/fnhum.2015.00395/full)
- **ADHD-specific if-then-plan evidence** is covered in §3. — [Konstanz PDF](https://www.socmot.uni-konstanz.de/sites/default/files/08_Gawrilow_Gollwitzer_Implementation_intentions_facilit.pdf)
- **Planning fallacy:** Buehler, Griffin & Ross 1994 [EXP series]: people underestimate their own completion times even when aware of past overruns. — [DOI 10.1037/0022-3514.67.3.366](https://doi.org/10.1037/0022-3514.67.3.366) (from memory, not re-fetched)
- **Unpacking a task into subcomponents** produced longer, more accurate time predictions (Kruger & Evans 2004). — [DOI 10.1016/j.jesp.2003.11.001](https://doi.org/10.1016/j.jesp.2003.11.001) (from memory, not re-fetched)

### Inferences (design implications)
- **KEEP** plan-before. CHANGE it into an explicit if-then format: "If [time/place cue], then I will [first small step]." Also add a "when distracted, then I'll write it in the scroll and return" plan. This uses the d = .77 derailment-shielding result and connects directly to the distraction scroll.
- **KEEP** tasks split into small steps. This is supported both by planning-fallacy unpacking and by ADHD initiation needs.
- **ADD** an estimate-vs-actual time loop. Ask "how many blocks will this take?", then show the actual count in the review. Over time, show the user's personal calibration ratio ("you usually need about 1.5× your estimate"). This directly targets the planning fallacy and time blindness. Make it non-judgmental.
- **KEEP** the review-after (done all / part / got stuck). ADD a single optional reflection prompt on "got stuck" ("What blocked you? → suggest a smaller next step"). This turns failure into a planning input, consistent with the no-penalty design.

### Gaps
- No dedicated search was run on metacognitive reflection or self-explanation meta-analyses (for example, Bisra et al. 2018 on self-explanation), so effect sizes for brief post-session reflection are not documented here.
- No studies found on implementation intentions in adults with ADHD in studying contexts. The evidence is from children's lab tasks.

## 5. Study technique evidence and whether a focus app could nudge it

### Takeaway
Practice testing (retrieval) and distributed (spaced) practice are the two "high utility" techniques per Dunlosky et al. 2013. Retrieval practice meta-analyses show g ≈ 0.50–0.70 vs. restudy. A timer app currently tracks time, not technique. Lightweight nudges, like choosing a "technique" for a block and an end-of-block self-quiz prompt, could steer users toward high-utility methods.

### Cited Findings
- **Dunlosky et al. 2013 [narrative review of 10 techniques]:** rated practice testing and distributed practice "high utility". Interleaved practice, elaborative interrogation and self-explanation were "moderate". Highlighting, rereading and summarization were "low". — [DOI 10.1177/1529100612453266](https://doi.org/10.1177/1529100612453266) (from memory, not re-fetched)
- **Testing effect:** Rowland 2014 [MA] estimated g = 0.50. Adesope et al. 2017 [MA, 217 studies, Review of Educational Research] found practice tests beat restudying and all other comparison conditions, with g reported at about 0.61–0.70 depending on the source. Multiple-choice tests were at least as effective as recall. — [Learning Scientists summary of Adesope](https://www.learningscientists.org/blog/2017/2/9-1); [WSU repository](https://rex.libraries.wsu.edu/esploro/outputs/journalArticle/Rethinking-the-Use-of-Tests-A/99900601154801842); [Frontiers review citing Rowland 0.50 / Adesope 0.70](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2019.00005/full)
- **Spacing:** Cepeda et al. 2006 [MA, Psychological Bulletin]: distributed practice beats massed practice across retention intervals. — [DOI 10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354) (from memory, not re-fetched)
- **Interleaving:** Brunmair & Richter 2019 [MA]: moderate overall benefit (about g = 0.42), strong for visual category learning, weaker or negative for some materials such as words. — [DOI 10.1037/bul0000209](https://doi.org/10.1037/bul0000209) (from memory, not re-fetched)

### Inferences (design implications)
- **ADD** an optional "technique" tag in plan-before (Quiz myself / Flashcards / Practice problems / Read / Summarize). Give slightly more XP or a special badge for retrieval-type blocks. This is a nudge, not enforcement.
- **ADD** a 1-minute "recall check" at the end of a focus block, before the break: "Close the book — write 3 things you remember." It costs almost nothing and implements retrieval practice.
- **ADD** spacing nudges. When a task or topic was studied, suggest a review block 1, 3 and 7 days later in the task list (an expanding schedule).
- **AVOID** rewarding pure time-on-task for rereading or highlighting as equivalent to retrieval. If XP is only time-based, the app may reinforce low-utility methods.

### Gaps
- No studies found on study-timer apps nudging technique choice. This is an untested design hypothesis.
- No ADHD-specific data on retrieval practice or spacing benefits were retrieved.

## 6. Breaks: physical activity, nature images / attention restoration, screen-free breaks, phone presence

### Takeaway
- Nature exposure has low-to-moderate restorative effects on working memory, cognitive flexibility and, less reliably, attentional control. Real nature beats virtual or images, and image-only evidence is weaker.
- The "brain drain" claim (a smartphone merely nearby reduces cognitive capacity) **failed direct replication**. Meta-analyses conflict, from a null effect to a small working-memory effect.
- Keeping the phone away is still a reasonable low-cost suggestion, but it should not be sold as proven.
- Microbreak meta-analysis supports breaks for vigor and fatigue (§1).
- Physical-activity break evidence was not retrieved in this pass.

### Cited Findings
- **Stevenson, Schilhab & Bentsen 2018 [MA, ART studies 2013–2017, 49 outcome measures]:** gains in working memory, cognitive flexibility and (less reliably) attentional control, with low-to-moderate effects. Actual nature exposure produced significantly larger effects than virtual exposure, possibly due to longer exposures. — [PubMed 30130463](https://pubmed.ncbi.nlm.nih.gov/30130463/)
- **Ohly et al. 2016 [MA]:** more mixed. Benefits were found for only 3 measures (Digit Span Forward and Backward, Trail Making B), and 10 other meta-analyses showed no marked benefit. — [UCLan PDF](https://clok.uclan.ac.uk/id/eprint/15772/1/15772_Ohly.pdf)
- **Ward et al. 2017 "Brain Drain" [EXP]:** a phone nearby reduced working memory capacity. Ruiz Pardo & Minda 2022 [preregistered replication]: no difference across phone-location conditions on o-span or go/no-go, so the effect did not replicate. FLORA lists 2 replications, both failed. — [PubMed 36007374](https://pubmed.ncbi.nlm.nih.gov/36007374/); [FLORA replication atlas](https://forrt.org/flora-replication-atlas/doi/10.1086/691462/)
- **Meta-analyses conflict:**
  - Böttger, Poschik & Zierer 2023: significant overall negative effect of smartphone use and presence. — [PMC10525686](https://pmc.ncbi.nlm.nih.gov/articles/PMC10525686/)
  - Parry 2024 [PRE, k = 56]: small working-memory decrement, null for other functions.
  - Hartanto et al. [MA, 53 studies, 166 effects]: no significant effect of mere presence, d = −0.02. — [JCU repository PDF](https://researchonline.jcu.edu.au/91280/1/2024-31279-001.pdf)

### Inferences (design implications)
- **KEEP** nature and cozy scenes. They are low-cost and pleasant, but expect at most a small restorative effect from images. CHANGE break suggestions to prioritize real nature ("look out the window", "step outside for 2 min"), since real exposure beats virtual.
- **KEEP** screen-free break suggestions. Use them for fatigue and vigor (§1) and to avoid break overrun into phone scrolling, not because of "brain drain". An inference: a phone in hand during breaks risks breaks expanding, consistent with Biwer's observation that self-regulated breaks ran longer.
- **CHANGE** the wording of any "put your phone in another room" tip to an optional suggestion, without claiming that the mere presence effect is proven.
- **KEEP** movement and water suggestions. The microbreak meta-analysis supports breaks in general. Specific physical-activity effects need verification (Gaps).

### Gaps
- No meta-analysis on physical-activity microbreaks and cognition was retrieved in this pass. Not verified.
- No study found comparing nature screensavers or images during Pomodoro breaks specifically.
- Lee et al. 2015 ("40-second green roof view" improved sustained attention) is a single study, not re-checked here.

## 7. Streaks and loss aversion: harm or benefit?

### Takeaway
Peer-reviewed consumer research shows intact, highlighted streaks increase continuation. Broken streaks reduce motivation, especially when people blame themselves, and offering a repair option dampens the streak effect. No independent rigorous evidence was found that streak freezes improve long-term outcomes. Duolingo's public claims are company material. For a no-penalty, ADHD-friendly app, hard daily streaks risk an "all-or-nothing" collapse after a single missed day.

### Cited Findings
- **"On or Off Track: How (Broken) Streaks Affect Consumer Decisions" (Journal of Consumer Research) [EXP series]:**
  - Users with an intact streak were much more likely to continue when the app highlighted it.
  - The effect diminished when participants could repair their streak.
  - The intact vs. broken difference was amplified when people felt personally responsible for breaking it, rather than blaming an external factor. — [INSEAD Knowledge](https://knowledge.insead.edu/marketing/consumer-streaks-are-motivating-the-key-is-keeping-them-alive-19011)
  - Related coverage of streak research (Barasch). — [CU Boulder](https://www.colorado.edu/business/news/2023/04/20/research-streaks-marketing-tech-barasch)
- **Duolingo [IND]:** states the streak leverages loss aversion and presents Streak Freeze as flexibility, citing UPenn/UCLA research on goal "slack". This is not independent evidence. — [Duolingo blog](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
- **Popular figures** (+60% commitment from widgets, −21% churn from streak freeze) have no verifiable primary sources [ANEC]. — [DEV Community](https://dev.to/assindo/why-streaks-work-the-psychology-behind-habit-streaks-and-how-to-use-them-without-burning-out-42n0); [student case study](https://prasanna1377.github.io/Duolingo-case-study/)

### Inferences (design implications)
- **AVOID** hard consecutive-day streaks as a core mechanic. Broken streaks demotivate, especially with self-blame, which is common in ADHD and works against the app's no-penalty principle.
- **ADD (if any continuity metric)** a forgiving measure, such as "days studied this week (target 4 of 7)" or a rolling count that never resets to zero. Alternatively, a streak with automatic built-in "rest days", framed as planned rest rather than a purchased freeze.
- **If a streak exists, ATTRIBUTE breaks externally and kindly** ("life happens — your dojo kept the lantern lit"). The amplification by personal responsibility suggests self-blaming copy worsens drop-off.
- **AVOID** monetizing streak repair with coins, since loss-aversion pressure is coercive. Keep it free and automatic.

### Gaps
- No independent RCT found on streak freezes or "streak repair" and long-term retention or learning.
- No research found on streaks in ADHD populations.
