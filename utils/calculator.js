/**
 * Shem 72 – Calculadora Avanzada
 *
 * Físico   → Grado solar por fecha (quinario, 5°/ángel desde Aries 0° = 21 marzo)
 * Emocional → Fechas secundarias exactas según tabla Madirolas
 * Mental   → Hora de nacimiento (72 segmentos de 20 minutos)
 *
 * #Code made by Emma Ledesma
 */

const TOTAL_ANGELS      = 72;
const DEGREES_PER_ANGEL = 5;
const MINUTES_PER_DAY   = 1440;
const MINUTES_PER_ANGEL = MINUTES_PER_DAY / TOTAL_ANGELS; // 20 min

// ── Fechas secundarias por ángel (tabla Madirolas) ────────────
// Cada entrada: array de { m, d } que activan ese ángel como emocional
const SECONDARY_DATES = [
  { number: 1,  dates: [{m:1,d:9},  {m:3,d:21}, {m:6,d:3},  {m:8,d:17}, {m:10,d:30}] },
  { number: 2,  dates: [{m:1,d:10}, {m:3,d:22}, {m:6,d:4},  {m:8,d:18}, {m:10,d:31}] },
  { number: 3,  dates: [{m:1,d:11}, {m:3,d:23}, {m:6,d:5},  {m:8,d:19}, {m:11,d:1}]  },
  { number: 4,  dates: [{m:1,d:12}, {m:3,d:24}, {m:6,d:6},  {m:8,d:21}, {m:11,d:2}]  },
  { number: 5,  dates: [{m:1,d:13}, {m:3,d:25}, {m:6,d:7},  {m:8,d:22}, {m:11,d:3}]  },
  { number: 6,  dates: [{m:1,d:14}, {m:3,d:26}, {m:6,d:8},  {m:8,d:23}, {m:11,d:4}]  },
  { number: 7,  dates: [{m:1,d:15}, {m:3,d:27}, {m:6,d:9},  {m:8,d:24}, {m:11,d:5}]  },
  { number: 8,  dates: [{m:1,d:16}, {m:3,d:28}, {m:6,d:10}, {m:8,d:25}, {m:11,d:6}]  },
  { number: 9,  dates: [{m:1,d:17}, {m:3,d:29}, {m:6,d:11}, {m:8,d:26}, {m:11,d:7}]  },
  { number: 10, dates: [{m:1,d:18}, {m:3,d:30}, {m:6,d:12}, {m:8,d:27}, {m:11,d:8}]  },
  { number: 11, dates: [{m:1,d:19}, {m:3,d:31}, {m:6,d:13}, {m:8,d:28}, {m:11,d:9}]  },
  { number: 12, dates: [{m:1,d:20}, {m:4,d:1},  {m:6,d:15}, {m:8,d:29}, {m:11,d:10}] },
  { number: 13, dates: [{m:1,d:21}, {m:4,d:2},  {m:6,d:16}, {m:8,d:30}, {m:11,d:11}] },
  { number: 14, dates: [{m:1,d:22}, {m:4,d:3},  {m:6,d:17}, {m:8,d:31}, {m:11,d:12}] },
  { number: 15, dates: [{m:1,d:23}, {m:4,d:4},  {m:6,d:18}, {m:9,d:1},  {m:11,d:13}] },
  { number: 16, dates: [{m:1,d:24}, {m:4,d:5},  {m:6,d:19}, {m:9,d:2},  {m:11,d:14}] },
  { number: 17, dates: [{m:1,d:24}, {m:4,d:6},  {m:6,d:20}, {m:9,d:3},  {m:11,d:15}] },
  { number: 18, dates: [{m:1,d:25}, {m:4,d:7},  {m:6,d:21}, {m:9,d:4},  {m:11,d:16}] },
  { number: 19, dates: [{m:1,d:26}, {m:4,d:8},  {m:6,d:22}, {m:9,d:5},  {m:11,d:17}] },
  { number: 20, dates: [{m:1,d:27}, {m:4,d:9},  {m:6,d:23}, {m:9,d:6},  {m:11,d:18}] },
  { number: 21, dates: [{m:1,d:28}, {m:4,d:10}, {m:6,d:24}, {m:9,d:7},  {m:11,d:19}] },
  { number: 22, dates: [{m:1,d:29}, {m:4,d:11}, {m:6,d:25}, {m:9,d:8},  {m:11,d:20}] },
  { number: 23, dates: [{m:1,d:30}, {m:4,d:12}, {m:6,d:26}, {m:9,d:9},  {m:11,d:21}] },
  { number: 24, dates: [{m:1,d:31}, {m:4,d:13}, {m:6,d:27}, {m:9,d:10}, {m:11,d:22}] },
  { number: 25, dates: [{m:2,d:1},  {m:4,d:14}, {m:6,d:28}, {m:9,d:11}, {m:11,d:23}] },
  { number: 26, dates: [{m:2,d:2},  {m:4,d:15}, {m:6,d:29}, {m:9,d:12}, {m:11,d:24}] },
  { number: 27, dates: [{m:2,d:3},  {m:4,d:16}, {m:6,d:30}, {m:9,d:13}, {m:11,d:25}] },
  { number: 28, dates: [{m:2,d:4},  {m:4,d:17}, {m:7,d:1},  {m:9,d:14}, {m:11,d:26}] },
  { number: 29, dates: [{m:2,d:5},  {m:4,d:19}, {m:7,d:2},  {m:9,d:15}, {m:11,d:27}] },
  { number: 30, dates: [{m:2,d:6},  {m:4,d:20}, {m:7,d:3},  {m:9,d:16}, {m:11,d:28}] },
  { number: 31, dates: [{m:2,d:7},  {m:4,d:21}, {m:7,d:4},  {m:9,d:17}, {m:11,d:29}] },
  { number: 32, dates: [{m:2,d:8},  {m:4,d:22}, {m:7,d:5},  {m:9,d:18}, {m:11,d:30}] },
  { number: 33, dates: [{m:2,d:9},  {m:4,d:23}, {m:7,d:7},  {m:9,d:19}, {m:12,d:1}]  },
  { number: 34, dates: [{m:2,d:10}, {m:4,d:24}, {m:7,d:8},  {m:9,d:20}, {m:12,d:2}]  },
  { number: 35, dates: [{m:2,d:11}, {m:4,d:25}, {m:7,d:9},  {m:9,d:21}, {m:12,d:3}]  },
  { number: 36, dates: [{m:2,d:12}, {m:4,d:26}, {m:7,d:10}, {m:9,d:23}, {m:12,d:4}]  },
  { number: 37, dates: [{m:2,d:13}, {m:4,d:27}, {m:7,d:11}, {m:9,d:24}, {m:12,d:5}]  },
  { number: 38, dates: [{m:2,d:14}, {m:4,d:28}, {m:7,d:12}, {m:9,d:25}, {m:12,d:6}]  },
  { number: 39, dates: [{m:2,d:15}, {m:4,d:29}, {m:7,d:9},  {m:9,d:26}, {m:12,d:7}]  },
  { number: 40, dates: [{m:2,d:16}, {m:4,d:30}, {m:7,d:14}, {m:9,d:27}, {m:12,d:8}]  },
  { number: 41, dates: [{m:2,d:17}, {m:5,d:1},  {m:7,d:15}, {m:9,d:28}, {m:12,d:9}]  },
  { number: 42, dates: [{m:2,d:18}, {m:5,d:2},  {m:7,d:16}, {m:9,d:29}, {m:12,d:10}] },
  { number: 43, dates: [{m:2,d:19}, {m:5,d:3},  {m:7,d:17}, {m:9,d:30}, {m:12,d:11}] },
  { number: 44, dates: [{m:2,d:20}, {m:5,d:4},  {m:7,d:18}, {m:10,d:1}, {m:12,d:12}] },
  { number: 45, dates: [{m:2,d:21}, {m:5,d:5},  {m:7,d:19}, {m:10,d:2}, {m:12,d:13}] },
  { number: 46, dates: [{m:2,d:22}, {m:5,d:6},  {m:7,d:20}, {m:10,d:3}, {m:12,d:14}] },
  { number: 47, dates: [{m:2,d:23}, {m:5,d:7},  {m:7,d:21}, {m:10,d:4}, {m:12,d:15}] },
  { number: 48, dates: [{m:2,d:24}, {m:5,d:8},  {m:7,d:22}, {m:10,d:5}, {m:12,d:16}] },
  { number: 49, dates: [{m:2,d:25}, {m:5,d:9},  {m:7,d:23}, {m:10,d:6}, {m:12,d:17}] },
  { number: 50, dates: [{m:2,d:26}, {m:5,d:10}, {m:7,d:24}, {m:10,d:7}, {m:12,d:18}] },
  { number: 51, dates: [{m:2,d:27}, {m:5,d:11}, {m:7,d:25}, {m:10,d:8}, {m:12,d:19}] },
  { number: 52, dates: [{m:2,d:28}, {m:5,d:12}, {m:7,d:26}, {m:10,d:9}, {m:12,d:20}] },
  { number: 53, dates: [{m:3,d:1},  {m:5,d:13}, {m:7,d:28}, {m:10,d:10},{m:12,d:21}] },
  { number: 54, dates: [{m:3,d:2},  {m:5,d:14}, {m:7,d:29}, {m:10,d:11},{m:12,d:22}] },
  { number: 55, dates: [{m:3,d:3},  {m:5,d:15}, {m:7,d:30}, {m:10,d:12},{m:12,d:23}] },
  { number: 56, dates: [{m:3,d:4},  {m:5,d:16}, {m:7,d:31}, {m:10,d:13},{m:12,d:24}] },
  { number: 57, dates: [{m:3,d:5},  {m:5,d:17}, {m:8,d:1},  {m:10,d:14},{m:12,d:25}] },
  { number: 58, dates: [{m:3,d:6},  {m:5,d:18}, {m:8,d:2},  {m:10,d:15},{m:12,d:26}] },
  { number: 59, dates: [{m:3,d:7},  {m:5,d:19}, {m:8,d:3},  {m:10,d:16},{m:12,d:27}] },
  { number: 60, dates: [{m:3,d:8},  {m:5,d:20}, {m:8,d:4},  {m:10,d:17},{m:12,d:27}] },
  { number: 61, dates: [{m:3,d:9},  {m:5,d:22}, {m:8,d:5},  {m:10,d:18},{m:12,d:28}] },
  { number: 62, dates: [{m:3,d:10}, {m:5,d:23}, {m:8,d:6},  {m:10,d:19},{m:12,d:29}] },
  { number: 63, dates: [{m:3,d:11}, {m:5,d:24}, {m:8,d:7},  {m:10,d:20},{m:12,d:30}] },
  { number: 64, dates: [{m:3,d:12}, {m:5,d:25}, {m:8,d:8},  {m:10,d:21},{m:12,d:31}] },
  { number: 65, dates: [{m:1,d:1},  {m:3,d:13}, {m:5,d:26}, {m:8,d:9},  {m:10,d:22}] },
  { number: 66, dates: [{m:1,d:2},  {m:3,d:14}, {m:5,d:27}, {m:8,d:10}, {m:10,d:23}] },
  { number: 67, dates: [{m:1,d:3},  {m:3,d:15}, {m:5,d:28}, {m:8,d:11}, {m:10,d:24}] },
  { number: 68, dates: [{m:1,d:4},  {m:3,d:16}, {m:5,d:29}, {m:8,d:12}, {m:10,d:25}] },
  { number: 69, dates: [{m:1,d:5},  {m:3,d:17}, {m:5,d:30}, {m:8,d:13}, {m:10,d:26}] },
  { number: 70, dates: [{m:1,d:6},  {m:3,d:18}, {m:5,d:31}, {m:8,d:14}, {m:10,d:27}] },
  { number: 71, dates: [{m:1,d:7},  {m:3,d:19}, {m:6,d:1},  {m:8,d:15}, {m:10,d:28}] },
  { number: 72, dates: [{m:1,d:8},  {m:3,d:20}, {m:6,d:2},  {m:8,d:16}, {m:10,d:29}] },
];

