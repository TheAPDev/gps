# 🎯 Complete Testing Guide - 20 Test Questions

## Quick Access - Copy & Paste Ready!

```
1. How is traffic in Hyderabad?
2. What's the traffic situation in Bangalore?
3. Show me traffic in Mumbai
4. Tell me about Chennai traffic
5. How is traffic in Whitefield?
6. What about Hitech City?
7. Traffic situation in Bandra?
8. Tell me about Saket
9. Show me areas with severe traffic
10. Are there any high traffic areas?
11. What areas have moderate traffic?
12. Show me low traffic areas
13. Are there any accidents reported?
14. Show me areas with crashes
15. Any accidents in Hyderabad?
16. Show me traffic above 50 km/h
17. What areas have traffic below 25 km/h?
18. Is traffic moving faster than 30 km/h?
19. High traffic in Koramangala with accidents
20. Severe traffic in any city now
```

---

## 📋 Detailed Testing Framework

### **Section 1: City-Based Queries** (Questions 1-4)

These questions test filtering by city names.

#### Q1: "How is traffic in Hyderabad?"
- **Query Type**: City search
- **Expected Records**: ~40
- **Traffic Distribution**: High, Severe, Moderate, Low mix
- **Accidents**: 3 records with accidents
- **Sample Areas**: Hitech City, Gachibowli, Jubilee Hills, Miyapur, Kukatpally
- **Avg Speed Range**: 8-66 km/h
- **What to verify**:
  - ✓ All results are from Hyderabad
  - ✓ Multiple areas displayed
  - ✓ Statistics show ~40 records
  - ✓ Color badges represent actual traffic levels

#### Q2: "What's the traffic situation in Bangalore?"
- **Query Type**: City search (alternative phrasing)
- **Expected Records**: ~15
- **Traffic Distribution**: Mostly High and Moderate
- **Accidents**: 1 record with accident
- **Sample Areas**: Whitefield, Koramangala, Indiranagar, Jayanagar, Electronic City
- **Avg Speed Range**: 9-63 km/h
- **What to verify**:
  - ✓ All results are from Bangalore
  - ✓ Fewer records than Hyderabad (accurate count)
  - ✓ Average speed ~32 km/h

#### Q3: "Show me traffic in Mumbai"
- **Query Type**: City with "show" command
- **Expected Records**: ~9
- **Traffic Distribution**: Severe, High, Moderate, Low
- **Accidents**: 2 records
- **Sample Areas**: Andheri, Bandra, Colaba, Powai, Dadar
- **Avg Speed Range**: 7-59 km/h
- **What to verify**:
  - ✓ "Show" verb is interpreted correctly
  - ✓ Smaller city gets appropriate result count

#### Q4: "Tell me about Chennai traffic"
- **Query Type**: City with "tell me" phrase
- **Expected Records**: ~9
- **Traffic Distribution**: Mostly Moderate and Severe
- **Accidents**: 1 record
- **Sample Areas**: Anna Nagar, T Nagar, Velachery, Adyar, Porur
- **Avg Speed Range**: 10-65 km/h
- **What to verify**:
  - ✓ Phrase "tell me about" works
  - ✓ "Chennai traffic" parsed correctly

---

### **Section 2: Area-Based Queries** (Questions 5-8)

These questions test location filtering within specific areas.

#### Q5: "How is traffic in Whitefield?"
- **Query Type**: Specific area search
- **Expected Records**: 3
- **City**: Bangalore (area belongs to Bangalore)
- **Traffic Levels**: Mixed (High, Moderate, Low)
- **Avg Speed**: ~37 km/h average
- **What to verify**:
  - ✓ Only Whitefield records shown
  - ✓ System identified Bangalore as the city
  - ✓ Exact count: 3 records

#### Q6: "What about Hitech City?"
- **Query Type**: Area reference with "what about"
- **Expected Records**: 5
- **City**: Hyderabad
- **Traffic Levels**: Mix (High, Severe, Moderate, Low)
- **Accidents**: 1 record with accident
- **Avg Speed**: ~26 km/h
- **What to verify**:
  - ✓ "What about" phrasing understood
  - ✓ Shows only Hitech City records

#### Q7: "Traffic situation in Bandra?"
- **Query Type**: Area with question format
- **Expected Records**: 3
- **City**: Mumbai
- **Traffic Levels**: Severe, High, Moderate
- **Accidents**: 1 record
- **Avg Speed**: ~20 km/h (congested area)
- **What to verify**:
  - ✓ Question mark doesn't break parsing
  - ✓ Area correctly identified

