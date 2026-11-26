// Nusantara in Numbers — the app shell: hash routing between the site's
// pages, the renderers for each page, and the controls (the economy chart
// switch, the province search and sort). All content comes from the data
// modules beside this file; nothing is fetched.

import { censusSeries, ageShares2020, populationFacts, populationHeadline } from './data-population.js';
import { economyHeadline, growthSeries, inflationSeries, trade2024, sectorShares2024 } from './data-economy.js';
import { povertySeries, unemploymentSeries, hdiSeries, socialFacts } from './data-social.js';
import { provinces2020, provincesNote } from './data-provinces.js';
import { lineChart, barChart, donutChart, shareBar } from './charts.js';

const main = document.getElementById('page');
const navLinks = [...document.querySelectorAll('.navlink')];

function statCard(label, value, note) {
  return `<article class="card"><p class="card-label">${label}</p><p class="card-value">${value}</p><p class="card-note">${note}</p></article>`;
}

function factList(facts) {
  return `<div class="facts">${facts.map((fact) => statCard(fact.label, fact.value, fact.note)).join('')}</div>`;
}

function figure(heading, chartSvg, caption) {
  return `<figure class="panel"><h3>${heading}</h3>${chartSvg}<figcaption>${caption}</figcaption></figure>`;
}

function renderOverview() {
  const censusWithEstimate = censusSeries.map((point) => ({ year: point.year, value: point.millions }));
  censusWithEstimate.push({ year: 2024, value: populationHeadline.midYear2024Millions });
  main.innerHTML = `
    <section class="hero">
      <h2>Indonesia, counted</h2>
      <p class="lede">The headline numbers of the world's fourth most populous country —
      its people, its economy and its provinces — drawn from the official statistics of
      Badan Pusat Statistik (BPS) and labelled with the release each figure came from.</p>
    </section>
    <section class="cards">
      ${statCard('Population', '281.6 million', 'Mid-year estimate 2024, BPS. Counted at Census 2020: 270.2 million.')}
      ${statCard('Gross domestic product', 'Rp 22,139 trillion', 'At current prices, 2024, BPS national accounts (≈ US$ 1.4 trillion).')}
      ${statCard('Economic growth', '5.03%', 'Real GDP growth in 2024, BPS.')}
      ${statCard('Inflation', '1.57%', 'December 2024 on December 2023, BPS consumer prices.')}
      ${statCard('Poverty', '9.03%', 'Share below the poverty line, March 2024, BPS Susenas.')}
      ${statCard('Unemployment', '4.82%', 'Open unemployment rate, February 2024, BPS Sakernas.')}
    </section>
    <section class="grid2">
      ${figure('People counted, 1971–2024', lineChart(censusWithEstimate, { unit: ' M', colour: '#0d6e63' }), 'Census results 1971–2020 and the BPS mid-year estimate for 2024, in millions. Indonesia passed 200 million between the 1990 and 2000 censuses.')}
      ${figure('Real GDP growth, 2016–2024', barChart(growthSeries.map((p) => ({ label: String(p.year), value: Math.max(0, p.value) })), { unit: '%', colour: '#d9903f' }), 'Percent a year, BPS. The 2020 bar is the pandemic contraction of −2.07%, the only negative year in the series; the chart floors it at zero and the economy page shows the signed figures.')}
    </section>
    <section class="panel">
      <h3>Start exploring</h3>
      <p class="links-row">
        <a href="#/population">Population →</a>
        <a href="#/economy">Economy →</a>
        <a href="#/society">Society →</a>
        <a href="#/provinces">The 38 provinces →</a>
        <a href="#/sources">Sources and method →</a>
      </p>
    </section>`;
}

