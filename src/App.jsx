import React from "react";
import { useEffect, useState } from "react";
import GaugeCard from "./components/GaugeCard";
import WeatherCard from "./components/WeatherCard";
import TimeLocationCard from "./components/TimeLocationCard";
import EnvConditionsCard from "./components/EnvConditionsCard";

function App() {
  const TOKEN = "1nuj9_2kHzXqXKn-3LHzs7xQd46WPl9i";

  const [soil, setSoil] = useState(0);
  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);
  
  const fetchData = async () => {
    const soilRes = await fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&pin=V0`);
    const tempRes = await fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&pin=V2`);
    const humRes  = await fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&pin=V3`);

    

    setSoil(await soilRes.json());
    setTemp(await tempRes.json());
    setHum(await humRes.json());
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // auto refresh
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-screen">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <h1 className="text-sm font-semibold text-gray-700">IoT Dashboard</h1>
        <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-white text-sm hover:bg-blue-700">
          <span className="inline-block w-4 h-4 bg-white/20 rounded-sm"></span>
          View Analytics
        </button>
      </header>

      {/* Main content */}
      <div className="relative">
        {/* Main grid */}
        <div className="px-6 py-6 grid lg:grid-cols-3 gap-6 max-w-full mx-auto">
          {/* Sensor Readings */}
          <section className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Sensor Readings</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <GaugeCard
                title="Temperature"
                value={temp}
                unit="°F"
                color="#e74a3b" // red
                trailColor="#e5e7eb"
              />
              <GaugeCard
                title="Humidity"
                value={hum}
                unit="%"
                color="#3b82f6" // blue
                trailColor="#e5e7eb"
              />
              <GaugeCard
                title="Soil Moisture"
                value={soil}
                unit="%"
                color="#10b981" // green
                trailColor="#e5e7eb"
              />
            </div>

            {/* Lower row: Weather + Time/Location */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <WeatherCard
                condition="Partly Cloudy"
                tempNow={75}
                high={75}
                low={62}
                morning={68}
                afternoon={75}
                evening={64}
              />
              <TimeLocationCard
                timeLabel="Current Time"
                location="San Francisco, CA"
              />
            </div>

            {/* Environmental Conditions */}
            <div className="mt-6">
              <EnvConditionsCard airPressure="1013.25 hPa" windSpeed="12.5 mph" />
            </div>
          </section>

          {/* Chat Dock (right column) */}
          <aside className="lg:col-span-1">
         
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