#### Q8: "Tell me about Saket"
- **Query Type**: Area with "tell me" phrase
- **Expected Records**: 2
- **City**: Delhi
- **Traffic Levels**: Moderate (1), Severe (1)
- **Accidents**: 1 record with severe accident
- **Avg Speed**: ~21 km/h average
- **What to verify**:
  - ✓ Smaller results (2 records) handled correctly
  - ✓ Severe accident area identified

---

### **Section 3: Traffic Level Queries** (Questions 9-12)

These test filtering by traffic congestion levels with color coding.

#### Q9: "Show me areas with severe traffic"
- **Query Type**: Traffic level filter
- **Expected Records**: 12
- **Color Badge**: 🔴 RED (Severe)
- **Speed Range**: 7-12 km/h (very slow)
- **Accidents**: 3 records with reported accidents
- **Cities**: All 8 cities have severe traffic records
- **What to verify**:
  - ✓ All badges are RED
  - ✓ Average speed is very low (~10 km/h)
  - ✓ Multiple cities represented
  - ✓ High accident correlation

#### Q10: "Are there any high traffic areas?"
- **Query Type**: Yes/No question with traffic level
- **Expected Records**: 25
- **Color Badge**: 🟠 ORANGE (High)
- **Speed Range**: 18-29 km/h
- **Accidents**: 0 records (no accidents)
- **Response Format**: "Yes — 25 matching record(s) found..."
- **What to verify**:
  - ✓ Yes/No format recognized
  - ✓ All badges are ORANGE
  - ✓ Most records (largest group)
  - ✓ No accidents in high traffic (different from severe)

#### Q11: "What areas have moderate traffic?"
- **Query Type**: "What" question with traffic level
- **Expected Records**: 35
- **Color Badge**: 🟡 YELLOW (Moderate)
- **Speed Range**: 31-39 km/h
- **Accidents**: 0 records
- **What to verify**:
  - ✓ All badges are YELLOW
  - ✓ Largest result set (35 records)
  - ✓ Good flow (mid-range speeds)

#### Q12: "Show me low traffic areas"
- **Query Type**: Traffic level with "show me"
- **Expected Records**: 18
- **Color Badge**: 🟢 GREEN (Low)
- **Speed Range**: 52-68 km/h (very fast)
- **Accidents**: 0 records
- **What to verify**:
  - ✓ All badges are GREEN
  - ✓ Highest speeds observed
  - ✓ No congestion/accidents

---

### **Section 4: Accident-Related Queries** (Questions 13-15)

These test emergency/incident filtering.

#### Q13: "Are there any accidents reported?"
- **Query Type**: Yes/No question with accident keyword
- **Expected Records**: 8
- **Response Format**: "Yes — 8 matching record(s) found with accidents..."
- **Accident Column**: All show "⚠️ YES"
- **Traffic Levels**: Mix of Severe and High
- **Accidents Count**: 8
- **What to verify**:
  - ✓ Only accident records displayed
  - ✓ Accident badge shows on all rows
  - ✓ Accident count in stats shows 8
  - ✓ Yes/No format used in response

#### Q14: "Show me areas with crashes"
- **Query Type**: Accident synonym ("crash" = accident)
- **Expected Records**: 8
- **Affected Cities**: Hyderabad (3), Bangalore (1), Chennai (1), Mumbai (1), Delhi (1), Ahmedabad (1)
- **What to verify**:
  - ✓ "Crash" synonym recognized as accident
  - ✓ Same 8 records as Q13
  - ✓ Geographic distribution shown

#### Q15: "Any accidents in Hyderabad?"
- **Query Type**: Combined filters (city + accident)
- **Expected Records**: 3
- **City Filter**: Hyderabad
- **Accident Records**: 3 in Hyderabad
- **Areas with Accidents**: Gachibowli, Jubilee Hills, Hitech City
- **What to verify**:
  - ✓ Combines city and accident filters
  - ✓ Only Hyderabad records shown
  - ✓ Only accident records shown
  - ✓ Both filters work together

---

### **Section 5: Speed-Based Queries** (Questions 16-18)

These test numeric filtering on average speed.

#### Q16: "Show me traffic above 50 km/h"
- **Query Type**: Numeric comparison (above/greater than)
- **Filter**: avg_speed_kmph > 50
- **Expected Records**: ~15
- **Speed Range**: 52-68 km/h
- **Traffic Levels**: Mostly Low, some Moderate
- **Accidents**: 0 records
- **What to verify**:
  - ✓ All speeds >= 50
  - ✓ Mostly green badges (low traffic)
  - ✓ High average speed shows smooth flow
  - ✓ "Above" comparison works

#### Q17: "What areas have traffic below 25 km/h?"
- **Query Type**: Numeric comparison (below/less than)
- **Filter**: avg_speed_kmph < 25
- **Expected Records**: ~20
- **Speed Range**: 7-24 km/h
- **Traffic Levels**: Severe and High
- **Accidents**: 5 records with accidents
- **What to verify**:
  - ✓ All speeds < 25
  - ✓ Mix of red and orange badges
  - ✓ Severe congestion area
  - ✓ "Below" comparison works
  - ✓ Accident correlation shown

