'use strict';

const W = 1920;
const H = 1080;

const GOOGLE_SLIDES = {
  webAppUrl: 'https://script.google.com/macros/s/AKfycbyOvjjB3ls6bGhPkJu3PVgxfc9m45X5I6mlaQLMW_ah7MURWToIXJGf48EdF8qNBzvoSw/exec',
  presentationId: '1W4C2yVba8txza43UPpQvBOrfkJz47MyMQHVvbIUBOl8',
  slideNumbers: { 1: 1, 2: 2, 3: 3 },
};

const COLORS = {
  ink: '#2d3440',
  muted: '#5f6a7e',
  muted2: '#778398',
  dark: '#4e5666',
  blue: '#8b9db6',
  barBg: '#e1e5ec',
  green: '#08a957',
  red: '#ef4d5d',
  greenBg: '#e8faed',
  redBg: '#fde8ea',
  yellow: '#fff8d8',
  gray: '#f0f2f5',
  violet: '#f3ddfb',
  light: '#e7eaf0',
  white: '#ffffff',
  chartLight: '#e1e5eb',
  chartMid: '#aeb9c9',
  chartDark: '#8799b2',
};

const DEFAULTS = {
  1: {
    period: 'дата 1 – дата 2 (1 неделя)',
    totalTrips: '',
    previousPeriod: 'дата 1 – дата 2',
    previousTrips: '',
    yandexTrips: '',
    yandexPrevious: '',
    whooshTrips: '',
    whooshPrevious: '',
    urentTrips: '',
    urentPrevious: '',
    yandexMos: '',
    yandexNoMos: '',
    whooshMos: '',
    whooshNoMos: '',
    urentMos: '',
    urentNoMos: '',
    seasonStart: '',
    quotaYandex: '',
    quotaWhoosh: '',
    quotaUrent: '',
    actualYandex: '',
    actualWhoosh: '',
    actualUrent: '',
    excludedYandex: '',
    excludedWhoosh: '',
    excludedUrent: '',
  },
  2: {
    period: 'дата 1 – дата 2 (2 недели)',
    accidents: '',
    previousPeriod: 'дата 1 – дата 2',
    previousAccidents: '',
    yandexAccidents: '',
    whooshAccidents: '',
    urentAccidents: '',
    totalRate: '',
    previousRate: '',
    yandexRate: '',
    yandexPreviousRate: '',
    whooshRate: '',
    whooshPreviousRate: '',
    urentRate: '',
    urentPreviousRate: '',
    minorYandex: '',
    minorWhoosh: '',
    minorUrent: '',
    doubleYandex: '',
    doubleWhoosh: '',
    doubleUrent: '',
    dismountYandex: '',
    dismountWhoosh: '',
    dismountUrent: '',
    parkingYandex: '',
    parkingWhoosh: '',
    parkingUrent: '',
    raidsSeason: '',
    raidsPeriod: '',
    blockedTotal: '',
    blockedAdded: '',
    finesTotal: '',
    finesAdded: '',
  },
  3: {
    casesTotal: '',
    recovered: '',
    won: '',
    lost: '',
    pending: '',
    yandexCases: '',
    whooshCases: '',
    urentCases: '',
    chartCount: 3,
    month1: 'май',
    month2: 'июнь',
    month3: 'июль',
    month4: 'август',
    month5: 'сентябрь',
    month6: 'октябрь',
    month7: 'ноябрь',
    month8: 'декабрь',
    claims1: '', claims2: '', claims3: '', claims4: '',
    claims5: '', claims6: '', claims7: '', claims8: '',
    wins1: '', wins2: '', wins3: '', wins4: '',
    wins5: '', wins6: '', wins7: '', wins8: '',
  },
};

const SCHEMAS = {
  1: [
    group('Шапка и поездки', [
      textField('period', 'Период'),
      numberField('totalTrips', 'Общее количество поездок, млн', 0.1),
      textField('previousPeriod', 'Период АППН'),
      numberField('previousTrips', 'Поездки в АППН, млн', 0.1, 'Процент и стрелка рассчитываются автоматически.'),
    ]),
    group('Поездки по операторам', [
      numberField('yandexTrips', 'Яндекс — текущий период, тыс.', 0.1),
      numberField('yandexPrevious', 'Яндекс — АППН, тыс.', 0.1),
      numberField('whooshTrips', 'Whoosh — текущий период, тыс.', 0.1),
      numberField('whooshPrevious', 'Whoosh — АППН, тыс.', 0.1),
      numberField('urentTrips', 'Юрент — текущий период, тыс.', 0.1),
      numberField('urentPrevious', 'Юрент — АППН, тыс.', 0.1, 'Цвет и направление стрелки определяются по текущему и прошлому значениям.'),
    ]),
    group('Mos ID', [
      numberField('yandexMos', 'Яндекс — поездки с Mos ID, тыс.', 0.1),
      numberField('yandexNoMos', 'Яндекс — поездки без Mos ID, тыс.', 0.1),
      numberField('whooshMos', 'Whoosh — поездки с Mos ID, тыс.', 0.1),
      numberField('whooshNoMos', 'Whoosh — поездки без Mos ID, тыс.', 0.1),
      numberField('urentMos', 'Юрент — поездки с Mos ID, тыс.', 0.1),
      numberField('urentNoMos', 'Юрент — поездки без Mos ID, тыс.', 0.1, 'Доли и ширина полос рассчитываются автоматически.'),
    ]),
    group('Квота', [
      numberField('seasonStart', 'Парк в начале сезона, тыс.', 0.1),
      numberField('quotaYandex', 'Согласованная квота — Яндекс, тыс.', 0.1),
      numberField('quotaWhoosh', 'Согласованная квота — Whoosh, тыс.', 0.1),
      numberField('quotaUrent', 'Согласованная квота — Юрент, тыс.', 0.1),
      numberField('actualYandex', 'Фактический парк — Яндекс, тыс.', 0.1),
      numberField('actualWhoosh', 'Фактический парк — Whoosh, тыс.', 0.1),
      numberField('actualUrent', 'Фактический парк — Юрент, тыс.', 0.1),
      numberField('excludedYandex', 'Исключённый парк — Яндекс, тыс.', 0.1),
      numberField('excludedWhoosh', 'Исключённый парк — Whoosh, тыс.', 0.1),
      numberField('excludedUrent', 'Исключённый парк — Юрент, тыс.', 0.1, 'Итоговые значения в строках складываются автоматически.'),
    ]),
  ],
  2: [
    group('ДТП', [
      textField('period', 'Период'),
      numberField('accidents', 'ДТП за 2 недели', 1),
      textField('previousPeriod', 'Период АППН'),
      numberField('previousAccidents', 'ДТП в АППН', 1, 'Стрелка рассчитывается автоматически, текст всегда остаётся серым.'),
      numberField('yandexAccidents', 'Яндекс — ДТП', 1),
      numberField('whooshAccidents', 'Whoosh — ДТП', 1),
      numberField('urentAccidents', 'Юрент — ДТП', 1, 'Доли операторов рассчитываются от общего количества ДТП.'),
    ]),
    group('ДТП на 100 тыс. поездок', [
      numberField('totalRate', 'Общий показатель', 0.01),
      numberField('previousRate', 'Общий показатель АППН', 0.01),
      numberField('yandexRate', 'Яндекс — показатель', 0.01),
      numberField('yandexPreviousRate', 'Яндекс — АППН', 0.01),
      numberField('whooshRate', 'Whoosh — показатель', 0.01),
      numberField('whooshPreviousRate', 'Whoosh — АППН', 0.01),
      numberField('urentRate', 'Юрент — показатель', 0.01),
      numberField('urentPreviousRate', 'Юрент — АППН', 0.01),
    ]),
    group('Нарушения — несовершеннолетние', [
      numberField('minorYandex', 'Яндекс', 1),
      numberField('minorWhoosh', 'Whoosh', 1),
      numberField('minorUrent', 'Юрент', 1),
    ]),
    group('Нарушения — поездки вдвоём', [
      numberField('doubleYandex', 'Яндекс', 1),
      numberField('doubleWhoosh', 'Whoosh', 1),
      numberField('doubleUrent', 'Юрент', 1),
    ]),
    group('Нарушения — неспешивание', [
      numberField('dismountYandex', 'Яндекс', 1),
      numberField('dismountWhoosh', 'Whoosh', 1),
      numberField('dismountUrent', 'Юрент', 1),
    ]),
    group('Нарушения — парковка', [
      numberField('parkingYandex', 'Яндекс', 1),
      numberField('parkingWhoosh', 'Whoosh', 1),
      numberField('parkingUrent', 'Юрент', 1, 'Итоги по строкам и операторам рассчитываются автоматически.'),
    ]),
    group('Рейды и меры', [
      numberField('raidsSeason', 'Рейды с начала сезона', 1),
      numberField('raidsPeriod', 'Рейды за 2 недели', 1),
      numberField('blockedTotal', 'Заблокировано пользователей — всего', 1),
      numberField('blockedAdded', 'Заблокировано за период', 1),
      numberField('finesTotal', 'Выставлено штрафов — всего', 1),
      numberField('finesAdded', 'Штрафов за период', 1),
    ]),
  ],
  3: [
    group('Основные показатели', [
      numberField('casesTotal', 'Всего судебных дел', 1),
      numberField('recovered', 'Взыскано, тыс. рублей', 1),
      numberField('won', 'Выиграно со взысканием', 1),
      numberField('lost', 'Проиграно сервисами', 1),
      numberField('pending', 'На рассмотрении', 1),
    ]),
    group('Разбивка по операторам', [
      numberField('yandexCases', 'Яндекс — дел', 1),
      numberField('whooshCases', 'Whoosh — дел', 1),
      numberField('urentCases', 'Юрент — дел', 1),
    ]),
  ],
};

const SLIDES = {
  1: { title: 'Основные показатели', background: './assets/slide-1-bg.png' },
  2: { title: 'Показатели аварийности', background: './assets/slide-2-bg.png' },
  3: { title: 'Суды операторов аренды с пользователями', background: './assets/slide-3-bg.png' },
};

const state = {
  activeSlide: 1,
  data: {},
  images: {},
  fontReady: false,
  renderQueued: false,
  hitRegions: [],
  inlineEditor: null,
};

const canvas = document.getElementById('report-canvas');
const ctx = canvas.getContext('2d', { alpha: false });

function group(title, fields) { return { title, fields }; }
function textField(key, label, hint = '') { return { key, label, type: 'text', hint }; }
function numberField(key, label, step = 1, hint = '', min = null, max = null) { return { key, label, type: 'number', step, hint, min, max }; }

function deepClone(value) { return JSON.parse(JSON.stringify(value)); }

function loadInitialData() {
  for (const id of [1, 2, 3]) {
    state.data[id] = deepClone(DEFAULTS[id]);
  }
}

function hasValue(value) {
  return value !== '' && value !== null && value !== undefined && Number.isFinite(Number(String(value).replace(',', '.')));
}

function n(value, fallback = 0) {
  if (!hasValue(value)) return fallback;
  return Number(String(value).replace(',', '.'));
}

function sum(...values) { return values.reduce((acc, value) => acc + n(value), 0); }
function sumOrBlank(...values) { return values.some(hasValue) ? sum(...values) : ''; }

function pct(current, previous) {
  if (!hasValue(current) || !hasValue(previous) || n(previous) === 0) return null;
  return ((n(current) - n(previous)) / n(previous)) * 100;
}

function share(part, total) {
  if (!hasValue(part) || !hasValue(total) || n(total) === 0) return null;
  return (n(part) / n(total)) * 100;
}

function fmt(value, digits = null) {
  if (!hasValue(value)) return 'Х';
  const number = n(value);
  let useDigits = digits;
  if (useDigits === null) {
    useDigits = Number.isInteger(number) ? 0 : Math.min(2, decimalPlaces(number));
  }
  return number.toLocaleString('ru-RU', {
    minimumFractionDigits: useDigits,
    maximumFractionDigits: useDigits,
    useGrouping: true,
  });
}

