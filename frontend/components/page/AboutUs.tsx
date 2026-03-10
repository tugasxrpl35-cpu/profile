/**
 * About Us Component
 * Displays about section with bio, experience, projects, and skills
 */

'use client';

import FadeInSection from '@/components/FadeInSection';
import { useEffect, useState } from 'react';
import { getAbout, AboutData } from '@/lib/api';

/**
 * About section component that fetches and displays about data
 * @returns {JSX.Element} The about section layout
 */
export function AboutUs() {
  // State for about page data with default empty values
  const [aboutData, setAboutData] = useState<AboutData>({
    subTitle: '',
    whoIam: '',
    experience: '',
    projects: '',
    skills: []
  });

  // Fetch about data on component mount
  useEffect(() => {
    getAbout().then(setAboutData);
  }, []);

  // Ensure skills is always an array with a fallback to empty array
  const skills = aboutData.skills ?? [];

  /**
   * Parse experience text to extract number and description
   * @param {string} text - Experience text (e.g., "5 Years Experience")
   * @returns {object} Object with number and label
   */
  const parseExperience = (text: string) => {
    if (!text) return { number: '', label: '' };
    const parts = text.split(' ');
    return {
      number: parts[0],
      label: parts.slice(1).join(' ')
    };
  };

  /**
   * Parse projects text to extract number and description
   * @param {string} text - Projects text (e.g., "20+ Projects Completed")
   * @returns {object} Object with number and label
   */
  const parseProjects = (text: string) => {
    if (!text) return { number: '', label: '' };
    const parts = text.split(' ');
    return {
      number: parts[0],
      label: parts.slice(1).join(' ')
    };
  };

  const experienceData = parseExperience(aboutData.experience);
  const projectsData = parseProjects(aboutData.projects);

  return (
    <FadeInSection>
      <section
        id="about"
        className="py-12 px-6 lg:px-20 bg-[var(--bg-light)] dark:bg-[var(--background)] transition-colors duration-300"
      >
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
            About Me
          </h2>
          <p className="mt-4 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] max-w-2xl mx-auto">
            {aboutData.subTitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Bio Section */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
              Who I Am
            </h3>

            <p className="mt-6 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] leading-relaxed">
              {aboutData.whoIam}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-[var(--primary)]">{experienceData.number}</h4>
                <p className="text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] text-sm">
                  {experienceData.label}
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[var(--primary)]">{projectsData.number}</h4>
                <p className="text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] text-sm">
                  {projectsData.label}
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
              Skills
            </h3>

            <div className="mt-8 space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-[var(--text-dark)] dark:text-[var(--text-dark)] font-medium">
                      {skill.name}
                    </span>
                    <span className="text-sm text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)]">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  </FadeInSection>
  )
}