import React, { useEffect, useState } from "react";
import moment from "moment";
import useGeolocation from "../hooks/useGeolocation";
import { reverseGeocode } from "../utils/reverseGeocode";

const TimeLocationCard = ({ timeLabel, location }) => {
  const [now, setNow] = useState(moment());
  const { coords, status, error } = useGeolocation({ enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 });
  const [place, setPlace] = useState('fallbackLocation');

  useEffect(() => {
    const t = setInterval(() => setNow(moment()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    let cancelled = false;
    async function go() {
      if (coords?.latitude && coords?.longitude) {
        try {
          const res = await reverseGeocode({ lat: coords.latitude, lon: coords.longitude });
          console.log(coords);
          
          if (!cancelled) setPlace(res.display);
        } catch {
          
        }
      }
    }
    go();
    return () => { cancelled = true; };
  }, [coords]);
  const statusText =
    status === "loading"
      ? "Detecting location..."
      : status === "error"
      ? error?.message === "User denied Geolocation"
        ? "Permission denied"
        : "Location unavailable"
      : place;

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Local Time & Location</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-blue-600">🕘</span>
          <div>
            <div className="text-xs text-gray-500">{timeLabel}</div>
            <div className="text-sm font-semibold text-gray-800">{now.format("hh:mm:ss A")}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-red-500">📍</span>
          <div>
            <div className="text-xs text-gray-500">Location</div>
            <div className="text-sm font-semibold text-gray-800">{statusText}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLocationCard;
