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
    const durationClass = `duration-[${duration}ms]`
    const delayClass = delay > 0 ? `delay-[${delay}ms]` : ""
    const easingClass = "ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-0 translate-y-8`
        case "fade-down":
          return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-0 -translate-y-8`
        case "fade-left":
          return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-0 translate-x-8`
        case "fade-right":
          return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-0 -translate-x-8`
        case "scale":
          return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-0 scale-95`
        case "rotate":
          return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-0 rotate-3 scale-95`
        default:
          return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-0 translate-y-8`
      }
    }

    return `${baseClass} ${durationClass} ${delayClass} ${easingClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  )
}
