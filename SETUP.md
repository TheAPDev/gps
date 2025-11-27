# 🚗 Traffic Intelligence Hub - Professional Web App

A professional, high-definition web application for querying traffic data with a beautiful modern UI.

## 📋 Project Structure

```
gps/
├── index.html           # Main frontend (Vite dev server)
├── index.js             # Express backend API server
├── trafficData.json     # Traffic data source
├── types.ts             # TypeScript type definitions
├── package.json         # NPM configuration
├── vite.config.js       # Vite build configuration
├── ask.html             # Legacy HTML file (use index.html instead)
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
└── node_modules/        # Dependencies
```

## 🚀 Quick Start

### Install Dependencies
```powershell
npm install
```

### Start Development Server
```powershell
npm run dev
```

This will start:
- **Frontend (Vite Dev Server)**: http://localhost:5173
- **Backend (Express API)**: http://localhost:5000

The frontend will open automatically in your browser!

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend (Vite) and backend (Express) in development mode |
| `npm run client` | Start only the Vite frontend dev server |
| `npm run server` | Start only the Express backend server |
| `npm start` | Start only the backend server (legacy) |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |

## 🎨 Features

### Modern UI/UX
- Professional gradient design with purple/blue theme
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- High-quality typography with Google Fonts

### Functionality
- **Ask Traffic Questions**: Natural language queries about traffic conditions
- **Real-time Results**: Display matching traffic records
- **Statistics Dashboard**: Show aggregated traffic metrics
- **Color-coded Traffic Levels**: Visual indicators (Severe, High, Moderate, Low)
- **Accident Tracking**: Display accident reports
- **Data Table**: Detailed view of matching records

### API Endpoints

**GET** `/traffic` - Get all traffic data

**GET** `/traffic/city/:city` - Get traffic by city

**GET** `/traffic/area/:area` - Get traffic by area

**GET** `/traffic/id/:id` - Get specific traffic record

**GET** `/traffic/search` - Advanced search with filters
- Query parameters: `city`, `min_speed`, `max_speed`, `traffic_level`, `accident`, `start_time`, `end_time`, `time_range`

**POST** `/ask` - Ask natural language questions
- Request: `{ "question": "Your traffic question?" }`
- Response: `{ "answer": "...", "count": 10, "preview": [...] }`

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:

```
VITE_API_URL=http://localhost:5000
VITE_SERVER_PORT=5173
```

### Vite Configuration
Edit `vite.config.js` to customize:
- Port (default: 5173)
- API proxy settings
- Build output directory
- Minification options

## 🐛 Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" errors:
```powershell
taskkill /F /IM node.exe
npm run dev
```

### Dependencies Issues
```powershell
rm -Recurse node_modules
rm package-lock.json
npm install
```

### Clear Vite Cache
```powershell
rm -Recurse -Force .vite
npm run dev
```

## 📊 Traffic Data Format

Each traffic record contains:
```json
{
  "id": 1,
  "city": "Hyderabad",
  "area": "HITEC City",
  "timestamp": "2024-01-15T09:30:00Z",
  "traffic_level": "high",
  "avg_speed_kmph": 25,
  "accident_reported": false
}
```

## 🎯 Sample Questions

Try asking:
- "How is traffic in Bangalore?"
- "Are there accidents in Hyderabad?"
- "What's the traffic like in the evening?"
- "Show me areas with severe traffic"
- "Is traffic above 50 km/h in Chennai?"

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Development

### Project Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Vite
- **Backend**: Node.js, Express, CORS
- **Data**: JSON (trafficData.json)

### Code Organization
- Clean, modular JavaScript
- Professional CSS with animations
- Responsive mobile-first design
- Security: HTML escaping for user input

## 📄 License

MIT

## 👨‍💻 Author

Traffic Intelligence Hub Team

---

**Ready to go!** Run `npm run dev` to start coding! 🚀
