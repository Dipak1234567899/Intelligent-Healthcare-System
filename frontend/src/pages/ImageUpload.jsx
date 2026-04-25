import { useState } from "react";
import { uploadImage } from "../services/api";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await uploadImage(formData);
    setResult(res.data);
  };

  return (
    <div>
      <h2>Image Disease Detection</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {result && (
        <div>
          <p>Result: {result.result}</p>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
}