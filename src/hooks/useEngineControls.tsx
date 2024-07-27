import { useCallback, useState } from "react";

function useEngineControl(catId, handleStartEngine, handleStopEngine) {
  const [error, setError] = useState(null);

  const startEngine = useCallback(async () => {
    try {
      setError(null);
      await handleStartEngine(catId);
    } catch (err) {
      setError("Failed to start engine");
      message.error("Failed to start engine");
    }
  }, [catId, handleStartEngine]);

  const stopEngine = useCallback(async () => {
    try {
      setError(null);
      await handleStopEngine(catId);
    } catch (err) {
      setError("Failed to stop engine");
      message.error("Failed to stop engine");
    }
  }, [catId, handleStopEngine]);

  return { startEngine, stopEngine, error };
}

export default useEngineControl;
