"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Image, Video, Upload, X, FileAudio, FileImage, FileVideo, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type FileType = "audio" | "image" | "video"

interface UploadConfig {
  type: FileType
  icon: React.ElementType
  accept: string
  maxSize: number
  label: string
  formats: string
}

const uploadConfigs: Record<FileType, UploadConfig> = {
  audio: {
    type: "audio",
    icon: Mic,
    accept: "audio/mp3,audio/wav,audio/mpeg,.mp3,.wav",
    maxSize: 50,
    label: "Audio Upload",
    formats: "MP3, WAV (Max 50MB)",
  },
  image: {
    type: "image",
    icon: Image,
    accept: "image/jpeg,image/png,image/jpg,.jpg,.jpeg,.png",
    maxSize: 20,
    label: "Image Upload",
    formats: "JPG, PNG (Max 20MB)",
  },
  video: {
    type: "video",
    icon: Video,
    accept: "video/mp4,video/webm,.mp4,.webm",
    maxSize: 100,
    label: "Video Upload",
    formats: "MP4, WebM (Max 100MB)",
  },
}

interface UploadedFile {
  file: File
  preview: string
  type: FileType
}

interface UploadSectionProps {
  onFileUploaded: (file: UploadedFile) => void
}

export function UploadSection({ onFileUploaded }: UploadSectionProps) {
  const [activeTab, setActiveTab] = useState<FileType>("audio")
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const validateFile = (file: File, config: UploadConfig): string | null => {
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > config.maxSize) {
      return `File size exceeds ${config.maxSize}MB limit`
    }

    const acceptedTypes = config.accept.split(",").map((t) => t.trim())
    const fileType = file.type
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`

    const isValidType = acceptedTypes.some(
      (accepted) => accepted === fileType || accepted === fileExtension
    )

    if (!isValidType) {
      return `Invalid file type. Accepted formats: ${config.formats}`
    }

    return null
  }

  const processFile = useCallback(
    (file: File, type: FileType) => {
      const config = uploadConfigs[type]
      const validationError = validateFile(file, config)

      if (validationError) {
        setError(validationError)
        return
      }

      setError(null)

      let preview = ""
      if (type === "image") {
        preview = URL.createObjectURL(file)
      } else if (type === "video") {
        preview = URL.createObjectURL(file)
      } else {
        preview = URL.createObjectURL(file)
      }

      const uploadedFileData: UploadedFile = { file, preview, type }
      setUploadedFile(uploadedFileData)
    },
    []
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        processFile(file, activeTab)
      }
    },
    [activeTab, processFile]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        processFile(file, activeTab)
      }
    },
    [activeTab, processFile]
  )

  const clearFile = useCallback(() => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview)
    }
    setUploadedFile(null)
    setError(null)
  }, [uploadedFile])

  const handleAnalyze = () => {
    if (uploadedFile) {
      onFileUploaded(uploadedFile)
    }
  }

  return (
    <section id="upload" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Upload & </span>
            <span className="text-primary neon-text">Analyze</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your media type and upload your file for instant deepfake analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as FileType)
              clearFile()
            }}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full bg-secondary/50 p-1 rounded-xl mb-8">
              {(Object.keys(uploadConfigs) as FileType[]).map((type) => {
                const config = uploadConfigs[type]
                const Icon = config.icon
                return (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-3 transition-all"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">{config.label}</span>
                    <span className="sm:hidden capitalize">{type}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {(Object.keys(uploadConfigs) as FileType[]).map((type) => {
              const config = uploadConfigs[type]
              return (
                <TabsContent key={type} value={type} className="mt-0">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "glass-card rounded-2xl p-8 lg:p-12 transition-all duration-300",
                      isDragging && "neon-glow border-primary/50",
                      error && "border-destructive/50"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {!uploadedFile ? (
                        <motion.div
                          key="upload-zone"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center"
                        >
                          <div className="mb-6">
                            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                              <Upload className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              Drop your {type} file here
                            </h3>
                            <p className="text-muted-foreground">
                              or click to browse • {config.formats}
                            </p>
                          </div>

                          <input
                            type="file"
                            id={`file-upload-${type}`}
                            className="hidden"
                            accept={config.accept}
                            onChange={handleFileSelect}
                          />
                          <label htmlFor={`file-upload-${type}`}>
                            <Button
                              asChild
                              variant="outline"
                              size="lg"
                              className="cursor-pointer border-primary/50 hover:bg-primary/10"
                            >
                              <span>
                                Select {type.charAt(0).toUpperCase() + type.slice(1)}
                              </span>
                            </Button>
                          </label>

                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 text-sm text-destructive"
                            >
                              {error}
                            </motion.p>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center"
                        >
                          <FilePreview
                            file={uploadedFile}
                            onClear={clearFile}
                          />

                          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                              onClick={handleAnalyze}
                              size="lg"
                              className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow px-8"
                            >
                              Analyze File
                            </Button>
                            <Button
                              onClick={clearFile}
                              variant="outline"
                              size="lg"
                              className="border-border"
                            >
                              Upload Different File
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

function FilePreview({
  file,
  onClear,
}: {
  file: UploadedFile
  onClear: () => void
}) {
  const FileIcon =
    file.type === "audio"
      ? FileAudio
      : file.type === "image"
      ? FileImage
      : FileVideo

  return (
    <div className="relative">
      <button
        onClick={onClear}
        className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 z-10"
        aria-label="Remove file"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="bg-secondary/30 rounded-xl p-6 inline-block">
        {file.type === "image" ? (
          <div className="relative">
            <img
              src={file.preview}
              alt="Preview"
              className="max-h-64 max-w-full rounded-lg object-contain mx-auto"
            />
          </div>
        ) : file.type === "video" ? (
          <video
            src={file.preview}
            controls
            className="max-h-64 max-w-full rounded-lg mx-auto"
          />
        ) : (
          <div className="flex flex-col items-center">
            <FileIcon className="h-16 w-16 text-primary mb-4" />
            <audio src={file.preview} controls className="w-full max-w-sm" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Check className="h-4 w-4 text-accent" />
        <span className="text-sm text-muted-foreground">
          {file.file.name} ({(file.file.size / (1024 * 1024)).toFixed(2)} MB)
        </span>
      </div>
    </div>
  )
}
