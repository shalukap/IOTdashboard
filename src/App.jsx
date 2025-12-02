import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
    <>
      <div>
      <h2>IoT Sensor Dashboard</h2>
      <p>Soil Moisture: {soil}%</p>
      <p>Temperature: {temp}°C</p>
      <p>Humidity: {hum}%</p>
    </div>
    </>
  )
}
export default App;
