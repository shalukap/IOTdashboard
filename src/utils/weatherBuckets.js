
export function bucketByTimeOfDay(hourly, timezone) {
  
  const entries = hourly.time.map((t, i) => ({
    date: new Date(t),
    temp: hourly.temperature_2m[i],
    code: hourly.weathercode[i],
  }));

  const buckets = { morning: [], afternoon: [], evening: [] };

  entries.forEach((e) => {
    const h = e.date.getHours();
    if (h >= 6 && h <= 11) buckets.morning.push(e);
    else if (h >= 12 && h <= 17) buckets.afternoon.push(e);
    else if (h >= 18 && h <= 23) buckets.evening.push(e);
  });

  const avg = (arr, key) => arr.length ? (arr.reduce((s, x) => s + x[key], 0) / arr.length) : null;
  const pickMid = (arr) => arr.length ? arr[Math.floor(arr.length / 2)] : null;

  const m = pickMid(buckets.morning);
  const a = pickMid(buckets.afternoon);
  const e = pickMid(buckets.evening);

  return {
    morning: { temp: Math.round(avg(buckets.morning, "temp")), code: m?.code ?? null },
    afternoon: { temp: Math.round(avg(buckets.afternoon, "temp")), code: a?.code ?? null },
    evening: { temp: Math.round(avg(buckets.evening, "temp")), code: e?.code ?? null },
  };
}


export function weatherCodeToText(code) {
  
  const map = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Snow",
    80: "Showers",
  };
  return map[code] || "Unknown";
}
