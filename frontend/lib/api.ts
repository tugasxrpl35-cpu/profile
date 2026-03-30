/**
 * API Client for Portfolio Application
 * Handles all communication with the backend API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Validate required environment variables
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn('NEXT_PUBLIC_API_URL not set, using localhost fallback');
}

// ================= LANDING PAGE =================

/**
 * Landing page data interface
 */
export interface LandingData {
  _id?: string;
  greeting: string;
  role: string;
  description: string;
  profilePicture: string; // Cloudinary URL
}

/**
 * Fetch landing page data from the API
 * @returns {Promise<LandingData>} Landing page data or default empty object
 */
export async function getLandingPage(): Promise<LandingData> {
  try {
    const response = await fetch(`${API_URL}/api/landing`);
    if (!response.ok) throw new Error("Failed to fetch landing page");
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : {
      greeting: "",
      role: "",
      description: "",
      profilePicture: ""
    };
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return {
      greeting: "",
      role: "",
      description: "",
      profilePicture: ""
    };
  }
}

// ================= PROJECTS =================

/**
 * Project data interface
 */
export interface ProjectData {
  _id?: string;
  title: string;
  short: string;
  details: string;
  image: string; // Cloudinary URL
  link: string;
}

/**
 * Fetch all projects from the API
 * @returns {Promise<ProjectData[]>} Array of project data
 */
export async function getProjects(): Promise<ProjectData[]> {
  try {
    const response = await fetch(`${API_URL}/api/projects`);
    if (!response.ok) throw new Error("Failed to fetch projects");
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// ================= ABOUT =================

/**
 * Skill data interface
 */
export interface Skill {
  name: string;
  level: number;
}

/**
 * About section data interface
 */
export interface AboutData {
  _id?: string;
  subTitle: string;
  whoIam: string;
  experience: string;
  projects: string;
  skills: Skill[];
}

/**
 * Fetch about section data from the API
 * @returns {Promise<AboutData>} About data or default empty object
 */
export async function getAbout(): Promise<AboutData> {
  try {
    const response = await fetch(`${API_URL}/api/about`);
    if (!response.ok) throw new Error("Failed to fetch about data");
    const data = await response.json();
    // Backend returns single object, not array
    return data || {
      subTitle: "",
      whoIam: "",
      experience: "",
      projects: "",
      skills: []
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return {
      subTitle: "",
      whoIam: "",
      experience: "",
      projects: "",
      skills: []
    };
  }
};

// ================= FOOTER =================

/**
 * Social link data interface
 */
export interface SocialLink {
  name: string;
  url: string;
}

/**
 * Footer data interface
 */
export interface FooterData {
  _id?: string;
  title: string;
  socialLinks: SocialLink[];
}

/**
 * Fetch footer data from the API
 * @returns {Promise<FooterData>} Footer data or default empty object
 */
export async function getFooter(): Promise<FooterData> {
  try {
    const response = await fetch(`${API_URL}/api/footer`);
    if (!response.ok) throw new Error("Failed to fetch footer data");
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : {
      title: "",
      socialLinks: []
    };
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return {
      title: "",
      socialLinks: []
    };
  }
}

// ================= CONTACT =================

/**
 * Contact data interface
 */
export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

/**
 * Fetch contact data from the API
 * @returns {Promise<ContactData>} Contact data or default empty object
 */
export async function getContact(): Promise<ContactData> {
  try {
    const response = await fetch(`${API_URL}/api/contact`);
    if (!response.ok) throw new Error("Failed to fetch contact data");
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : {
      email: "",
      github: "",
      linkedin: "",
      twitter: ""
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return {
      email: "",
      github: "",
      linkedin: "",
      twitter: ""
    };
  }
}

// ================= PORTFOLIO (Save All) =================

/**
 * Portfolio payload interface for saving data
 */
export interface PortfolioPayload {
  Landingdata: {
    section: string;
    data: LandingData & { profilePictureFile?: File; preview?: string };
  };
  ProjectsData: {
    section: string;
    data: Array<ProjectData & { imageFile?: File; preview?: string }>;
  };
  AboutMeData: AboutData;
  FooterData: FooterData;
}

/**
 * Save complete portfolio data to the API
 * @param {PortfolioPayload} portfolioData - Complete portfolio data to save
 * @returns {Promise<Object>} API response
 */
export async function savePortfolio(portfolioData: PortfolioPayload) {
  // Transform payload to match backend expectations
  const payload = {
    landing: portfolioData.Landingdata.data,
    projects: portfolioData.ProjectsData.data,
    about: portfolioData.AboutMeData,
    footer: portfolioData.FooterData
  };

  const response = await fetch(`${API_URL}/api/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error("Failed to save portfolio");

  return response.json();
}

// ================= GET COMPLETE PORTFOLIO =================

/**
 * Complete portfolio data interface
 */
export interface CompletePortfolio {
  Landingdata: {
    section: string;
    data: LandingData;
  };
  ProjectsData: {
    section: string;
    data: ProjectData[];
  };
  AboutMeData: AboutData;
  FooterData: FooterData;
}

/**
 * Fetch complete portfolio data from the API
 * @returns {Promise<CompletePortfolio>} Complete portfolio data
 */
export async function getPortfolio(): Promise<CompletePortfolio> {
  try {
    const response = await fetch(`${API_URL}/api/portfolio`);
    if (!response.ok) throw new Error("Failed to fetch portfolio");
    return await response.json();
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return {
      Landingdata: { section: "LandingPage", data: { greeting: "", role: "", description: "", profilePicture: "" } },
      ProjectsData: { section: "ProjectsPage", data: [] },
      AboutMeData: { subTitle: "", whoIam: "", experience: "", projects: "", skills: [] },
      FooterData: { title: "", socialLinks: [] }
    };
  }
}
