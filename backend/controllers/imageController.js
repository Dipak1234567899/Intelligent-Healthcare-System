export const detectFromImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // Dummy response
    res.json({
      success: true,
      result: "Skin disease detected (example)",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};