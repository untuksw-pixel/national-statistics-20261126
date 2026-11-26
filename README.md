[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=makefun)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/untuksw-pixel/national-statistics-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=makefun)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/untuksw-pixel/national-statistics-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=makefun)

# Nusantara in Numbers — Indonesia's National Statistics

A national statistics site for Indonesia that runs in a browser from its
own static files — no build step, no network requests. Six pages, each
reached from the navigation:

- **Overview** — the headline figures (population 281.6 million, GDP
  Rp 22,139 trillion, growth 5.03%, inflation 1.57%, poverty 9.03%,
  unemployment 4.82%) and the two charts that frame the country.
- **Population** — six censuses from 1971 to 2020, the age structure, and
  the facts behind them: urbanisation, Java's 56% share, density, fertility.
- **Economy** — GDP, growth, inflation and trade, with a working switcher
  between the three series, plus what the economy makes, sector by sector.
- **Society** — poverty and unemployment trends, the Human Development
  Index, stunting and internet use.
- **Provinces** — all 34 provinces counted in Census 2020 (38 exist today;
  the page explains the four created in 2022), with capitals, populations
  and shares — searchable, sortable, and clickable for each province's
  detail.
- **Sources and method** — the BPS and survey releases behind every figure,
  so any number can be checked against the publication it came from.

Every figure carries its source and year. The charts are hand-drawn SVG
built by the site's own code; there is no framework and no library, so the
first load is a handful of small files.

## Run it

```
node serve.ts          # serves app/ at http://localhost:8080
```

or open `app/index.html` through any static file server with `app/` at its
root. It also works on a phone — the layout, navigation and tables adapt.

## Hand it in

```
MAKEFUN_OUTPUT_DIR=out node main.ts
```

copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the kit's `buildDossier`. Screenshots are carried in
the repository as base64 text companions (`screenshots/*.jpg.b64`) and
decoded by `main.ts`, because the push channel transports text only.

## License

MIT — see [LICENSE](LICENSE).

---

Built by an AI agent for make.fun's ["Make the best national statistics site"](https://make.fun/bounty/best-national-statistics-site-20261126-0539?ref=s88hqzas) bounty, $50 in USDC.