// ── Fechas primarias por ángel (tabla Madirolas) ─────────────
// Cada entrada: [número, mes_inicio, día_inicio, mes_fin, día_fin]
const PRIMARY_DATES = [
  [1,  3,21,  3,25], [2,  3,26,  3,30], [3,  3,31,  4,4],
  [4,  4,5,   4,9],  [5,  4,10,  4,14], [6,  4,15,  4,20],
  [7,  4,21,  4,25], [8,  4,26,  4,30], [9,  5,1,   5,5],
  [10, 5,6,   5,10], [11, 5,11,  5,15], [12, 5,16,  5,20],
  [13, 5,21,  5,25], [14, 5,26,  5,31], [15, 6,1,   6,5],
  [16, 6,6,   6,10], [17, 6,11,  6,15], [18, 6,16,  6,21],
  [19, 6,22,  6,26], [20, 6,27,  7,1],  [21, 7,2,   7,6],
  [22, 7,7,   7,11], [23, 7,12,  7,16], [24, 7,17,  7,22],
  [25, 7,23,  7,27], [26, 7,28,  8,1],  [27, 8,2,   8,6],
  [28, 8,7,   8,12], [29, 8,13,  8,17], [30, 8,18,  8,22],
  [31, 8,23,  8,28], [32, 8,29,  9,2],  [33, 9,3,   9,7],
  [34, 9,8,   9,12], [35, 9,13,  9,17], [36, 9,18,  9,23],
  [37, 9,24,  9,28], [38, 9,29,  10,3], [39, 10,4,  10,8],
  [40, 10,9,  10,13],[41, 10,14, 10,18],[42, 10,19, 10,23],
  [43, 10,24, 10,28],[44, 10,29, 11,2], [45, 11,3,  11,7],
  [46, 11,8,  11,12],[47, 11,13, 11,17],[48, 11,18, 11,22],
  [49, 11,23, 11,27],[50, 11,28, 12,2], [51, 12,3,  12,7],
  [52, 12,8,  12,12],[53, 12,13, 12,16],[54, 12,17, 12,21],
  [55, 12,22, 12,26],[56, 12,27, 12,31],[57, 1,1,   1,5],
  [58, 1,6,   1,10], [59, 1,11,  1,15], [60, 1,16,  1,20],
  [61, 1,21,  1,25], [62, 1,26,  1,30], [63, 1,31,  2,4],
  [64, 2,5,   2,9],  [65, 2,10,  2,14], [66, 2,15,  2,19],
  [67, 2,20,  2,24], [68, 2,25,  2,28], [69, 3,1,   3,5],
  [70, 3,6,   3,10], [71, 3,11,  3,15], [72, 3,16,  3,20],
];

