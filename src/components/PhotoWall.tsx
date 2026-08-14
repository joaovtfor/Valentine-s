"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { siteContent } from "@/config/content";
import Polaroid from "./Polaroid";

export default function PhotoWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress purely within this component's height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const photos = siteContent.photoWall.photos;

  // Generate an organic S-curve that weaves left and right depending on the number of photos
  const generatePath = (numPhotos: number) => {
    let path = "M 50 0 ";
    const step = 100 / numPhotos;
    for (let i = 0; i < numPhotos; i++) {
      // Alternate curves. Start curving right, then left, etc.
      const isRight = i % 2 === 0; 
      const startY = i * step;
      const endY = (i + 1) * step;
      const cpX = isRight ? 80 : 20; 
      
      // Cubic bezier curve bridging the vertical steps with organic horizontal swerves
      path += `C ${cpX} ${startY + step/4}, ${cpX} ${endY - step/4}, 50 ${endY} `;
    }
    return path;
  };

  const titleText = siteContent.photoWall.title;

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Slower delay between each letter
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } // Smooth pure fade in
    }
  };

  return (
    <div className="w-full relative py-32 overflow-x-hidden" ref={containerRef}>
      
      <div className="text-center mb-32 relative z-10 px-4">
        <motion.h2 
          className="font-serif text-4xl md:text-5xl text-rose-100"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-50px" }} // Retirado o once:true para dar o efeito de fade-out ao sair da tela
        >
          {titleText.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>
      </div>

      <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-32 md:gap-64 px-4">
        
        {/* O Fio Condutor (SVG Background) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            className="w-full h-full overflow-hidden"
          >
            {/* SVG Filter for the glow effect */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* The Thread Path animated via scroll */}
            <motion.path 
              d={generatePath(photos.length)}
              fill="none"
              stroke="#f43f5e" /* rose-500 */
              strokeWidth="0.5"
              filter="url(#glow)"
              strokeDasharray="1 1" /* Normalized for Framer Motion pathLength */
              style={{
                pathLength: scrollYProgress,
                opacity: scrollYProgress // fades in as you scroll
              }}
            />
          </svg>
        </div>

        {/* Photos overlaying the thread */}
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className={`flex w-full relative z-10 ${photo.alignment === 'left' ? 'justify-start md:pr-20' : 'justify-end md:pl-20'}`}
          >
            <Polaroid 
              src={photo.src}
              alt={photo.alt}
              note={photo.note}
              rotation={photo.rotation}
              format={photo.format as "square" | "landscape" | "portrait"}
              size={photo.size as "sm" | "md" | "lg"}
            />
          </div>
        ))}

      </div>
    </div>
  );
}