function decimalPlaces(value) {
  const text = String(value);
  return text.includes('.') ? text.length - text.indexOf('.') - 1 : 0;
}

function compactPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return 'Х';
  const abs = Math.abs(n(value));
  const digits = abs < 10 && !Number.isInteger(abs) ? 1 : 0;
  return fmt(abs, digits);
}

function font(size, weight = 400) {
  return `${weight} ${size}px "Moscow Sans", Arial, sans-serif`;
}

function setFont(size, weight = 400) {
  ctx.font = font(size, weight);
  ctx.textBaseline = 'middle';
}

function drawText(text, x, y, options = {}) {
  const {
    size = 30,
    weight = 400,
    color = COLORS.ink,
    align = 'left',
    baseline = 'middle',
    maxWidth,
  } = options;
  ctx.save();
  ctx.font = font(size, weight);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  if (maxWidth) ctx.fillText(String(text), x, y, maxWidth);
  else ctx.fillText(String(text), x, y);
  ctx.restore();
}

function fitText(text, box, options = {}) {
  const { size = 32, minSize = 14, weight = 400, color = COLORS.ink, align = 'center' } = options;
  let fontSize = size;
  ctx.save();
  while (fontSize > minSize) {
    ctx.font = font(fontSize, weight);
    if (ctx.measureText(String(text)).width <= box.w) break;
    fontSize -= 1;
  }
  ctx.restore();
  const x = align === 'center' ? box.x + box.w / 2 : align === 'right' ? box.x + box.w : box.x;
  drawText(text, x, box.y + box.h / 2, { size: fontSize, weight, color, align });
}

