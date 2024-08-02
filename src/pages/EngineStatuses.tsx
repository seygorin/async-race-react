import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

const EngineStatuses: React.FC = () => {
  const engineStatuses = useSelector(
    (state: RootState) => state.driveEngine.statuses,
  );
  const isRacing = useSelector((state: RootState) => state.garage.isRacing);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Engine Statuses</h2>
      {Object.entries(engineStatuses).map(([id, status]) => (
        <div key={id} className="mb-2">
          <span className="font-semibold">Engine {id}:</span>{" "}
          <span
            className={`
            ${status === "idle" && "text-gray-500"}
            ${status === "loading" && "text-blue-500"}
            ${status === "succeeded" && "text-green-500"}
            ${status === "failed" && "text-red-500"}
          `}
          >
            {status}
          </span>
          {" | "}
          <span className="font-semibold">Racing:</span>{" "}
          <span
            className={`
            ${isRacing[Number(id)] ? "text-green-500" : "text-red-500"}
          `}
          >
            {isRacing[Number(id)] ? "Yes" : "No"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EngineStatuses;
