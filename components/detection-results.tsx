"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DetectionResult {
  isReal: boolean
  confidence: number
  analysisDetails: {
    label: string
    value: number
    status: "safe" | "warning" | "danger"
  }[]
  fileType: "audio" | "image" | "video"
  fileName: string
}

interface DetectionResultsProps {
  file: {
    file: File
    preview: string
    type: "audio" | "image" | "video"
  }
  onReset: () => void
}

export function DetectionResults({ file, onReset }: DetectionResultsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<DetectionResult | null>(null)

  useEffect(() => {
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Simulate analysis completion
    const timer = setTimeout(() => {
      setIsAnalyzing(false)
      setProgress(100)

      // Generate random result for demo
      const isReal = Math.random() > 0.4
      const confidence = isReal
        ? 75 + Math.random() * 20
        : 65 + Math.random() * 25

      const analysisDetails =
        file.type === "audio"
          ? [
              { label: "Voice Pattern", value: isReal ? 92 : 45, status: isReal ? "safe" : "danger" as const },
              { label: "Spectral Analysis", value: isReal ? 88 : 38, status: isReal ? "safe" : "danger" as const },
              { label: "Temporal Consistency", value: isReal ? 95 : 52, status: isReal ? "safe" : "warning" as const },
              { label: "Background Noise", value: isReal ? 78 : 71, status: "safe" as const },
            ]
          : file.type === "image"
          ? [
              { label: "Face Consistency", value: isReal ? 94 : 42, status: isReal ? "safe" : "danger" as const },
              { label: "Lighting Analysis", value: isReal ? 89 : 55, status: isReal ? "safe" : "warning" as const },
              { label: "Artifact Detection", value: isReal ? 96 : 35, status: isReal ? "safe" : "danger" as const },
              { label: "Metadata Check", value: isReal ? 85 : 68, status: isReal ? "safe" : "warning" as const },
            ]
          : [
              { label: "Frame Consistency", value: isReal ? 91 : 48, status: isReal ? "safe" : "danger" as const },
              { label: "Facial Movement", value: isReal ? 87 : 41, status: isReal ? "safe" : "danger" as const },
              { label: "Audio-Visual Sync", value: isReal ? 93 : 52, status: isReal ? "safe" : "warning" as const },
              { label: "Compression Analysis", value: isReal ? 82 : 73, status: isReal ? "safe" : "safe" as const },
            ]

      setResult({
        isReal,
        confidence,
        analysisDetails,
        fileType: file.type,
        fileName: file.file.name,
      })
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [file])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <AnalyzingState key="analyzing" progress={progress} fileType={file.type} />
        ) : result ? (
          <ResultsDisplay key="results" result={result} onReset={onReset} />
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

function AnalyzingState({
  progress,
  fileType,
}: {
  progress: number
  fileType: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card rounded-2xl p-8 lg:p-12 text-center"
    >
      {/* Animated scanning effect */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/10" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-accent"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="h-12 w-12 text-primary pulse-glow rounded-full p-2" />
        </div>

        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-2">
        Analyzing {fileType.charAt(0).toUpperCase() + fileType.slice(1)}...
      </h3>
      <p className="text-muted-foreground mb-6">
        Our AI is examining your file for signs of manipulation
      </p>

      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Processing</span>
          <span className="text-primary font-medium">
            {Math.min(100, Math.round(progress))}%
          </span>
        </div>
        <Progress value={Math.min(100, progress)} className="h-2" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Running deepfake detection algorithms
        </motion.span>
      </div>
    </motion.div>
  )
}

function ResultsDisplay({
  result,
  onReset,
}: {
  result: DetectionResult
  onReset: () => void
}) {
  const Icon = result.isReal ? ShieldCheck : ShieldAlert
  const StatusIcon = result.isReal ? CheckCircle2 : AlertTriangle

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6"
    >
      {/* Main Result Card */}
      <div
        className={cn(
          "glass-card rounded-2xl p-8 lg:p-10 text-center gradient-border",
          result.isReal
            ? "border-accent/30"
            : "border-destructive/30"
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className={cn(
            "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
            result.isReal
              ? "bg-accent/20 text-accent"
              : "bg-destructive/20 text-destructive"
          )}
        >
          <Icon className="h-12 w-12" />
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <StatusIcon
            className={cn(
              "h-5 w-5",
              result.isReal ? "text-accent" : "text-destructive"
            )}
          />
          <h3
            className={cn(
              "text-3xl font-bold",
              result.isReal ? "text-accent" : "text-destructive"
            )}
          >
            {result.isReal ? "Authentic" : "Deepfake Detected"}
          </h3>
        </div>

        <p className="text-muted-foreground mb-6">
          {result.isReal
            ? "This media appears to be authentic and unaltered."
            : "This media shows signs of AI manipulation or synthesis."}
        </p>

        {/* Confidence Meter */}
        <div className="max-w-sm mx-auto mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Confidence Level</span>
            <span
              className={cn(
                "font-bold",
                result.isReal ? "text-accent" : "text-destructive"
              )}
            >
              {result.confidence.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full",
                result.isReal ? "bg-accent" : "bg-destructive"
              )}
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          File: {result.fileName}
        </p>
      </div>

      {/* Analysis Details */}
      <div className="glass-card rounded-2xl p-6 lg:p-8">
        <h4 className="text-lg font-semibold text-foreground mb-6">
          Analysis Breakdown
        </h4>

        <div className="space-y-4">
          {result.analysisDetails.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">{detail.label}</span>
                <span
                  className={cn(
                    "font-medium",
                    detail.status === "safe"
                      ? "text-accent"
                      : detail.status === "warning"
                      ? "text-yellow-500"
                      : "text-destructive"
                  )}
                >
                  {detail.value}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${detail.value}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={cn(
                    "h-full rounded-full",
                    detail.status === "safe"
                      ? "bg-accent"
                      : detail.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-destructive"
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={onReset}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow px-8"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Analyze Another File
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-border"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-border"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </motion.div>
  )
}