function roundedPath(x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function roundedRect(x, y, w, h, radius, fill, stroke = null, lineWidth = 1) {
  ctx.save();
  roundedPath(x, y, w, h, radius);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  ctx.restore();
}

function drawMetric(main, suffix, box, options = {}) {
  const {
    mainSize = 60,
    suffixSize = 28,
    mainWeight = 700,
    suffixWeight = 700,
    color = COLORS.ink,
    gap = 14,
    align = 'center',
    suffixYOffset = 7,
  } = options;
  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.font = font(mainSize, mainWeight);
  const mainWidth = ctx.measureText(String(main)).width;
  ctx.font = font(suffixSize, suffixWeight);
  const suffixWidth = ctx.measureText(String(suffix)).width;
  const total = mainWidth + gap + suffixWidth;
  let startX = box.x + (box.w - total) / 2;
  if (align === 'left') startX = box.x;
  if (align === 'right') startX = box.x + box.w - total;
  drawText(main, startX, box.y + box.h / 2, { size: mainSize, weight: mainWeight, color });
  drawText(suffix, startX + mainWidth + gap, box.y + box.h / 2 + suffixYOffset, { size: suffixSize, weight: suffixWeight, color });
  ctx.restore();
}

function drawDeltaPill(current, previous, box, options = {}) {
  const { prefix = 'АППН ', unit = '', positiveGood = true, size = 22 } = options;
  const delta = pct(current, previous);
  const unknown = delta === null;
  const up = !unknown && delta > 0.0001;
  const down = !unknown && delta < -0.0001;
  const good = positiveGood ? up : down;
  const bad = positiveGood ? down : up;
  const color = good ? COLORS.green : bad ? COLORS.red : COLORS.muted2;
  const bg = good ? COLORS.greenBg : bad ? COLORS.redBg : COLORS.light;
  roundedRect(box.x, box.y, box.w, box.h, box.h / 2, bg);
  const prevText = `${prefix}${fmt(previous)}${unit}`;
  const indicator = unknown ? 'Х%' : up ? `▲ ${compactPercent(delta)}%` : down ? `▼ ${compactPercent(delta)}%` : '• 0%';
  ctx.save();
  ctx.font = font(size, 500);
  const a = ctx.measureText(prevText).width;
  const b = ctx.measureText(indicator).width;
  const total = a + 8 + b;
  const start = box.x + (box.w - total) / 2;
  drawText(prevText, start, box.y + box.h / 2 + 1, { size, weight: 500, color: COLORS.muted2 });
  drawText(indicator, start + a + 8, box.y + box.h / 2 + 1, { size, weight: 500, color });
  ctx.restore();
}

function drawSimpleDelta(current, previous, box, positiveGood = true, size = 24) {
  const delta = pct(current, previous);
  const unknown = delta === null;
  const up = !unknown && delta > 0.0001;
  const down = !unknown && delta < -0.0001;
  const good = positiveGood ? up : down;
  const bad = positiveGood ? down : up;
  const color = good ? COLORS.green : bad ? COLORS.red : COLORS.muted2;
  const indicator = unknown ? 'Х%' : up ? `▲ ${compactPercent(delta)}%` : down ? `▼ ${compactPercent(delta)}%` : '• 0%';
  fitText(indicator, box, { size, minSize: 16, weight: 500, color, align: 'center' });
}

function drawMosBar(operatorName, withMos, withoutMos, y) {
  const x = 1042;
  const width = 794;
  const height = 35;
  const known = hasValue(withMos) || hasValue(withoutMos);
  const total = known ? Math.max(0, n(withMos) + n(withoutMos)) : 0;
  const ratio = total ? Math.max(0, Math.min(1, n(withMos) / total)) : 0;
  const fillWidth = Math.max(0, width * ratio);

  roundedRect(x, y, width, height, 13, COLORS.barBg);
  if (known && fillWidth > 0) {
    ctx.save();
    roundedPath(x, y, width, height, 13);
    ctx.clip();
    ctx.fillStyle = COLORS.blue;
    ctx.fillRect(x, y, fillWidth, height);
    ctx.restore();
  }

  drawText(known && total ? `${fmt(ratio * 100, 0)}%` : 'Х%', x + 3, y - 18, { size: 23, weight: 500, color: COLORS.muted, align: 'left' });
  drawText(known && total ? `${fmt((1 - ratio) * 100, 0)}%` : 'Х%', x + width - 3, y - 18, { size: 23, weight: 500, color: '#b9c0cd', align: 'right' });

  drawText(fmt(withMos, 1), x + 8, y + height / 2 + 1, { size: 24, weight: 500, color: known && fillWidth > 70 ? COLORS.white : COLORS.muted });
  const rightX = known ? Math.min(x + width - 8, x + fillWidth + 10) : x + width - 8;
  drawText(fmt(withoutMos, 1), rightX, y + height / 2 + 1, { size: 24, weight: 500, color: '#8490a3', align: known ? 'left' : 'right' });
}

function drawQuotaRow(y, values) {
  const total = sumOrBlank(values[0], values[1], values[2]);
  drawMetric(fmt(total, hasValue(total) && Number.isInteger(n(total)) ? 0 : 1), 'тыс.', { x: 930, y, w: 300, h: 84 }, { mainSize: 58, suffixSize: 28 });
  const cells = [
    { x: 1296, color: COLORS.yellow },
    { x: 1482, color: COLORS.gray },
    { x: 1669, color: COLORS.violet },
  ];
  cells.forEach((cell, index) => {
    roundedRect(cell.x, y + 3, 171, 81, 17, cell.color);
    drawMetric(fmt(values[index], Number.isInteger(n(values[index])) ? 0 : 1), 'тыс.', { x: cell.x + 8, y: y + 3, w: 155, h: 81 }, {
      mainSize: 35,
      suffixSize: 20,
      mainWeight: 500,
      suffixWeight: 700,
      color: COLORS.muted,
      gap: 7,
    });
  });
}

function drawViolationsCell(value, x, y, totalRow = false) {
  drawText(fmt(value, 0), x, y, { size: totalRow ? 30 : 34, weight: 500, color: COLORS.ink, align: 'center' });
  drawText('нарушений', x, y + 29, { size: totalRow ? 17 : 18, weight: 500, color: totalRow ? COLORS.ink : '#8490a3', align: 'center' });
}

function drawChart(values, months, area, keyPrefix) {
  const { x, y, w, h } = area;
  const count = Math.max(1, Math.min(8, values.length));
  const baseline = y + h - 52;
  const plotTop = y + 82;
  const plotHeight = Math.max(20, baseline - plotTop);
  const numericValues = values.map(value => hasValue(value) ? Math.max(0, n(value)) : null);
  const max = Math.max(...numericValues.filter(value => value !== null), 1);
  const slot = w / count;
  const barWidth = Math.min(100, Math.max(24, slot * 0.55));
  const colors = [COLORS.chartLight, COLORS.chartMid, COLORS.chartDark];
  const valueFont = count <= 4 ? 29 : count <= 6 ? 23 : 19;
  const monthFont = count <= 4 ? 24 : count <= 6 ? 19 : 16;

  ctx.save();
  ctx.strokeStyle = '#cfd5dd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 8, baseline + 0.5);
  ctx.lineTo(x + w - 8, baseline + 0.5);
  ctx.stroke();
  ctx.restore();

  numericValues.forEach((value, index) => {
    const center = x + slot * (index + 0.5);
    const barHeight = value === null || value === 0 ? 0 : Math.max(4, (value / max) * plotHeight);
    const bx = center - barWidth / 2;
    const by = baseline - barHeight;
    if (barHeight > 0) {
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(bx, by, barWidth, barHeight);
    }
    // Подпись всегда находится в отдельной зоне над столбцом и не накладывается на него.
    const labelGap = Math.ceil(valueFont * 0.72) + 8;
    const labelY = Math.max(y + 34, by - labelGap);
    drawText(value === null ? 'Х' : fmt(value, Number.isInteger(value) ? 0 : 1), center, labelY, {
      size: valueFont,
      weight: 500,
      color: COLORS.muted,
      align: 'center',
    });
    fitText(months[index] || `месяц ${index + 1}`, { x: x + slot * index + 3, y: baseline + 13, w: slot - 6, h: 42 }, {
      size: monthFont,
      minSize: 10,
      weight: 400,
      color: COLORS.muted,
      align: 'center',
    });
    registerHit(`${keyPrefix}${index + 1}`, { x: x + slot * index, y: y + 20, w: slot, h: baseline - y + 8 });
    registerHit(`month${index + 1}`, { x: x + slot * index, y: baseline + 4, w: slot, h: 55 });
  });
}

async function renderSlide(slideId = state.activeSlide) {
  const image = state.images[slideId];
  if (!image) return;
  state.hitRegions = [];
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#e8ebf0';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(image, 0, 0, W, H);
  ctx.imageSmoothingEnabled = true;
  if (slideId === 1) drawSlide1(state.data[1]);
  if (slideId === 2) drawSlide2(state.data[2]);
  if (slideId === 3) drawSlide3(state.data[3]);
  state.hitRegions = buildHitRegions(slideId, state.data[slideId]);
}

function drawSlide1(d) {
  fitText(d.period, { x: 67, y: 20, w: 540, h: 61 }, { size: 37, minSize: 23, weight: 700, color: COLORS.white });

  drawMetric(fmt(d.totalTrips, 1), 'млн', { x: 105, y: 213, w: 230, h: 80 }, { mainSize: 64, suffixSize: 31 });
  fitText(d.previousPeriod, { x: 418, y: 253, w: 235, h: 46 }, { size: 26, minSize: 18, weight: 500, color: '#8491a6' });
  drawMetric(fmt(d.previousTrips, 1), 'млн', { x: 692, y: 247, w: 150, h: 55 }, {
    mainSize: 34,
    suffixSize: 31,
    mainWeight: 500,
    suffixWeight: 500,
    color: '#617087',
    gap: 8,
    suffixYOffset: 0,
  });
  drawSimpleDelta(d.totalTrips, d.previousTrips, { x: 842, y: 248, w: 128, h: 54 }, true, 24);

  drawMetric(fmt(d.yandexTrips, 1), 'тыс.', { x: 130, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });
  drawMetric(fmt(d.whooshTrips, 1), 'тыс.', { x: 432, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });
  drawMetric(fmt(d.urentTrips, 1), 'тыс.', { x: 734, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });

  drawDeltaPill(d.yandexTrips, d.yandexPrevious, { x: 94, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });
  drawDeltaPill(d.whooshTrips, d.whooshPrevious, { x: 400, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });
  drawDeltaPill(d.urentTrips, d.urentPrevious, { x: 704, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });

  drawMosBar('Яндекс', d.yandexMos, d.yandexNoMos, 275);
  drawMosBar('Whoosh', d.whooshMos, d.whooshNoMos, 375);
  drawMosBar('Юрент', d.urentMos, d.urentNoMos, 473);

  // Названия операторов рисуются последними, чтобы их не перекрывали полосы и подписи.
  [
    ['Яндекс', 255],
    ['Whoosh', 355],
    ['Юрент', 453],
  ].forEach(([name, y]) => {
    drawText(name, 1439, y, {
      size: 30,
      weight: 500,
      color: COLORS.muted,
      align: 'center',
    });
  });

  // Маскируем фиксированное число 60 из фонового шаблона и рисуем редактируемое значение.
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(125, 775, 350, 105);
  drawMetric(fmt(d.seasonStart, Number.isInteger(n(d.seasonStart)) ? 0 : 1), 'тыс. самокатов', { x: 140, y: 775, w: 330, h: 105 }, {
    mainSize: 60,
    suffixSize: 29,
    gap: 14,
  });

  drawQuotaRow(617, [d.quotaYandex, d.quotaWhoosh, d.quotaUrent]);
  drawQuotaRow(740, [d.actualYandex, d.actualWhoosh, d.actualUrent]);
  drawQuotaRow(865, [d.excludedYandex, d.excludedWhoosh, d.excludedUrent]);
}

function drawRaidMetric(value, box, color) {
  const main = fmt(value, 0);
  const suffix = 'ед.';
  const mainSize = 65;
  const suffixSize = 38;
  const gap = 13;
  ctx.save();
  ctx.font = font(mainSize, 700);
  const mainWidth = ctx.measureText(main).width;
  ctx.font = font(suffixSize, 700);
  const suffixWidth = ctx.measureText(suffix).width;
  const totalWidth = mainWidth + gap + suffixWidth;
  const startX = box.x + (box.w - totalWidth) / 2;
  const centerY = box.y + box.h / 2;
  drawText(main, startX, centerY, { size: mainSize, weight: 700, color });
  drawText(suffix, startX + mainWidth + gap, centerY + 1, { size: suffixSize, weight: 700, color });
  ctx.restore();
}

function caseNoun(value) {
  if (!hasValue(value)) return 'дел';
  const number = Math.abs(Math.trunc(n(value)));
  const lastTwo = number % 100;
  const last = number % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'дел';
  if (last === 1) return 'дело';
  if (last >= 2 && last <= 4) return 'дела';
  return 'дел';
}

function drawSlide2(d) {
  fitText(d.period, { x: 65, y: 20, w: 540, h: 61 }, { size: 36, minSize: 22, weight: 700, color: COLORS.white });

  drawText(fmt(d.accidents, 0), 200, 286, { size: 66, weight: 500, color: COLORS.muted, align: 'center' });
  const accidentDelta = pct(d.accidents, d.previousAccidents);
  const deltaUnknown = accidentDelta === null;
  const deltaUp = !deltaUnknown && accidentDelta > 0.0001;
  const deltaDown = !deltaUnknown && accidentDelta < -0.0001;
  const deltaText = deltaUnknown ? 'Х%' : deltaUp ? `▲ ${compactPercent(accidentDelta)}%` : deltaDown ? `▼ ${compactPercent(accidentDelta)}%` : '• 0%';
  const deltaColor = COLORS.muted;
  fitText(deltaText, { x: 365, y: 220, w: 260, h: 90 }, { size: 47, minSize: 26, weight: 700, color: deltaColor });
  fitText(`АППН (${d.previousPeriod})`, { x: 370, y: 352, w: 250, h: 28 }, { size: 20, minSize: 14, weight: 500, color: '#8a94a6' });
  fitText(`${fmt(d.previousAccidents, 0)} ДТП`, { x: 397, y: 383, w: 195, h: 39 }, { size: 24, minSize: 17, weight: 500, color: '#657187' });

  const totalAccidents = hasValue(d.accidents) ? Math.max(1, n(d.accidents)) : '';
  const operatorCards = [
    { count: d.yandexAccidents, x: 116, pillX: 198 },
    { count: d.whooshAccidents, x: 306, pillX: 388 },
    { count: d.urentAccidents, x: 495, pillX: 577 },
  ];
  operatorCards.forEach(card => {
    drawText(fmt(card.count, 0), card.x, 575, { size: 39, weight: 400, color: COLORS.ink, align: 'center' });
    roundedRect(card.pillX - 42, 553, 84, 40, 20, COLORS.light);
    drawText(share(card.count, totalAccidents) === null ? 'Х%' : `${fmt(share(card.count, totalAccidents), 0)}%`, card.pillX, 574, { size: 22, weight: 500, color: COLORS.muted, align: 'center' });
  });

  ctx.save();
  ctx.font = font(31, 700);
  const first = `${fmt(d.totalRate, 2)} ДТП`;
  const firstWidth = ctx.measureText(first).width;
  drawText(first, 87, 758, { size: 31, weight: 700, color: COLORS.ink });
  drawText(' на 100. тыс. поездок', 87 + firstWidth + 6, 758, { size: 29, weight: 700, color: COLORS.muted });
  ctx.restore();

  roundedRect(83, 791, 452, 31, 13, COLORS.light);
  fitText(`АППН (${d.previousPeriod}) – ${fmt(d.previousRate, 2)} ДТП`, { x: 90, y: 791, w: 438, h: 31 }, { size: 22, minSize: 15, weight: 500, color: '#778398' });

  const rateCols = [
    { value: d.yandexRate, prev: d.yandexPreviousRate, x: 169, prevX: 158 },
    { value: d.whooshRate, prev: d.whooshPreviousRate, x: 358, prevX: 348 },
    { value: d.urentRate, prev: d.urentPreviousRate, x: 548, prevX: 538 },
  ];
  rateCols.forEach(item => {
    drawText(fmt(item.value, 2), item.x, 866, { size: 31, weight: 500, color: COLORS.muted, align: 'center' });
    drawText(`АППН – ${fmt(item.prev, 2)}`, item.prevX, 911, { size: 18, weight: 500, color: '#778398', align: 'center' });
  });

  const categories = [
    [d.minorYandex, d.minorWhoosh, d.minorUrent],
    [d.doubleYandex, d.doubleWhoosh, d.doubleUrent],
    [d.dismountYandex, d.dismountWhoosh, d.dismountUrent],
    [d.parkingYandex, d.parkingWhoosh, d.parkingUrent],
  ];
  const rowY = [286, 378, 469, 560];
  const colX = [1131, 1328, 1524, 1725];
  categories.forEach((values, row) => {
    const rowTotal = sumOrBlank(...values);
    [values[0], values[1], values[2], rowTotal].forEach((value, col) => drawViolationsCell(value, colX[col], rowY[row], false));
  });
  const totals = [
    sumOrBlank(d.minorYandex, d.doubleYandex, d.dismountYandex, d.parkingYandex),
    sumOrBlank(d.minorWhoosh, d.doubleWhoosh, d.dismountWhoosh, d.parkingWhoosh),
    sumOrBlank(d.minorUrent, d.doubleUrent, d.dismountUrent, d.parkingUrent),
  ];
  drawViolationsCell(totals[0], colX[0], 635, true);
  drawViolationsCell(totals[1], colX[1], 635, true);
  drawViolationsCell(totals[2], colX[2], 635, true);
  drawViolationsCell(sumOrBlank(...totals), colX[3], 635, true);

  drawRaidMetric(d.raidsSeason, { x: 684, y: 782, w: 265, h: 88 }, COLORS.muted);
  drawRaidMetric(d.raidsPeriod, { x: 968, y: 782, w: 265, h: 88 }, COLORS.ink);
  drawText(`${fmt(d.blockedTotal, 0)} (+${fmt(d.blockedAdded, 0)})`, 1269, 846, { size: 39, weight: 500, color: COLORS.muted });
  drawText(`${fmt(d.finesTotal, 0)} (+${fmt(d.finesAdded, 0)})`, 1269, 947, { size: 39, weight: 500, color: COLORS.muted });
}

function drawSlide3(d) {
  drawText(fmt(d.casesTotal, 0), 241, 256, { size: 68, weight: 500, color: COLORS.ink, align: 'center' });
  drawText(fmt(d.recovered, 0), 241, 483, { size: 55, weight: 500, color: COLORS.ink, align: 'center' });
  drawText('тыс. рублей', 241, 531, { size: 23, weight: 700, color: COLORS.muted, align: 'center' });

  const mainRows = [
    { value: d.won, y: 718 },
    { value: d.lost, y: 796 },
    { value: d.pending, y: 874 },
  ];
  mainRows.forEach(row => {
    roundedRect(94, row.y, 141, 62, 11, COLORS.light);
    drawText(fmt(row.value, 0), 164.5, row.y + 31, { size: 47, weight: 500, color: '#657187', align: 'center' });
  });

  drawText(fmt(d.yandexCases, 0), 1028, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText(caseNoun(d.yandexCases), 1028, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });
  drawText(fmt(d.whooshCases, 0), 1328, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText(caseNoun(d.whooshCases), 1328, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });
  drawText(fmt(d.urentCases, 0), 1628, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText(caseNoun(d.urentCases), 1628, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });

  const count = clampChartCount(d.chartCount);
  const months = Array.from({ length: count }, (_, index) => d[`month${index + 1}`]);
  const claims = Array.from({ length: count }, (_, index) => d[`claims${index + 1}`]);
  const wins = Array.from({ length: count }, (_, index) => d[`wins${index + 1}`]);
  drawChart(claims, months, { x: 821, y: 540, w: 464, h: 421 }, 'claims');
  drawChart(wins, months, { x: 1377, y: 540, w: 464, h: 421 }, 'wins');
}


function clampChartCount(value) {
  return Math.max(1, Math.min(8, Math.round(n(value, 3) || 3)));
}

function getSchema(slideId) {
  if (Number(slideId) !== 3) return SCHEMAS[slideId];
  const count = clampChartCount(state.data[3]?.chartCount ?? DEFAULTS[3].chartCount);
  return [
    ...SCHEMAS[3],
    group('Настройки графиков', [
      numberField('chartCount', 'Количество столбцов', 1, 'От 1 до 8 столбцов в каждом графике.', 1, 8),
    ]),
    group('Подписи месяцев', Array.from({ length: count }, (_, index) => textField(`month${index + 1}`, `Столбец ${index + 1}`))),
    group('Поданные исковые заявления', Array.from({ length: count }, (_, index) => numberField(`claims${index + 1}`, `Столбец ${index + 1}`, 1))),
    group('Выигранные дела', Array.from({ length: count }, (_, index) => numberField(`wins${index + 1}`, `Столбец ${index + 1}`, 1, index === count - 1 ? 'Подписи всегда размещаются выше столбцов.' : ''))),
  ];
}

function registerHit(key, rect, label = '') {
  if (!key) return;
  state.hitRegions.push({ key, rect, label });
}

function buildHitRegions(slideId, d) {
  const regions = [];
  const add = (key, x, y, w, h) => regions.push({ key, rect: { x, y, w, h } });
  if (slideId === 1) {
    add('period', 67, 20, 540, 61); add('totalTrips', 105, 213, 230, 80);
    add('previousPeriod', 418, 253, 235, 46); add('previousTrips', 692, 247, 150, 55);
    add('yandexTrips', 130, 390, 200, 70); add('whooshTrips', 432, 390, 200, 70); add('urentTrips', 734, 390, 200, 70);
    add('yandexPrevious', 94, 472, 269, 38); add('whooshPrevious', 400, 472, 269, 38); add('urentPrevious', 704, 472, 269, 38);
    [['yandexMos','yandexNoMos',275],['whooshMos','whooshNoMos',375],['urentMos','urentNoMos',473]].forEach(([a,b,y]) => { add(a,1042,y-10,397,60); add(b,1439,y-10,397,60); });
    add('seasonStart', 140, 775, 330, 105);
    const cols=[1296,1482,1669];
    [['quotaYandex','quotaWhoosh','quotaUrent',617],['actualYandex','actualWhoosh','actualUrent',740],['excludedYandex','excludedWhoosh','excludedUrent',865]].forEach(row => row.slice(0,3).forEach((key,i)=>add(key,cols[i],row[3]+3,171,81)));
  }
  if (slideId === 2) {
    add('period',65,20,540,61); add('accidents',125,220,150,125); add('previousPeriod',370,340,250,32); add('previousAccidents',397,373,195,50);
    add('yandexAccidents',75,530,105,80); add('whooshAccidents',265,530,105,80); add('urentAccidents',455,530,105,80);
    add('totalRate',75,730,220,60); add('previousRate',300,787,235,40);
    [['yandexRate','yandexPreviousRate',80],['whooshRate','whooshPreviousRate',270],['urentRate','urentPreviousRate',460]].forEach(([a,b,x])=>{ add(a,x,835,140,55); add(b,x,892,150,40); });
    const rows=[['minorYandex','minorWhoosh','minorUrent',250],['doubleYandex','doubleWhoosh','doubleUrent',342],['dismountYandex','dismountWhoosh','dismountUrent',433],['parkingYandex','parkingWhoosh','parkingUrent',524]];
    const xs=[1038,1235,1431]; rows.forEach(row=>row.slice(0,3).forEach((key,i)=>add(key,xs[i],row[3],186,78)));
    add('raidsSeason',684,784,265,86); add('raidsPeriod',968,784,265,86);
    add('blockedTotal',1260,810,135,65); add('blockedAdded',1395,810,150,65);
    add('finesTotal',1260,910,135,65); add('finesAdded',1395,910,150,65);
  }
  if (slideId === 3) {
    add('casesTotal',170,205,145,100); add('recovered',150,430,180,105);
    add('won',94,718,141,62); add('lost',94,796,141,62); add('pending',94,874,141,62);
    add('yandexCases',950,240,156,130); add('whooshCases',1250,240,156,130); add('urentCases',1550,240,156,130);
  }
  // Динамические зоны графиков регистрируются в drawChart.
  return [...regions, ...state.hitRegions.filter(region => region.key.startsWith('claims') || region.key.startsWith('wins') || region.key.startsWith('month'))];
}

function bindCanvasEditing() {
  const wrap = canvas.closest('.canvas-wrap');
  canvas.addEventListener('pointermove', event => {
    const region = hitRegionAt(event);
    canvas.style.cursor = region ? 'text' : 'default';
    canvas.title = region ? 'Нажмите, чтобы изменить значение' : '';
  });
  canvas.addEventListener('click', event => {
    const region = hitRegionAt(event);
    if (region) openInlineEditor(region, wrap);
  });
  window.addEventListener('resize', closeInlineEditor);
}

function hitRegionAt(event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (W / rect.width);
  const y = (event.clientY - rect.top) * (H / rect.height);
  return [...state.hitRegions].reverse().find(item => x >= item.rect.x && x <= item.rect.x + item.rect.w && y >= item.rect.y && y <= item.rect.y + item.rect.h);
}

function openInlineEditor(region, wrap) {
  closeInlineEditor();
  const field = findField(state.activeSlide, region.key);
  if (!field) return;
  const canvasRect = canvas.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();
  const scaleX = canvasRect.width / W;
  const scaleY = canvasRect.height / H;
  const editor = document.createElement('div');
  editor.className = 'inline-editor';
  const desiredWidth = Math.max(150, Math.min(280, region.rect.w * scaleX));
  let left = canvasRect.left - wrapRect.left + region.rect.x * scaleX + region.rect.w * scaleX / 2 - desiredWidth / 2;
  let top = canvasRect.top - wrapRect.top + region.rect.y * scaleY + region.rect.h * scaleY / 2 - 23;
  left = Math.max(6, Math.min(wrap.clientWidth - desiredWidth - 6, left));
  top = Math.max(6, Math.min(wrap.clientHeight - 52, top));
  editor.style.left = `${left}px`; editor.style.top = `${top}px`; editor.style.width = `${desiredWidth}px`;
  const input = document.createElement('input');
  input.type = field.type;
  if (field.type === 'number') { input.step = field.step; input.inputMode = 'decimal'; input.placeholder = 'Х'; }
  input.value = state.data[state.activeSlide][field.key] ?? '';
  input.setAttribute('aria-label', field.label || field.key);
  editor.appendChild(input); wrap.appendChild(editor); state.inlineEditor = editor;
  const commit = () => {
    if (!editor.isConnected) return;
    state.data[state.activeSlide][field.key] = field.type === 'number' ? (input.value === '' ? '' : Number(input.value)) : input.value;
    renderEditor(); closeInlineEditor(); queueRender();
  };
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); commit(); }
    if (event.key === 'Escape') { event.preventDefault(); closeInlineEditor(); }
  });
  input.addEventListener('blur', commit, { once: true });
  requestAnimationFrame(() => { input.focus(); input.select(); });
}

