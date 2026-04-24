import Footer from "../models/footer.js";

// Create footer entry
export const createFooter = async (req, res) => {
  try {
    const newFooter = new Footer({
      title: req.body.title,
      socialLinks: req.body.socialLinks || []
    });

    const saved = await newFooter.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all footer entries
export const getFooter = async (req, res) => {
  try {
    const entries = await Footer.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update footer
export const updateFooter = async (req, res) => {
  try {
    const updated = await Footer.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        socialLinks: req.body.socialLinks || []
      },
      { new: true }
    );

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
    await Footer.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
