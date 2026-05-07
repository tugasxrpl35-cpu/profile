/**
 * Portfolio Controller
 * Handles operations for saving and retrieving complete portfolio data
 */

/**
 * Save entire portfolio data including landing, projects, about, and footer sections
 * @param {Object} req - Express request object containing portfolio data in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
export const savePortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    if (!portfolioData) {
      return res.status(400).json({ message: "No data provided" });
    }

    const payload = { action: "save", data: portfolioData };

    const response = await fetch(process.env.DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DB_PW": process.env.DB_PW
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const result = await response.json();
    res.json({ message: "Portfolio saved successfully", data: result });
  } catch (error) {
    console.error("Save portfolio error:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Retrieve complete portfolio data including all sections
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with portfolio data or error
 */
export const getPortfolio = async (req, res) => {
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

    const portfolioData = await response.json();

    // Return structured portfolio data
    res.json({
      Landingdata: {
        section: "LandingPage",
        data: portfolioData.landing || {}
      },
      ProjectsData: {
        section: "ProjectsPage",
        data: portfolioData.projects || []
      },
      AboutMeData: portfolioData.about || {},
      FooterData: portfolioData.footer || {}
    });
  } catch (error) {
    console.error("Get portfolio error:", error);
    res.status(500).json({ message: error.message });
  }
};
