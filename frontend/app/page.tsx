'use client';

import { Suspense } from "react";
import LandingPage from "@/components/page/LandingPage";
import { Projects } from "@/components/page/Projects";
import { AboutUs } from "@/components/page/AboutUs";
import ScrollHandler from "@/components/ScrollHandler";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <LandingPage />
      <Projects />
      <AboutUs />
    </>
  );
}