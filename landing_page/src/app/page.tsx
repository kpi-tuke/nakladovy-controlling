"use client";

import React from "react";
import Hero from "@/components/Hero";
import AppAppBar from "@/components/AppAppBar";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
    </>
  );
}