function closeInlineEditor() {
  if (state.inlineEditor?.isConnected) state.inlineEditor.remove();
  state.inlineEditor = null;
}

function queueRender() {
  if (state.renderQueued) return;
  state.renderQueued = true;
  requestAnimationFrame(async () => {
    state.renderQueued = false;
    await renderSlide();
  });
}

function renderEditor() {
  const container = document.getElementById('editor-form');
  const schema = getSchema(state.activeSlide);
  const data = state.data[state.activeSlide];
  container.innerHTML = schema.map((section, sectionIndex) => `
    <details class="form-group" ${sectionIndex < 2 ? 'open' : ''}>
      <summary>${escapeHtml(section.title)}</summary>
      <div class="form-group__body">
        ${section.fields.map(field => `
          <div class="field-row">
            <label for="field-${field.key}">${escapeHtml(field.label)}</label>
            <input
              id="field-${field.key}"
              data-field-key="${field.key}"
              type="${field.type}"
              ${field.type === 'number' ? `step="${field.step}" inputmode="decimal" ${field.min !== null ? `min="${field.min}"` : ''} ${field.max !== null ? `max="${field.max}"` : ''}` : ''}
              placeholder="${field.type === 'number' ? 'Х' : ''}"
              value="${escapeHtml(data[field.key] ?? '')}"
              autocomplete="off"
            />
            ${field.hint ? `<small>${escapeHtml(field.hint)}</small>` : ''}
          </div>
        `).join('')}
      </div>
    </details>
  `).join('');

  container.querySelectorAll('[data-field-key]').forEach(input => {
    input.addEventListener('input', event => {
      const field = findField(state.activeSlide, event.target.dataset.fieldKey);
      state.data[state.activeSlide][field.key] = field.type === 'number'
        ? (event.target.value === '' ? '' : Number(event.target.value))
        : event.target.value;
      if (field.key === 'chartCount') {
        state.data[state.activeSlide][field.key] = clampChartCount(state.data[state.activeSlide][field.key]);
        renderEditor();
      }
      queueRender();
    });
  });
}

function findField(slideId, key) {
  for (const section of getSchema(slideId)) {
    const field = section.fields.find(item => item.key === key);
    if (field) return field;
  }
  return { key, type: 'text' };
}

function switchSlide(id) {
  state.activeSlide = Number(id);
  document.querySelectorAll('.slide-tab').forEach(button => {
    button.classList.toggle('is-active', Number(button.dataset.slideId) === state.activeSlide);
  });
  document.getElementById('slide-title').textContent = SLIDES[state.activeSlide].title;
  document.getElementById('editor-title').textContent = `Данные слайда ${state.activeSlide}`;
  document.getElementById('google-slide-label').textContent = `Обновить слайд ${state.activeSlide}`;
  document.getElementById('download-slide-label').textContent = `Скачать слайд ${state.activeSlide}`;
  renderEditor();
  queueRender();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function downloadCurrentSlide() {
  renderSlide().then(() => {
    const link = document.createElement('a');
    link.download = `sim-report-slide-${state.activeSlide}.png`;
    link.href = canvas.toDataURL('image/png', 1);
    link.click();
    showToast(`Слайд ${state.activeSlide} сохранён вместе с фоном`, 'success');
  });
}

async function downloadAllSlides() {
  const original = state.activeSlide;
  for (const id of [1, 2, 3]) {
    state.activeSlide = id;
    await renderSlide(id);
    const link = document.createElement('a');
    link.download = `sim-report-slide-${id}.png`;
    link.href = canvas.toDataURL('image/png', 1);
    document.body.appendChild(link);
    link.click();
    link.remove();
    await wait(350);
  }
  state.activeSlide = original;
  await renderSlide(original);
  showToast('Три PNG подготовлены', 'success');
}

function googleSlideNumber(slideId) {
  return GOOGLE_SLIDES.slideNumbers[Number(slideId)] || Number(slideId);
}

async function sendRenderedSlideToGoogle(slideId) {
  await renderSlide(slideId);
  const imageData = canvas.toDataURL('image/png', 1);
  const payload = {
    action: 'upsertSlideImage',
    presentationId: GOOGLE_SLIDES.presentationId,
    slideNumber: googleSlideNumber(slideId),
    editorSlideId: Number(slideId),
    mimeType: 'image/png',
    imageData,
    sentAt: new Date().toISOString(),
  };

  await fetch(GOOGLE_SLIDES.webAppUrl, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'omit',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  });
}

async function pushCurrentSlideToGoogle() {
  const slideId = state.activeSlide;
  await sendRenderedSlideToGoogle(slideId);
  await renderSlide(slideId);
  showToast(`Слайд ${googleSlideNumber(slideId)} отправлен в Google Slides`, 'success');
}

async function pushAllSlidesToGoogle() {
  const original = state.activeSlide;
  for (const id of [1, 2, 3]) {
    await sendRenderedSlideToGoogle(id);
    await wait(650);
  }
  await renderSlide(original);
  showToast('Три слайда отправлены в Google Slides', 'success');
}


function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast is-visible ${type ? `is-${type}` : ''}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.className = 'toast'; }, 3200);
}

function setBusy(button, busy) {
  if (!button) return;
  button.disabled = busy;
}

async function loadAssets() {
  const loading = document.getElementById('canvas-loading');
  try {
    const face = new FontFace('Moscow Sans', 'url(./assets/moscow-sans-regular.ttf)');
    const loadedFace = await face.load();
    document.fonts.add(loadedFace);
    await document.fonts.ready;
    state.fontReady = true;
  } catch (error) {
    console.warn('Moscow Sans could not be loaded, fallback will be used.', error);
  }

  await Promise.all([1, 2, 3].map(id => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { state.images[id] = image; resolve(); };
    image.onerror = () => reject(new Error(`Не удалось загрузить фон слайда ${id}`));
    image.src = SLIDES[id].background;
  })));
  loading.classList.add('is-hidden');
}

function bindUi() {
  document.querySelectorAll('.slide-tab').forEach(button => {
    button.addEventListener('click', () => switchSlide(button.dataset.slideId));
  });

  document.getElementById('download-slide').addEventListener('click', downloadCurrentSlide);
  document.getElementById('download-all').addEventListener('click', downloadAllSlides);

  document.getElementById('google-slide').addEventListener('click', async event => {
    const button = event.currentTarget;
    setBusy(button, true);
    try { await pushCurrentSlideToGoogle(); }
    catch (error) { showToast(`Не удалось обновить слайд: ${error.message}`, 'error'); }
    finally { setBusy(button, false); }
  });

  document.getElementById('google-all').addEventListener('click', async event => {
    const button = event.currentTarget;
    setBusy(button, true);
    try { await pushAllSlidesToGoogle(); }
    catch (error) { showToast(`Не удалось обновить слайды: ${error.message}`, 'error'); }
    finally { setBusy(button, false); }
  });

  bindCanvasEditing();

  document.getElementById('reset-slide').addEventListener('click', () => {
    state.data[state.activeSlide] = deepClone(DEFAULTS[state.activeSlide]);
    renderEditor();
    queueRender();
    showToast('Значения очищены', 'success');
  });
}

