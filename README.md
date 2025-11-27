# Traffic API

A simple Node.js + Express mock Traffic API that serves realistic-looking traffic telemetry from a local JSON file (`trafficData.json`). The dataset contains 100 records for major Indian cities (including Hyderabad, Bangalore, Chennai, Mumbai, Delhi, Pune, Ahmedabad, and Kolkata).

This repository is intended for development, testing, and demos — not for production use.

## How to run locally

1. Open PowerShell and change to the project folder:

```powershell
cd 'c:\Users\Lenovo\Downloads\gps'
```

2. Install dependencies (one-time):

```powershell
npm install
```

3. Start the server:

```powershell
npm start
```

The server listens on port 5000 by default. You should see a log message like:

```
Loaded 100 traffic records from C:\Users\Lenovo\Downloads\gps\trafficData.json
Traffic API server listening on port 5000
```

## Available endpoints

- GET /traffic
	- Returns the full dataset (array of records).

- GET /traffic/city/:city
	- Returns records for the exact city (case-insensitive). Example: `/traffic/city/Hyderabad`.

- GET /traffic/area/:area
	- Returns records for the exact area (case-insensitive). Example: `/traffic/area/Hitech City`.

- GET /traffic/id/:id
	- Returns a single record by numeric id. Example: `/traffic/id/7`.

- GET /traffic/search
	- Advanced search endpoint. Supports query parameters (all optional):
		- `city` (exact, case-insensitive)
		- `min_speed`, `max_speed` (numeric, filters `avg_speed_kmph`)
		- `traffic_level` (exact: `Low|Moderate|High|Severe`)
		- `accident` (`true` or `false`) — filters `accident_reported`
		- `start_time`, `end_time` (ISO timestamp strings, inclusive range)
		- `time_range` (UTC buckets: `morning`, `afternoon`, `evening`, `night`)
	- If no query parameters are provided, this endpoint returns all records.

## Sample queries (PowerShell)

Use `curl.exe` in PowerShell to avoid the shell alias for `curl`.

Return all records:

```powershell
curl.exe "http://localhost:5000/traffic"
```

Search: Hyderabad records in the morning with an accident:

```powershell
curl.exe "http://localhost:5000/traffic/search?city=Hyderabad&time_range=morning&accident=true"
```

Speed range filter (20–40 km/h):

```powershell
curl.exe "http://localhost:5000/traffic/search?min_speed=20&max_speed=40"
```

Combined example with timestamp range:

```powershell
curl.exe "http://localhost:5000/traffic/search?city=Hyderabad&min_speed=10&max_speed=30&accident=true&start_time=2025-07-01T00:00:00Z&end_time=2025-08-01T00:00:00Z"
```

## Example JSON response (single record)

Below is an example single-item JSON object returned by `/traffic/id/7` (formatted):

```json
{
	"id": 7,
	"city": "Hyderabad",
	"area": "Gachibowli",
	"timestamp": "2025-07-02T19:50:00Z",
	"traffic_level": "Severe",
	"avg_speed_kmph": 10,
	"congestion_reason": "Accident",
	"weather": "Rainy",
	"accident_reported": true,
	"public_transport_status": "Suspended"
}
```

## Future improvements

- Convert the project to TypeScript and type the Express handlers (a `types.ts` is already present).
- Add pagination (limit/offset) for large datasets.
- Support partial / fuzzy matching for `city` and `area`.
- Add request validation (e.g., with `zod` or `ajv`) for stronger input checks and clearer errors.
- Add unit and integration tests for endpoints (using Jest / Supertest).
- Add Dockerfile and a small CI workflow to run tests and linting.

---

If you'd like, I can convert the server to TypeScript next (add `tsconfig.json`, update `package.json` scripts, and rename `index.js` to `index.ts`).
