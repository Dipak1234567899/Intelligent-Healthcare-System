import { useState } from "react";
import { getDiagnosis } from "../services/api";

export default function Diagnosis() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    const res = await getDiagnosis({ symptoms });
    setResult(res.data);
  };

  return (
    <div>
      <h2>AI Diagnosis</h2>
      <input
        type="text"
        placeholder="Enter symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={handleCheck}>Check</button>

      {result && (
        <div>
          <p>Disease: {result.disease}</p>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
}