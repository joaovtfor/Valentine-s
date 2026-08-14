"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteContent } from "@/config/content";

export default function BentoBox() {
  return (
    <div className="w-full relative py-32 px-4 md:px-8 mb-32">
      
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          className="font-serif text-4xl md:text-5xl text-rose-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {siteContent.bentoBox.title}
        </motion.h2>
      </div>

      {/* Grid container with easter egg proportion 5:1 on desktop (6 columns total) */}
      <div className="relative max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-6 gap-6 md:h-[600px]">
        
        {/* Proporção 5: A Base (Armazém Principal) */}
        <div className="md:col-span-5 flex flex-col gap-6 relative h-[600px] md:h-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            <BentoCard 
              src="https://picsum.photos/seed/catblack1/800/600" 
              alt="Gato Preto" 
              delay={0}
            />
            <BentoCard 
              src="https://picsum.photos/seed/catblack2/800/600" 
              alt="Gato Preto dormindo" 
              delay={0.1}
            />
          </div>
          
          <div className="flex-1">
            <BentoCard 
              src="https://picsum.photos/seed/couple/1200/400" 
              alt="Nós e os gatos" 
              delay={0.2}
            />
          </div>

        </div>

        {/* Proporção 1: O Armazém Adjacente (Torre) */}
        <div className="md:col-span-1 relative flex flex-col items-center justify-end rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl h-[400px] md:h-full group overflow-hidden md:overflow-visible">
          
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-60 transition-opacity duration-500 group-hover:opacity-100">
             <Image 
               src="https://picsum.photos/seed/tabby/400/1000" 
               alt="Torre" 
               fill 
               className="object-cover" 
               unoptimized 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </div>

      </div>
    </div>
  );
}

function BentoCard({ src, alt, delay }: { src: string, alt: string, delay: number }) {
  return (
    <motion.div 
      className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl group cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ margin: "-50px", once: true }}
    >
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
        unoptimized
      />
      {/* Noise overlay opcional para dar textura analógica */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
