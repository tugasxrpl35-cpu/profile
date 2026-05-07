// Create landing entry
export const createLanding = async (req, res) => {
  try {
    const landingData = {
      greeting: req.body.greeting,
      role: req.body.role,
      description: req.body.description,
      profilePicture: req.body.profilePicture || null
    };

    const response = await fetch(process.env.DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      },
      body: JSON.stringify(landingData)
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const saved = await response.json();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all landing entries (or latest)
export const getLanding = async (req, res) => {
  try {
    const response = await fetch(process.env.DB_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      }
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const entries = await response.json();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
