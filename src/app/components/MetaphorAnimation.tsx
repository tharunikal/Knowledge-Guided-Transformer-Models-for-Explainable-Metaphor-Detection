"use client";

import { motion } from "framer-motion";

interface MetaphorAnimationProps {
  source: string;
  target: string;
}

export default function MetaphorAnimation({ source, target }: MetaphorAnimationProps) {
  return (
    <div className="flex items-center justify-between h-40 w-full max-w-xl mx-auto relative px-8">
      
      {/* Source Node */}
      <motion.div
        className="p-4 bg-blue-400 text-white rounded-xl shadow-lg z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {source}
      </motion.div>

      {/* Animated Arrow Line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 flex items-center justify-between"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="h-1 bg-gradient-to-r from-blue-400 to-green-400 flex-1 relative">
          <motion.div
            className="absolute -right-3 w-6 h-6 rotate-45 border-t-4 border-r-4 border-green-400"
            initial={{ x: -24 }}
            animate={{ x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Target Node */}
      <motion.div
        className="p-4 bg-green-400 text-white rounded-xl shadow-lg z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {target}
      </motion.div>
    </div>
  );
}