/**
 * Busca el ángel físico en la tabla de fechas primarias de Madirolas.
 * Fuente de verdad exacta, sin aproximación matemática.
 */
function angelFromPrimaryDates(day, month) {
  const date = month * 100 + day;
  for (const [angel, sm, sd, em, ed] of PRIMARY_DATES) {
    const start = sm * 100 + sd;
    const end   = em * 100 + ed;
    if (start <= end) {
      if (date >= start && date <= end) return angel;
    } else {
      // Rango que cruza fin de año (ej: dic→ene)
      if (date >= start || date <= end) return angel;
    }
  }
  return null;
}

// ── Helpers ───────────────────────────────────────────────────

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function dayOfYear(day, month, year) {
  const dim = [0,31,isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31];
  let total = 0;
  for (let m = 1; m < month; m++) total += dim[m];
  return total + day;
}

function normalizeAngel(n) {
  return ((n - 1 + TOTAL_ANGELS) % TOTAL_ANGELS) + 1;
}

/**
 * Grado solar absoluto (0°-360°) por fecha y hora.
 * Aries 0° = 21 de marzo.
 */
function calcSunDegree(day, month, year, hours = 12, minutes = 0) {
  const totalDays    = isLeapYear(year) ? 366 : 365;
  const doy          = dayOfYear(day, month, year);
  const startDoy     = dayOfYear(21, 3, year);
  const hourFraction = (hours * 60 + minutes) / MINUTES_PER_DAY;
  let offset = (doy - startDoy) + hourFraction;
  if (offset < 0)         offset += totalDays;
  if (offset >= totalDays) offset -= totalDays;
  return parseFloat(((offset / totalDays) * 360).toFixed(4));
}

