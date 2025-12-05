// src/services/weather.js
export async function fetchWeather({ lat, lon, timezone = "auto" }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode&timezone=${timezone}&temperature_unit=fahrenheit`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather request failed");
  const data = await res.json();
  const currentTemp = Math.round(data.current?.temperature_2m ?? NaN);
  const currentCode = data.current?.weathercode ?? null;

  return {
    current: { temp: currentTemp, code: currentCode },
    hourly: {
      time: data.hourly?.time || [],
      temperature_2m: data.hourly?.temperature_2m || [],
      weathercode: data.hourly?.weathercode || [],
    },
    timezone: data.timezone,
  };
}
