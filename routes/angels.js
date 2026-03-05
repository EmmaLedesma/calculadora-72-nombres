/**
 * Shem 72 – Rutas de Ángeles
 * Endpoints REST para consultar y calcular ángeles.
 * #Code made by Emma Ledesma
 */

const express = require("express");
const router  = express.Router();
const path    = require("path");

const {
  calcPhysicalAngel,
  calcEmotionalAngel,
  calcMentalAngel,
  calcFullProfile
} = require("../utils/calculator");

// Cargar datos
const angelsData = require("../data/shem72.json");
const angels     = angelsData.angels || angelsData;

// ── Helper: buscar ángel por número ──────────────────────────
function getAngel(number) {
  return angels.find(a => a.number === number) || null;
}

// ── Helper: info zodiacal desde número de ángel ───────────────
function zodiacInfo(angelNumber) {
  const SIGNS = [
    "Aries","Aries","Aries","Aries","Aries","Aries",
    "Tauro","Tauro","Tauro","Tauro","Tauro","Tauro",
    "Géminis","Géminis","Géminis","Géminis","Géminis","Géminis",
    "Cáncer","Cáncer","Cáncer","Cáncer","Cáncer","Cáncer",
    "Leo","Leo","Leo","Leo","Leo","Leo",
    "Virgo","Virgo","Virgo","Virgo","Virgo","Virgo",
    "Libra","Libra","Libra","Libra","Libra","Libra",
    "Escorpio","Escorpio","Escorpio","Escorpio","Escorpio","Escorpio",
    "Sagitario","Sagitario","Sagitario","Sagitario","Sagitario","Sagitario",
    "Capricornio","Capricornio","Capricornio","Capricornio","Capricornio","Capricornio",
    "Acuario","Acuario","Acuario","Acuario","Acuario","Acuario",
    "Piscis","Piscis","Piscis","Piscis","Piscis","Piscis"
  ];
  const idx        = angelNumber - 1;
  const sign       = SIGNS[idx] || "—";
  const degreeStart = (idx % 6) * 5;
  return {
    sign,
    degree_in_sign: `${degreeStart}°–${degreeStart + 5}°`
  };
}

// ── GET /api/angels ───────────────────────────────────────────
// Lista todos los ángeles con filtros opcionales
router.get("/", (req, res) => {
  let result = [...angels];

  if (req.query.zodiac)   result = result.filter(a => a.zodiac   === req.query.zodiac);
  if (req.query.choir)    result = result.filter(a => a.choir    === req.query.choir);
  if (req.query.sephira)  result = result.filter(a => a.sephira  === req.query.sephira);

  res.json({ total: result.length, angels: result });
});

// ── GET /api/angels/calculate/:day/:month ─────────────────────
// Cálculo básico por fecha (compatibilidad con versión anterior)
router.get("/calculate/:day/:month", (req, res) => {
  const day   = parseInt(req.params.day);
  const month = parseInt(req.params.month);

  if (!day || !month || day < 1 || day > 31 || month < 1 || month > 12) {
    return res.status(400).json({ error: "Fecha inválida", message: "Día (1-31) y mes (1-12) requeridos." });
  }

  const angelNumber = calcPhysicalAngel(day, month);
  const angel       = getAngel(angelNumber);
  const zodiac      = zodiacInfo(angelNumber);

  if (!angel) return res.status(404).json({ error: "Ángel no encontrado" });

  res.json({ angel, zodiac });
});