function renderPopulation() {
  main.innerHTML = `
    <section class="hero"><h2>Population</h2>
    <p class="lede">Six censuses since 1971 frame the story: growth is slowing, the
    population is ageing gently, and more than half of everyone lives on one island — Java.</p></section>
    ${figure('Counted population at each census', barChart(censusSeries.map((p) => ({ label: String(p.year), value: p.millions })), { unit: ' M' }), 'Millions of people, BPS census results. The 2020 census counted 270.20 million; the BPS mid-year estimate for 2024 is 281.6 million.')}
    <section class="grid2">
      ${figure('Age structure, Census 2020', donutChart(ageShares2020.map((row) => ({ label: row.group, share: row.share }))), 'Percent of the counted population. Seven in ten Indonesians are of working age; the 65-and-over share has doubled since 1971.')}
      <div class="panel"><h3>Reading the pyramid's shadow</h3>
      <ul class="plain">
        <li><strong>23.3%</strong> are children under 15 — down from 44% in 1971.</li>
        <li><strong>70.7%</strong> are 15–64, the working-age share behind the "demographic bonus".</li>
        <li><strong>6.0%</strong> are 65 or over — about 16 million people.</li>
        <li>The dependency ratio is <strong>41.4</strong> dependants per 100 working-age people (BPS, Census 2020).</li>
      </ul></div>
    </section>
    <h3 class="section-title">Population facts, each with its source</h3>
    ${factList(populationFacts)}`;
}

const economyState = { metric: 'growth' };

function economyChart() {
  if (economyState.metric === 'inflation') {
    return figure('Inflation, December on December', lineChart(inflationSeries, { unit: '%', colour: '#a8513f' }), 'Percent, BPS consumer price index. The 2022 spike to 5.51% followed fuel price rises; by December 2024 inflation was 1.57%, inside Bank Indonesia\u2019s target band.');
  }
  if (economyState.metric === 'trade') {
    return figure('Goods trade, 2024', barChart([
      { label: 'Exports', value: trade2024.exports },
      { label: 'Imports', value: trade2024.imports },
      { label: 'Surplus', value: trade2024.balance },
    ], { unit: '', colour: '#40618f' }), 'Billion US dollars, BPS foreign trade statistics 2024. ' + trade2024.note);
  }
  return figure('Real GDP growth', lineChart(growthSeries, { unit: '%', colour: '#d9903f' }), 'Percent a year, BPS national accounts. Growth has held near 5% for a decade, interrupted by the −2.07% contraction of 2020 and the 5.31% rebound of 2022.');
}

function renderEconomy() {
  main.innerHTML = `
    <section class="hero"><h2>Economy</h2>
    <p class="lede">Southeast Asia's largest economy grows at about 5% a year, with
    inflation back under 2% and a goods trade surplus in its fifth year.</p></section>
    <section class="cards">
      ${statCard('GDP, current prices', 'Rp 22,139 trillion', '2024, BPS national accounts.')}
      ${statCard('GDP per person', 'Rp 78.6 million', 'About US$ 4,960 a person in 2024, BPS.')}
      ${statCard('Goods exports', 'US$ 264.7 billion', '2024, BPS foreign trade.')}
      ${statCard('Goods imports', 'US$ 233.7 billion', '2024, BPS foreign trade.')}
    </section>
    <div class="panel">
      <div class="switcher" role="group" aria-label="Choose a series">
        <button data-metric="growth" class="${economyState.metric === 'growth' ? 'on' : ''}">Growth</button>
        <button data-metric="inflation" class="${economyState.metric === 'inflation' ? 'on' : ''}">Inflation</button>
        <button data-metric="trade" class="${economyState.metric === 'trade' ? 'on' : ''}">Trade 2024</button>
      </div>
      <div id="economy-chart">${economyChart()}</div>
    </div>
    <section class="grid2">
      ${figure('What the economy makes, 2024', donutChart(sectorShares2024.map((row) => ({ label: row.sector, share: row.share }))), 'Shares of GDP at current prices, percent, BPS 2024. Manufacturing is the largest single industry at about 19%.')}
      <div class="panel"><h3>The sectors, in words</h3>
      <ul class="plain">${sectorShares2024.map((row) => `<li><strong>${row.sector}</strong> — ${row.share}% of GDP</li>`).join('')}</ul></div>
    </section>`;
  main.querySelectorAll('[data-metric]').forEach((button) => {
    button.addEventListener('click', () => {
      economyState.metric = button.dataset.metric;
      renderEconomy();
    });
  });
}

