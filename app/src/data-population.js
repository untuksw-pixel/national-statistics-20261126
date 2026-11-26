// Population figures for Indonesia, as published by Badan Pusat Statistik
// (BPS — Statistics Indonesia). Every number on the site traces back to a
// line in one of these data files, with its source and year kept beside it.

export const populationHeadline = {
  // Mid-year estimate, BPS population projections based on Census 2020.
  midYear2024Millions: 281.6,
  census2020Millions: 270.2,
  source: 'BPS, mid-year estimate 2024; Census 2020',
};

// Counted population at each census, in millions (BPS census results).
export const censusSeries = [
  { year: 1971, millions: 119.21 },
  { year: 1980, millions: 147.49 },
  { year: 1990, millions: 179.38 },
  { year: 2000, millions: 206.26 },
  { year: 2010, millions: 237.64 },
  { year: 2020, millions: 270.2 },
];

// Age structure from Census 2020, percent of the counted population.
export const ageShares2020 = [
  { group: '0–14 years', share: 23.3 },
  { group: '15–64 years', share: 70.7 },
  { group: '65 years and over', share: 6.0 },
];

export const populationFacts = [
  { label: 'Growth 2010–2020', value: '1.25% a year', note: 'Average intercensal growth rate, BPS Census 2020.' },
  { label: 'Living in towns and cities', value: '56.6%', note: 'Urban share of the population, BPS Census 2020 (49.8% in 2010).' },
  { label: 'Living on Java', value: '56.1%', note: '151.6 million people on 6.5% of the land area, BPS Census 2020.' },
  { label: 'Population density', value: '141 per km²', note: 'Across 1.89 million km² of land, BPS Census 2020.' },
  { label: 'Sex ratio', value: '102 men per 100 women', note: 'BPS Census 2020.' },
  { label: 'Median age', value: 'about 29 years', note: 'Half the population is younger, half older, BPS Census 2020.' },
  { label: 'Children per woman', value: 'about 2.2', note: 'Total fertility rate, BPS Census 2020 long-form sample.' },
  { label: 'Life expectancy', value: '72.4 years', note: 'At birth, both sexes, BPS 2024.' },
];