function angelFromDegree(sunDegree) {
  const normalized = ((sunDegree % 360) + 360) % 360;
  return (Math.floor(normalized / DEGREES_PER_ANGEL) % TOTAL_ANGELS) + 1;
}

function zodiacFromDegree(sunDegree) {
  const signs = ["Aries","Tauro","Géminis","Cáncer","Leo","Virgo",
                 "Libra","Escorpio","Sagitario","Capricornio","Acuario","Piscis"];
  const normalized  = ((sunDegree % 360) + 360) % 360;
  const signIndex   = Math.floor(normalized / 30);
  const degInSign   = normalized % 30;
  const quinStart   = Math.floor(degInSign / 5) * 5;
  return {
    sign:           signs[signIndex],
    degree_abs:     parseFloat(normalized.toFixed(2)),
    degree_in_sign: parseFloat(degInSign.toFixed(2)),
    quinario:       `${quinStart}°–${quinStart + 5}°`
  };
}

// ── Calculadoras principales ──────────────────────────────────

/**
 * ÁNGEL FÍSICO
 * Usa la tabla de fechas primarias de Madirolas como fuente de verdad.
 * El grado solar se calcula para referencia zodiacal, pero el ángel
 * se determina por la tabla exacta.
 */
function calcPhysicalAngel(day, month, year = new Date().getFullYear()) {
  const angelNumber = angelFromPrimaryDates(day, month);
  const sunDegree   = calcSunDegree(day, month, year, 12, 0);
  return {
    angel_number: angelNumber,
    sun_degree:   sunDegree,
    zodiac:       zodiacFromDegree(sunDegree)
  };
}

