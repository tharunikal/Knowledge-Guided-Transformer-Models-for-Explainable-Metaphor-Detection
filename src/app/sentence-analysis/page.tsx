"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Check, X, Loader2 } from "lucide-react";

export interface AnalysisResult {
  is_metaphor: boolean;
  metaphorical_expression: string;
  target_word: string;
  source_domain: string;
  target_domain: string;
  domain_mapping: string;
  literal_meaning: string;
  contextual_usage: string;
  etymology: string;
}

export default function SentenceAnalysisPage() {
  const [sentence, setSentence] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [focused, setFocused] = useState(false);

  const handleAnalyze = async () => {
    if (!sentence.trim()) {
      setError("Please enter a sentence before analyzing.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/sentence-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sentence }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze sentence.");
      }

      setResult(data);
      await saveAnalysisToMongo(data);

    } catch (error) {
      console.error(error);
      setError("Something went wrong while analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAnalysisToMongo = async (analysis: AnalysisResult) => {
    try {
      const res = await fetch("/api/save-sentence-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sentence,
          analysis,
          createdAt: new Date().toISOString(),
        }),
      });

      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      console.log("Saved to MongoDB:", result.insertedId);
    } catch (err) {
      console.error("Failed to save analysis:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/80 border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Sentence Analysis
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-5xl">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Analyze Your Text
            </h2>
            <p className="text-gray-600 font-light">
              Discover metaphorical patterns and cognitive structures in language
            </p>
          </motion.div>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 mb-8"
          >
            <div className="relative">
              <textarea
                placeholder='Enter a sentence (e.g., "I could eat a horse")'
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`w-full h-40 p-5 bg-gray-50 border rounded-2xl resize-none text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  focused 
                    ? 'border-gray-900 bg-white shadow-lg shadow-gray-900/5' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-light">
                {sentence.length} characters
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                >
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleAnalyze}
              disabled={loading || !sentence.trim()}
              className={`mt-6 w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading || !sentence.trim()
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 hover:scale-[1.01] active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Sentence
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>

          {/* Result Card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                      Analysis Result
                    </h3>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                      result.is_metaphor 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {result.is_metaphor ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="text-sm font-medium">Metaphor Detected</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          <span className="text-sm font-medium">No Metaphor</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid gap-6">
                    {[
                      { label: "Expression", value: result.metaphorical_expression },
                      { label: "Target Word", value: result.target_word },
                      { label: "Source Domain", value: result.source_domain },
                      { label: "Target Domain", value: result.target_domain },
                      { label: "Domain Mapping", value: result.domain_mapping },
                      { label: "Literal Meaning", value: result.literal_meaning },
                      { label: "Contextual Usage", value: result.contextual_usage },
                      { label: "Etymology", value: result.etymology },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.05,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="group"
                      >
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                          {item.label}
                        </dt>
                        <dd className="text-gray-900 font-light leading-relaxed bg-gray-50 rounded-xl px-4 py-3 group-hover:bg-gray-100 transition-colors duration-200">
                          {item.value || "—"}
                        </dd>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mapping Visualization Placeholder */}
          {result && result.is_metaphor && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
                Conceptual Mapping
              </h3>
              <div className="flex items-center justify-center gap-8 py-12">
                <div className="text-center">
                  <div 
                    style={{
                      width: `${Math.max(120, Math.min(180, result.source_domain.length * 1.2))}px`,
                      height: `${Math.max(120, Math.min(180, result.source_domain.length * 1.2))}px`,
                    }}
                    className="rounded-2xl bg-gray-900 flex items-center justify-center mb-4 shadow-lg"
                  >
                    <span className="text-white font-medium text-center px-4 line-clamp-2">
                      {result.source_domain.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-light">Source</p>
                </div>
                
                <ArrowRight className="w-8 h-8 text-gray-400 flex-shrink-0" />
                
                <div className="text-center">
                  <div 
                    style={{
                      width: `${Math.max(120, Math.min(180, result.target_domain.length * 1.2))}px`,
                      height: `${Math.max(120, Math.min(180, result.target_domain.length * 1.2))}px`,
                    }}
                    className="rounded-2xl bg-gray-100 border-2 border-gray-900 flex items-center justify-center mb-4"
                  >
                    <span className="text-gray-900 font-medium text-center px-4 line-clamp-2">
                      {result.target_domain.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-light">Target</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}