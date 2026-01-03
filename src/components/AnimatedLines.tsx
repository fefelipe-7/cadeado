import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface AnimatedLinesProps {
  lines: string[]
  onAnimationComplete?: () => void
  delayBetweenLines?: number
  initialDelay?: number
}

export function AnimatedLines({
  lines,
  onAnimationComplete,
  delayBetweenLines = 0.3,
  initialDelay = 0.2,
}: AnimatedLinesProps) {

  useEffect(() => {
    const totalDuration =
      initialDelay + lines.length * delayBetweenLines + 0.6
    const timer = setTimeout(() => {
      setIsComplete(true)
      onAnimationComplete?.()
    }, totalDuration * 1000)

    return () => clearTimeout(timer)
  }, [lines.length, delayBetweenLines, initialDelay, onAnimationComplete])

  return (
    <div className="space-y-4">
      {lines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: initialDelay + index * delayBetweenLines,
            ease: 'easeOut',
          }}
          className="text-white/80 text-lg leading-relaxed"
        >
          {line}
        </motion.p>
      ))}
    </div>
  )
}
