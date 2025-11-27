// Simple Express API to serve traffic data from trafficData.json
// - CORS enabled
// - express.json middleware
// - Endpoints: /traffic, /traffic/city/:city, /traffic/id/:id, /traffic/area/:area, /traffic/search

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data from local JSON file once at startup.
// If you want hot-reload during development, replace this with fs.readFile in each request.
const DATA_PATH = path.join(__dirname, 'trafficData.json');
let trafficData = [];
try {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  trafficData = JSON.parse(raw);
  console.log(`Loaded ${trafficData.length} traffic records from ${DATA_PATH}`);
} catch (err) {
  console.error('Failed to load traffic data:', err.message);
  // Keep trafficData empty; endpoints will return errors when appropriate.
}

// Utility: get UTC hour from ISO timestamp safely
function getUTCHour(isoTs) {
  const d = new Date(isoTs);
  if (isNaN(d.getTime())) return null;
  return d.getUTCHours();
}

// GET /traffic -> return all traffic data
app.get('/traffic', (req, res) => {
  res.json(trafficData);
});

// GET /traffic/city/:city -> filter by city (case-insensitive)
app.get('/traffic/city/:city', (req, res) => {
  const city = (req.params.city || '').toLowerCase();
  const results = trafficData.filter(r => String(r.city || '').toLowerCase() === city);
  res.json(results);
});

// GET /traffic/id/:id -> return single record by id
app.get('/traffic/id/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id parameter' });
  const record = trafficData.find(r => Number(r.id) === id);
  if (!record) return res.status(404).json({ error: 'Record not found' });
  res.json(record);
});

// GET /traffic/area/:area -> filter by area (case-insensitive)
app.get('/traffic/area/:area', (req, res) => {
  const area = (req.params.area || '').toLowerCase();
  const results = trafficData.filter(r => String(r.area || '').toLowerCase() === area);
  res.json(results);
});

// GET /traffic/search -> advanced filtering
// Supported query params (all optional):
// - city (exact, case-insensitive)
// - min_speed, max_speed (numeric, filters avg_speed_kmph)
// - traffic_level (exact)
// - accident (true|false) -> filters accident_reported
// - start_time, end_time (ISO timestamps) -> inclusive timestamp range
// - time_range (morning|afternoon|evening|night) -> UTC hour ranges
// If no query params are provided, returns all data.
app.get('/traffic/search', (req, res) => {
  // If no filters provided, return everything fast
  if (!req.query || Object.keys(req.query).length === 0) {
    return res.json(trafficData);
  }

  // Start with full array and apply efficient successive filters
  let results = trafficData;

  const {
    city,
    min_speed,
    max_speed,
    traffic_level,
    accident,
    start_time,
    end_time,
    time_range,
  } = req.query;

  if (city) {
    const q = String(city).toLowerCase();
    results = results.filter(r => String(r.city || '').toLowerCase() === q);
  }

  if (traffic_level) {
    results = results.filter(r => r.traffic_level === String(traffic_level));
  }

  if (min_speed !== undefined) {
    const ms = Number(min_speed);
    if (Number.isNaN(ms)) return res.status(400).json({ error: 'min_speed must be a number' });
    results = results.filter(r => Number(r.avg_speed_kmph) >= ms);
  }

  if (max_speed !== undefined) {
    const mx = Number(max_speed);
    if (Number.isNaN(mx)) return res.status(400).json({ error: 'max_speed must be a number' });
    results = results.filter(r => Number(r.avg_speed_kmph) <= mx);
  }

  if (accident !== undefined) {
    const v = String(accident).toLowerCase();
    if (v !== 'true' && v !== 'false') {
      return res.status(400).json({ error: 'accident must be true or false' });
    }
    const bv = v === 'true';
    results = results.filter(r => Boolean(r.accident_reported) === bv);
  }

  // Timestamp range filtering (inclusive). Accepts ISO timestamps.
  if (start_time || end_time) {
    const start = start_time ? Date.parse(start_time) : -Infinity;
    const end = end_time ? Date.parse(end_time) : Infinity;
    if ((start_time && Number.isNaN(start)) || (end_time && Number.isNaN(end))) {
      return res.status(400).json({ error: 'start_time and end_time must be valid ISO timestamps' });
    }
    results = results.filter(r => {
      const t = Date.parse(r.timestamp);
      return t >= start && t <= end;
    });
  }

  // time_range (UTC hour buckets). Can be combined with other filters.
  if (time_range) {
    const tr = String(time_range).toLowerCase();
    results = results.filter(r => {
      const h = getUTCHour(r.timestamp);
      if (h === null) return false;
      if (tr === 'morning') return h >= 5 && h <= 11;
      if (tr === 'afternoon') return h >= 12 && h <= 16;
      if (tr === 'evening') return h >= 17 && h <= 20;
      if (tr === 'night') return h >= 21 || h <= 4;
      return false;
    });
  }

  return res.json(results);
});

