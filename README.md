# Orbit 星轨 × Alo 阿洛

Bilingual product website: https://junelegency.github.io/orbit-site/

## Language behavior

Chinese browser preferences show Chinese; other languages show English. An explicit `?lang=zh` or `?lang=en` selection overrides the browser preference and is remembered when storage is available. Internal navigation keeps the choice even when storage is blocked. Query parameters and section anchors survive redirects. Both languages have complete static HTML, including evidence notes, metadata and accessibility labels. Product screenshots preserve their original language.

## Build and check

```sh
python3 scripts/render_home.py
python3 scripts/render_evidence.py
node scripts/test_locale.cjs
node --check assets/app.js
node --check assets/gallery.js
```

Edit homepage copy in `scripts/render_home.py`. Evidence source is `scripts/evidence.zh.html`; English translations are in `scripts/evidence-translations.json`. Render before committing.

## Preview and deploy

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

GitHub Pages deploys the four HTML pages and assets only. Scripts, notes, and raw device archives are excluded from hosting.

## Screenshots and evidence

The domestic and international Smartisan desktops were captured on Xiaomi 12 Pro on 2026-10-31 with separate showcase spaces. Remaining interface screenshots are reviewed 2026-09-13 records. All are unaltered captures. Installation is not a sign-in or business-flow pass. Raw evidence and checksums are retained locally in the Android project, outside this public repository.

The public evidence notes preserve historical scope and known limits. TikTok SIM-free use remains pending dedicated validation. No controlled competitor benchmark is claimed. Dynamic workflow previews are illustrations, not recordings.

## Contact

miioflee@gmail.com

## Actual recordings

Three clips and GIFs were added on 2026-10-31: Weibo small-window control, Weibo search/summary, and YouTube guest search. Clips use 2–3× speed and omit waiting/retries. The Weibo summary includes a prompted correction of possible sarcasm misclassification. See evidence.html#recordings for scope. Videos have user-initiated controls; GIFs open only on request. Original footage and edit receipts remain in the Android project local archive.

## Compatibility catalog

`python3 scripts/compatibility.py` builds the Chinese/English full reports. The homepage imports its four-dimension overview and icon teaser. `data/apps.json` holds 178 fixed-corpus entries and separate phone r44/tablet r51 historical observations; later targeted notes never rewrite batch counts. All 335 original record hashes and classifications were checked. `data/native-checks.json` contains only sanitized IDs, titles, categories and verdicts from the fixed 2026-10-29 de35/Probe 1a078569 run.

Native-related counts use explicit ID prefixes: SYSCALL, NATIVE, LIBC, LINKER, XVIEW. The 48-check subset has 31 passes and is not a count of independent features. Full baseline: 58 PASS, 9 FAIL, 7 INCONCLUSIVE, 2 NOT_SUPPORTED, 1 INFO. Specialized historical suites stay separate. Icons are original APK resources extracted from the archived report; their provenance kinds are retained.

The public export excludes raw logs, serial numbers, runtime addresses, private paths and account data. Source receipts are retained in the Android project's `.local/website-showcase/compatibility-refresh/`. Do not upload the original private report wholesale.
