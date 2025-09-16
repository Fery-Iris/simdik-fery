"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Users, GraduationCap, Baby, School, Menu } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ThemeToggle } from "@/components/theme-toggle"

// Static data for services and time slots
const services = [
  {
    id: "ptk",
    name: "PTK (Pendidik dan Tenaga Kependidikan)",
    icon: Users,
    description: "Layanan untuk guru, kepala sekolah, dan tenaga kependidikan",
    color: "bg-blue-500",
  },
  {
    id: "sd",
    name: "SD Umum",
    icon: School,
    description: "Layanan untuk Sekolah Dasar",
    color: "bg-green-500",
  },
  {
    id: "smp",
    name: "SMP Umum",
    icon: GraduationCap,
    description: "Layanan untuk Sekolah Menengah Pertama",
    color: "bg-purple-500",
  },
  {
    id: "paud",
    name: "PAUD",
    icon: Baby,
    description: "Layanan untuk Pendidikan Anak Usia Dini",
    color: "bg-orange-500",
  },
]

const timeSlots = [
  { id: "08:00", time: "08:00 - 09:00", capacity: 10, booked: 3 },
  { id: "09:00", time: "09:00 - 10:00", capacity: 10, booked: 7 },
  { id: "10:00", time: "10:00 - 11:00", capacity: 10, booked: 2 },
  { id: "11:00", time: "11:00 - 12:00", capacity: 10, booked: 5 },
  { id: "13:00", time: "13:00 - 14:00", capacity: 10, booked: 1 },
  { id: "14:00", time: "14:00 - 15:00", capacity: 10, booked: 4 },
  { id: "15:00", time: "15:00 - 16:00", capacity: 10, booked: 8 },
]

interface ReservationData {
  service: string
  date: Date | undefined
  timeSlot: string
  name: string
  phone: string
  nik: string
  purpose: string
}

