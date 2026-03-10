/**
 * Home Page Component
 * Main landing page that displays all portfolio sections
 */
export const revalidate = 60;
'use client';

import LandingPage from "@/components/page/LandingPage";
import { Projects } from "@/components/page/Projects";
import { AboutUs } from "@/components/page/AboutUs";
import ScrollHandler from "@/components/ScrollHandler";

/**
 * Home page component that renders the main portfolio layout
 * Includes landing page, projects section, and about section
 * @returns {JSX.Element} The home page layout
 */
export default function Home() {
  return (
    <>
      {/* Handle scroll-to-section functionality based on URL query parameters */}
      <ScrollHandler />
      <LandingPage />
      <Projects />
      <AboutUs />
    </>
  );
}