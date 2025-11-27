# 🧪 20 Test Questions for Traffic Intelligence Hub

Test these questions in the web app to explore different query capabilities!

---

## **Category 1: City-Based Queries** 🏙️

### 1. How is traffic in Hyderabad?
**Expected**: Multiple Hyderabad records with varying traffic levels
- **Result**: Should show records from different areas in Hyderabad

### 2. What's the traffic situation in Bangalore?
**Expected**: Bangalore traffic data
- **Result**: Records from Whitefield, Koramangala, Indiranagar, etc.

### 3. Show me traffic in Mumbai
**Expected**: Mumbai area data
- **Result**: Records from Andheri, Bandra, Colaba, Powai, Dadar

### 4. Tell me about Chennai traffic
**Expected**: Chennai area records
- **Result**: Data from Anna Nagar, T Nagar, Velachery, Adyar, Porur

---

## **Category 2: Area-Based Queries** 📍

### 5. How is traffic in Whitefield?
**Expected**: Whitefield area data (Bangalore)
- **Result**: Specific records from Whitefield

### 6. What about Hitech City?
**Expected**: Hitech City area records (Hyderabad)
- **Result**: Multiple records showing various times and conditions

### 7. Traffic situation in Bandra?
**Expected**: Bandra area data (Mumbai)
- **Result**: Records from this popular Mumbai locality

### 8. Tell me about Saket
**Expected**: Saket area data (Delhi)
- **Result**: Delhi's Saket locality traffic information

---

## **Category 3: Traffic Level Queries** 🚗

### 9. Show me areas with severe traffic
**Expected**: All severe traffic level records
- **Result**: Records where traffic_level is "Severe"

### 10. Are there any high traffic areas?
**Expected**: Yes/No response with high traffic records
- **Result**: Multiple records with "High" traffic level

### 11. What areas have moderate traffic?
**Expected**: Moderate traffic level records
- **Result**: Calm conditions areas

### 12. Show me low traffic areas
**Expected**: Smooth traffic flowing areas
- **Result**: Records with "Low" traffic level

---

## **Category 4: Accident-Related Queries** ⚠️

### 13. Are there any accidents reported?
**Expected**: Yes, with accident location details
- **Result**: Records where accident_reported is true

### 14. Show me areas with crashes
**Expected**: Accident data
- **Result**: Accident records from various cities

### 15. Any accidents in Hyderabad?
**Expected**: Hyderabad accident records
- **Result**: Specific accidents in Hyderabad areas

---

## **Category 5: Speed-Based Queries** ⚡

### 16. Show me traffic above 50 km/h
**Expected**: Fast-flowing traffic areas
- **Result**: Records where avg_speed_kmph > 50

### 17. What areas have traffic below 25 km/h?
**Expected**: Slow traffic areas
- **Result**: Congested areas with low speed

### 18. Is traffic moving faster than 30 km/h?
**Expected**: Records with speed > 30 km/h
- **Result**: Moderate to good traffic flow

---

## **Category 6: Combined/Advanced Queries** 🎯

### 19. High traffic in Koramangala with accidents
**Expected**: Specific Koramangala data
- **Result**: Filtered records from Koramangala

### 20. Severe traffic in any city now
**Expected**: Severe congestion across all cities
- **Result**: All severe traffic records from all cities

---

## **📊 Expected Results Summary**

| Question # | City | Area | Level | Speed | Accidents | Expected Records |
|-----------|------|------|-------|-------|-----------|------------------|
| 1 | Hyderabad | Mixed | Mixed | Mixed | Mixed | ~40 |
| 2 | Bangalore | Mixed | Mixed | Mixed | Mixed | ~15 |
| 3 | Mumbai | Mixed | Mixed | Mixed | Mixed | ~9 |
| 4 | Chennai | Mixed | Mixed | Mixed | Mixed | ~9 |
| 5 | Bangalore | Whitefield | Mixed | Mixed | Mixed | 3 |
| 6 | Hyderabad | Hitech City | Mixed | Mixed | Mixed | 5 |
| 7 | Mumbai | Bandra | Mixed | Mixed | Mixed | 3 |
| 8 | Delhi | Saket | Mixed | Mixed | Mixed | 2 |
| 9 | All | All | Severe | Mixed | Mixed | ~12 |
| 10 | All | All | High | Mixed | Mixed | ~25 |
| 11 | All | All | Moderate | Mixed | Mixed | ~35 |
| 12 | All | All | Low | Mixed | Mixed | ~18 |
| 13 | All | All | All | Mixed | Yes | ~8 |
| 14 | All | All | All | Mixed | Yes | ~8 |
| 15 | Hyderabad | All | All | Mixed | Yes | ~3 |
| 16 | All | All | All | >50 | Mixed | ~15 |
| 17 | All | All | All | <25 | Mixed | ~20 |
| 18 | All | All | All | >30 | Mixed | ~40 |
| 19 | Bangalore | Koramangala | Mixed | Mixed | Mixed | 3 |
| 20 | All | All | Severe | Mixed | Mixed | ~12 |

---

## **🎮 Tips for Testing**

1. **Start with simple questions** (1-4) to understand basic functionality
2. **Move to specific areas** (5-8) to test location filtering
3. **Try traffic levels** (9-12) to see color-coded results
4. **Test accidents** (13-15) to verify emergency data
5. **Speed queries** (16-18) show numeric filtering
6. **Advanced** (19-20) test multiple filters at once

---

## **✅ What to Look For in Results**

- ✓ Questions are clearly displayed
- ✓ Answers are natural language responses
- ✓ Statistics show total records, average speed, accidents count
- ✓ Table displays relevant data with color-coded traffic levels
- ✓ Animations are smooth and responsive
- ✓ No console errors
- ✓ Results update instantly

---

Enjoy testing! 🚀
