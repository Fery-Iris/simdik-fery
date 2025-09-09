"use client"

import { useState, useEffect } from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

const predefinedColors = [
  { name: "Merah", hue: 0, saturation: 0.8, lightness: 0.5 },
  { name: "Biru", hue: 240, saturation: 0.8, lightness: 0.5 },
  { name: "Hijau", hue: 120, saturation: 0.8, lightness: 0.4 },
  { name: "Ungu", hue: 280, saturation: 0.8, lightness: 0.5 },
  { name: "Orange", hue: 30, saturation: 0.9, lightness: 0.5 },
  { name: "Pink", hue: 320, saturation: 0.7, lightness: 0.6 },
  { name: "Kuning", hue: 60, saturation: 100, lightness: 100 },
  { name: "Cyan", hue: 180, saturation: 0.8, lightness: 0.5 },
  { name: "Abu-abu", hue: 0, saturation: 0, lightness: 0.4 },
]

export function ColorPicker() {
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [lightness, setLightness] = useState(0.4)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved color from localStorage
    const savedColor = localStorage.getItem("custom-color")
    if (savedColor) {
      const { h, s, l } = JSON.parse(savedColor)
      setHue(h)
      setSaturation(s)
      setLightness(l)
      applyCustomColor(h, s, l)
    }
  }, [])

  const applyCustomColor = (h: number, s: number, l: number) => {
    document.documentElement.style.setProperty("--custom-primary-hue", h.toString())
    document.documentElement.style.setProperty("--custom-primary-saturation", s.toString())
    document.documentElement.style.setProperty("--custom-primary-lightness", l.toString())
    document.documentElement.classList.add("custom-theme")

    // Save to localStorage
    localStorage.setItem("custom-color", JSON.stringify({ h, s, l }))
  }

  const resetToDefault = () => {
    setHue(0)
    setSaturation(0)
    setLightness(0.4)
    document.documentElement.classList.remove("custom-theme")
    localStorage.removeItem("custom-color")
  }

  const selectPredefinedColor = (color: (typeof predefinedColors)[0]) => {
    setHue(color.hue)
    setSaturation(color.saturation)
    setLightness(color.lightness)
    applyCustomColor(color.hue, color.saturation, color.lightness)
  }

  const handleCustomColorChange = () => {
    applyCustomColor(hue, saturation, lightness)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Pilih Warna</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pilih Warna Tema</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Predefined Colors */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Warna Populer</Label>
            <div className="grid grid-cols-3 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => selectPredefinedColor(color)}
                  className="flex flex-col items-center p-3 rounded-lg border hover:bg-muted transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full mb-1"
                    style={{
                      backgroundColor: `oklch(${color.lightness} ${color.saturation} ${color.hue})`,
                    }}
                  />
                  <span className="text-xs">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Sliders */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Warna Kustom</Label>

            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Hue (Warna): {hue}°</Label>
                <Slider
                  value={[hue]}
                  onValueChange={(value) => setHue(value[0])}
                  onValueCommit={handleCustomColorChange}
                  max={360}
                  step={1}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Saturation (Kejenuhan): {Math.round(saturation * 100)}%
                </Label>
                <Slider
                  value={[saturation]}
                  onValueChange={(value) => setSaturation(value[0])}
                  onValueCommit={handleCustomColorChange}
                  max={1}
                  step={0.01}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Lightness (Kecerahan): {Math.round(lightness * 100)}%
                </Label>
                <Slider
                  value={[lightness]}
                  onValueChange={(value) => setLightness(value[0])}
                  onValueCommit={handleCustomColorChange}
                  max={1}
                  step={0.01}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Color Preview */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg border"
                style={{
                  backgroundColor: `oklch(${lightness} ${saturation} ${hue})`,
                }}
              />
              <div className="text-sm">
                <div className="font-medium">Preview Warna</div>
                <div className="text-muted-foreground text-xs">
                  oklch({lightness.toFixed(2)} {saturation.toFixed(2)} {hue})
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <Button onClick={resetToDefault} variant="outline" className="w-full bg-transparent">
            Reset ke Default
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
