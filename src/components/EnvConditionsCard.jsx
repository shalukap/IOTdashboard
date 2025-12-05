import React from "react";

const Stat = ({ icon, label, value, bg }) => (
  <div className={`flex items-center gap-3 bg-${bg} rounded-lg px-4 py-3`}>
    <div className="text-xl">{icon}</div>
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-gray-800">{value}</div>
    </div>
  </div>
);

// Tailwind doesn’t allow dynamic bg classes easily; we’ll pass fixed classes
const EnvConditionsCard = ({ airPressure, windSpeed }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Environmental Conditions</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-purple-50 rounded-lg px-4 py-3">
          <div className="text-purple-600 text-xl">🟣</div>
          <div>
            <div className="text-xs text-gray-500">Air Pressure</div>
            <div className="text-sm font-semibold text-gray-800">{airPressure}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-green-50 rounded-lg px-4 py-3">
          <div className="text-green-600 text-xl">💨</div>
          <div>
            <div className="text-xs text-gray-500">Wind Speed</div>
            <div className="text-sm font-semibold text-gray-800">{windSpeed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvConditionsCard;
