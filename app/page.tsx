"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { UploadSection } from "@/components/upload-section"
import { DetectionResults } from "@/components/detection-results"
import { LiveCallDetection } from "@/components/live-call-detection"
import { DashboardSection } from "@/components/dashboard-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

interface UploadedFile {
  file: File
  preview: string
  type: "audio" | "image" | "video"
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleFileUploaded = (file: UploadedFile) => {
    setUploadedFile(file)
    setShowResults(true)

    // Scroll to results
    setTimeout(() => {
      const element = document.getElementById("results")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)
  }

  const handleReset = () => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview)
    }
    setUploadedFile(null)
    setShowResults(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* Upload or Results Section */}
      <div id="results">
        <AnimatePresence mode="wait">
          {showResults && uploadedFile ? (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 lg:py-32 relative"
            >
              <div className="absolute inset-0 grid-pattern opacity-50" />
              <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    <span className="text-foreground">Detection </span>
                    <span className="text-primary neon-text">Results</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    AI analysis of your uploaded media file
                  </p>
                </motion.div>

                <DetectionResults file={uploadedFile} onReset={handleReset} />
              </div>
            </motion.section>
          ) : (
            <UploadSection key="upload" onFileUploaded={handleFileUploaded} />
          )}
        </AnimatePresence>
      </div>

      <LiveCallDetection />
      <DashboardSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
