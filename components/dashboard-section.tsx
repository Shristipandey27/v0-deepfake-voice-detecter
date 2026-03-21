"use client"

import { motion } from "framer-motion"
import {
  Scan,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  FileAudio,
  FileImage,
  FileVideo,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dummy data for previous scans
const recentScans = [
  {
    id: 1,
    fileName: "interview_audio.mp3",
    type: "audio" as const,
    result: "real",
    confidence: 94.5,
    date: "2 hours ago",
  },
  {
    id: 2,
    fileName: "profile_photo.jpg",
    type: "image" as const,
    result: "fake",
    confidence: 87.2,
    date: "5 hours ago",
  },
  {
    id: 3,
    fileName: "presentation.mp4",
    type: "video" as const,
    result: "real",
    confidence: 91.8,
    date: "1 day ago",
  },
  {
    id: 4,
    fileName: "voice_message.wav",
    type: "audio" as const,
    result: "fake",
    confidence: 82.4,
    date: "2 days ago",
  },
  {
    id: 5,
    fileName: "social_post.png",
    type: "image" as const,
    result: "real",
    confidence: 96.1,
    date: "3 days ago",
  },
]

const stats = [
  {
    label: "Total Scans",
    value: "1,247",
    change: "+12%",
    icon: Scan,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Deepfakes Detected",
    value: "342",
    change: "+8%",
    icon: ShieldAlert,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    label: "Verified Authentic",
    value: "905",
    change: "+15%",
    icon: ShieldCheck,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Detection Accuracy",
    value: "97.8%",
    change: "+0.5%",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function DashboardSection() {
  return (
    <section id="dashboard" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Detection </span>
            <span className="text-primary neon-text">Dashboard</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your analysis history and view comprehensive detection statistics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-xl p-4 lg:p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-2 lg:p-3 rounded-lg", stat.bgColor)}>
                  <stat.icon className={cn("h-5 w-5 lg:h-6 lg:w-6", stat.color)} />
                </div>
                <span className="text-xs lg:text-sm font-medium text-accent">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Scans Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-border/50">
            <h3 className="text-xl font-semibold text-foreground">
              Recent Scans
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your most recent file analyses
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    File
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Result
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Confidence
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan, index) => (
                  <motion.tr
                    key={scan.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileTypeIcon type={scan.type} />
                        <span className="text-sm text-foreground font-medium">
                          {scan.fileName}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground capitalize">
                        {scan.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <ResultBadge result={scan.result} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              scan.result === "real" ? "bg-accent" : "bg-destructive"
                            )}
                            style={{ width: `${scan.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {scan.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {scan.date}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden p-4 space-y-4">
            {recentScans.map((scan, index) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-secondary/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileTypeIcon type={scan.type} />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {scan.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {scan.type}
                      </p>
                    </div>
                  </div>
                  <ResultBadge result={scan.result} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          scan.result === "real" ? "bg-accent" : "bg-destructive"
                        )}
                        style={{ width: `${scan.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {scan.confidence}%
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {scan.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FileTypeIcon({ type }: { type: "audio" | "image" | "video" }) {
  const icons = {
    audio: FileAudio,
    image: FileImage,
    video: FileVideo,
  }
  const Icon = icons[type]

  return (
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
  )
}

function ResultBadge({ result }: { result: string }) {
  const isReal = result === "real"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        isReal
          ? "bg-accent/10 text-accent"
          : "bg-destructive/10 text-destructive"
      )}
    >
      {isReal ? (
        <ShieldCheck className="h-3 w-3" />
      ) : (
        <ShieldAlert className="h-3 w-3" />
      )}
      {isReal ? "Authentic" : "Deepfake"}
    </span>
  )
}
