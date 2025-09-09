"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Mail, Phone, Calendar, Shield, Activity } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data - in real app, fetch from API
  const usersData = [
    {
      id: "USR-001",
      name: "Ahmad Fauzi",
      email: "ahmad.fauzi@disdik.banjarmasin.go.id",
      role: "Super Admin",
      status: "Aktif",
      lastLogin: "2024-01-15 09:30",
      phone: "0812-3456-7890",
      joinDate: "2023-01-15",
      avatar: "/avatars/ahmad.jpg",
      department: "IT & Sistem Informasi",
      permissions: ["Kelola Pengguna", "Kelola Sekolah", "Kelola Berita", "Kelola Laporan", "Pengaturan Sistem"],
      loginHistory: [
        { date: "2024-01-15", time: "09:30", ip: "192.168.1.100", device: "Chrome - Windows" },
        { date: "2024-01-14", time: "08:15", ip: "192.168.1.100", device: "Chrome - Windows" },
        { date: "2024-01-13", time: "10:45", ip: "192.168.1.100", device: "Chrome - Windows" },
      ],
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundUser = usersData.find((u) => u.id === params.id)
      setUser(foundUser)
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pengguna tidak ditemukan</h1>
          <Button onClick={() => router.back()}>Kembali</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <h1 className="text-3xl font-bold">Detail Pengguna</h1>
          </div>
          <Button onClick={() => router.push(`/admin/users/${user.id}/edit`)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Pengguna
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-2xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-muted-foreground">{user.department}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={user.role === "Super Admin" ? "default" : "secondary"}>{user.role}</Badge>
                      <Badge variant={user.status === "Aktif" ? "default" : "destructive"}>{user.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Telepon</label>
                    <p>{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bergabung Sejak</label>
                    <p>{new Date(user.joinDate).toLocaleDateString("id-ID")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Hak Akses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {user.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Hari Login Terakhir</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">365</p>
                    <p className="text-sm text-muted-foreground">Hari Bergabung</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Akun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID Pengguna</label>
                  <p className="font-mono">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Login Terakhir</label>
                  <p>{user.lastLogin}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status Akun</label>
                  <div className="mt-1">
                    <Badge variant={user.status === "Aktif" ? "default" : "destructive"}>{user.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Login History */}
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Login</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.loginHistory.map((login, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium">{login.date}</span>
                        <span className="text-xs text-muted-foreground">{login.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{login.device}</p>
                      <p className="text-xs text-muted-foreground">IP: {login.ip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
