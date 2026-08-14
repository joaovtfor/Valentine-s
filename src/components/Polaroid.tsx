"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PolaroidProps {
  src: string;
  alt: string;
  note: string;
  rotation: number;
  format?: "square" | "landscape" | "portrait";
  size?: "sm" | "md" | "lg";
}

export default function Polaroid({ src, alt, note, rotation, format = "square", size = "md" }: PolaroidProps) {
  const formatClasses = {
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]"
  };

  const sizeClasses = {
    sm: "w-56 md:w-64",
    md: "w-64 md:w-80",
    lg: "w-72 md:w-96"
  };

  const aspectClass = formatClasses[format];
  const widthClass = sizeClasses[size];
  // A física avançada de entrada encadeada:
  // 1. A foto sobe em fade-in e ganha escala (visible)
  // 2. O pino (tachinha) é animado em spring cravando na foto (com delay)
  // 3. Ao mesmo tempo que o pino crava, a rotação (rotateZ) da polaroid
  //    sofre uma oscilação residual (jiggle) como se tivesse recebido o impacto do pino.
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateZ: rotation - 8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: rotation, // Framer Motion spring naturally overshoots (jiggles) around this target!
      transition: {
        duration: 0.6,
        ease: "easeOut",
        // The rotation spring triggers exactly when the pin hits (delay: 0.4)
        // Damping set to 6 so it oscillates/bounces realistically upon impact.
        rotateZ: { delay: 0.4, type: "spring", stiffness: 300, damping: 6 }
      }
    }
  };

  const pinVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.3, type: "spring", stiffness: 400, damping: 12 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className={`relative bg-white p-3 pb-10 md:p-4 md:pb-12 shadow-2xl rounded-sm flex flex-col items-center ${widthClass}`}
      style={{ transformOrigin: "top center" }} // Pivots from the pin!
    >
      {/* Pin (Tachinha) */}
      <motion.div 
        variants={pinVariants}
        className="absolute -top-3 z-10 w-6 h-6 rounded-full shadow-md border border-rose-900/30"
        style={{
          background: "radial-gradient(circle at 30% 30%, #f43f5e, #9f1239)"
        }}
      >
        <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/50 blur-[0.5px]" />
      </motion.div>

      {/* Photo Container */}
      <div className={`w-full relative bg-zinc-200 overflow-hidden mb-4 rounded-sm border border-zinc-100 ${aspectClass}`}>
        <Image 
          src={src} 
          alt={alt} 
          fill
          className="object-cover"
          unoptimized // Permits usage of external placeholders smoothly
        />
      </div>

      {/* Handwritten Note */}
      <p className="font-hand text-3xl md:text-4xl text-zinc-800 text-center leading-tight">
        {note}
      </p>
    </motion.div>
  );
}
