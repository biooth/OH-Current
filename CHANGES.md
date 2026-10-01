# OH! Civics — live-site revision

This update is based on https://biooth.github.io/OH-Current/index.html and its three linked module pages, downloaded September 28–29, 2026. The historical single-file GitHub artifact is not the implementation baseline. The existing static, multipage architecture and navy/teal/plum themes are retained. Publication to the existing GitHub Pages site was requested after review.

## Files

- `index.html`: home, District Explorer, sources, verified officeholder snapshot.
- `civics-course-latest.html`: five levels, 36 slides; concise teaching copy and deeper explanations.
- `health-committee.html`: two cases, seven stages; revised copy and scene integration.
- `culture-drafting.html`: two cases, six stages; clause drafting, sponsor revision, implementation testing.
- `civic-scenes.js`: original vector committee room and drafting office; people, desks, microphones, documents, contextual highlights and procedural routes.
- `visual-enhancements.js`: distinct civic illustrations, home learning workflow, course portraits, explanation-dialog keyboard handling.
- `representative-search.js`: name/district search, map selection, neutral contact cards, official lookup and registration links.
- `hub-visuals.css`, `course-visuals.css`, `game-visuals.css`: responsive layouts, readable type, contrast, focus states and reduced-motion support.

## Copy audit and alternatives

Approximately 30% fewer distinct visible words across the tested routes/states (roughly 11,900 to 8,300). The audit traverses home/map/sources, all course slides and four explanation tabs, both game cases, and available choices; repeated text within each module is counted once. Optional guide copy is available on request rather than appearing automatically. This is a rendered-copy comparison, not a byte count or a promise that every individual screen shrank by the same percentage. Course source links, examples, evidence, policy tradeoffs, and decision options remain.

| Module | Applied structure / wording | Strong alternative |
|---|---|---|
| Home | Illustration-led Understand → Question → Draft; shorter destination cards | “Learn the system. Practice a decision.” as a shorter hero |
| Course | One core claim per slide; shorter Meaning / Why / Example panels; retain questions | Replace each guide sentence with a single “Check yourself” prompt |
| Health Committee | “Hear testimony, test an amendment, and decide the committee’s next step.” Room highlights follow the active witness/member; the chosen amendment and procedural route stay visible | Use a persistent Claim / Evidence / Concern checklist instead of the optional clerk guide |
| Culture Drafting | “Turn community needs into clauses, resolve a redline, and test the draft.” Actual clauses and selected sponsor revision appear on the document | Show Specific / Flexible wording side by side with one shared tradeoff caption |
| District Explorer | “Find your Ohio representatives.” Name/district results highlight the selected district and show official contacts | “Find an officeholder” is shorter, but less familiar to new voters |
| Sources | Date/topic summaries replace explanatory descriptions; source destinations retained | Group by record type (text / status / testimony) if verification becomes the main task |

## Visual and layout review

Home uses a three-part illustrated workflow. Course modules have distinct institution, bill-path, hearing, drafting and verification symbols; role scenes now include people. Games use original vector environments rather than reference-image copies. Health distinguishes reporting, another hearing, and remaining in committee; it no longer relies on fabricated vote badges. Culture displays the selected revision alongside the assembled draft. The guide is explicitly opened, preventing it from covering choices.

Desktop course slides fit 1366×768 and 1440×900 without content overflow. Small screens use readable stacked sections and scrolling, rather than shrinking the course into tiny type. Game panels allow natural scrolling for longer evidence or complete bill text. Navigation, controls, labels, footer contrast, line spacing, district cards, and explanation dialogs were reviewed. Reduced-motion preferences are respected.

## Verified official sources and limitations

Officeholders: 99 Ohio House, 33 Ohio Senate, 15 U.S. House entries from official directories, checked September 29, 2026. Vacant offices remain labeled Vacant; party labels and guessed portraits are omitted.

