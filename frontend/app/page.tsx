'use client';

import { Suspense } from "react";
import LandingPage from "@/components/page/LandingPage";
import { Projects } from "@/components/page/Projects";
import { AboutUs } from "@/components/page/AboutUs";
import ScrollHandler from "@/components/ScrollHandler";
import AIChatOverlay from "@/components/AIChatOverlay";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Home() {

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  return (
    <>
    <AIChatOverlay />     
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <LandingPage />
      <Projects />
      <AboutUs />
    </>
  );
}