// src/hooks/useGeolocation.js
import { useEffect, useState } from "react";

export default function useGeolocation(options = { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }) {
  const [coords, setCoords] = useState(null); // { latitude, longitude, accuracy }
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError(new Error("Geolocation not supported by this browser"));
      setStatus("error");
      return;
    }
    setStatus("loading");
    const onSuccess = (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      setCoords({ latitude, longitude, accuracy });
      setStatus("success");
    };
    const onError = (err) => {
      setError(err);
      setStatus("error");
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return { coords, error, status };
}
