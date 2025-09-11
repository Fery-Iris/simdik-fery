"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "rotate"
  delay?: number
  duration?: number
  className?: string
  triggerOnce?: boolean
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 1200,
  className = "",
  triggerOnce = true,
}: ScrollRevealProps) {
  const [ref, isVisible] = useScrollAnimation({ triggerOnce })

  const getAnimationClass = () => {
    const baseClass = "transition-all"

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClass} opacity-0 translate-y-8`
        case "fade-down":
          return `${baseClass} opacity-0 -translate-y-8`
        case "fade-left":
          return `${baseClass} opacity-0 translate-x-8`
        case "fade-right":
          return `${baseClass} opacity-0 -translate-x-8`
        case "scale":
          return `${baseClass} opacity-0 scale-95`
        case "rotate":
          return `${baseClass} opacity-0 rotate-3 scale-95`
        default:
          return `${baseClass} opacity-0 translate-y-8`
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`
  }

  const transitionStyle = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  } as const

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${getAnimationClass()} ${className}`} style={transitionStyle}>
      {children}
    </div>
  )
}