async function init() {
  loadInitialData();
  bindUi();
  renderEditor();
  try {
    await loadAssets();
    await renderSlide();
  } catch (error) {
    document.getElementById('canvas-loading').textContent = error.message;
    showToast(error.message, 'error');
  }
}

init();    previousPeriod: 'дата 1 – дата 2',
    previousTrips: '',
    yandexTrips: '',
    yandexPrevious: '',
    whooshTrips: '',
    whooshPrevious: '',
    urentTrips: '',
    urentPrevious: '',
    yandexMos: '',
    yandexNoMos: '',
    whooshMos: '',
    whooshNoMos: '',
    urentMos: '',
    urentNoMos: '',
    seasonStart: '',
    quotaYandex: '',
    quotaWhoosh: '',
    quotaUrent: '',
    actualYandex: '',
    actualWhoosh: '',
    actualUrent: '',
    excludedYandex: '',
    excludedWhoosh: '',
    excludedUrent: '',
  },
  2: {
    period: 'дата 1 – дата 2 (2 недели)',
    accidents: '',
    previousPeriod: 'дата 1 – дата 2',
    previousAccidents: '',
    yandexAccidents: '',
    whooshAccidents: '',
    urentAccidents: '',
    totalRate: '',
    previousRate: '',
    yandexRate: '',
    yandexPreviousRate: '',
    whooshRate: '',
    whooshPreviousRate: '',
    urentRate: '',
    urentPreviousRate: '',
    minorYandex: '',
    minorWhoosh: '',
    minorUrent: '',
    doubleYandex: '',
    doubleWhoosh: '',
    doubleUrent: '',
    dismountYandex: '',
    dismountWhoosh: '',
    dismountUrent: '',
    parkingYandex: '',
    parkingWhoosh: '',
    parkingUrent: '',
    raidsSeason: '',
    raidsPeriod: '',
    blockedTotal: '',
    blockedAdded: '',
    finesTotal: '',
    finesAdded: '',
  },
  3: {
    casesTotal: '',
    recovered: '',
    won: '',
    lost: '',
    pending: '',
    yandexCases: '',
    whooshCases: '',
    urentCases: '',
    chartCount: 3,
    month1: 'май',
    month2: 'июнь',
    month3: 'июль',
    month4: 'август',
    month5: 'сентябрь',
    month6: 'октябрь',
    month7: 'ноябрь',
    month8: 'декабрь',
    claims1: '', claims2: '', claims3: '', claims4: '',
    claims5: '', claims6: '', claims7: '', claims8: '',
    wins1: '', wins2: '', wins3: '', wins4: '',
    wins5: '', wins6: '', wins7: '', wins8: '',
  },
};

const SCHEMAS = {
  1: [
    group('Шапка и поездки', [
      textField('period', 'Период'),
      numberField('totalTrips', 'Общее количество поездок, млн', 0.1),
      textField('previousPeriod', 'Период АППН'),
      numberField('previousTrips', 'Поездки в АППН, млн', 0.1, 'Процент и стрелка рассчитываются автоматически.'),
    ]),
    group('Поездки по операторам', [
      numberField('yandexTrips', 'Яндекс — текущий период, тыс.', 0.1),
      numberField('yandexPrevious', 'Яндекс — АППН, тыс.', 0.1),
      numberField('whooshTrips', 'Whoosh — текущий период, тыс.', 0.1),
      numberField('whooshPrevious', 'Whoosh — АППН, тыс.', 0.1),
      numberField('urentTrips', 'Юрент — текущий период, тыс.', 0.1),
      numberField('urentPrevious', 'Юрент — АППН, тыс.', 0.1, 'Цвет и направление стрелки определяются по текущему и прошлому значениям.'),
    ]),
    group('Mos ID', [
      numberField('yandexMos', 'Яндекс — поездки с Mos ID, тыс.', 0.1),
      numberField('yandexNoMos', 'Яндекс — поездки без Mos ID, тыс.', 0.1),
      numberField('whooshMos', 'Whoosh — поездки с Mos ID, тыс.', 0.1),
      numberField('whooshNoMos', 'Whoosh — поездки без Mos ID, тыс.', 0.1),
      numberField('urentMos', 'Юрент — поездки с Mos ID, тыс.', 0.1),
      numberField('urentNoMos', 'Юрент — поездки без Mos ID, тыс.', 0.1, 'Доли и ширина полос рассчитываются автоматически.'),
    ]),
    group('Квота', [
      numberField('seasonStart', 'Парк в начале сезона, тыс.', 0.1),
      numberField('quotaYandex', 'Согласованная квота — Яндекс, тыс.', 0.1),
      numberField('quotaWhoosh', 'Согласованная квота — Whoosh, тыс.', 0.1),
      numberField('quotaUrent', 'Согласованная квота — Юрент, тыс.', 0.1),
      numberField('actualYandex', 'Фактический парк — Яндекс, тыс.', 0.1),
      numberField('actualWhoosh', 'Фактический парк — Whoosh, тыс.', 0.1),
      numberField('actualUrent', 'Фактический парк — Юрент, тыс.', 0.1),
      numberField('excludedYandex', 'Исключённый парк — Яндекс, тыс.', 0.1),
      numberField('excludedWhoosh', 'Исключённый парк — Whoosh, тыс.', 0.1),
      numberField('excludedUrent', 'Исключённый парк — Юрент, тыс.', 0.1, 'Итоговые значения в строках складываются автоматически.'),
    ]),
  ],
  2: [
    group('ДТП', [
      textField('period', 'Период'),
      numberField('accidents', 'ДТП за 2 недели', 1),
      textField('previousPeriod', 'Период АППН'),
      numberField('previousAccidents', 'ДТП в АППН', 1, 'Стрелка рассчитывается автоматически, текст всегда остаётся серым.'),
      numberField('yandexAccidents', 'Яндекс — ДТП', 1),
      numberField('whooshAccidents', 'Whoosh — ДТП', 1),
      numberField('urentAccidents', 'Юрент — ДТП', 1, 'Доли операторов рассчитываются от общего количества ДТП.'),
    ]),
    group('ДТП на 100 тыс. поездок', [
      numberField('totalRate', 'Общий показатель', 0.01),
      numberField('previousRate', 'Общий показатель АППН', 0.01),
      numberField('yandexRate', 'Яндекс — показатель', 0.01),
      numberField('yandexPreviousRate', 'Яндекс — АППН', 0.01),
      numberField('whooshRate', 'Whoosh — показатель', 0.01),
      numberField('whooshPreviousRate', 'Whoosh — АППН', 0.01),
      numberField('urentRate', 'Юрент — показатель', 0.01),
      numberField('urentPreviousRate', 'Юрент — АППН', 0.01),
    ]),
    group('Нарушения — несовершеннолетние', [
      numberField('minorYandex', 'Яндекс', 1),
      numberField('minorWhoosh', 'Whoosh', 1),
      numberField('minorUrent', 'Юрент', 1),
    ]),
    group('Нарушения — поездки вдвоём', [
      numberField('doubleYandex', 'Яндекс', 1),
      numberField('doubleWhoosh', 'Whoosh', 1),
      numberField('doubleUrent', 'Юрент', 1),
    ]),
    group('Нарушения — неспешивание', [
      numberField('dismountYandex', 'Яндекс', 1),
      numberField('dismountWhoosh', 'Whoosh', 1),
      numberField('dismountUrent', 'Юрент', 1),
    ]),
    group('Нарушения — парковка', [
      numberField('parkingYandex', 'Яндекс', 1),
      numberField('parkingWhoosh', 'Whoosh', 1),
      numberField('parkingUrent', 'Юрент', 1, 'Итоги по строкам и операторам рассчитываются автоматически.'),
    ]),
    group('Рейды и меры', [
      numberField('raidsSeason', 'Рейды с начала сезона', 1),
      numberField('raidsPeriod', 'Рейды за 2 недели', 1),
      numberField('blockedTotal', 'Заблокировано пользователей — всего', 1),
      numberField('blockedAdded', 'Заблокировано за период', 1),
      numberField('finesTotal', 'Выставлено штрафов — всего', 1),
      numberField('finesAdded', 'Штрафов за период', 1),
    ]),
  ],
  3: [
    group('Основные показатели', [
      numberField('casesTotal', 'Всего судебных дел', 1),
      numberField('recovered', 'Взыскано, тыс. рублей', 1),
      numberField('won', 'Выиграно со взысканием', 1),
      numberField('lost', 'Проиграно сервисами', 1),
      numberField('pending', 'На рассмотрении', 1),
    ]),
    group('Разбивка по операторам', [
      numberField('yandexCases', 'Яндекс — дел', 1),
      numberField('whooshCases', 'Whoosh — дел', 1),
      numberField('urentCases', 'Юрент — дел', 1),
    ]),
  ],
};

const SLIDES = {
  1: { title: 'Основные показатели', background: './assets/slide-1-bg.png' },
  2: { title: 'Показатели аварийности', background: './assets/slide-2-bg.png' },
  3: { title: 'Суды операторов аренды с пользователями', background: './assets/slide-3-bg.png' },
};

const state = {
  activeSlide: 1,
  data: {},
  images: {},
  fontReady: false,
  renderQueued: false,
  hitRegions: [],
  inlineEditor: null,
};

const canvas = document.getElementById('report-canvas');
const ctx = canvas.getContext('2d', { alpha: false });

function group(title, fields) { return { title, fields }; }
function textField(key, label, hint = '') { return { key, label, type: 'text', hint }; }
function numberField(key, label, step = 1, hint = '', min = null, max = null) { return { key, label, type: 'number', step, hint, min, max }; }

function deepClone(value) { return JSON.parse(JSON.stringify(value)); }

function loadInitialData() {
  for (const id of [1, 2, 3]) {
    state.data[id] = deepClone(DEFAULTS[id]);
  }
}

function hasValue(value) {
  return value !== '' && value !== null && value !== undefined && Number.isFinite(Number(String(value).replace(',', '.')));
}

function n(value, fallback = 0) {
  if (!hasValue(value)) return fallback;
  return Number(String(value).replace(',', '.'));
}

function sum(...values) { return values.reduce((acc, value) => acc + n(value), 0); }
function sumOrBlank(...values) { return values.some(hasValue) ? sum(...values) : ''; }

function pct(current, previous) {
  if (!hasValue(current) || !hasValue(previous) || n(previous) === 0) return null;
  return ((n(current) - n(previous)) / n(previous)) * 100;
}

function share(part, total) {
  if (!hasValue(part) || !hasValue(total) || n(total) === 0) return null;
  return (n(part) / n(total)) * 100;
}

function fmt(value, digits = null) {
  if (!hasValue(value)) return 'Х';
  const number = n(value);
  let useDigits = digits;
  if (useDigits === null) {
    useDigits = Number.isInteger(number) ? 0 : Math.min(2, decimalPlaces(number));
  }
  return number.toLocaleString('ru-RU', {
    minimumFractionDigits: useDigits,
    maximumFractionDigits: useDigits,
    useGrouping: true,
  });
}

function decimalPlaces(value) {
  const text = String(value);
  return text.includes('.') ? text.length - text.indexOf('.') - 1 : 0;
}

function compactPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return 'Х';
  const abs = Math.abs(n(value));
  const digits = abs < 10 && !Number.isInteger(abs) ? 1 : 0;
  return fmt(abs, digits);
}

function font(size, weight = 400) {
  return `${weight} ${size}px "Moscow Sans", Arial, sans-serif`;
}