export default function ReservasiPage() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [reservationData, setReservationData] = useState<ReservationData>({
    service: "",
    date: undefined,
    timeSlot: "",
    name: "",
    phone: "",
    nik: "",
    purpose: "",
  })
  const [queueNumber, setQueueNumber] = useState<string>("")
  const [estimatedTime, setEstimatedTime] = useState<string>("")

  const handleServiceSelect = (serviceId: string) => {
    setReservationData({ ...reservationData, service: serviceId })
    setStep(2)
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && reservationData.timeSlot) {
      setReservationData({ ...reservationData, date: selectedDate })
      setStep(3)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate queue number (simple implementation)
    const queueNum = `${reservationData.service.toUpperCase()}-${Date.now().toString().slice(-6)}`
    const estimatedCallTime = new Date()
    estimatedCallTime.setHours(estimatedCallTime.getHours() + 2)

    setQueueNumber(queueNum)
    setEstimatedTime(format(estimatedCallTime, "HH:mm", { locale: id }))
    setStep(4)
  }

  const resetForm = () => {
    setStep(1)
    setSelectedDate(undefined)
    setReservationData({
      service: "",
      date: undefined,
      timeSlot: "",
      name: "",
      phone: "",
      nik: "",
      purpose: "",
    })
    setQueueNumber("")
    setEstimatedTime("")
  }

  const selectedService = services.find((s) => s.id === reservationData.service)
  const selectedTimeSlot = timeSlots.find((t) => t.id === reservationData.timeSlot)

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

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal animation="fade-up" delay={0}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sistem Reservasi Online</h1>
            <p className="text-blue-100 text-lg">Dinas Pendidikan Kota Banjarmasin - Mudah, Cepat, dan Terpercaya</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    step >= stepNum ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-500",
                  )}
                >
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div
                    className={cn(
                      "w-16 h-1 mx-2 transition-all duration-300",
                      step > stepNum ? "bg-blue-600" : "bg-gray-200",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <ScrollReveal animation="fade-up" delay={200}>
            <Card className="shadow-lg border-0 bg-card dark:bg-card">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40">
                <CardTitle className="text-center text-2xl text-blue-700 dark:text-blue-300">Pilih Layanan</CardTitle>
                <p className="text-center text-muted-foreground">Silakan pilih layanan yang Anda butuhkan</p>
              </CardHeader>
              <CardContent className="p-8 bg-card dark:bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => {
                    const Icon = service.icon
                    return (
                      <Card
                        key={service.id}
                        className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-400 group bg-card dark:bg-card"
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <CardContent className="p-6 text-center bg-card dark:bg-card">
                          <div
                            className={cn(
                              "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110",
                              service.color,
                            )}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-foreground">
                            {service.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        )}

        {/* Step 2: Date and Time Selection */}
        {step === 2 && (
          <ScrollReveal animation="fade-up" delay={200}>
            <Card className="shadow-lg border-0 bg-card dark:bg-card">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40">
                <CardTitle className="text-center text-2xl text-blue-700 dark:text-blue-300">
                  Pilih Tanggal & Waktu
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Layanan:{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedService?.name}</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-6 p-8 bg-card dark:bg-card">
                {/* Date Selection */}
                <div>
                  <Label className="text-base font-medium text-foreground">Pilih Tanggal</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2 h-12 bg-background dark:bg-background border-input dark:border-input",
                          !selectedDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: id }) : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover dark:bg-popover border-border dark:border-border">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Slot Selection */}
                {selectedDate && (
                  <div>
                    <Label className="text-base font-medium text-foreground">Pilih Waktu</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {timeSlots.map((slot) => {
                        const isAvailable = slot.booked < slot.capacity
                        const isSelected = reservationData.timeSlot === slot.id

                        return (
                          <Button
                            key={slot.id}
                            variant={isSelected ? "default" : "outline"}
                            disabled={!isAvailable}
                            className={cn(
                              "h-auto p-4 flex flex-col items-center transition-all duration-300",
                              isSelected && "bg-blue-600 hover:bg-blue-700 shadow-lg text-white",
                              !isAvailable && "opacity-50 cursor-not-allowed",
                              isAvailable &&
                                !isSelected &&
                                "hover:border-blue-400 hover:shadow-md bg-background dark:bg-background border-input dark:border-input text-foreground",
                            )}
                            onClick={() => setReservationData({ ...reservationData, timeSlot: slot.id })}
                          >
                            <Clock className="w-4 h-4 mb-1" />
                            <span className="text-sm font-medium">{slot.time}</span>
                            <span className="text-xs opacity-75">{slot.capacity - slot.booked} slot tersisa</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 bg-transparent">
                    Kembali
                  </Button>
                  <Button
                    onClick={handleDateTimeSelect}
                    disabled={!selectedDate || !reservationData.timeSlot}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    Lanjutkan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        )}

        {/* Step 3: Personal Information */}
        {step === 3 && (
          <ScrollReveal animation="fade-up" delay={200}>
            <Card className="shadow-lg border-0 bg-card dark:bg-card">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40">
                <CardTitle className="text-center text-2xl text-blue-700 dark:text-blue-300">Data Diri</CardTitle>
                <p className="text-center text-muted-foreground">Lengkapi data diri Anda untuk reservasi</p>
              </CardHeader>
              <CardContent className="p-8 bg-card dark:bg-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium text-foreground">
                        Nama Lengkap *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={reservationData.name}
                        onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                        placeholder="Masukkan nama lengkap"
                        className="mt-2 h-12 bg-background dark:bg-background border-input dark:border-input text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium text-foreground">
                        Nomor HP *
                      </Label>
                      <Input
                        id="phone"
                        required
                        value={reservationData.phone}
                        onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        className="mt-2 h-12 bg-background dark:bg-background border-input dark:border-input text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nik" className="text-base font-medium text-foreground">
                      NIK (Opsional)
                    </Label>
                    <Input
                      id="nik"
                      value={reservationData.nik}
                      onChange={(e) => setReservationData({ ...reservationData, nik: e.target.value })}
                      placeholder="Nomor Induk Kependudukan"
                      className="mt-2 h-12 bg-background dark:bg-background border-input dark:border-input text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="purpose" className="text-base font-medium text-foreground">
                      Tujuan Kunjungan *
                    </Label>
                    <Textarea
                      id="purpose"
                      required
                      value={reservationData.purpose}
                      onChange={(e) => setReservationData({ ...reservationData, purpose: e.target.value })}
                      placeholder="Jelaskan secara singkat tujuan kunjungan Anda"
                      rows={4}
                      className="mt-2 bg-background dark:bg-background border-input dark:border-input text-foreground"
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-6 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                    <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Ringkasan Reservasi:</h4>
                    <div className="text-sm space-y-2 text-foreground">
                      <p>
                        <span className="font-medium">Layanan:</span> {selectedService?.name}
                      </p>
                      <p>
                        <span className="font-medium">Tanggal:</span>{" "}
                        {selectedDate && format(selectedDate, "PPP", { locale: id })}
                      </p>
                      <p>
                        <span className="font-medium">Waktu:</span> {selectedTimeSlot?.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1 h-12 bg-transparent"
                    >
                      Kembali
                    </Button>
                    <Button type="submit" className="flex-1 h-12 bg-blue-600 hover:bg-blue-700">
                      Buat Reservasi
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <ScrollReveal animation="fade-up" delay={200}>
            <Card className="shadow-lg border-0 bg-card dark:bg-card">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40">
                <CardTitle className="text-center text-2xl text-green-600 dark:text-green-400">
                  Reservasi Berhasil!
                </CardTitle>
                <p className="text-center text-muted-foreground">Reservasi Anda telah dikonfirmasi</p>
              </CardHeader>
              <CardContent className="text-center space-y-6 p-8 bg-card dark:bg-card">
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-8 rounded-lg border border-green-200/50 dark:border-green-800/50">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{queueNumber}</div>
                  <p className="text-sm text-muted-foreground">Nomor Antrian Anda</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-6 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                  <h4 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">Detail Reservasi:</h4>
                  <div className="text-sm space-y-2 text-left text-foreground">
                    <p>
                      <span className="font-medium">Nama:</span> {reservationData.name}
                    </p>
                    <p>
                      <span className="font-medium">Layanan:</span> {selectedService?.name}
                    </p>
                    <p>
                      <span className="font-medium">Tanggal:</span>{" "}
                      {reservationData.date && format(reservationData.date, "PPP", { locale: id })}
                    </p>
                    <p>
                      <span className="font-medium">Waktu:</span> {selectedTimeSlot?.time}
                    </p>
                    <p>
                      <span className="font-medium">Estimasi Panggilan:</span> {estimatedTime}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50">
                  <p className="mb-2 font-medium text-yellow-700 dark:text-yellow-300">
                    <strong>Penting:</strong> Harap datang 15 menit sebelum waktu yang dijadwalkan.
                  </p>
                  <p className="text-foreground">Simpan nomor antrian ini untuk referensi Anda.</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={resetForm} className="flex-1 h-12 bg-transparent">
                    Buat Reservasi Baru
                  </Button>
                  <Link href="/reservasi/status" className="flex-1">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">Lihat Status Antrian</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}
