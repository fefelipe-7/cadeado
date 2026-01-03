import { useEffect, useRef } from 'react'

export function BeamsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.001

      ctx.fillStyle = 'rgb(5, 5, 5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const beams = 5
      for (let i = 0; i < beams; i++) {
        const angle = (i / beams) * Math.PI * 2 + time * 0.3
        const x = canvas.width / 2 + Math.cos(angle) * 100
        const y = canvas.height / 2 + Math.sin(angle) * 100

        const gradient = ctx.createLinearGradient(
          canvas.width / 2,
          canvas.height / 2,
          x,
          y
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo(x, y)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
