'use client'

import Image from 'next/image'
import ProfileImage from '@/public/Image.jpeg'
import { ModeToggle } from '@/components/modeTogggle'
import FadeInSection from "@/components/FadeInSection";
import siteData from '../../lib/dummyData';

const { Landingdata } = siteData;
const navigation = Landingdata.data.navigation;

export default function LandingPage() {
  return (
    <div id="home" className="bg-[var(--bg-light)] dark:bg-[var(--background)] transition-colors duration-300">
      
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <ModeToggle />
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm font-semibold 
           text-[var(--text-dark)] 
           hover:text-[var(--primary)] 
           transition
           after:absolute 
           after:left-1/2 
           after:-bottom-1 
           after:h-[2px] 
           after:w-0 
           after:bg-[var(--primary)] 
           after:transition-all 
           after:duration-300 
           after:-translate-x-1/2
           hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <FadeInSection>
        <section
          id="home"
          className="flex flex-col md:flex-row items-center justify-center 
                   gap-12 px-6 lg:px-20 pt-32 pb-20 border-b border-[var(--border)]"
        >
          {/* Profile Image */}
          <div className="flex-shrink-0">
              <Image
              src={ProfileImage}
              alt="Profile Image"
              priority
              className="rounded-full shadow-lg 
                          w-64 h-64 object-cover 
                          border-4 border-[var(--primary)]"
              />
          </div>

          {/* Text Content */}
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)]">
              {Landingdata.data.greeting}
            </h3>

            <h2 className="mt-2 text-4xl font-bold text-[var(--text-dark)] dark:text-[var(--text-dark)] leading-tight">
              {Landingdata.data.role}
            </h2>

            <p className="mt-6 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] leading-relaxed">
              {Landingdata.data.description}
            </p>

            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] 
                           hover:bg-opacity-90 transition duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  )
}