function setFont(size, weight = 400) {
  ctx.font = font(size, weight);
  ctx.textBaseline = 'middle';
}

function drawText(text, x, y, options = {}) {
  const {
    size = 30,
    weight = 400,
    color = COLORS.ink,
    align = 'left',
    baseline = 'middle',
    maxWidth,
  } = options;
  ctx.save();
  ctx.font = font(size, weight);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  if (maxWidth) ctx.fillText(String(text), x, y, maxWidth);
  else ctx.fillText(String(text), x, y);
  ctx.restore();
}

function fitText(text, box, options = {}) {
  const { size = 32, minSize = 14, weight = 400, color = COLORS.ink, align = 'center' } = options;
  let fontSize = size;
  ctx.save();
  while (fontSize > minSize) {
    ctx.font = font(fontSize, weight);
    if (ctx.measureText(String(text)).width <= box.w) break;
    fontSize -= 1;
  }
  ctx.restore();
  const x = align === 'center' ? box.x + box.w / 2 : align === 'right' ? box.x + box.w : box.x;
  drawText(text, x, box.y + box.h / 2, { size: fontSize, weight, color, align });
}

function roundedPath(x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function roundedRect(x, y, w, h, radius, fill, stroke = null, lineWidth = 1) {
  ctx.save();
  roundedPath(x, y, w, h, radius);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  ctx.restore();
}

function drawMetric(main, suffix, box, options = {}) {
  const {
    mainSize = 60,
    suffixSize = 28,
    mainWeight = 700,
    suffixWeight = 700,
    color = COLORS.ink,
    gap = 14,
    align = 'center',
    suffixYOffset = 7,
  } = options;
  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.font = font(mainSize, mainWeight);
  const mainWidth = ctx.measureText(String(main)).width;
  ctx.font = font(suffixSize, suffixWeight);
  const suffixWidth = ctx.measureText(String(suffix)).width;
  const total = mainWidth + gap + suffixWidth;
  let startX = box.x + (box.w - total) / 2;
  if (align === 'left') startX = box.x;
  if (align === 'right') startX = box.x + box.w - total;
  drawText(main, startX, box.y + box.h / 2, { size: mainSize, weight: mainWeight, color });
  drawText(suffix, startX + mainWidth + gap, box.y + box.h / 2 + suffixYOffset, { size: suffixSize, weight: suffixWeight, color });
  ctx.restore();
}

function drawDeltaPill(current, previous, box, options = {}) {
  const { prefix = 'АППН ', unit = '', positiveGood = true, size = 22 } = options;
  const delta = pct(current, previous);
  const unknown = delta === null;
  const up = !unknown && delta > 0.0001;
  const down = !unknown && delta < -0.0001;
  const good = positiveGood ? up : down;
  const bad = positiveGood ? down : up;
  const color = good ? COLORS.green : bad ? COLORS.red : COLORS.muted2;
  const bg = good ? COLORS.greenBg : bad ? COLORS.redBg : COLORS.light;
  roundedRect(box.x, box.y, box.w, box.h, box.h / 2, bg);
  const prevText = `${prefix}${fmt(previous)}${unit}`;
  const indicator = unknown ? 'Х%' : up ? `▲ ${compactPercent(delta)}%` : down ? `▼ ${compactPercent(delta)}%` : '• 0%';
  ctx.save();
  ctx.font = font(size, 500);
  const a = ctx.measureText(prevText).width;
  const b = ctx.measureText(indicator).width;
  const total = a + 8 + b;
  const start = box.x + (box.w - total) / 2;
  drawText(prevText, start, box.y + box.h / 2 + 1, { size, weight: 500, color: COLORS.muted2 });
  drawText(indicator, start + a + 8, box.y + box.h / 2 + 1, { size, weight: 500, color });
  ctx.restore();
}

function drawSimpleDelta(current, previous, box, positiveGood = true, size = 24) {
  const delta = pct(current, previous);
  const unknown = delta === null;
  const up = !unknown && delta > 0.0001;
  const down = !unknown && delta < -0.0001;
  const good = positiveGood ? up : down;
  const bad = positiveGood ? down : up;
  const color = good ? COLORS.green : bad ? COLORS.red : COLORS.muted2;
  const indicator = unknown ? 'Х%' : up ? `▲ ${compactPercent(delta)}%` : down ? `▼ ${compactPercent(delta)}%` : '• 0%';
  fitText(indicator, box, { size, minSize: 16, weight: 500, color, align: 'center' });
}

function drawMosBar(operatorName, withMos, withoutMos, y) {
  const x = 1042;
  const width = 794;
  const height = 35;
  const known = hasValue(withMos) || hasValue(withoutMos);
  const total = known ? Math.max(0, n(withMos) + n(withoutMos)) : 0;
  const ratio = total ? Math.max(0, Math.min(1, n(withMos) / total)) : 0;
  const fillWidth = Math.max(0, width * ratio);

  // Название оператора над каждой полосой Mos ID.
  drawText(operatorName, x + width / 2, y - 47, {
    size: 28,
    weight: 500,
    color: COLORS.muted,
    align: 'center',
  });

  roundedRect(x, y, width, height, 13, COLORS.barBg);
  if (known && fillWidth > 0) {
    ctx.save();
    roundedPath(x, y, width, height, 13);
    ctx.clip();
    ctx.fillStyle = COLORS.blue;
    ctx.fillRect(x, y, fillWidth, height);
    ctx.restore();
  }

  drawText(known && total ? `${fmt(ratio * 100, 0)}%` : 'Х%', x + 3, y - 18, { size: 23, weight: 500, color: COLORS.muted, align: 'left' });
  drawText(known && total ? `${fmt((1 - ratio) * 100, 0)}%` : 'Х%', x + width - 3, y - 18, { size: 23, weight: 500, color: '#b9c0cd', align: 'right' });

  drawText(fmt(withMos, 1), x + 8, y + height / 2 + 1, { size: 24, weight: 500, color: known && fillWidth > 70 ? COLORS.white : COLORS.muted });
  const rightX = known ? Math.min(x + width - 8, x + fillWidth + 10) : x + width - 8;
  drawText(fmt(withoutMos, 1), rightX, y + height / 2 + 1, { size: 24, weight: 500, color: '#8490a3', align: known ? 'left' : 'right' });
}

function drawQuotaRow(y, values) {
  const total = sumOrBlank(values[0], values[1], values[2]);
  drawMetric(fmt(total, hasValue(total) && Number.isInteger(n(total)) ? 0 : 1), 'тыс.', { x: 930, y, w: 300, h: 84 }, { mainSize: 58, suffixSize: 28 });
  const cells = [
    { x: 1296, color: COLORS.yellow },
    { x: 1482, color: COLORS.gray },
    { x: 1669, color: COLORS.violet },
  ];
  cells.forEach((cell, index) => {
    roundedRect(cell.x, y + 3, 171, 81, 17, cell.color);
    drawMetric(fmt(values[index], Number.isInteger(n(values[index])) ? 0 : 1), 'тыс.', { x: cell.x + 8, y: y + 3, w: 155, h: 81 }, {
      mainSize: 35,
      suffixSize: 20,
      mainWeight: 500,
      suffixWeight: 700,
      color: COLORS.muted,
      gap: 7,
    });
  });
}

function drawViolationsCell(value, x, y, totalRow = false) {
  drawText(fmt(value, 0), x, y, { size: totalRow ? 30 : 34, weight: 500, color: COLORS.ink, align: 'center' });
  drawText('нарушений', x, y + 29, { size: totalRow ? 17 : 18, weight: 500, color: totalRow ? COLORS.ink : '#8490a3', align: 'center' });
}

function drawChart(values, months, area, keyPrefix) {
  const { x, y, w, h } = area;
  const count = Math.max(1, Math.min(8, values.length));
  const baseline = y + h - 52;
  const plotTop = y + 82;
  const plotHeight = Math.max(20, baseline - plotTop);
  const numericValues = values.map(value => hasValue(value) ? Math.max(0, n(value)) : null);
  const max = Math.max(...numericValues.filter(value => value !== null), 1);
  const slot = w / count;
  const barWidth = Math.min(100, Math.max(24, slot * 0.55));
  const colors = [COLORS.chartLight, COLORS.chartMid, COLORS.chartDark];
  const valueFont = count <= 4 ? 29 : count <= 6 ? 23 : 19;
  const monthFont = count <= 4 ? 24 : count <= 6 ? 19 : 16;

  ctx.save();
  ctx.strokeStyle = '#cfd5dd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 8, baseline + 0.5);
  ctx.lineTo(x + w - 8, baseline + 0.5);
  ctx.stroke();
  ctx.restore();

  numericValues.forEach((value, index) => {
    const center = x + slot * (index + 0.5);
    const barHeight = value === null || value === 0 ? 0 : Math.max(4, (value / max) * plotHeight);
    const bx = center - barWidth / 2;
    const by = baseline - barHeight;
    if (barHeight > 0) {
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(bx, by, barWidth, barHeight);
    }
    // Подпись всегда находится в отдельной зоне над столбцом и не накладывается на него.
    const labelGap = Math.ceil(valueFont * 0.72) + 8;
    const labelY = Math.max(y + 34, by - labelGap);
    drawText(value === null ? 'Х' : fmt(value, Number.isInteger(value) ? 0 : 1), center, labelY, {
      size: valueFont,
      weight: 500,
      color: COLORS.muted,
      align: 'center',
    });
    fitText(months[index] || `месяц ${index + 1}`, { x: x + slot * index + 3, y: baseline + 13, w: slot - 6, h: 42 }, {
      size: monthFont,
      minSize: 10,
      weight: 400,
      color: COLORS.muted,
      align: 'center',
    });
    registerHit(`${keyPrefix}${index + 1}`, { x: x + slot * index, y: y + 20, w: slot, h: baseline - y + 8 });
    registerHit(`month${index + 1}`, { x: x + slot * index, y: baseline + 4, w: slot, h: 55 });
  });
}

async function renderSlide(slideId = state.activeSlide) {
  const image = state.images[slideId];
  if (!image) return;
  state.hitRegions = [];
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#e8ebf0';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(image, 0, 0, W, H);
  ctx.imageSmoothingEnabled = true;
  if (slideId === 1) drawSlide1(state.data[1]);
  if (slideId === 2) drawSlide2(state.data[2]);
  if (slideId === 3) drawSlide3(state.data[3]);
  state.hitRegions = buildHitRegions(slideId, state.data[slideId]);
}

function drawSlide1(d) {
  fitText(d.period, { x: 67, y: 20, w: 540, h: 61 }, { size: 37, minSize: 23, weight: 700, color: COLORS.white });

  drawMetric(fmt(d.totalTrips, 1), 'млн', { x: 105, y: 213, w: 230, h: 80 }, { mainSize: 64, suffixSize: 31 });
  fitText(d.previousPeriod, { x: 418, y: 253, w: 235, h: 46 }, { size: 26, minSize: 18, weight: 500, color: '#8491a6' });
  drawMetric(fmt(d.previousTrips, 1), 'млн', { x: 692, y: 247, w: 150, h: 55 }, {
    mainSize: 34,
    suffixSize: 31,
    mainWeight: 500,
    suffixWeight: 500,
    color: '#617087',
    gap: 8,
    suffixYOffset: 0,
  });
  drawSimpleDelta(d.totalTrips, d.previousTrips, { x: 842, y: 248, w: 128, h: 54 }, true, 24);

  drawMetric(fmt(d.yandexTrips, 1), 'тыс.', { x: 130, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });
  drawMetric(fmt(d.whooshTrips, 1), 'тыс.', { x: 432, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });
  drawMetric(fmt(d.urentTrips, 1), 'тыс.', { x: 734, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });

  drawDeltaPill(d.yandexTrips, d.yandexPrevious, { x: 94, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });
  drawDeltaPill(d.whooshTrips, d.whooshPrevious, { x: 400, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });
  drawDeltaPill(d.urentTrips, d.urentPrevious, { x: 704, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });

  drawMosBar('Яндекс', d.yandexMos, d.yandexNoMos, 275);
  drawMosBar('Whoosh', d.whooshMos, d.whooshNoMos, 375);
  drawMosBar('Юрент', d.urentMos, d.urentNoMos, 473);

  // Маскируем фиксированное число 60 из фонового шаблона и рисуем редактируемое значение.
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(125, 775, 350, 105);
  drawMetric(fmt(d.seasonStart, Number.isInteger(n(d.seasonStart)) ? 0 : 1), 'тыс. самокатов', { x: 140, y: 775, w: 330, h: 105 }, {
    mainSize: 60,
    suffixSize: 29,
    gap: 14,
  });

  drawQuotaRow(617, [d.quotaYandex, d.quotaWhoosh, d.quotaUrent]);
  drawQuotaRow(740, [d.actualYandex, d.actualWhoosh, d.actualUrent]);
  drawQuotaRow(865, [d.excludedYandex, d.excludedWhoosh, d.excludedUrent]);
}

function drawRaidMetric(value, box, color) {
  const main = fmt(value, 0);
  const suffix = 'ед.';
  const mainSize = 65;
  const suffixSize = 38;
  const gap = 13;
  ctx.save();
  ctx.font = font(mainSize, 700);
  const mainWidth = ctx.measureText(main).width;
  ctx.font = font(suffixSize, 700);
  const suffixWidth = ctx.measureText(suffix).width;
  const totalWidth = mainWidth + gap + suffixWidth;
  const startX = box.x + (box.w - totalWidth) / 2;
  const centerY = box.y + box.h / 2;
  drawText(main, startX, centerY, { size: mainSize, weight: 700, color });
  drawText(suffix, startX + mainWidth + gap, centerY + 1, { size: suffixSize, weight: 700, color });
  ctx.restore();
}

function caseNoun(value) {
  if (!hasValue(value)) return 'дел';
  const number = Math.abs(Math.trunc(n(value)));
  const lastTwo = number % 100;
  const last = number % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'дел';
  if (last === 1) return 'дело';
  if (last >= 2 && last <= 4) return 'дела';
  return 'дел';
}

function drawSlide2(d) {
  fitText(d.period, { x: 65, y: 20, w: 540, h: 61 }, { size: 36, minSize: 22, weight: 700, color: COLORS.white });

  drawText(fmt(d.accidents, 0), 200, 286, { size: 66, weight: 500, color: COLORS.muted, align: 'center' });
  const accidentDelta = pct(d.accidents, d.previousAccidents);
  const deltaUnknown = accidentDelta === null;
  const deltaUp = !deltaUnknown && accidentDelta > 0.0001;
  const deltaDown = !deltaUnknown && accidentDelta < -0.0001;
  const deltaText = deltaUnknown ? 'Х%' : deltaUp ? `▲ ${compactPercent(accidentDelta)}%` : deltaDown ? `▼ ${compactPercent(accidentDelta)}%` : '• 0%';
  const deltaColor = COLORS.muted;
  fitText(deltaText, { x: 365, y: 220, w: 260, h: 90 }, { size: 47, minSize: 26, weight: 700, color: deltaColor });
  fitText(`АППН (${d.previousPeriod})`, { x: 370, y: 352, w: 250, h: 28 }, { size: 20, minSize: 14, weight: 500, color: '#8a94a6' });
  fitText(`${fmt(d.previousAccidents, 0)} ДТП`, { x: 397, y: 383, w: 195, h: 39 }, { size: 24, minSize: 17, weight: 500, color: '#657187' });

  const totalAccidents = hasValue(d.accidents) ? Math.max(1, n(d.accidents)) : '';
  const operatorCards = [
    { count: d.yandexAccidents, x: 116, pillX: 198 },
    { count: d.whooshAccidents, x: 306, pillX: 388 },
    { count: d.urentAccidents, x: 495, pillX: 577 },
  ];
  operatorCards.forEach(card => {
    drawText(fmt(card.count, 0), card.x, 575, { size: 39, weight: 400, color: COLORS.ink, align: 'center' });
    roundedRect(card.pillX - 42, 553, 84, 40, 20, COLORS.light);
    drawText(share(card.count, totalAccidents) === null ? 'Х%' : `${fmt(share(card.count, totalAccidents), 0)}%`, card.pillX, 574, { size: 22, weight: 500, color: COLORS.muted, align: 'center' });
  });

  ctx.save();
  ctx.font = font(31, 700);
  const first = `${fmt(d.totalRate, 2)} ДТП`;
  const firstWidth = ctx.measureText(first).width;
  drawText(first, 87, 758, { size: 31, weight: 700, color: COLORS.ink });
  drawText(' на 100. тыс. поездок', 87 + firstWidth + 6, 758, { size: 29, weight: 700, color: COLORS.muted });
  ctx.restore();

  roundedRect(83, 791, 452, 31, 13, COLORS.light);
  fitText(`АППН (${d.previousPeriod}) – ${fmt(d.previousRate, 2)} ДТП`, { x: 90, y: 791, w: 438, h: 31 }, { size: 22, minSize: 15, weight: 500, color: '#778398' });

  const rateCols = [
    { value: d.yandexRate, prev: d.yandexPreviousRate, x: 169, prevX: 158 },
    { value: d.whooshRate, prev: d.whooshPreviousRate, x: 358, prevX: 348 },
    { value: d.urentRate, prev: d.urentPreviousRate, x: 548, prevX: 538 },
  ];
  rateCols.forEach(item => {
    drawText(fmt(item.value, 2), item.x, 866, { size: 31, weight: 500, color: COLORS.muted, align: 'center' });
    drawText(`АППН – ${fmt(item.prev, 2)}`, item.prevX, 911, { size: 18, weight: 500, color: '#778398', align: 'center' });
  });

  const categories = [
    [d.minorYandex, d.minorWhoosh, d.minorUrent],
    [d.doubleYandex, d.doubleWhoosh, d.doubleUrent],
    [d.dismountYandex, d.dismountWhoosh, d.dismountUrent],
    [d.parkingYandex, d.parkingWhoosh, d.parkingUrent],
  ];
  const rowY = [286, 378, 469, 560];
  const colX = [1131, 1328, 1524, 1725];
  categories.forEach((values, row) => {
    const rowTotal = sumOrBlank(...values);
    [values[0], values[1], values[2], rowTotal].forEach((value, col) => drawViolationsCell(value, colX[col], rowY[row], false));
  });
  const totals = [
    sumOrBlank(d.minorYandex, d.doubleYandex, d.dismountYandex, d.parkingYandex),
    sumOrBlank(d.minorWhoosh, d.doubleWhoosh, d.dismountWhoosh, d.parkingWhoosh),
    sumOrBlank(d.minorUrent, d.doubleUrent, d.dismountUrent, d.parkingUrent),
  ];
  drawViolationsCell(totals[0], colX[0], 635, true);
  drawViolationsCell(totals[1], colX[1], 635, true);
  drawViolationsCell(totals[2], colX[2], 635, true);
  drawViolationsCell(sumOrBlank(...totals), colX[3], 635, true);

  drawRaidMetric(d.raidsSeason, { x: 684, y: 782, w: 265, h: 88 }, COLORS.muted);
  drawRaidMetric(d.raidsPeriod, { x: 968, y: 782, w: 265, h: 88 }, COLORS.ink);
  drawText(`${fmt(d.blockedTotal, 0)} (+${fmt(d.blockedAdded, 0)})`, 1269, 846, { size: 39, weight: 500, color: COLORS.muted });
  drawText(`${fmt(d.finesTotal, 0)} (+${fmt(d.finesAdded, 0)})`, 1269, 947, { size: 39, weight: 500, color: COLORS.muted });
}

function drawSlide3(d) {
  drawText(fmt(d.casesTotal, 0), 241, 256, { size: 68, weight: 500, color: COLORS.ink, align: 'center' });
  drawText(fmt(d.recovered, 0), 241, 483, { size: 55, weight: 500, color: COLORS.ink, align: 'center' });
  drawText('тыс. рублей', 241, 531, { size: 23, weight: 700, color: COLORS.muted, align: 'center' });

  const mainRows = [
    { value: d.won, y: 718 },
    { value: d.lost, y: 796 },
    { value: d.pending, y: 874 },
  ];
  mainRows.forEach(row => {
    roundedRect(94, row.y, 141, 62, 11, COLORS.light);
    drawText(fmt(row.value, 0), 164.5, row.y + 31, { size: 47, weight: 500, color: '#657187', align: 'center' });
  });

  drawText(fmt(d.yandexCases, 0), 1028, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText(caseNoun(d.yandexCases), 1028, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });
  drawText(fmt(d.whooshCases, 0), 1328, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText(caseNoun(d.whooshCases), 1328, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });
  drawText(fmt(d.urentCases, 0), 1628, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText(caseNoun(d.urentCases), 1628, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });

  const count = clampChartCount(d.chartCount);
  const months = Array.from({ length: count }, (_, index) => d[`month${index + 1}`]);
  const claims = Array.from({ length: count }, (_, index) => d[`claims${index + 1}`]);
  const wins = Array.from({ length: count }, (_, index) => d[`wins${index + 1}`]);
  drawChart(claims, months, { x: 821, y: 540, w: 464, h: 421 }, 'claims');
  drawChart(wins, months, { x: 1377, y: 540, w: 464, h: 421 }, 'wins');
}


function clampChartCount(value) {
  return Math.max(1, Math.min(8, Math.round(n(value, 3) || 3)));
}

function getSchema(slideId) {
  if (Number(slideId) !== 3) return SCHEMAS[slideId];
  const count = clampChartCount(state.data[3]?.chartCount ?? DEFAULTS[3].chartCount);
  return [
    ...SCHEMAS[3],
    group('Настройки графиков', [
      numberField('chartCount', 'Количество столбцов', 1, 'От 1 до 8 столбцов в каждом графике.', 1, 8),
    ]),
    group('Подписи месяцев', Array.from({ length: count }, (_, index) => textField(`month${index + 1}`, `Столбец ${index + 1}`))),
    group('Поданные исковые заявления', Array.from({ length: count }, (_, index) => numberField(`claims${index + 1}`, `Столбец ${index + 1}`, 1))),
    group('Выигранные дела', Array.from({ length: count }, (_, index) => numberField(`wins${index + 1}`, `Столбец ${index + 1}`, 1, index === count - 1 ? 'Подписи всегда размещаются выше столбцов.' : ''))),
  ];
}

function registerHit(key, rect, label = '') {
  if (!key) return;
  state.hitRegions.push({ key, rect, label });
}

function buildHitRegions(slideId, d) {
  const regions = [];
  const add = (key, x, y, w, h) => regions.push({ key, rect: { x, y, w, h } });
  if (slideId === 1) {
    add('period', 67, 20, 540, 61); add('totalTrips', 105, 213, 230, 80);
    add('previousPeriod', 418, 253, 235, 46); add('previousTrips', 692, 247, 150, 55);
    add('yandexTrips', 130, 390, 200, 70); add('whooshTrips', 432, 390, 200, 70); add('urentTrips', 734, 390, 200, 70);
    add('yandexPrevious', 94, 472, 269, 38); add('whooshPrevious', 400, 472, 269, 38); add('urentPrevious', 704, 472, 269, 38);
    [['yandexMos','yandexNoMos',275],['whooshMos','whooshNoMos',375],['urentMos','urentNoMos',473]].forEach(([a,b,y]) => { add(a,1042,y-10,397,60); add(b,1439,y-10,397,60); });
    add('seasonStart', 140, 775, 330, 105);
    const cols=[1296,1482,1669];
    [['quotaYandex','quotaWhoosh','quotaUrent',617],['actualYandex','actualWhoosh','actualUrent',740],['excludedYandex','excludedWhoosh','excludedUrent',865]].forEach(row => row.slice(0,3).forEach((key,i)=>add(key,cols[i],row[3]+3,171,81)));
  }
  if (slideId === 2) {
    add('period',65,20,540,61); add('accidents',125,220,150,125); add('previousPeriod',370,340,250,32); add('previousAccidents',397,373,195,50);
    add('yandexAccidents',75,530,105,80); add('whooshAccidents',265,530,105,80); add('urentAccidents',455,530,105,80);
    add('totalRate',75,730,220,60); add('previousRate',300,787,235,40);
    [['yandexRate','yandexPreviousRate',80],['whooshRate','whooshPreviousRate',270],['urentRate','urentPreviousRate',460]].forEach(([a,b,x])=>{ add(a,x,835,140,55); add(b,x,892,150,40); });
    const rows=[['minorYandex','minorWhoosh','minorUrent',250],['doubleYandex','doubleWhoosh','doubleUrent',342],['dismountYandex','dismountWhoosh','dismountUrent',433],['parkingYandex','parkingWhoosh','parkingUrent',524]];
    const xs=[1038,1235,1431]; rows.forEach(row=>row.slice(0,3).forEach((key,i)=>add(key,xs[i],row[3],186,78)));
    add('raidsSeason',684,784,265,86); add('raidsPeriod',968,784,265,86);
    add('blockedTotal',1260,810,135,65); add('blockedAdded',1395,810,150,65);
    add('finesTotal',1260,910,135,65); add('finesAdded',1395,910,150,65);
  }
  if (slideId === 3) {
    add('casesTotal',170,205,145,100); add('recovered',150,430,180,105);
    add('won',94,718,141,62); add('lost',94,796,141,62); add('pending',94,874,141,62);
    add('yandexCases',950,240,156,130); add('whooshCases',1250,240,156,130); add('urentCases',1550,240,156,130);
  }
  // Динамические зоны графиков регистрируются в drawChart.
  return [...regions, ...state.hitRegions.filter(region => region.key.startsWith('claims') || region.key.startsWith('wins') || region.key.startsWith('month'))];
}

function bindCanvasEditing() {
  const wrap = canvas.closest('.canvas-wrap');
  canvas.addEventListener('pointermove', event => {
    const region = hitRegionAt(event);
    canvas.style.cursor = region ? 'text' : 'default';
    canvas.title = region ? 'Нажмите, чтобы изменить значение' : '';
  });
  canvas.addEventListener('click', event => {
    const region = hitRegionAt(event);
    if (region) openInlineEditor(region, wrap);
  });
  window.addEventListener('resize', closeInlineEditor);
}

function hitRegionAt(event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (W / rect.width);
  const y = (event.clientY - rect.top) * (H / rect.height);
  return [...state.hitRegions].reverse().find(item => x >= item.rect.x && x <= item.rect.x + item.rect.w && y >= item.rect.y && y <= item.rect.y + item.rect.h);
}

function openInlineEditor(region, wrap) {
  closeInlineEditor();
  const field = findField(state.activeSlide, region.key);
  if (!field) return;
  const canvasRect = canvas.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();
  const scaleX = canvasRect.width / W;
  const scaleY = canvasRect.height / H;
  const editor = document.createElement('div');
  editor.className = 'inline-editor';
  const desiredWidth = Math.max(150, Math.min(280, region.rect.w * scaleX));
  let left = canvasRect.left - wrapRect.left + region.rect.x * scaleX + region.rect.w * scaleX / 2 - desiredWidth / 2;
  let top = canvasRect.top - wrapRect.top + region.rect.y * scaleY + region.rect.h * scaleY / 2 - 23;
  left = Math.max(6, Math.min(wrap.clientWidth - desiredWidth - 6, left));
  top = Math.max(6, Math.min(wrap.clientHeight - 52, top));
  editor.style.left = `${left}px`; editor.style.top = `${top}px`; editor.style.width = `${desiredWidth}px`;
  const input = document.createElement('input');
  input.type = field.type;
  if (field.type === 'number') { input.step = field.step; input.inputMode = 'decimal'; input.placeholder = 'Х'; }
  input.value = state.data[state.activeSlide][field.key] ?? '';
  input.setAttribute('aria-label', field.label || field.key);
  editor.appendChild(input); wrap.appendChild(editor); state.inlineEditor = editor;
  const commit = () => {
    if (!editor.isConnected) return;
    state.data[state.activeSlide][field.key] = field.type === 'number' ? (input.value === '' ? '' : Number(input.value)) : input.value;
    renderEditor(); closeInlineEditor(); queueRender();
  };
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); commit(); }
    if (event.key === 'Escape') { event.preventDefault(); closeInlineEditor(); }
  });
  input.addEventListener('blur', commit, { once: true });
  requestAnimationFrame(() => { input.focus(); input.select(); });
}

