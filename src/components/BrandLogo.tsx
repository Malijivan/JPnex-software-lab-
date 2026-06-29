import { motion } from "motion/react";

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export default function BrandLogo({ className = "", size = 32 }: BrandLogoProps) {
  return (
    <motion.div 
      className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-[#0e121a] border border-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src="/jpnex.jpeg"
        alt="JPnex Software Lab Logo"
        className="w-full h-full object-cover rounded-md"
      />
    </motion.div>
  );
}
