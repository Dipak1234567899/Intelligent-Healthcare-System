export const diagnoseDisease = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ message: "Symptoms required" });
    }

    let result = "No disease detected";

    const s = symptoms.toLowerCase();

    if (s.includes("fever") && s.includes("cough")) {
      result = "Flu or Viral Infection";
    } else if (s.includes("headache")) {
      result = "Migraine or Stress";
    } else if (s.includes("stomach")) {
      result = "Gastric Issue";
    }

    res.json({
      success: true,
      disease: result,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};