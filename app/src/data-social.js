// Social indicators for Indonesia: poverty and jobs from BPS household
// surveys (Susenas and Sakernas), development from the BPS human
// development index, health and connectivity from their own surveys.

// Share of the population below the national poverty line, March, percent
// (BPS, National Socioeconomic Survey — Susenas).
export const povertySeries = [
  { year: 2019, value: 9.41 },
  { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
];

// Open unemployment rate, February labour force survey, percent
// (BPS, Sakernas).
export const unemploymentSeries = [
  { year: 2019, value: 5.01 },
  { year: 2020, value: 4.99 },
  { year: 2021, value: 6.26 },
  { year: 2022, value: 5.83 },
  { year: 2023, value: 5.45 },
  { year: 2024, value: 4.82 },
];

// Human Development Index, BPS (new method series).
export const hdiSeries = [
  { year: 2022, value: 72.91 },
  { year: 2023, value: 73.55 },
  { year: 2024, value: 74.2 },
];

export const socialFacts = [
  { label: 'People in poverty', value: '25.22 million', note: '9.03% of the population, BPS Susenas, March 2024.' },
  { label: 'Labour force', value: '152.1 million', note: 'People working or looking for work, BPS Sakernas, August 2024.' },
  { label: 'Children stunted', value: '21.5%', note: 'Under-fives below the height-for-age standard, Indonesian Health Survey (SKI) 2023.' },
  { label: 'Internet users', value: '79.5% of the population', note: '221.6 million people online, APJII survey 2024.' },
  { label: 'Human development', value: 'HDI 74.20 — high', note: 'BPS Human Development Index 2024, in the "high" band (70–80).' },
];