// POST /ask -> simple natural-language question parsing
// Accepts JSON body: { question: string }
// Returns a short human-readable answer and matching records
app.post('/ask', (req, res) => {
  const rawQuestion = req.body && req.body.question;
  const question = String(rawQuestion || '').toLowerCase().trim();
  if (!question) {
    return res.status(400).json({ answer: 'Please provide a question in the request body as { "question": "..." }' });
  }

  let results = trafficData.slice();

  // Helper: safe includes (word-boundary aware)
  const includesWord = (text, word) => {
    if (!text || !word) return false;
    return text.includes(word) || new RegExp(`\\b${word.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`).test(text);
  };

  // CITY detection (exact list)
  const cities = ['hyderabad', 'bangalore', 'chennai', 'mumbai', 'pune', 'delhi', 'kolkata', 'ahmedabad'];
  let cityFound = null;
  for (const city of cities) {
    if (includesWord(question, city)) {
      cityFound = city;
      results = results.filter(item => String(item.city || '').toLowerCase() === city);
      break;
    }
  }

  // AREA detection (fuzzy: try longest first)
  const areas = [...new Set(trafficData.map(x => String(x.area || '').toLowerCase()))].filter(Boolean).sort((a,b)=>b.length-a.length);
  let areaFound = null;
  for (const area of areas) {
    if (includesWord(question, area)) {
      areaFound = area;
      results = results.filter(item => String(item.area || '').toLowerCase() === area);
      break;
    }
  }

  // Traffic level detection and synonyms
  const levels = ['severe','high','moderate','low'];
  let levelFound = null;
  for (const level of levels) {
    if (includesWord(question, level)) {
      levelFound = level;
      results = results.filter(item => String(item.traffic_level || '').toLowerCase() === level);
      break;
    }
  }
  // synonyms: jam/congestion -> treat as any traffic (prefer high if not specified)
  if (!levelFound && (question.includes('jam') || question.includes('congestion') || question.includes('traffic jam'))) {
    // prefer High/Severe
    const preferred = ['severe','high'];
    const found = results.find(r => preferred.includes(String(r.traffic_level || '').toLowerCase()));
    if (found) {
      levelFound = String(found.traffic_level || '').toLowerCase();
      results = results.filter(r => String(r.traffic_level || '').toLowerCase() === levelFound);
    }
  }

  // Accident detection
  if (question.includes('accident') || question.includes('crash')) {
    results = results.filter(item => item.accident_reported === true);
  }

  // Numeric speed parsing (e.g., "above 30", "below 20", ">= 40")
  const speedMatch = question.match(/(?:above|over|greater than|>=|> )\s*(\d{1,3})/i) || question.match(/(?:below|under|less than|<=|< )\s*(\d{1,3})/i);
  if (speedMatch) {
    const num = Number(speedMatch[1]);
    if (!Number.isNaN(num)) {
      if (/above|over|greater than|>=|>/.test(speedMatch[0])) {
        results = results.filter(r => Number(r.avg_speed_kmph) > num);
      } else {
        results = results.filter(r => Number(r.avg_speed_kmph) < num);
      }
    }
  }

  // Date words: today, yesterday, or explicit ISO dates
  const now = new Date();
  if (question.includes('today')) {
    const todayUTC = now.toISOString().slice(0,10);
    results = results.filter(item => String(item.timestamp || '').startsWith(todayUTC));
  }
  if (question.includes('yesterday')) {
    const yesterday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()-1));
    const y = yesterday.toISOString().slice(0,10);
    results = results.filter(item => String(item.timestamp || '').startsWith(y));
  }
  // explicit ISO date detection YYYY-MM-DD
  const isoDateMatch = question.match(/(\d{4}-\d{2}-\d{2})/);
  if (isoDateMatch) {
    const d = isoDateMatch[1];
    results = results.filter(item => String(item.timestamp || '').startsWith(d));
  }

  // "right now" -> narrow by current UTC bucket
  if (question.includes('right now') || question.includes('now')) {
    const h = now.getUTCHours();
    results = results.filter(item => {
      const ih = getUTCHour(item.timestamp);
      if (ih === null) return false;
      if (h >=5 && h <=11) return ih >=5 && ih <=11;
      if (h >=12 && h <=16) return ih >=12 && ih <=16;
      if (h >=17 && h <=20) return ih >=17 && ih <=20;
      return ih >=21 || ih <=4;
    });
  }

  // time_range words
  if (question.includes('morning')) results = results.filter(r => { const h = getUTCHour(r.timestamp); return h !== null && h >=5 && h <=11; });
  if (question.includes('afternoon')) results = results.filter(r => { const h = getUTCHour(r.timestamp); return h !== null && h >=12 && h <=16; });
  if (question.includes('evening')) results = results.filter(r => { const h = getUTCHour(r.timestamp); return h !== null && h >=17 && h <=20; });
  if (question.includes('night')) results = results.filter(r => { const h = getUTCHour(r.timestamp); return h !== null && (h >=21 || h <=4); });

  // If nothing matched, return friendly message
  if (!results || results.length === 0) {
    return res.json({ answer: 'No matching data found.' });
  }

  // Detect yes/no intent: questions that start with are/is/any/has
  const yesNoStarters = [/^are\b/, /^is\b/, /^any\b/, /^has\b/, /^have\b/, /^do\b/];
  const isYesNo = yesNoStarters.some(rx => rx.test(question));

  const count = results.length;
  const sample = results[0];
  const areaText = areaFound ? ` in ${areaFound}` : '';
  const cityText = cityFound ? `${cityFound}` : (sample.city || 'the area');
  const levelText = levelFound ? `${levelFound} traffic` : `${String(sample.traffic_level || '')} traffic`;
  const timeText = question.includes('today') ? ' today' : '';

  if (isYesNo) {
    const ans = `Yes — ${count} matching record(s) found for ${cityText}${areaText}${timeText}.`;
    return res.json({ answer: ans, count, preview: results.slice(0, 20) });
  }

  const answer = `${count} record(s) found for ${cityText}${areaText}${timeText}. Example: ${sample.area} at ${sample.timestamp} has ${levelText} with avg speed ${sample.avg_speed_kmph} km/h.`;
  return res.json({ answer, count, preview: results.slice(0, 20), results_count: count });
});

// Catch-all 404 for API
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Traffic API server listening on port ${PORT}`);
});
