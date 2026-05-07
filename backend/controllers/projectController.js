// GET all
export const getProjects = async (req, res) => {
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

    const projects = await response.json();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single
export const getProject = async (req, res) => {
  try {
    const response = await fetch(process.env.DB_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW,
        "ID": req.params.id
      }
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const project = await response.json();
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
export const createProject = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const projectData = {
      title: req.body.title,
      short: req.body.short || "",
      details: req.body.details || "",
      link: req.body.link || "",
      image: req.file ? req.file.path : null
    };

    const response = await fetch(process.env.DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      },
      body: JSON.stringify(projectData)
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
    console.error("Create project error:", error);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
export const updateProject = async (req, res) => {
  try {
    const updateData = {
      id: req.params.id,
      title: req.body.title,
      short: req.body.short || "",
      details: req.body.details || "",
      link: req.body.link || ""
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

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
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
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

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};