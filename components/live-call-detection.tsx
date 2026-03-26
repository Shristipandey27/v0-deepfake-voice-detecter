'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, PhoneOff, Mic, Volume2, AlertCircle, CheckCircle2, Radio } from 'lucide-react'

interface CallStatus {
  isActive: boolean
  duration: number
  deepfakeDetected: boolean
  confidence: number
}

export function LiveCallDetection() {
  const [callActive, setCallActive] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>({
    isActive: false,
    duration: 0,
    deepfakeDetected: false,
    confidence: 0,
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (callActive) {
      interval = setInterval(() => {
        setCallStatus(prev => ({
          ...prev,
          duration: prev.duration + 1,
          deepfakeDetected: Math.random() > 0.8,
          confidence: Math.floor(Math.random() * 100),
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [callActive])

  const toggleCall = () => {
    if (!callActive) {
      setCallStatus({
        isActive: true,
        duration: 0,
        deepfakeDetected: false,
        confidence: 0,
      })
      setCallActive(true)
    } else {
      setCallActive(false)
      setCallStatus(prev => ({ ...prev, isActive: false }))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="live-detection" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Live Protection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">Real-Time Call </span>
            <span className="text-primary neon-text">Detection</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Monitor and analyze voice calls in real-time. Instantly detect deepfake audio and get immediate alerts during live conversations.
          </p>
        </motion.div>

        {/* Main Call Panel */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            variants={item}
            className="glass-card rounded-2xl border border-primary/20 p-8 md:p-12"
          >
            {/* Call Window */}
            <div className="mb-8">
              <div className="relative aspect-video bg-gradient-to-b from-primary/5 to-background rounded-xl border border-primary/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                  {callActive && (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/10 rounded-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
                    </>
                  )}
                </div>

                <div className="relative z-10 text-center">
                  {callActive ? (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mb-4"
                      >
                        <Phone className="h-16 w-16 text-primary mx-auto" />
                      </motion.div>
                      <p className="text-2xl font-bold text-foreground mb-2">Call Active</p>
                      <p className="text-primary text-lg font-mono">{formatTime(callStatus.duration)}</p>
                    </>
                  ) : (
                    <>
                      <Phone className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">Ready to connect</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Detection Status */}
            {callActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {/* Audio Status */}
                <div className="bg-background/50 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Audio Input</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="h-2 w-2 bg-green-500 rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                </div>

                {/* Deepfake Detection */}
                <div className="bg-background/50 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {callStatus.deepfakeDetected ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    <span className="text-sm font-semibold text-foreground">Detection</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {callStatus.deepfakeDetected ? 'Anomaly detected' : 'Authentic voice'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Confidence Meter */}
            {callActive && callStatus.deepfakeDetected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-red-500/10 border border-red-500/20 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-red-500 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Deepfake Confidence
                  </span>
                  <span className="text-sm font-mono text-red-500">{callStatus.confidence}%</span>
                </div>
                <div className="w-full bg-red-500/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${callStatus.confidence}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-red-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-4">
              <button
                onClick={toggleCall}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  callActive
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
                }`}
              >
                {callActive ? (
                  <>
                    <PhoneOff className="h-5 w-5" />
                    End Call
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Start Call
                  </>
                )}
              </button>
              <button className="px-6 py-3 rounded-lg font-semibold bg-background/50 text-foreground border border-primary/20 hover:bg-background/80 transition-all flex items-center justify-center gap-2">
                <Volume2 className="h-5 w-5" />
                <span className="hidden sm:inline">Volume</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: Radio,
              title: 'Real-Time Monitoring',
              description: 'Continuous voice analysis with instant deepfake alerts during calls',
            },
            {
              icon: Volume2,
              title: 'Noise Resilient',
              description: 'Accurately detects deepfakes even with background noise or poor audio quality',
            },
            {
              icon: AlertCircle,
              title: 'Instant Alerts',
              description: 'Immediate notifications when suspicious voice patterns are detected',
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={item} className="group">
              <div className="glass-card rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all h-full">
                <feature.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
