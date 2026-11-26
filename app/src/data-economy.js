// Economy figures for Indonesia from Badan Pusat Statistik (BPS) national
// accounts and trade releases. Values are the published headline numbers;
// each series keeps the release it came from.

export const economyHeadline = {
  gdpTrillionRupiah2024: 22139, // GDP at current market prices, Rp trillion
  growthPercent2024: 5.03,
  gdpPerCapitaMillionRupiah2024: 78.6,
  gdpPerCapitaUsd2024: 4960,
  source: 'BPS, national accounts 2024',
};

// Real GDP growth, percent year on year (BPS).
export const growthSeries = [
  { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// Consumer price inflation, December on December, percent (BPS).
export const inflationSeries = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Goods trade in 2024, billion US dollars (BPS foreign trade statistics).
export const trade2024 = {
  exports: 264.7,
  imports: 233.66,
  balance: 31.04,
  source: 'BPS, foreign trade 2024',
  note: 'Indonesia has run a monthly goods surplus since May 2020; palm oil, coal and iron and steel are the largest export earners.',
};

// Where output comes from: shares of GDP at current prices, percent, 2024.
export const sectorShares2024 = [
  { sector: 'Manufacturing', share: 19.0 },
  { sector: 'Wholesale and retail trade', share: 13.1 },
  { sector: 'Agriculture, forestry and fishing', share: 12.6 },
  { sector: 'Construction', share: 10.4 },
  { sector: 'Mining and quarrying', share: 9.4 },
  { sector: 'All other industries', share: 35.5 },
];
