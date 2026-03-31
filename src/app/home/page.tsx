"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation"; 
interface PageOption {
  title: string;
  path: string;
  icon: any;
  description: string;
}

export default function HomePage() {
  const router = useRouter();

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const pages: PageOption[] = [
    { 
      title: "Sentence Analysis", 
      path: "/sentence-analysis",
      icon: BookOpen,
      description: "Analyze individual sentences and uncover hidden metaphorical patterns"
    },
    { 
      title: "Literature Analysis", 
      path: "/literature-analysis",
      icon: Brain,
      description: "Deep dive into texts and explore conceptual mappings across literature"
    },
    { 
      title: "Statistics & Results", 
      path: "/stat",
      icon: TrendingUp,
      description: "Visualize data insights and track metaphor usage patterns"
    },
  ];
  
 const navigate = (path: string) => {
    router.push(path);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-10 p-6 flex justify-between items-center backdrop-blur-xl bg-white/80 border-b border-gray-100">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            CMT 
          </h1>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          About
        </motion.button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-8"
          >
            <span className="text-sm font-medium text-gray-700"></span>
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-semibold mb-6 leading-tight tracking-tight text-gray-900">
            Unlock the Power of
            <br />
            Conceptual Metaphors
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Discover how metaphors shape our understanding of the world. Analyze language, 
            explore cognitive patterns, and reveal the hidden structures that influence thought.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gray-900 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              onClick={() => navigate("/sentence-analysis")}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl"
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">Choose Your Path</h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Select a tool to begin your exploration of conceptual metaphor theory
          </p>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {pages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.button
                  key={page.path}
                  onClick={() => navigate(page.path)}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full p-8 rounded-3xl bg-white
                           shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                           border border-gray-100 hover:border-gray-200
                           transition-all duration-500 text-left overflow-hidden"
                >
                  {/* Icon */}
                  <motion.div
                    className="relative z-10 w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-6"
                    animate={{
                      scale: hoveredCard === index ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                      {page.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 font-light">
                      {page.description}
                    </p>
                    <motion.div 
                      className="flex items-center text-gray-900 font-medium text-sm"
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        x: hoveredCard === index ? 0 : -10
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-4xl w-full"
        >
          {[
            { value: "10K+", label: "Sentences Analyzed" },
            { value: "500+", label: "Literary Works" },
            { value: "98%", label: "Accuracy Rate" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.7 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
            >
              <div className="text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center bg-white/80 backdrop-blur-xl border-t border-gray-100">
        <p className="text-gray-600 text-sm font-light mb-2">
          Built with passion for cognitive linguistics and design excellence
        </p>
        <p className="text-gray-500 text-xs font-light">
          Inspired by Jakos's CMT
        </p>
      </footer>
    </div>
  );
}