function renderSociety() {
  main.innerHTML = `
    <section class="hero"><h2>Society</h2>
    <p class="lede">Poverty is at its lowest recorded level, unemployment is below its
    pre-pandemic mark, and human development sits in the "high" band — the survey
    numbers behind the headlines.</p></section>
    <section class="grid2">
      ${figure('Poverty rate, March each year', lineChart(povertySeries, { unit: '%', colour: '#0d6e63' }), 'Percent of the population below the national poverty line, BPS Susenas. The pandemic pushed the rate to 10.14% in March 2021; by March 2024 it was 9.03%, the lowest in the series.')}
      ${figure('Unemployment rate, February each year', barChart(unemploymentSeries.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', colour: '#40618f' }), 'Open unemployment, percent of the labour force, BPS Sakernas. February 2024: 4.82%.')}
    </section>
    ${figure('Human Development Index', lineChart(hdiSeries, { unit: '', colour: '#d9903f' }), 'BPS HDI, new method. Indonesia crossed into the "high" band (70 and above) in the late 2010s and reached 74.20 in 2024.')}
    <h3 class="section-title">Social indicators, each with its source</h3>
    ${factList(socialFacts)}`;
}

const provinceState = { query: '', sort: 'population' };

function provinceRows() {
  const total = provinces2020.reduce((sum, row) => sum + row.millions, 0);
  let rows = provinces2020.map((row) => ({ ...row, share: (row.millions / total) * 100 }));
  if (provinceState.query) {
    const needle = provinceState.query.toLowerCase();
    rows = rows.filter((row) => row.name.toLowerCase().includes(needle) || row.capital.toLowerCase().includes(needle));
  }
  if (provinceState.sort === 'population') rows.sort((a, b) => b.millions - a.millions);
  if (provinceState.sort === 'name') rows.sort((a, b) => a.name.localeCompare(b.name));
  if (provinceState.sort === 'smallest') rows.sort((a, b) => a.millions - b.millions);
  return rows;
}

function renderProvinces() {
  const rows = provinceRows();
  const maxShare = Math.max(...provinces2020.map((row) => row.millions));
  main.innerHTML = `
    <section class="hero"><h2>The provinces</h2>
    <p class="lede">Thirty-four provinces were counted in Census 2020 — four more have
    been created since, taking the total to 38. West Java alone holds more people
    than the twenty smallest provinces combined.</p></section>
    <div class="panel">
      <div class="controls">
        <label>Search <input id="province-search" type="search" placeholder="Province or capital…" value="${provinceState.query}"></label>
        <label>Sort by
          <select id="province-sort">
            <option value="population" ${provinceState.sort === 'population' ? 'selected' : ''}>Most people first</option>
            <option value="smallest" ${provinceState.sort === 'smallest' ? 'selected' : ''}>Fewest people first</option>
            <option value="name" ${provinceState.sort === 'name' ? 'selected' : ''}>Name, A–Z</option>
          </select>
        </label>
      </div>
      <p id="province-count" class="count">${rows.length} of ${provinces2020.length} provinces shown. Click a row for its detail.</p>
      <div class="tablewrap"><table>
        <thead><tr><th>Province</th><th>Capital</th><th class="num">People (millions)</th><th>Share of Indonesia</th></tr></thead>
        <tbody id="province-body">
          ${rows.map((row) => `<tr data-name="${row.name}"><td>${row.name}</td><td>${row.capital}</td><td class="num">${row.millions.toFixed(2)}</td><td>${shareBar(row.millions, maxShare)} ${row.share.toFixed(1)}%</td></tr>`).join('')}
        </tbody>
      </table></div>
      <div id="province-detail" class="detail">No province selected yet — the three Javas (West, East and Central) together hold 125.5 million people, 46% of the country.</div>
      <p class="note">${provincesNote}</p>
      <p class="note">Source: BPS, Census 2020 results. Populations in millions, shares computed from the census total of 270.20 million.</p>
    </div>`;
  const search = main.querySelector('#province-search');
  search.addEventListener('input', () => {
    provinceState.query = search.value;
    const keepFocus = document.activeElement === search;
    renderProvinces();
    if (keepFocus) {
      const again = main.querySelector('#province-search');
      again.focus();
      again.setSelectionRange(again.value.length, again.value.length);
    }
  });
  main.querySelector('#province-sort').addEventListener('change', (event) => {
    provinceState.sort = event.target.value;
    renderProvinces();
  });
  main.querySelectorAll('#province-body tr').forEach((tr) => {
    tr.addEventListener('click', () => {
      const row = provinces2020.find((entry) => entry.name === tr.dataset.name);
      const total = provinces2020.reduce((sum, entry) => sum + entry.millions, 0);
      const rank = [...provinces2020].sort((a, b) => b.millions - a.millions).findIndex((entry) => entry.name === row.name) + 1;
      main.querySelector('#province-detail').textContent =
        `${row.name} — capital ${row.capital}. Counted population ${row.millions.toFixed(2)} million in Census 2020, `
        + `${((row.millions / total) * 100).toFixed(1)}% of Indonesia, ranked ${rank} of ${provinces2020.length} provinces by population.`;
    });
  });
}