#### Q18: "Is traffic moving faster than 30 km/h?"
- **Query Type**: Yes/No question with numeric filter
- **Filter**: avg_speed_kmph > 30
- **Expected Records**: ~40
- **Speed Range**: 31-68 km/h
- **Response Format**: "Yes — 40 matching record(s)..."
- **What to verify**:
  - ✓ Yes/No format in response
  - ✓ All speeds > 30
  - ✓ Good traffic flow (40% of data)
  - ✓ Numeric threshold works

---

### **Section 6: Advanced/Combined Queries** (Questions 19-20)

These test multiple filters combined.

#### Q19: "High traffic in Koramangala with accidents"
- **Query Type**: Multi-filter (area + traffic level + accident)
- **Filters**:
  - Area: Koramangala
  - Traffic Level: High
  - Accident: true
- **Expected Records**: 3 (or results if match exists)
- **City**: Bangalore (Koramangala is in Bangalore)
- **What to verify**:
  - ✓ Multiple filters applied simultaneously
  - ✓ Only Koramangala results
  - ✓ Only high traffic
  - ✓ Only accident records
  - ✓ Filters work together correctly

#### Q20: "Severe traffic in any city now"
- **Query Type**: Traffic level across all cities
- **Filters**:
  - Traffic Level: Severe
  - Time: "now" (current hour bucket)
- **Expected Records**: Variable (depends on hour)
- **What to verify**:
  - ✓ Severe traffic found
  - ✓ Multiple cities represented
  - ✓ "Now" temporal filter works
  - ✓ "Any city" means all cities searched

---

## 🎓 Learning Path

### Phase 1: Basic Queries (5 minutes)
Start with these to understand the interface:
1. Q1: How is traffic in Hyderabad?
2. Q9: Show me areas with severe traffic
3. Q12: Show me low traffic areas

### Phase 2: Intermediate Queries (5 minutes)
Build confidence with more complex questions:
4. Q5: How is traffic in Whitefield?
5. Q13: Are there any accidents reported?
6. Q16: Show me traffic above 50 km/h

### Phase 3: Advanced Queries (5 minutes)
Master the system:
7. Q19: High traffic in Koramangala with accidents
8. Q20: Severe traffic in any city now
9. Q17: What areas have traffic below 25 km/h?

---

## 📊 Test Results Checklist

For each question, document:

```
Question #: _____
Question: ________________________
Response Type: (City / Area / Level / Speed / Accident / Combined)

Results:
├─ Record Count: _____ (matches expected?)
├─ Average Speed: _____ km/h
├─ Accident Count: _____
├─ Traffic Level Distribution:
│  ├─ Severe: _____
│  ├─ High: _____
│  ├─ Moderate: _____
│  └─ Low: _____
└─ UI/UX:
   ├─ Loading: ✓/✗
   ├─ Animation: ✓/✗
   ├─ Colors: ✓/✗
   └─ Responsiveness: ✓/✗

Status: ✓ PASS / ✗ FAIL / ⚠️ PARTIAL
Notes: ________________________________
```

---

## 🐛 Common Issues & Solutions

### Issue: No Results
- **Possible Cause**: Spelling error in city/area name
- **Solution**: Check exact spelling (Whitefield, not Whitefeild)

### Issue: Wrong Traffic Level Colors
- **Possible Cause**: Severe = Red, High = Orange, Moderate = Yellow, Low = Green
- **Solution**: Verify color mapping in code

### Issue: Accidents Not Showing
- **Possible Cause**: Filter not recognizing "accident" keyword
- **Solution**: Check accident_reported field in JSON

### Issue: Speed Filtering Not Working
- **Possible Cause**: Number parsing issue
- **Solution**: Ensure numbers are extracted from text

---

## ✅ Final Verification Checklist

Before declaring testing complete:

- [ ] All 20 questions can be asked
- [ ] Results display within 2 seconds
- [ ] No console errors (check F12 DevTools)
- [ ] Color badges are correct
- [ ] Statistics are accurate
- [ ] Table displays properly on mobile
- [ ] Responsive design works
- [ ] Can ask multiple questions in sequence
- [ ] Input field clears after submit
- [ ] Loading spinner visible during requests
- [ ] Animations are smooth
- [ ] No duplicate results
- [ ] Timestamps are readable
- [ ] Accident badge shows correctly
- [ ] All cities represented
- [ ] All traffic levels represented

---

**Happy Testing! 🚀** 
Report any issues or unexpected behavior!
