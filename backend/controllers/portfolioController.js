/**
 * Portfolio Controller
 * Handles operations for saving and retrieving complete portfolio data
 */
import Landing from "../models/landing.js";
import Project from "../models/project.js";
import About from "../models/about.js";
import Footer from "../models/footer.js";

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

    // 1. Save Landing Data
    if (portfolioData.landing) {
      // Log payload for debugging purposes
      console.log("[portfolioController] landing payload:", portfolioData.landing);

      const landingData = {
        greeting: portfolioData.landing.greeting,
        role: portfolioData.landing.role,
        description: portfolioData.landing.description,
        profilePicture: portfolioData.landing.profilePicture // Cloudinary URL from payload
      };

      // Upsert operation: update if exists, create if not
      // Uses sort to ensure we update the most recent document
      await Landing.findOneAndUpdate({}, landingData, {
        upsert: true,
        sort: { createdAt: -1 }
      });
    }

    // 2. Save Projects Data
    if (portfolioData.projects) {
      // Delete all existing projects before creating new ones
      await Project.deleteMany({});

      // Create new projects from the payload
      for (let i = 0; i < portfolioData.projects.length; i++) {
        const projectItem = portfolioData.projects[i];
        const projectData = {
          title: projectItem.title,
          short: projectItem.short,
          details: projectItem.details,
          link: projectItem.link,
          image: projectItem.image // Cloudinary URL from payload
        };

        await Project.create(projectData);
      }
    }

    // 3. Save About Data
    if (portfolioData.about) {
      console.log("[portfolioController] about payload:", portfolioData.about);

      const aboutData = {
        subTitle: portfolioData.about.subTitle || "",
        whoIam: portfolioData.about.whoIam || "",
        experience: portfolioData.about.experience || "",
        projects: portfolioData.about.projects || "",
        skills: Array.isArray(portfolioData.about.skills) ? portfolioData.about.skills : []
      };

      console.log("[portfolioController] about data to save:", aboutData);

      try {
        // Try to find existing About document
        const existingAbout = await About.findOne().sort({ createdAt: -1 });

        if (existingAbout) {
          // Update existing
          const updated = await About.findOneAndUpdate(
            { _id: existingAbout._id },
            aboutData,
            { new: true }
          );
          console.log("[portfolioController] About updated successfully:", updated);
        } else {
          // Create new
          const newAbout = new About(aboutData);
          const saved = await newAbout.save();
          console.log("[portfolioController] About created successfully:", saved);
        }

        // Verify the save by fetching it back
        const verifyAbout = await About.findOne().sort({ createdAt: -1 });
        console.log("[portfolioController] About verification - found in DB:", verifyAbout);

      } catch (aboutError) {
        console.error("[portfolioController] About save error:", aboutError);
        throw aboutError;
      }
    }

    // 4. Save Footer Data
    if (portfolioData.footer) {
      const footerData = {
        title: portfolioData.footer.title,
        socialLinks: portfolioData.footer.socialLinks || []
      };

      // Update the most recent footer document
      await Footer.findOneAndUpdate({}, footerData, {
        upsert: true,
        sort: { createdAt: -1 }
      });
    }

    res.json({ message: "Portfolio saved successfully" });
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
    // Fetch data from all collections
    const landing = await Landing.findOne();
    const projects = await Project.find().sort({ createdAt: -1 });
    const about = await About.findOne();
    const footer = await Footer.findOne();

    // Return structured portfolio data
    res.json({
      Landingdata: {
        section: "LandingPage",
        data: landing || {}
      },
      ProjectsData: {
        section: "ProjectsPage",
        data: projects || []
      },
      AboutMeData: about || {},
      FooterData: footer || {}
    });
  } catch (error) {
    console.error("Get portfolio error:", error);
    res.status(500).json({ message: error.message });
  }
};