/**
 * ÁNGEL EMOCIONAL
 * Busca la fecha de nacimiento en la tabla de fechas secundarias de Madirolas.
 * Si no hay coincidencia exacta, devuelve el mismo que el físico como fallback.
 */
function calcEmotionalAngel(day, month, year = new Date().getFullYear()) {
  for (const angel of SECONDARY_DATES) {
    for (const date of angel.dates) {
      if (date.m === month && date.d === day) {
        return {
          angel_number: angel.number,
          source:       "secondary_dates",
          matched_date: `${day}/${month}`,
          precise:      true,
          note:         "Fecha secundaria exacta según tabla Madirolas."
        };
      }
    }
  }

  // Fallback: mismo ángel que el físico
  const physical = calcPhysicalAngel(day, month, year);
  return {
    angel_number: physical.angel_number,
    source:       "fallback_physical",
    matched_date: null,
    precise:      false,
    note:         "Esta fecha no tiene asignación secundaria específica. Se usa el ángel físico como referencia."
  };
}

/**
 * ÁNGEL MENTAL
 * Hora de nacimiento → segmento de 20 minutos.
 */
function calcMentalAngel(hours, minutes) {
  const totalMinutes = hours * 60 + minutes;
  const segIndex     = Math.floor(totalMinutes / MINUTES_PER_ANGEL);
  const segStart     = segIndex * MINUTES_PER_ANGEL;
  const segEnd       = segStart + MINUTES_PER_ANGEL;
  const fmt          = m => `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
  return {
    angel_number:  normalizeAngel(segIndex + 1),
    time_segment:  `${fmt(segStart)} – ${fmt(segEnd % MINUTES_PER_DAY)}`,
    minutes_total: totalMinutes
  };
}

/**
 * PERFIL COMPLETO
 */
function calcFullProfile(day, month, year, hours, minutes) {
  return {
    physical:  calcPhysicalAngel(day, month, year),
    emotional: calcEmotionalAngel(day, month, year),
    mental:    calcMentalAngel(hours, minutes)
  };
}

module.exports = {
  calcPhysicalAngel,
  calcEmotionalAngel,
  calcMentalAngel,
  calcFullProfile,
  calcSunDegree,
  angelFromDegree,
  zodiacFromDegree,
  normalizeAngel,
  dayOfYear,
  isLeapYear,
  SECONDARY_DATES
};