- https://www.ohiohouse.gov/members/directory
- https://www.ohiosenate.gov/members/directory
- https://www.house.gov/representatives
- https://www.ohiosos.gov/elections/register-to-vote
- https://voterlookup.ohiosos.gov/VoterLookup.aspx
- https://www.ohiosenate.gov/members/district-map
- https://www.house.gov/representatives/find-your-representative
- https://www.ohiosos.gov/elections/district-maps

The embedded geometry is retained from the live site; it has not been independently re-surveyed. Current congressional officeholders are distinguished from new 2026 election boundaries that take effect for representation in January 2027. The data is a dated snapshot, not a live API. Refresh it after vacancies, appointments, and election transitions. ZIP codes can cross districts: exact address/ZIP lookup opens official tools; this site does not claim to geocode an address. The earlier research-source snapshot remains labeled August 24, 2026; unrelated article claims were not re-researched.

## Validation

Passed automated browser checks in Microsoft Edge: both Health cases and all three action branches; both Culture cases and both wording/revision/test paths; all 36 slides and 144 explanation tabs; replay and case reset; representative name, district, vacancy, ZIP guidance and selected map shape; no JavaScript errors; no page horizontal overflow at 390/768px. Desktop slide content fits at 1366×768 and 1440×900. Explanation arrow keys stay within the dialog and Escape restores focus. Desktop/mobile screenshots reviewed.

## Use

Keep all files in this folder together. Serve `index.html` with any static web server, or replace the matching files in the OH-Current deployment after review. No package installation or build step is required.

## September 30 — animated course revision

Replaced the course's emblem-like guide with an original layered human illustration: blinking, breathing, head movement, an introductory wave, and short explanatory gestures. Maya opens from the persistent guide button; tips stay open until dismissed. Active hearing speakers gesture while listeners remain still. Scene buttons and walkthrough controls update the speaker, bill folder, and current checkpoint. Drafts and official-record panels now use paper, ink, and desk treatments.

Added realistic illustrated hearing-room, drafting-office, and research-workspace backgrounds. These are generated educational settings, not documentary photographs of an actual chamber. All public-record links, core learning text, five course levels, quizzes, and game navigation are retained.

Files: `civics-course-latest.html`, new `course-scenes.js`, `course-scenes.css`, `course-environments.png`. The preview server now serves PNG assets. Pause motion persists across reloads; operating-system reduced motion disables animation. Hidden guide controls are inert. Checks passed for guide opening/stepping/dismissal/focus, speaker animation, scene selection, persistent motion preference, reduced motion, desktop slide fit at 1366×768, all course slides, both games, representative search and mobile page overflow.

### Generated asset provenance

Asset: `course-environments.png`. Generated with the built-in image-generation tool; animated people and UI overlays are original code-native SVG/CSS. The source image remains preserved outside the deployment folder; this asset is copied into the website so the package is self-contained.

Final generation prompt:

> Create a polished environment asset for an Ohio civic education website: a wide 3:1 image divided into THREE EQUAL WIDTH square panels edge to edge, no borders or text. Consistent realistic editorial 3D illustration, sophisticated architectural visualization, warm oak and limestone, soft daylight, subtle navy/teal accents. LEFT PANEL: an American state legislative committee hearing room viewed from a witness desk toward a curved wooden dais, realistic empty chairs, microphones, large high windows, papers, sober civic architecture. CENTER PANEL: a close three-quarter view of a legislative drafting desk in a realistic office, blank cream legal papers, fountain pen, a closed navy folder, warm desk lamp, shelves with bound books in background, no readable letters. RIGHT PANEL: civic records research workspace with an open laptop displaying abstract rows without text, stacked cream documents, magnifying glass, pencils, tall library shelves and daylight. All three panels contain NO people, NO lettering, NO logos, NO state seals, NO flags. Natural material texture and convincing perspective; not flat vector, not cartoon toy, no isometric view. Composition each square uses a clear central workspace and room depth with plenty of space for overlaying animated foreground people/documents. Asset to be used as three cropped scene backgrounds via CSS. Landscape high resolution.
