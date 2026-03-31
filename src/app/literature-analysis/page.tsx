"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Upload, Loader2, ArrowRight, FileText } from "lucide-react";

interface Metaphor {
  metaphorical_phrase: string;
  explanation: string;
  author: string;
  title: string;
}

function MetaphorCard({ metaphor, index }: { metaphor: Metaphor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 mb-3 leading-relaxed">
            "{metaphor.metaphorical_phrase}"
          </p>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed font-light">
            {metaphor.explanation}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium text-gray-700">{metaphor.title}</span>
            <span>·</span>
            <span className="font-light">{metaphor.author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LiteratureAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [metaphors, setMetaphors] = useState<Metaphor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [titleFocused, setTitleFocused] = useState(false);
  const [authorFocused, setAuthorFocused] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.name.endsWith(".txt")) {
      setFile(uploadedFile);
      setError("");
    } else {
      setError("Please upload a valid .txt file.");
      setFile(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.name.endsWith(".txt")) {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Please upload a valid .txt file.");
    }
  };

  const handleAnalyze = async () => {
    console.log("🚀 Starting literature analysis...");
    if (!file) return;

    setLoading(true);
    setError("");
    setMetaphors([]);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || "Unknown Title");
    formData.append("author", author || "Unknown Author");

    try {
      const start = Date.now();
      const res = await fetch("/api/literature-analysis", {
        method: "POST",
        body: formData,
      });

      console.log(`📡 API call finished in ${Date.now() - start}ms`);

      if (!res.ok) throw new Error("Failed to process file.");

      const data = await res.json();
      console.log("✅ Raw data from API:", data);

      const normalized: Metaphor[] = data.map((item: any) => ({
        metaphorical_phrase: item.metaphorical_phrase,
        explanation: item.explanation,
        author: author || "Unknown Author",
        title: title || "Unknown Title",
      }));

      console.log("✅ Normalized metaphors:", normalized);
      setMetaphors(normalized);
    } catch (err) {
      console.error(err);
      setError("Error analyzing file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/80 border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Literature Analysis
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
              Analyze Literary Works
            </h2>
            <p className="text-gray-600 font-light">
              Upload your text file to discover metaphorical patterns across literature
            </p>
          </motion.div>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 mb-8"
          >
            <div className="space-y-5">
              {/* Title Input */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  placeholder="Enter the title of the work"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setTitleFocused(true)}
                  onBlur={() => setTitleFocused(false)}
                  className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                    titleFocused 
                      ? 'border-gray-900 bg-white shadow-lg shadow-gray-900/5 scale-[1.01]' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                />
              </div>

              {/* Author Input */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Enter the author's name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  onFocus={() => setAuthorFocused(true)}
                  onBlur={() => setAuthorFocused(false)}
                  className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                    authorFocused 
                      ? 'border-gray-900 bg-white shadow-lg shadow-gray-900/5 scale-[1.01]' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Text File
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
                    dragActive 
                      ? 'border-gray-900 bg-gray-50' 
                      : file 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="px-6 py-8 text-center">
                    {file ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Drop your .txt file here
                        </p>
                        <p className="text-xs text-gray-500">or click to browse</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                  >
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading || !file}
                className={`w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || !file
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 hover:scale-[1.01] active:scale-[0.99]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Literature...
                  </>
                ) : (
                  <>
                    Analyze Text
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {metaphors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Results Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                    Discovered Metaphors
                  </h3>
                  <p className="text-gray-600 font-light">
                    Found {metaphors.length} metaphorical {metaphors.length === 1 ? 'pattern' : 'patterns'} in the text
                  </p>
                </div>

                {/* Metaphor Cards */}
                <div className="space-y-4">
                  {metaphors.map((m, idx) => (
                    <MetaphorCard key={idx} metaphor={m} index={idx} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}