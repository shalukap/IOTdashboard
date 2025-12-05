import React from "react";
import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GaugeCard = ({ title, value, unit, color = "#3b82f6", trailColor = "#e5e7eb" }) => {
  
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col shadow-lg">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
        {title}
      </div>
      <div className="mt-3 flex-1 flex items-center justify-center">
        <div className="w-36 h-36">
          <CircularProgressbarWithChildren
            value={value}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 0.625, // start angle for 3/4 circle
              strokeLinecap: "round",
              pathColor: color,
              trailColor: trailColor,
            })}
          >
            <div className="text-3xl font-semibold text-gray-800">{value}</div>
            <div className="text-xs text-gray-500">{unit}</div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
};

export default GaugeCard;
