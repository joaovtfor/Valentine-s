"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siteContent } from "@/config/content";

export default function Hero({ onComplete }: { onComplete: () => void }) {
  const [isExpanding, setIsExpanding] = useState(false);

  const handleStart = () => {
    setIsExpanding(true);
    setTimeout(() => {
      onComplete();
    }, 1400); 
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-40 bg-transparent overflow-hidden">
      <motion.h1 
        className="font-serif text-4xl md:text-5xl lg:text-6xl text-center px-4 max-w-3xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isExpanding ? 0 : 1, y: isExpanding ? -20 : 0 }}
        transition={{ duration: 1 }}
      >
        {siteContent.hero.phrase}
      </motion.h1>
      
      <div className="mt-12 relative flex items-center justify-center">
        {!isExpanding && (
          <motion.button
            onClick={handleStart}
            className="p-4 rounded-full text-rose-600 hover:bg-rose-600/10 transition-colors focus:outline-none cursor-pointer z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={48} className="fill-current" />
          </motion.button>
        )}

        {isExpanding && (
          <motion.div
            className="absolute z-50 pointer-events-none flex items-center justify-center text-rose-600"
            initial={{ scale: 0.02 }}
            animate={{ scale: 4 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            style={{ width: 2400, height: 2400, willChange: "transform" }}
          >
            <Heart className="w-full h-full fill-current" />
          </motion.div>
        )}
      </div>
      
      <motion.p
        className="absolute bottom-10 text-zinc-500 text-sm tracking-widest uppercase font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanding ? 0 : 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Clique para entrar
      </motion.p>
    </div>
  );
}