function closeInlineEditor() {
  if (state.inlineEditor?.isConnected) state.inlineEditor.remove();
  state.inlineEditor = null;
}

function queueRender() {
  if (state.renderQueued) return;
  state.renderQueued = true;
  requestAnimationFrame(async () => {
    state.renderQueued = false;
    await renderSlide();
  });
}

function renderEditor() {
  const container = document.getElementById('editor-form');
  const schema = getSchema(state.activeSlide);
  const data = state.data[state.activeSlide];
  container.innerHTML = schema.map((section, sectionIndex) => `
    <details class="form-group" ${sectionIndex < 2 ? 'open' : ''}>
      <summary>${escapeHtml(section.title)}</summary>
      <div class="form-group__body">
        ${section.fields.map(field => `
          <div class="field-row">
            <label for="field-${field.key}">${escapeHtml(field.label)}</label>
            <input
              id="field-${field.key}"
              data-field-key="${field.key}"
              type="${field.type}"
              ${field.type === 'number' ? `step="${field.step}" inputmode="decimal" ${field.min !== null ? `min="${field.min}"` : ''} ${field.max !== null ? `max="${field.max}"` : ''}` : ''}
              placeholder="${field.type === 'number' ? 'Х' : ''}"
              value="${escapeHtml(data[field.key] ?? '')}"
              autocomplete="off"
            />
            ${field.hint ? `<small>${escapeHtml(field.hint)}</small>` : ''}
          </div>
        `).join('')}
      </div>
    </details>
  `).join('');

  container.querySelectorAll('[data-field-key]').forEach(input => {
    input.addEventListener('input', event => {
      const field = findField(state.activeSlide, event.target.dataset.fieldKey);
      state.data[state.activeSlide][field.key] = field.type === 'number'
        ? (event.target.value === '' ? '' : Number(event.target.value))
        : event.target.value;
      if (field.key === 'chartCount') {
        state.data[state.activeSlide][field.key] = clampChartCount(state.data[state.activeSlide][field.key]);
        renderEditor();
      }
      queueRender();
    });
  });
}

