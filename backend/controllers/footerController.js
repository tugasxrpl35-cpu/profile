// Create footer entry
export const createFooter = async (req, res) => {
  try {
    const footerData = {
      title: req.body.title,
      socialLinks: req.body.socialLinks || []
    };

    const response = await fetch(process.env.DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      },
      body: JSON.stringify(footerData)
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

// Get all footer entries
export const getFooter = async (req, res) => {
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

// Update footer
export const updateFooter = async (req, res) => {
  try {
    const updateData = {
      id: req.params.id,
      title: req.body.title,
      socialLinks: req.body.socialLinks || []
    };

    const response = await fetch(process.env.DB_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      },
      body: JSON.stringify(updateData)
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const updated = await response.json();

    if (!updated) {
      return res.status(404).json({ message: "Footer not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete footer
export const deleteFooter = async (req, res) => {
  try {
    const response = await fetch(process.env.DB_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      },
      body: JSON.stringify({ id: req.params.id })
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${text}`);
    }

    res.json({ message: "Footer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
