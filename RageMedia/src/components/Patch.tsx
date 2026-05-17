import { motion } from "motion/react";
import { ReactNode, HTMLAttributes } from "react";

interface PatchProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  color?: "pink" | "lime" | "black" | "grey";
  hoverable?: boolean;
}

export function RageLogo({ className = "", size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  const height = isSm ? "h-12" : isLg ? "h-64 md:h-80" : "h-32";

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <img 
        src="/RageLogo.png" 
        alt="Rage Media Logo"
        className={`${height} w-auto object-contain drop-shadow-[0_0_20px_rgba(255,0,127,0.3)]`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export function Patch({ 
  children, 
  className = "", 
  color = "pink", 
  hoverable = true,
  ...props
}: PatchProps) {
  const colorMap = {
    pink: "bg-rage-pink text-white",
    lime: "bg-rage-lime text-rage-black",
    black: "bg-rage-black text-white border-2 border-rage-pink/50",
    grey: "bg-rage-grey text-white border border-rage-lime/30",
  };

  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, rotate: 1 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      className={`
        relative p-6 clip-patch fabric-texture group
        ${colorMap[color]}
        ${className}
      `}
      {...(props as any)}
    >
      {/* Heavy stitching effect */}
      <div className="absolute inset-0 pointer-events-none p-1">
        <div className="w-full h-full border-[3px] border-dotted border-black/10 clip-patch opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {/* Internal "thread" shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export function GlowingText({ 
  children, 
  color = "pink", 
  className = "" 
}: { 
  children: ReactNode; 
  color?: "pink" | "lime"; 
  className?: string 
}) {
  const shadowClass = color === "pink" ? "text-shadow-neon-pink" : "text-shadow-neon-lime";
  const textColor = color === "pink" ? "text-rage-pink" : "text-rage-lime";
  
  return (
    <span className={`${shadowClass} ${textColor} ${className}`}>
      {children}
    </span>
  );
}