function findField(slideId, key) {
  for (const section of getSchema(slideId)) {
    const field = section.fields.find(item => item.key === key);
    if (field) return field;
  }
  return { key, type: 'text' };
}

function switchSlide(id) {
  state.activeSlide = Number(id);
  document.querySelectorAll('.slide-tab').forEach(button => {
    button.classList.toggle('is-active', Number(button.dataset.slideId) === state.activeSlide);
  });
  document.getElementById('slide-title').textContent = SLIDES[state.activeSlide].title;
  document.getElementById('editor-title').textContent = `Данные слайда ${state.activeSlide}`;
  document.getElementById('google-slide-label').textContent = `Обновить слайд ${state.activeSlide}`;
  document.getElementById('download-slide-label').textContent = `Скачать слайд ${state.activeSlide}`;
  renderEditor();
  queueRender();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function downloadCurrentSlide() {
  renderSlide().then(() => {
    const link = document.createElement('a');
    link.download = `sim-report-slide-${state.activeSlide}.png`;
    link.href = canvas.toDataURL('image/png', 1);
    link.click();
    showToast(`Слайд ${state.activeSlide} сохранён вместе с фоном`, 'success');
  });
}

async function downloadAllSlides() {
  const original = state.activeSlide;
  for (const id of [1, 2, 3]) {
    state.activeSlide = id;
    await renderSlide(id);
    const link = document.createElement('a');
    link.download = `sim-report-slide-${id}.png`;
    link.href = canvas.toDataURL('image/png', 1);
    document.body.appendChild(link);
    link.click();
    link.remove();
    await wait(350);
  }
  state.activeSlide = original;
  await renderSlide(original);
  showToast('Три PNG подготовлены', 'success');
}

function googleSlideNumber(slideId) {
  return GOOGLE_SLIDES.slideNumbers[Number(slideId)] || Number(slideId);
}

async function sendRenderedSlideToGoogle(slideId) {
  await renderSlide(slideId);
  const imageData = canvas.toDataURL('image/png', 1);
  const payload = {
    action: 'upsertSlideImage',
    presentationId: GOOGLE_SLIDES.presentationId,
    slideNumber: googleSlideNumber(slideId),
    editorSlideId: Number(slideId),
    mimeType: 'image/png',
    imageData,
    sentAt: new Date().toISOString(),
  };

  await fetch(GOOGLE_SLIDES.webAppUrl, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'omit',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  });
}

async function pushCurrentSlideToGoogle() {
  const slideId = state.activeSlide;
  await sendRenderedSlideToGoogle(slideId);
  await renderSlide(slideId);
  showToast(`Слайд ${googleSlideNumber(slideId)} отправлен в Google Slides`, 'success');
}

async function pushAllSlidesToGoogle() {
  const original = state.activeSlide;
  for (const id of [1, 2, 3]) {
    await sendRenderedSlideToGoogle(id);
    await wait(650);
  }
  await renderSlide(original);
  showToast('Три слайда отправлены в Google Slides', 'success');
}


function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast is-visible ${type ? `is-${type}` : ''}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.className = 'toast'; }, 3200);
}

function setBusy(button, busy) {
  if (!button) return;
  button.disabled = busy;
}

async function loadAssets() {
  const loading = document.getElementById('canvas-loading');
  try {
    const face = new FontFace('Moscow Sans', 'url(./assets/moscow-sans-regular.ttf)');
    const loadedFace = await face.load();
    document.fonts.add(loadedFace);
    await document.fonts.ready;
    state.fontReady = true;
  } catch (error) {
    console.warn('Moscow Sans could not be loaded, fallback will be used.', error);
  }

  await Promise.all([1, 2, 3].map(id => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { state.images[id] = image; resolve(); };
    image.onerror = () => reject(new Error(`Не удалось загрузить фон слайда ${id}`));
    image.src = SLIDES[id].background;
  })));
  loading.classList.add('is-hidden');
}

function bindUi() {
  document.querySelectorAll('.slide-tab').forEach(button => {
    button.addEventListener('click', () => switchSlide(button.dataset.slideId));
  });

  document.getElementById('download-slide').addEventListener('click', downloadCurrentSlide);
  document.getElementById('download-all').addEventListener('click', downloadAllSlides);

  document.getElementById('google-slide').addEventListener('click', async event => {
    const button = event.currentTarget;
    setBusy(button, true);
    try { await pushCurrentSlideToGoogle(); }
    catch (error) { showToast(`Не удалось обновить слайд: ${error.message}`, 'error'); }
    finally { setBusy(button, false); }
  });

  document.getElementById('google-all').addEventListener('click', async event => {
    const button = event.currentTarget;
    setBusy(button, true);
    try { await pushAllSlidesToGoogle(); }
    catch (error) { showToast(`Не удалось обновить слайды: ${error.message}`, 'error'); }
    finally { setBusy(button, false); }
  });

  bindCanvasEditing();

  document.getElementById('reset-slide').addEventListener('click', () => {
    state.data[state.activeSlide] = deepClone(DEFAULTS[state.activeSlide]);
    renderEditor();
    queueRender();
    showToast('Значения очищены', 'success');
  });
}

async function init() {
  loadInitialData();
  bindUi();
  renderEditor();
  try {
    await loadAssets();
    await renderSlide();
  } catch (error) {
    document.getElementById('canvas-loading').textContent = error.message;
    showToast(error.message, 'error');
  }
}

init();
