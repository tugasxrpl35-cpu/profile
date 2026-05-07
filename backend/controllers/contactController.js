// GET contact info (returns first/latest entry)
export const getContact = async (req, res) => {
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

    const contact = await response.json();

    if (!contact) {
      return res.json({
        email: "",
        github: "",
        linkedin: "",
        twitter: ""
      });
    }

    res.json(contact);
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({ message: error.message });
  }
};

// CREATE/UPDATE contact info
export const saveContact = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const contactData = {
      email: req.body.email,
      github: req.body.github || "",
      linkedin: req.body.linkedin || "",
      twitter: req.body.twitter || ""
    };

    const response = await fetch(process.env.DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      },
      body: JSON.stringify(contactData)
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const saved = await response.json();
    res.status(200).json(saved);
  } catch (error) {
    console.error("Save contact error:", error);
    res.status(400).json({ message: error.message });
  }
};
