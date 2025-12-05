// src/components/WeatherFetcherCard.jsx
import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard"; // your existing UI card
import useGeolocation from "../hooks/useGeolocation"; // from earlier
import { fetchWeather } from "../services/weather";
import { bucketByTimeOfDay, weatherCodeToText } from "../utils/weatherBuckets";

export default function WeatherFetcherCard() {
  const { coords, status, error } = useGeolocation({ enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 });
  const [state, setState] = useState({ loading: true, data: null, err: null });

  useEffect(() => {
    let cancelled = false;
    async function go() {
      if (!coords) return;
      try {
        setState(s => ({ ...s, loading: true }));
        const w = await fetchWeather({ lat: coords.latitude, lon: coords.longitude });
        const buckets = bucketByTimeOfDay(w.hourly, w.timezone);
        const displayCond = weatherCodeToText(w.current.code);
        if (!cancelled) {
          setState({
            loading: false,
            data: {
              condition: displayCond,
              tempNow: w.current.temp,
              morning: buckets.morning.temp,
              afternoon: buckets.afternoon.temp,
              evening: buckets.evening.temp,
              high: Math.max(...w.hourly.temperature_2m.map(Math.round)),
              low: Math.min(...w.hourly.temperature_2m.map(Math.round)),
            },
          });
        }
      } catch (e) {
        if (!cancelled) setState({ loading: false, data: null, err: e });
      }
    }
    go();
    return () => { cancelled = true; };
  }, [coords]);

  if (status === "loading" || state.loading) {
    return <WeatherCard condition="Loading..." tempNow="—" high="—" low="—" morning="—" afternoon="—" evening="—" />;
  }
  if (status === "error" || state.err) {
    return <WeatherCard condition={error?.message || "Location error"} tempNow="—" high="—" low="—" morning="—" afternoon="—" evening="—" />;
  }

  const d = state.data;
  return (
    <WeatherCard
      condition={d.condition}
      tempNow={d.tempNow}
      high={d.high}
      low={d.low}
      morning={d.morning}
      afternoon={d.afternoon}
      evening={d.evening}
    />
  );
}
