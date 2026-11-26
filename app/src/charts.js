// Small hand-drawn SVG charts. No library: each builder takes plain data
// and returns an SVG string with labelled axes, so a chart reads the same
// in a screenshot as it does on the page, and the first load stays light.

function scaleLinear(domainMin, domainMax, rangeMin, rangeMax) {
  const span = domainMax - domainMin || 1;
  return (value) => rangeMin + ((value - domainMin) / span) * (rangeMax - rangeMin);
}

function niceCeiling(value) {
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const power = Math.pow(10, Math.floor(Math.log10(value)));
  for (const step of steps) {
    if (value <= step * power) return step * power;
  }
  return 10 * power;
}

// A line chart for a yearly series: [{year, value}] with a unit suffix.
export function lineChart(series, { unit = '', colour = '#0d6e63', width = 640, height = 300 } = {}) {
  const pad = { left: 46, right: 14, top: 14, bottom: 30 };
  const values = series.map((point) => point.value);
  let min = Math.min(0, ...values);
  let max = niceCeiling(Math.max(...values) * 1.08);
  if (min < 0) min = -niceCeiling(-min * 1.08);
  const x = scaleLinear(series[0].year, series[series.length - 1].year, pad.left, width - pad.right);
  const y = scaleLinear(min, max, height - pad.bottom, pad.top);
  const points = series.map((point) => `${x(point.year).toFixed(1)},${y(point.value).toFixed(1)}`).join(' ');
  const area = `${pad.left},${y(0)} ${points} ${x(series[series.length - 1].year).toFixed(1)},${y(0)}`;
  let grid = '';
  for (let i = 0; i <= 4; i += 1) {
    const value = min + ((max - min) * i) / 4;
    const gy = y(value);
    grid += `<line x1="${pad.left}" y1="${gy}" x2="${width - pad.right}" y2="${gy}" class="grid"/>`
      + `<text x="${pad.left - 8}" y="${gy + 4}" class="tick" text-anchor="end">${trimNumber(value)}</text>`;
  }
  let labels = '';
  for (const point of series) {
    labels += `<text x="${x(point.year)}" y="${height - 8}" class="tick" text-anchor="middle">${point.year}</text>`
      + `<circle cx="${x(point.year)}" cy="${y(point.value)}" r="3.2" class="dot" style="--c:${colour}"/>`;
  }
  const last = series[series.length - 1];
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">`
    + `<polygon points="${area}" class="area" style="--c:${colour}"/>${grid}`
    + `<line x1="${pad.left}" y1="${y(0)}" x2="${width - pad.right}" y2="${y(0)}" class="axis"/>`
    + `<polyline points="${points}" class="line" style="--c:${colour}"/>${labels}`
    + `<text x="${x(last.year)}" y="${y(last.value) - 10}" class="last" text-anchor="end">${trimNumber(last.value)}${unit}</text></svg>`;
}

// A bar chart for labelled values: [{label, value}] — census counts, rates.
export function barChart(rows, { unit = '', colour = '#0d6e63', width = 640, height = 300 } = {}) {
  const pad = { left: 46, right: 14, top: 20, bottom: 30 };
  const max = niceCeiling(Math.max(...rows.map((row) => row.value)) * 1.05);
  const y = scaleLinear(0, max, height - pad.bottom, pad.top);
  const slot = (width - pad.left - pad.right) / rows.length;
  const barWidth = Math.min(64, slot * 0.62);
  let out = '';
  for (let i = 0; i <= 4; i += 1) {
    const value = (max * i) / 4;
    const gy = y(value);
    out += `<line x1="${pad.left}" y1="${gy}" x2="${width - pad.right}" y2="${gy}" class="grid"/>`
      + `<text x="${pad.left - 8}" y="${gy + 4}" class="tick" text-anchor="end">${trimNumber(value)}</text>`;
  }
  rows.forEach((row, index) => {
    const cx = pad.left + slot * index + slot / 2;
    out += `<rect x="${cx - barWidth / 2}" y="${y(row.value)}" width="${barWidth}" height="${y(0) - y(row.value)}" class="bar" style="--c:${colour}"/>`
      + `<text x="${cx}" y="${y(row.value) - 6}" class="bar-value" text-anchor="middle">${trimNumber(row.value)}${unit}</text>`
      + `<text x="${cx}" y="${height - 8}" class="tick" text-anchor="middle">${row.label}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${out}</svg>`;
}

// A horizontal share bar for one row of a table (province populations).
export function shareBar(share, maxShare) {
  const pct = Math.max(1.5, (share / maxShare) * 100);
  return `<span class="sharebar"><span class="sharefill" style="width:${pct.toFixed(1)}%"></span></span>`;
}

// A donut for percentage shares: [{label, share}].
export function donutChart(rows, { width = 300, height = 300 } = {}) {
  const colours = ['#0d6e63', '#d9903f', '#40618f', '#a8513f', '#6d8f3f', '#8a8f98'];
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 8;
  const inner = r * 0.58;
  let angle = -Math.PI / 2;
  let out = '';
  rows.forEach((row, index) => {
    const sweep = (row.share / 100) * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep);
    const y2 = cy + r * Math.sin(angle + sweep);
    const ix1 = cx + inner * Math.cos(angle + sweep);
    const iy1 = cy + inner * Math.sin(angle + sweep);
    const ix2 = cx + inner * Math.cos(angle);
    const iy2 = cy + inner * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    out += `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${inner} ${inner} 0 ${large} 0 ${ix2} ${iy2} Z" fill="${colours[index % colours.length]}"/>`;
    angle += sweep;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart donut">${out}</svg>`;
}

export function trimNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 100) / 100);
}
