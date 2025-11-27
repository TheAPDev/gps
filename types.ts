// TypeScript definitions for the mock traffic records
// Generated interface: TrafficRecord

export interface TrafficRecord {
  id: number;
  city: string;
  area: string;
  // ISO 8601 timestamp string (2025 formatted), e.g. "2025-07-01T08:30:00Z"
  timestamp: string;
  traffic_level: 'Low' | 'Moderate' | 'High' | 'Severe';
  avg_speed_kmph: number; // integer between 5 and 70
  congestion_reason: 'Peak Hours' | 'Accident' | 'Road Work' | 'Weather' | 'Event' | 'Normal';
  weather: 'Clear' | 'Rainy' | 'Cloudy' | 'Foggy' | 'Windy';
  accident_reported: boolean;
  public_transport_status: 'On Time' | 'Delayed' | 'Partially Operational' | 'Suspended';
}

export type TrafficData = TrafficRecord[];
