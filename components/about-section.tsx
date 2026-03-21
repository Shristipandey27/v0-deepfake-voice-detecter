"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Shield,
  Eye,
  Lock,
  AlertTriangle,
  Building2,
  Scale,
  Newspaper,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Neural Network Analysis",
    description:
      "Our AI uses advanced deep learning models trained on millions of samples to detect subtle manipulation patterns invisible to the human eye.",
  },
  {
    icon: Eye,
    title: "Multi-Modal Detection",
    description:
      "Simultaneously analyze audio, visual, and temporal features to identify inconsistencies across different media types.",
  },
  {
    icon: Shield,
    title: "Real-Time Protection",
    description:
      "Get instant results with our optimized inference pipeline, providing rapid analysis without compromising accuracy.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your uploaded files are processed securely and never stored permanently. We prioritize your data privacy at every step.",
  },
]

const useCases = [
  {
    icon: AlertTriangle,
    title: "Fraud Detection",
    description:
      "Protect your organization from voice phishing and deepfake scams targeting financial transactions.",
  },
  {
    icon: Building2,
    title: "Corporate Security",
    description:
      "Verify the authenticity of video conferences and communications to prevent impersonation attacks.",
  },
  {
    icon: Scale,
    title: "Legal Verification",
    description:
      "Authenticate digital evidence and ensure the integrity of media used in legal proceedings.",
  },
  {
    icon: Newspaper,
    title: "Media Integrity",
    description:
      "Help journalists and fact-checkers verify the authenticity of images and videos before publication.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">About </span>
            <span className="text-primary neon-text">Deepfake Technology</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
            Deepfakes use artificial intelligence to create convincing fake media.
            Understanding this technology is the first step in protecting yourself
            from digital manipulation.
          </p>
        </motion.div>

        {/* What Are Deepfakes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 lg:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                What Are Deepfakes?
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Deepfakes are synthetic media where a person in an existing image or video
                is replaced with someone else&apos;s likeness using artificial neural networks.
                The term combines &ldquo;deep learning&rdquo; and &ldquo;fake.&rdquo;
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                These AI-generated fakes can be incredibly convincing, making it difficult
                for humans to distinguish between authentic and manipulated content.
                From voice cloning to face swapping, deepfake technology continues to evolve.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our detection system uses the same AI technologies to identify these
                manipulations, examining patterns, artifacts, and inconsistencies that
                reveal synthetic content.
              </p>
            </div>

            {/* Visual illustration */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                {/* Animated visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="absolute w-48 h-48 border-2 border-primary/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-64 h-64 border border-accent/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-80 h-80 border border-primary/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative z-10 glass-card rounded-2xl p-8 text-center">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      AI-Powered Analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
            How Our Detection Works
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-xl p-6 group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary inline-block mb-4 group-hover:neon-glow transition-shadow">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
            Use Cases
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 flex gap-4"
              >
                <div className="p-3 rounded-lg bg-accent/10 text-accent h-fit">
                  <useCase.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {useCase.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
