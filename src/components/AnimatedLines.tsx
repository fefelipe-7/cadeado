import { motion } from 'motion/react'
import { useEffect } from 'react'

interface AnimatedLinesProps {
  lines: string[]
  onAnimationComplete?: () => void
  delayBetweenLines?: number
  initialDelay?: number
}

export function AnimatedLines({
  lines,
  onAnimationComplete,
  delayBetweenLines = 0.5,
  initialDelay = 0.4,
}: AnimatedLinesProps) {

  useEffect(() => {
    const totalDuration =
      initialDelay + lines.length * delayBetweenLines + 1.0
    const timer = setTimeout(() => {
      onAnimationComplete?.()
    }, totalDuration * 1000)

    return () => clearTimeout(timer)
  }, [lines.length, delayBetweenLines, initialDelay, onAnimationComplete])

  return (
    <div className="space-y-6 text-center">
      {lines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            delay: initialDelay + index * delayBetweenLines,
            ease: 'easeOut',
          }}
          className="text-white/80 text-xl leading-relaxed font-light"
        >
          {line}
        </motion.p>
      ))}
    </div>
  )
}
