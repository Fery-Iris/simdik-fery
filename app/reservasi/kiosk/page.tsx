"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, Baby, School, Printer, Monitor, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ThemeToggle } from "@/components/theme-toggle"

// Static data for services
const services = [
  {
    id: "ptk",
    name: "PTK",
    fullName: "Pendidik dan Tenaga Kependidikan",
    icon: Users,
    color: "bg-blue-500",
    currentQueue: 15,
    estimatedWait: "45 menit",
  },
  {
    id: "sd",
    name: "SD Umum",
    fullName: "Sekolah Dasar",
    icon: School,
    color: "bg-green-500",
    currentQueue: 8,
    estimatedWait: "25 menit",
  },
  {
    id: "smp",
    name: "SMP Umum",
    fullName: "Sekolah Menengah Pertama",
    icon: GraduationCap,
    color: "bg-purple-500",
    currentQueue: 12,
    estimatedWait: "35 menit",
  },
  {
    id: "paud",
    name: "PAUD",
    fullName: "Pendidikan Anak Usia Dini",
    icon: Baby,
    color: "bg-orange-500",
    currentQueue: 6,
    estimatedWait: "15 menit",
  },
]

export default function KioskPage() {
  const [selectedService, setSelectedService] = useState<string>("")
  const [queueNumber, setQueueNumber] = useState<string>("")
  const [estimatedTime, setEstimatedTime] = useState<string>("")
  const [showTicket, setShowTicket] = useState(false)

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      // Generate queue number
      const queueNum = `${service.name.toUpperCase()}-${Date.now().toString().slice(-6)}`
      const currentTime = new Date()
      const estimatedCallTime = new Date(currentTime.getTime() + service.currentQueue * 3 * 60000) // 3 minutes per person

      setSelectedService(serviceId)
      setQueueNumber(queueNum)
      setEstimatedTime(estimatedCallTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))
      setShowTicket(true)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const resetKiosk = () => {
    setSelectedService("")
    setQueueNumber("")
    setEstimatedTime("")
    setShowTicket(false)
  }

  if (showTicket) {
    const service = services.find((s) => s.id === selectedService)

    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-all duration-300 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
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

              <ScrollReveal animation="fade-left" delay={200} triggerOnce={false}>
                <button className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-accent">
                  <Menu className="w-6 h-6 text-foreground" />
                </button>
              </ScrollReveal>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <ScrollReveal animation="fade-up">
            <Card className="text-center shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40">
                <CardTitle className="text-green-600 text-3xl">Nomor Antrian Anda</CardTitle>
                <p className="text-muted-foreground">Tiket berhasil dikeluarkan</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                {/* Ticket Display */}
                <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 rounded-lg print:border-black print:shadow-none shadow-inner">
                  <div className="text-center space-y-4">
                    <div className="text-sm text-muted-foreground font-medium">DINAS PENDIDIKAN KOTA BANJARMASIN</div>

                    <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6">
                      <div className="text-5xl font-bold text-blue-600 mb-3">{queueNumber}</div>
                      <div className="text-xl font-medium text-blue-700 dark:text-blue-300">{service?.fullName}</div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-medium">Tanggal:</span>
                        <span>{new Date().toLocaleDateString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-medium">Waktu Ambil:</span>
                        <span>{new Date().toLocaleTimeString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-medium">Est. Panggilan:</span>
                        <span className="font-bold text-blue-600">{estimatedTime}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="font-medium">Antrian Sebelum Anda:</span>
                        <span className="font-bold">{service?.currentQueue} orang</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground border-t pt-4 space-y-1">
                      <p className="font-medium">Harap simpan tiket ini dan datang sesuai estimasi waktu.</p>
                      <p>Jika melewati 3 panggilan, nomor antrian akan hangus.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 print:hidden">
                  <Button onClick={handlePrint} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700" size="lg">
                    <Printer className="w-5 h-5 mr-2" />
                    Cetak Tiket
                  </Button>
                  <Button
                    onClick={resetKiosk}
                    variant="outline"
                    className="flex-1 h-12 border-blue-200 hover:border-blue-400 bg-transparent"
                    size="lg"
                  >
                    Ambil Nomor Lain
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground print:hidden bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <p>Tiket akan otomatis tercetak atau dapat dilihat di layar kiosk</p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Kiosk Walk-in</h1>
                <p className="text-blue-100 text-lg">Ambil Nomor Antrian Langsung</p>
              </div>
              <div className="flex items-center gap-4">
                <Monitor className="w-10 h-10" />
                <div className="text-right">
                  <div className="text-sm text-blue-100">Waktu Sekarang</div>
                  <div className="text-xl font-mono bg-white/10 px-3 py-1 rounded backdrop-blur-sm">
                    {new Date().toLocaleTimeString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300">Pilih Layanan</h2>
            <p className="text-muted-foreground text-lg">
              Sentuh layanan yang Anda butuhkan untuk mengambil nomor antrian
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <ScrollReveal key={service.id} animation="fade-up" delay={200}>
                <Card
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-400 h-full group"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 shadow-lg",
                        service.color,
                      )}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="font-bold text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground mb-6">{service.fullName}</p>

                    <div className="space-y-3 text-sm">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/40 dark:to-gray-800/40 p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Antrian Saat Ini:</span>
                          <span className="font-bold text-xl text-blue-600">{service.currentQueue}</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Estimasi Tunggu:</span>
                          <span className="font-bold text-blue-600">{service.estimatedWait}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 h-12" size="lg">
                      Ambil Nomor Antrian
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mt-8 text-center">
            <Link href="/reservasi/status">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/20 bg-transparent"
              >
                <Monitor className="w-5 h-5 mr-2" />
                Lihat Status Antrian
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Instructions */}
        <ScrollReveal animation="fade-up" delay={500}>
          <Card className="mt-8 shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40">
              <CardTitle className="text-blue-700 dark:text-blue-300">Petunjuk Penggunaan:</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p>Pilih layanan yang Anda butuhkan</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p>Ambil tiket nomor antrian</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p>Tunggu panggilan sesuai nomor</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p>Datang ke loket saat dipanggil</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p>Tunjukkan tiket kepada petugas</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <p>Selesaikan urusan Anda</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}
