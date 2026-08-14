"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";

import PhotoWall from "@/components/PhotoWall";
import BentoBox from "@/components/BentoBox";

export default function Home() {
  const [act, setAct] = useState<1 | 2>(1);
  const [showTransition, setShowTransition] = useState(false);

  const handleHeroComplete = () => {
    setShowTransition(true);
    setAct(2);
    // After Act 2 mounts under the transition layer, we fade out the transition layer
    setTimeout(() => {
      setShowTransition(false);
    }, 500);
  };

  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-full">
      {act === 1 && <Hero onComplete={handleHeroComplete} />}
      
      {act === 2 && (
        <div className="w-full">
          <PhotoWall />
          <BentoBox />
        </div>
      )}

      {/* Camada de transição de cor sólida do coração */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            className="fixed inset-0 z-50 bg-rose-600 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