function renderSources() {
  main.innerHTML = `
    <section class="hero"><h2>Sources and method</h2>
    <p class="lede">Every figure on this site comes from an official Indonesian
    statistical release. This page names them, so any number can be checked
    against the publication it was taken from.</p></section>
    <div class="panel"><h3>The releases behind the figures</h3>
    <ul class="plain">
      <li><strong>BPS, Population Census 2020</strong> — counted population, age structure, urban share and the provincial table (census day 15 September 2020), with the long-form sample for fertility.</li>
      <li><strong>BPS, population estimates and projections</strong> — the mid-year 2024 estimate of 281.6 million, projected from Census 2020.</li>
      <li><strong>BPS, national accounts 2024</strong> — GDP at current and constant prices, growth, GDP per capita and industry shares.</li>
      <li><strong>BPS, consumer price index, December 2024</strong> — the inflation series.</li>
      <li><strong>BPS, foreign trade statistics 2024</strong> — exports, imports and the trade balance in US dollars.</li>
      <li><strong>BPS, Susenas March 2024</strong> — the poverty rate and the count of people in poverty.</li>
      <li><strong>BPS, Sakernas February and August 2024</strong> — unemployment and the size of the labour force.</li>
      <li><strong>BPS, Human Development Index 2024</strong> — the HDI series, new method.</li>
      <li><strong>Indonesian Health Survey (SKI) 2023</strong>, Ministry of Health — child stunting.</li>
      <li><strong>APJII internet penetration survey 2024</strong> — internet users.</li>
    </ul></div>
    <div class="panel"><h3>How to read the numbers</h3>
    <ul class="plain">
      <li>Census figures are counts of people present; mid-year estimates are projections from the last census and are revised when a new census lands.</li>
      <li>Growth, inflation, poverty and unemployment are survey or index estimates, published with the month or quarter they describe; the year beside a figure is the year of the release it came from.</li>
      <li>Provincial populations are Census 2020 counts for the 34 provinces of 2020; the four provinces created in 2022 are noted on the provinces page.</li>
      <li>Figures are rounded as their releases round them; shares computed on this site are computed from the published totals.</li>
    </ul></div>`;
}

const routes = {
  '/overview': renderOverview,
  '/population': renderPopulation,
  '/economy': renderEconomy,
  '/society': renderSociety,
  '/provinces': renderProvinces,
  '/sources': renderSources,
};

function route() {
  const path = location.hash.replace(/^#/, '') || '/overview';
  const render = routes[path] || renderOverview;
  navLinks.forEach((link) => link.classList.toggle('on', link.getAttribute('href') === `#${path}`));
  render();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