// ── GET /api/angels/profile ───────────────────────────────────
// Cálculo avanzado: los tres ángeles tutelares
// Query params: day, month, year, hours, minutes
router.get("/profile", (req, res) => {
  const day     = parseInt(req.query.day);
  const month   = parseInt(req.query.month);
  const year    = parseInt(req.query.year)    || new Date().getFullYear();
  const hours   = parseInt(req.query.hours)   ?? 0;
  const minutes = parseInt(req.query.minutes) ?? 0;

  // Validaciones
  if (!day || !month)
    return res.status(400).json({ error: "Parámetros requeridos: day, month" });
  if (day < 1 || day > 31 || month < 1 || month > 12)
    return res.status(400).json({ error: "Fecha inválida" });
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59)
    return res.status(400).json({ error: "Hora inválida. hours (0-23), minutes (0-59)" });

  const profile = calcFullProfile(day, month, year, hours, minutes);

  const physicalAngel  = getAngel(profile.physical.angel_number);
  const emotionalAngel = getAngel(profile.emotional.angel_number);
  const mentalAngel    = getAngel(profile.mental.angel_number);

  res.json({
    birth: { day, month, year, hours, minutes },
    profile: {
      physical: {
        plane:        "Físico",
        description:  "Rige el cuerpo, la vitalidad y la acción en el plano material",
        angel_number: profile.physical.angel_number,
        angel:        physicalAngel,
        zodiac:       profile.physical.zodiac,
        sun_degree:   profile.physical.sun_degree
      },
      emotional: {
        plane:        "Emocional",
        description:  "Influye sobre emociones, vínculos y mundo afectivo",
        angel_number: profile.emotional.angel_number,
        angel:        emotionalAngel,
        zodiac:       zodiacInfo(profile.emotional.angel_number),
        source:       profile.emotional.source,
        precise:      profile.emotional.precise,
        note:         profile.emotional.note
      },
      mental: {
        plane:        "Mental",
        description:  "Gobierna el pensamiento, la conciencia y el intelecto",
        angel_number: profile.mental.angel_number,
        angel:        mentalAngel,
        zodiac:       zodiacInfo(profile.mental.angel_number),
        time_segment: profile.mental.time_segment
      }
    }
  });
});

// ── GET /api/angels/profile ───────────────────────────────────
// Cálculo avanzado: los tres ángeles tutelares
// Query params: day, month, year, hours, minutes
router.get("/profile", (req, res) => {
  const day     = parseInt(req.query.day);
  const month   = parseInt(req.query.month);
  const year    = parseInt(req.query.year)    || new Date().getFullYear();
  const hours   = parseInt(req.query.hours)   ?? 0;
  const minutes = parseInt(req.query.minutes) ?? 0;

  if (!day || !month)
    return res.status(400).json({ error: "Parámetros requeridos: day, month" });
  if (day < 1 || day > 31 || month < 1 || month > 12)
    return res.status(400).json({ error: "Fecha inválida" });
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59)
    return res.status(400).json({ error: "Hora inválida. hours (0-23), minutes (0-59)" });

  const profile = calcFullProfile(day, month, year, hours, minutes);

  const physicalAngel  = getAngel(profile.physical);
  const emotionalAngel = getAngel(profile.emotional);
  const mentalAngel    = getAngel(profile.mental);

  res.json({
    birth: { day, month, year, hours, minutes },
    profile: {
      physical: {
        plane:        "Físico",
        description:  "Rige el cuerpo, la vitalidad y la acción en el plano material",
        angel_number: profile.physical,
        angel:        physicalAngel,
        zodiac:       zodiacInfo(profile.physical)
      },
      emotional: {
        plane:        "Emocional",
        description:  "Influye sobre emociones, vínculos y mundo afectivo",
        angel_number: profile.emotional,
        angel:        emotionalAngel,
        zodiac:       zodiacInfo(profile.emotional),
        calculation:  profile.emotional_detail
      },
      mental: {
        plane:        "Mental",
        description:  "Gobierna el pensamiento, la conciencia y el intelecto",
        angel_number: profile.mental,
        angel:        mentalAngel,
        zodiac:       zodiacInfo(profile.mental)
      }
    }
  });
});

// ── GET /api/angels/:number ───────────────────────────────────
// Ángel por número
router.get("/:number", (req, res) => {
  const number = parseInt(req.params.number);

  if (isNaN(number) || number < 1 || number > 72)
    return res.status(400).json({ error: "Número inválido. Debe ser entre 1 y 72." });

  const angel = getAngel(number);
  if (!angel) return res.status(404).json({ error: "Ángel no encontrado" });

  res.json(angel);
});

module.exports = router;