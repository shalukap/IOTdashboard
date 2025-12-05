// src/utils/reverseGeocode.js
export async function reverseGeocode({ lat, lon }) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
  const res = await fetch(url, {
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) throw new Error("Reverse geocoding failed");
  const data = await res.json();
  const a = data.address || {};
  // Compose a friendly place name
  const city = a.city || a.town || a.village || a.hamlet || a.suburb || a.county;
  const state = a.state || a.region || a.state_district;
  const country = a.country;
  const display = [city, state].filter(Boolean).join(", ") || country || data.display_name;
  return { display, raw: data };
}
