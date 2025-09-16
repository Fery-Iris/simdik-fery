"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, CheckCircle, AlertCircle, School, Menu } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// Static data for queue status
const queueData = [
  {
    service: "PTK",
    serviceName: "PTK (Pendidik dan Tenaga Kependidikan)",
    currentNumber: "PTK-001234",
    totalQueue: 15,
    estimatedWait: "45 menit",
    status: "active",
    color: "bg-blue-500",
  },
  {
    service: "SD",
    serviceName: "SD Umum",
    currentNumber: "SD-001156",
    totalQueue: 8,
    estimatedWait: "25 menit",
    status: "active",
    color: "bg-green-500",
  },
  {
    service: "SMP",
    serviceName: "SMP Umum",
    currentNumber: "SMP-001089",
    totalQueue: 12,
    estimatedWait: "35 menit",
    status: "active",
    color: "bg-purple-500",
  },
  {
    service: "PAUD",
    serviceName: "PAUD",
    currentNumber: "PAUD-001067",
    totalQueue: 6,
    estimatedWait: "15 menit",
    status: "active",
    color: "bg-orange-500",
  },
]

const recentCalls = [
  { number: "PTK-001233", service: "PTK", time: "14:30", status: "completed" },
  { number: "SD-001155", service: "SD", time: "14:25", status: "completed" },
  { number: "SMP-001088", service: "SMP", time: "14:20", status: "completed" },
  { number: "PAUD-001066", service: "PAUD", time: "14:15", status: "completed" },
  { number: "PTK-001232", service: "PTK", time: "14:10", status: "completed" },
]

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <ScrollReveal animation="fade-right" delay={0} triggerOnce={false}>
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <School className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground transition-colors duration-300 hover:text-primary">
                  SIMDIK Kota Banjarmasin
                </span>
              </Link>
            </ScrollReveal>

            {/* Navigation */}
            <ScrollReveal animation="fade-left" delay={100} triggerOnce={false}>
              <nav className="hidden md:flex items-center space-x-8">
                {["Beranda", "Reservasi", "Tentang SIMDIK", "Direktori Sekolah", "Berita", "Agenda", "Kontak"].map(
                  (item, index) => (
                    <Link
                      key={item}
                      href={
                        item === "Reservasi"
                          ? "/reservasi"
                          : item === "Direktori Sekolah"
                            ? "/direktori-sekolah"
                            : item === "Tentang SIMDIK"
                              ? "/tentang-simdik"
                              : item === "Berita"
                                ? "/#berita"
                                : item === "Agenda"
                                  ? "/#agenda"
                                  : item === "Kontak"
                                    ? "/#kontak"
                                    : "/"
                      }
                      className={cn(
                        "text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group",
                        item === "Reservasi" && "text-blue-600",
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ),
                )}
              </nav>
            </ScrollReveal>

            {/* Mobile Menu Button */}
            <ScrollReveal animation="fade-left" delay={200} triggerOnce={false}>
              <button className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-accent">
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </ScrollReveal>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-float-strong blur-sm"></div>
          <div className="absolute bottom-10 right-20 w-16 h-16 bg-blue-500 rounded-full animate-float-delayed-strong blur-sm"></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-blue-300 rounded-full animate-float-strong blur-sm"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Status Antrian Real-time</h1>
                <p className="text-blue-100 text-lg">Dinas Pendidikan Kota Banjarmasin</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {currentTime.toLocaleTimeString("id-ID")}
                </div>
                <Link
                  href="/reservasi"
                  className="text-blue-100 hover:text-white transition-colors text-sm mt-2 inline-block"
                >
                  ← Buat Reservasi
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Current Queue Status */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-300">
              Nomor Sedang Dipanggil
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {queueData.map((queue) => (
                <Card
                  key={queue.service}
                  className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-400"
                >
                  <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40">
                    <div
                      className={`w-12 h-12 ${queue.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">{queue.service}</CardTitle>
                    <p className="text-sm text-muted-foreground">{queue.serviceName}</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-4 rounded-lg border border-green-200/50 dark:border-green-800/50">
                        <div className="text-2xl font-bold text-green-600">{queue.currentNumber}</div>
                        <p className="text-xs text-muted-foreground">Sedang Dipanggil</p>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Antrian:</span>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        >
                          {queue.totalQueue} orang
                        </Badge>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Tunggu:</span>
                        <span className="font-medium text-blue-600">{queue.estimatedWait}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Recent Calls */}
        <ScrollReveal animation="fade-up" delay={200}>
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40">
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Clock className="w-5 h-5" />
                Riwayat Panggilan Terakhir
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {recentCalls.map((call, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/40 dark:to-gray-800/40 rounded-lg hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">{call.number}</div>
                        <div className="text-sm text-muted-foreground">{call.service}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{call.time}</div>
                      <Badge
                        variant="outline"
                        className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-300"
                      >
                        Selesai
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Information */}
        <ScrollReveal animation="fade-up" delay={300}>
          <Card className="mt-8 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Informasi Penting:</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      Status antrian diperbarui secara real-time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      Harap datang 15 menit sebelum estimasi waktu panggilan
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      Jika melewati 3 panggilan, nomor antrian akan hangus
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      Untuk bantuan, hubungi petugas di loket informasi
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="flex gap-4 mt-8 justify-center">
            <Link href="/reservasi">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                Buat Reservasi Baru
              </Button>
            </Link>
            <Link href="/reservasi/kiosk">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/20 bg-transparent"
              >
                Walk-in (Kiosk)
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
