"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  School,
  Users,
  FileText,
  Inbox,
  Settings,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  UserCheck,
  Shield,
  LogOut,
  Bell,
  ChevronDown,
  Home,
  Newspaper,
  Database,
  Save,
} from "lucide-react"
import { CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAddSchoolOpen, setIsAddSchoolOpen] = useState(false)
  const [isEditSchoolOpen, setIsEditSchoolOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState(null)
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false)
  const [isEditNewsOpen, setIsEditNewsOpen] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const [isAddAgendaOpen, setIsAddAgendaOpen] = useState(false)
  const [isEditAgendaOpen, setIsEditAgendaOpen] = useState(false)
  const [editingAgenda, setEditingAgenda] = useState(null)

  const [schoolsData, setSchoolsData] = useState([
    {
      id: "SCH-001",
      name: "SDN Sungai Miai 5",
      npsn: "30200001",
      address: "Jl. Sungai Miai No. 15, Banjarmasin Utara",
      principal: "Dra. Siti Aminah",
      phone: "0511-3256789",
      email: "sdn.sungaimiai5@gmail.com",
      status: "Aktif",
      accreditation: "A",
      studentCount: 245,
      teacherCount: 18,
    },
    {
      id: "SCH-002",
      name: "SMPN 1 Banjarmasin",
      npsn: "30200002",
      address: "Jl. Lambung Mangkurat No. 1, Banjarmasin Tengah",
      principal: "Drs. Ahmad Fauzi, M.Pd",
      phone: "0511-3354321",
      email: "smpn1bjm@gmail.com",
      status: "Aktif",
      accreditation: "A",
      studentCount: 680,
      teacherCount: 45,
    },
    {
      id: "SCH-003",
      name: "SMAN 3 Banjarmasin",
      npsn: "30200003",
      address: "Jl. Mistar Cokrokusumo No. 1A, Banjarmasin Barat",
      principal: "Dr. Budi Santoso, S.Pd, M.M",
      phone: "0511-3267890",
      email: "sman3bjm@gmail.com",
      status: "Aktif",
      accreditation: "A",
      studentCount: 920,
      teacherCount: 62,
    },
    {
      id: "SCH-004",
      name: "SDN Kelayan Tengah 2",
      npsn: "30200004",
      address: "Jl. Kelayan Tengah No. 8, Banjarmasin Selatan",
      principal: "Hj. Nurlaila, S.Pd",
      phone: "0511-3445678",
      email: "sdn.kelayantengah2@gmail.com",
      status: "Nonaktif",
      accreditation: "B",
      studentCount: 180,
      teacherCount: 12,
    },
  ])

  const [newsData, setNewsData] = useState([
    {
      id: "NEWS-001",
      title: "Pembukaan Tahun Ajaran Baru 2024/2025",
      content:
        "Dinas Pendidikan Kota Banjarmasin mengumumkan pembukaan tahun ajaran baru 2024/2025 yang akan dimulai pada tanggal 15 Juli 2024. Seluruh sekolah di wilayah Banjarmasin diharapkan sudah siap menyambut siswa baru.",
      author: "Admin SIMDIK",
      category: "Pengumuman",
      status: "Published",
      publishDate: "2024-07-01",
      views: 1250,
      featured: true,
    },
    {
      id: "NEWS-002",
      title: "Workshop Peningkatan Kompetensi Guru",
      content:
        "Akan dilaksanakan workshop peningkatan kompetensi guru se-Kota Banjarmasin pada tanggal 20-22 Juli 2024 di Gedung Dinas Pendidikan. Workshop ini bertujuan untuk meningkatkan kualitas pembelajaran.",
      author: "Tim Pengembangan",
      category: "Kegiatan",
      status: "Published",
      publishDate: "2024-06-28",
      views: 890,
      featured: false,
    },
    {
      id: "NEWS-003",
      title: "Penerimaan Peserta Didik Baru (PPDB) 2024",
      content:
        "Informasi lengkap mengenai PPDB 2024 untuk jenjang SD, SMP, dan SMA di Kota Banjarmasin. Pendaftaran dibuka mulai 1 Juni hingga 15 Juni 2024 melalui sistem online.",
      author: "Panitia PPDB",
      category: "Pendaftaran",
      status: "Draft",
      publishDate: "2024-05-25",
      views: 2100,
      featured: true,
    },
    {
      id: "NEWS-004",
      title: "Bantuan Operasional Sekolah (BOS) Tahap II",
      content:
        "Pencairan dana BOS tahap II untuk semester genap tahun 2024 telah dimulai. Sekolah dapat mengajukan pencairan melalui sistem SIMDIK dengan melengkapi dokumen yang diperlukan.",
      author: "Bagian Keuangan",
      category: "Keuangan",
      status: "Published",
      publishDate: "2024-06-15",
      views: 756,
      featured: false,
    },
  ])

  const [reportsData, setReportsData] = useState([
    {
      id: "RPT-001",
      title: "Kerusakan Atap Ruang Kelas",
      reporter: "Ahmad Fauzi",
      school: "SDN Sungai Miai 5",
      category: "Fasilitas",
      priority: "Tinggi",
      description: "Atap ruang kelas 3A bocor saat hujan, mengganggu proses pembelajaran",
      reportDate: "2024-01-15",
      status: "Baru",
      statusColor: "bg-blue-100 text-blue-800",
      contact: "081234567890",
      evidence: "foto_atap_bocor.jpg",
    },
    {
      id: "RPT-002",
      title: "Kekurangan Buku Pelajaran",
      reporter: "Siti Nurhaliza",
      school: "SMPN 1 Banjarmasin",
      category: "Kurikulum",
      priority: "Sedang",
      description: "Kekurangan buku pelajaran Matematika untuk kelas 8, hanya tersedia 20 dari 35 yang dibutuhkan",
      reportDate: "2024-01-12",
      status: "Diproses",
      statusColor: "bg-yellow-100 text-yellow-800",
      contact: "081345678901",
      evidence: "daftar_buku.pdf",
    },
    {
      id: "RPT-003",
      title: "Guru Honorer Belum Menerima Gaji",
      reporter: "Budi Santoso",
      school: "SMAN 3 Banjarmasin",
      category: "Tenaga Pengajar",
      priority: "Tinggi",
      description: "3 guru honorer belum menerima gaji bulan Desember 2023",
      reportDate: "2024-01-10",
      status: "Selesai",
      statusColor: "bg-green-100 text-green-800",
      contact: "081456789012",
      evidence: "slip_gaji.pdf",
    },
    {
      id: "RPT-004",
      title: "Masalah Sistem Absensi Online",
      reporter: "Maya Sari",
      school: "SDN Kelayan Tengah 2",
      category: "Administrasi",
      priority: "Sedang",
      description: "Sistem absensi online sering error dan tidak dapat menyimpan data kehadiran siswa",
      reportDate: "2024-01-08",
      status: "Baru",
      statusColor: "bg-blue-100 text-blue-800",
      contact: "081567890123",
      evidence: "screenshot_error.png",
    },
    {
      id: "RPT-005",
      title: "Toilet Siswa Rusak",
      reporter: "Rizki Pratama",
      school: "SDN Sungai Miai 5",
      category: "Fasilitas",
      priority: "Tinggi",
      description: "2 dari 4 toilet siswa rusak dan tidak dapat digunakan",
      reportDate: "2024-01-05",
      status: "Ditolak",
      statusColor: "bg-red-100 text-red-800",
      contact: "081678901234",
      evidence: "foto_toilet.jpg",
    },
    {
      id: "RPT-006",
      title: "Permintaan Pelatihan Guru IT",
      reporter: "Dewi Lestari",
      school: "SMPN 1 Banjarmasin",
      category: "Pengembangan",
      priority: "Rendah",
      description: "Permintaan pelatihan untuk guru dalam penggunaan teknologi pembelajaran digital",
      reportDate: "2024-01-03",
      status: "Diproses",
      statusColor: "bg-yellow-100 text-yellow-800",
      contact: "081789012345",
      evidence: "proposal_pelatihan.pdf",
    },
  ])

  const usersData = [
    {
      id: 1,
      name: "Dr. Ahmad Fauzi",
      email: "ahmad.fauzi@simdik.banjarmasin.go.id",
      role: "Super Admin",
      status: "Aktif",
      lastLogin: "2024-01-15 09:30",
      createdAt: "2023-06-01",
    },
    {
      id: 2,
      name: "Siti Nurhaliza, S.Pd",
      email: "siti.nurhaliza@simdik.banjarmasin.go.id",
      role: "Admin Sekolah",
      status: "Aktif",
      lastLogin: "2024-01-14 16:45",
      createdAt: "2023-08-15",
    },
    {
      id: 3,
      name: "Muhammad Rizki",
      email: "muhammad.rizki@simdik.banjarmasin.go.id",
      role: "Operator",
      status: "Tidak Aktif",
      lastLogin: "2024-01-10 11:20",
      createdAt: "2023-09-20",
    },
    {
      id: 4,
      name: "Fatimah Azzahra, M.Pd",
      email: "fatimah.azzahra@simdik.banjarmasin.go.id",
      role: "Admin Berita",
      status: "Aktif",
      lastLogin: "2024-01-15 08:15",
      createdAt: "2023-07-10",
    },
    {
      id: 5,
      name: "Bayu Setiawan",
      email: "bayu.setiawan@simdik.banjarmasin.go.id",
      role: "Viewer",
      status: "Aktif",
      lastLogin: "2024-01-13 14:30",
      createdAt: "2023-10-05",
    },
  ]

  const settingsData = {
    general: {
      siteName: "SIMDIK Banjarmasin",
      siteDescription: "Sistem Informasi Manajemen Data dan Informasi Kependidikan Kota Banjarmasin",
      contactEmail: "info@simdik.banjarmasin.go.id",
      contactPhone: "(0511) 3252732",
      address: "Jl. Sultan Adam No. 18, Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70111",
      timezone: "Asia/Makassar",
      language: "id",
    },
    security: {
      passwordMinLength: 8,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: false,
      passwordExpiry: 90,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      reportAlerts: true,
      systemMaintenance: true,
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      retentionPeriod: 30,
      lastBackup: "2024-01-15 02:00:00",
    },
  }

  const [showUserForm, setShowUserForm] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Aktif",
  })

  const handleAddUser = () => {
    setEditingUser(null)
    setUserFormData({ name: "", email: "", role: "", status: "Aktif" })
    setShowUserForm(true)
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setShowUserForm(true)
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      console.log("Deleting user:", userId)
    }
  }

  const handleSaveUser = () => {
    console.log("Saving user:", userFormData)
    setShowUserForm(false)
  }

  const [settingsForm, setSettingsForm] = useState(settingsData)
  const [activeSettingsTab, setActiveSettingsTab] = useState("general")

  const handleSettingsChange = (section: string, field: string, value: any) => {
    setSettingsForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", settingsForm)
    alert("Pengaturan berhasil disimpan!")
  }

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/admin", active: activeTab === "dashboard" },
    { icon: School, label: "Manajemen Sekolah", href: "/admin/schools", active: activeTab === "schools" },
    { icon: Newspaper, label: "Manajemen Berita", href: "/admin/news", active: activeTab === "news" },
    { icon: Clock, label: "Manajemen Agenda", href: "/admin/agenda", active: activeTab === "agenda" },
    { icon: Inbox, label: "Laporan Masuk", href: "/admin/reports", active: activeTab === "reports" },
    { icon: Users, label: "Pengguna", href: "/admin/users" },
    { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
  ]

  const statsData = [
    {
      title: "Total Sekolah",
      value: schoolsData.length.toString(),
      icon: School,
      color: "blue",
      bgColor: "bg-blue-100",
    },
    {
      title: "Sekolah Aktif",
      value: schoolsData.filter((s) => s.status === "Aktif").length.toString(),
      icon: CheckCircle,
      color: "green",
      bgColor: "bg-green-100",
    },
    {
      title: "Akreditasi A",
      value: schoolsData.filter((s) => s.accreditation === "A").length.toString(),
      icon: FileText,
      color: "yellow",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Perlu Review",
      value: schoolsData.filter((s) => s.status === "Nonaktif").length.toString(),
      icon: AlertCircle,
      color: "red",
      bgColor: "bg-red-100",
    },
  ]

  const handleAddSchool = (formData) => {
    const newSchool = {
      id: `SCH-${String(schoolsData.length + 1).padStart(3, "0")}`,
      ...formData,
    }
    setSchoolsData([...schoolsData, newSchool])
    setIsAddSchoolOpen(false)
  }

  const handleEditSchool = (school) => {
    setEditingSchool(school)
    setIsEditSchoolOpen(true)
  }

  const handleUpdateSchool = (formData) => {
    setSchoolsData(schoolsData.map((school) => (school.id === editingSchool.id ? { ...school, ...formData } : school)))
    setIsEditSchoolOpen(false)
    setEditingSchool(null)
  }

  const handleDeleteSchool = (schoolId) => {
    setSchoolsData(schoolsData.filter((school) => school.id !== schoolId))
  }

  const handleAddNews = (formData) => {
    const newNews = {
      id: `NEWS-${String(newsData.length + 1).padStart(3, "0")}`,
      views: 0,
      ...formData,
    }
    setNewsData([...newsData, newNews])
    setIsAddNewsOpen(false)
  }

  const handleEditNews = (news) => {
    setEditingNews(news)
    setIsEditNewsOpen(true)
  }

  const handleUpdateNews = (formData) => {
    setNewsData(newsData.map((news) => (news.id === editingNews.id ? { ...news, ...formData } : news)))
    setIsEditNewsOpen(false)
    setEditingNews(null)
  }

  const handleDeleteNews = (newsId) => {
    setNewsData(newsData.filter((news) => news.id !== newsId))
  }

  const [agendasData, setAgendasData] = useState([
    {
      id: "AGD-001",
      title: "Rapat Koordinasi Kepala Sekolah",
      description: "Rapat koordinasi bulanan dengan seluruh kepala sekolah se-Kota Banjarmasin",
      date: "2024-01-15",
      time: "09:00",
      location: "Aula Dinas Pendidikan",
      status: "Terjadwal",
      category: "Rapat",
      participants: "Kepala Sekolah",
    },
    {
      id: "AGD-002",
      title: "Workshop Kurikulum Merdeka",
      description: "Pelatihan implementasi kurikulum merdeka untuk guru-guru",
      date: "2024-01-20",
      time: "08:00",
      location: "SMAN 1 Banjarmasin",
      status: "Berlangsung",
      category: "Pelatihan",
      participants: "Guru",
    },
    {
      id: "AGD-003",
      title: "Monitoring Sekolah Zona 1",
      description: "Kunjungan monitoring dan evaluasi sekolah-sekolah zona 1",
      date: "2024-01-10",
      time: "10:00",
      location: "Sekolah Zona 1",
      status: "Selesai",
      category: "Monitoring",
      participants: "Tim Monitoring",
    },
  ])

  const handleAddAgenda = (formData) => {
    const newAgenda = {
      id: `AGD-${String(agendasData.length + 1).padStart(3, "0")}`,
      ...formData,
    }
    setAgendasData([...agendasData, newAgenda])
    setIsAddAgendaOpen(false)
  }

  const handleEditAgenda = (agenda) => {
    setEditingAgenda(agenda)
    setIsEditAgendaOpen(true)
  }

  const handleUpdateAgenda = (formData) => {
    setAgendasData(agendasData.map((agenda) => (agenda.id === editingAgenda.id ? { ...agenda, ...formData } : agenda)))
    setIsEditAgendaOpen(false)
    setEditingAgenda(null)
  }

  const handleDeleteAgenda = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus agenda ini?")) {
      setAgendasData(agendasData.filter((agenda) => agenda.id !== id))
    }
  }

  const SchoolForm = ({ school, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: school?.name || "",
      npsn: school?.npsn || "",
      address: school?.address || "",
      principal: school?.principal || "",
      phone: school?.phone || "",
      email: school?.email || "",
      status: school?.status || "Aktif",
      accreditation: school?.accreditation || "A",
      studentCount: school?.studentCount || 0,
      teacherCount: school?.teacherCount || 0,
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Nama Sekolah
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="npsn" className="text-foreground">
              NPSN
            </Label>
            <Input
              id="npsn"
              value={formData.npsn}
              onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-foreground">
            Alamat
          </Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300 min-h-[80px]"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="principal" className="text-foreground">
              Kepala Sekolah
            </Label>
            <Input
              id="principal"
              value={formData.principal}
              onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              Telepon
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-foreground">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="Aktif" className="hover:bg-accent hover:text-accent-foreground">
                  Aktif
                </SelectItem>
                <SelectItem value="Nonaktif" className="hover:bg-accent hover:text-accent-foreground">
                  Nonaktif
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="accreditation" className="text-foreground">
              Akreditasi
            </Label>
            <Select
              value={formData.accreditation}
              onValueChange={(value) => setFormData({ ...formData, accreditation: value })}
            >
              <SelectTrigger className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="A" className="hover:bg-accent hover:text-accent-foreground">
                  A
                </SelectItem>
                <SelectItem value="B" className="hover:bg-accent hover:text-accent-foreground">
                  B
                </SelectItem>
                <SelectItem value="C" className="hover:bg-accent hover:text-accent-foreground">
                  C
                </SelectItem>
                <SelectItem value="Belum Terakreditasi" className="hover:bg-accent hover:text-accent-foreground">
                  Belum Terakreditasi
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studentCount" className="text-foreground">
              Jumlah Siswa
            </Label>
            <Input
              id="studentCount"
              type="number"
              value={formData.studentCount}
              onChange={(e) => setFormData({ ...formData, studentCount: Number.parseInt(e.target.value) || 0 })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacherCount" className="text-foreground">
              Jumlah Guru
            </Label>
            <Input
              id="teacherCount"
              type="number"
              value={formData.teacherCount}
              onChange={(e) => setFormData({ ...formData, teacherCount: Number.parseInt(e.target.value) || 0 })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        <DialogFooter className="gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
          >
            Batal
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
            {school ? "Update" : "Tambah"} Sekolah
          </Button>
        </DialogFooter>
      </form>
    )
  }

  const NewsForm = ({ news, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      title: news?.title || "",
      content: news?.content || "",
      author: news?.author || "",
      category: news?.category || "Pengumuman",
      status: news?.status || "Draft",
      publishDate: news?.publishDate || new Date().toISOString().split("T")[0],
      featured: news?.featured || false,
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-foreground">
            Judul Berita
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-foreground">
            Konten Berita
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300 min-h-[120px]"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author" className="text-foreground">
              Penulis
            </Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">
              Kategori
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="Pengumuman" className="hover:bg-accent hover:text-accent-foreground">
                  Pengumuman
                </SelectItem>
                <SelectItem value="Kegiatan" className="hover:bg-accent hover:text-accent-foreground">
                  Kegiatan
                </SelectItem>
                <SelectItem value="Pendaftaran" className="hover:bg-accent hover:text-accent-foreground">
                  Pendaftaran
                </SelectItem>
                <SelectItem value="Keuangan" className="hover:bg-accent hover:text-accent-foreground">
                  Keuangan
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-foreground">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="Draft" className="hover:bg-accent hover:text-accent-foreground">
                  Draft
                </SelectItem>
                <SelectItem value="Published" className="hover:bg-accent hover:text-accent-foreground">
                  Published
                </SelectItem>
                <SelectItem value="Archived" className="hover:bg-accent hover:text-accent-foreground">
                  Archived
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="publishDate" className="text-foreground">
              Tanggal Publikasi
            </Label>
            <Input
              id="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 text-blue-600 bg-background border-input rounded focus:ring-blue-500 focus:ring-2 transition-all duration-300"
          />
          <Label htmlFor="featured" className="text-foreground cursor-pointer">
            Jadikan berita unggulan
          </Label>
        </div>

        <DialogFooter className="gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
          >
            Batal
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
            {news ? "Update" : "Tambah"} Berita
          </Button>
        </DialogFooter>
      </form>
    )
  }

  const router = useRouter()

  return (
    <div className="flex h-screen bg-background">
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-64"
        } flex flex-col fixed lg:relative z-50 h-full ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="lg:hidden absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && <span className="text-xl font-bold">SIMDIK Admin</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      setActiveTab(
                        item.label === "Dashboard"
                          ? "dashboard"
                          : item.label === "Manajemen Sekolah"
                            ? "schools"
                            : item.label === "Manajemen Berita"
                              ? "news"
                              : item.label === "Manajemen Agenda"
                                ? "agenda"
                                : item.label === "Laporan Masuk"
                                  ? "reports"
                                  : item.label === "Pengguna"
                                    ? "users"
                                    : item.label === "Pengaturan"
                                      ? "settings"
                                      : "dashboard",
                      )
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      item.active
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-105 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex hover:bg-accent hover:scale-105 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-foreground">
                  {activeTab === "dashboard"
                    ? "Dashboard"
                    : activeTab === "schools"
                      ? "Manajemen Sekolah"
                      : activeTab === "news"
                        ? "Manajemen Berita"
                        : activeTab === "agenda"
                          ? "Manajemen Agenda"
                          : activeTab === "reports"
                            ? "Laporan Masuk"
                            : activeTab === "users"
                              ? "Manajemen Pengguna"
                              : "Pengaturan"}
                </h2>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {activeTab === "dashboard"
                    ? "Ringkasan data dan statistik sistem"
                    : activeTab === "schools"
                      ? "Kelola data sekolah dan informasi terkait"
                      : activeTab === "news"
                        ? "Kelola berita dan pengumuman"
                        : activeTab === "agenda"
                          ? "Kelola agenda dan kegiatan"
                          : activeTab === "reports"
                            ? "Kelola laporan masuk dari sekolah"
                            : activeTab === "users"
                              ? "Kelola pengguna dan hak akses"
                              : "Konfigurasi sistem"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button variant="ghost" size="sm" className="hover:bg-accent hover:scale-105 transition-all duration-200">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent hover:scale-105 transition-all duration-200">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs lg:text-sm font-medium text-white">A</span>
                </div>
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {activeTab === "reports" && (
            <>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Laporan Masuk</h1>
                  <p className="text-muted-foreground mt-2">Kelola dan tindak lanjuti laporan dari sekolah-sekolah</p>
                </div>
              </div>

              {/* Filter and Search */}
              <Card className="mb-6 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Cari laporan berdasarkan judul, pelapor, atau sekolah..."
                        className="w-full hover:border-primary/50 transition-colors duration-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Select>
                        <SelectTrigger className="hover:border-primary/50 transition-colors duration-200">
                          <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Status</SelectItem>
                          <SelectItem value="baru">Baru</SelectItem>
                          <SelectItem value="diproses">Diproses</SelectItem>
                          <SelectItem value="selesai">Selesai</SelectItem>
                          <SelectItem value="ditolak">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="hover:border-primary/50 transition-colors duration-200">
                          <SelectValue placeholder="Filter Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Kategori</SelectItem>
                          <SelectItem value="fasilitas">Fasilitas</SelectItem>
                          <SelectItem value="kurikulum">Kurikulum</SelectItem>
                          <SelectItem value="tenaga-pengajar">Tenaga Pengajar</SelectItem>
                          <SelectItem value="administrasi">Administrasi</SelectItem>
                          <SelectItem value="pengembangan">Pengembangan</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="hover:border-primary/50 transition-colors duration-200">
                          <SelectValue placeholder="Filter Prioritas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Prioritas</SelectItem>
                          <SelectItem value="tinggi">Tinggi</SelectItem>
                          <SelectItem value="sedang">Sedang</SelectItem>
                          <SelectItem value="rendah">Rendah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reports Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Laporan</p>
                        <p className="text-xl lg:text-2xl font-bold text-foreground">{reportsData.length}</p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Inbox className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Laporan Baru</p>
                        <p className="text-xl lg:text-2xl font-bold text-foreground">
                          {reportsData.filter((r) => r.status === "Baru").length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Sedang Diproses</p>
                        <p className="text-xl lg:text-2xl font-bold text-foreground">
                          {reportsData.filter((r) => r.status === "Diproses").length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Selesai</p>
                        <p className="text-xl lg:text-2xl font-bold text-foreground">
                          {reportsData.filter((r) => r.status === "Selesai").length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <CardTitle>Daftar Laporan</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-accent hover:scale-105 transition-all duration-200 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">Judul Laporan</TableHead>
                          <TableHead className="min-w-[150px]">Pelapor</TableHead>
                          <TableHead className="min-w-[150px]">Sekolah</TableHead>
                          <TableHead className="min-w-[120px]">Kategori</TableHead>
                          <TableHead className="min-w-[100px]">Status</TableHead>
                          <TableHead className="min-w-[100px]">Prioritas</TableHead>
                          <TableHead className="min-w-[120px]">Tanggal</TableHead>
                          <TableHead className="min-w-[100px]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportsData.map((report) => (
                          <TableRow key={report.id} className="hover:bg-muted/50 transition-colors duration-200">
                            <TableCell className="font-medium">{report.title}</TableCell>
                            <TableCell>{report.reporter}</TableCell>
                            <TableCell>{report.school}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="hover:bg-accent transition-colors duration-200">
                                {report.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  report.status === "Baru"
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : report.status === "Diproses"
                                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                                      : report.status === "Selesai"
                                        ? "bg-green-600 text-white hover:bg-green-700"
                                        : "bg-red-600 text-white hover:bg-red-700"
                                }
                              >
                                {report.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  report.priority === "Tinggi"
                                    ? "destructive"
                                    : report.priority === "Sedang"
                                      ? "default"
                                      : "secondary"
                                }
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                {report.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>{report.reportDate}</TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="hover:bg-accent hover:scale-110 transition-all duration-200"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="hover:bg-accent hover:scale-110 transition-all duration-200"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="hover:bg-destructive hover:text-destructive-foreground hover:scale-110 transition-all duration-200"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "dashboard" && (
            <>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
                  <p className="text-muted-foreground mt-2">Ringkasan data dan statistik sistem pendidikan</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="hover:scale-105 transition-all duration-200">
                    <Download className="w-4 h-4 mr-2" />
                    Export Laporan
                  </Button>
                  <Button variant="outline" className="hover:scale-105 transition-all duration-200 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                {statsData.map((stat, index) => {
                  const Icon = stat.icon
                  let textColor = ""
                  let bgColor = ""

                  switch (stat.color) {
                    case "blue":
                      textColor = "text-chart-1"
                      bgColor = "bg-chart-1/10"
                      break
                    case "green":
                      textColor = "text-chart-2"
                      bgColor = "bg-chart-2/10"
                      break
                    case "yellow":
                      textColor = "text-chart-3"
                      bgColor = "bg-chart-3/10"
                      break
                    case "red":
                      textColor = "text-destructive"
                      bgColor = "bg-destructive/10"
                      break
                    default:
                      textColor = "text-gray-600"
                      bgColor = "bg-gray-100"
                  }
                  return (
                    <Card key={index} className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                            <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                          </div>
                          <div
                            className={`w-10 h-10 lg:w-12 lg:h-12 ${bgColor} rounded-lg flex items-center justify-center`}
                          >
                            <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${textColor}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Reports Table */}
              <Card className="bg-card text-foreground">
                <CardHeader>
                  <CardTitle>Laporan Masuk Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Laporan</TableHead>
                        <TableHead>Pelapor</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportsData.slice(0, 5).map((report) => {
                        // Show only first 5 reports in dashboard
                        let statusColor = ""
                        switch (report.status) {
                          case "Baru":
                            statusColor = "bg-blue-600 text-white"
                            break
                          case "Diproses":
                            statusColor = "bg-yellow-600 text-white"
                            break
                          case "Selesai":
                            statusColor = "bg-green-600 text-white"
                            break
                          case "Ditolak":
                            statusColor = "bg-red-600 text-white"
                            break
                          default:
                            statusColor = "bg-gray-600 text-white"
                        }
                        return (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.id}</TableCell>
                            <TableCell>{report.reporter}</TableCell>
                            <TableCell>{report.category}</TableCell>
                            <TableCell>
                              <Badge className={statusColor}>{report.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                Lihat Detail
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "schools" && (
            <div>
              {/* Page Title */}
              <h1 className="text-3xl font-bold text-foreground mb-8">Manajemen Sekolah</h1>

              {/* Schools Table */}
              <Card className="bg-card text-foreground">
                <CardHeader>
                  <CardTitle>Daftar Sekolah</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Sekolah</TableHead>
                        <TableHead>NPSN</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>Kepala Sekolah</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schoolsData.map((school) => (
                        <TableRow key={school.id}>
                          <TableCell className="font-medium">{school.id}</TableCell>
                          <TableCell>{school.name}</TableCell>
                          <TableCell>{school.npsn}</TableCell>
                          <TableCell>{school.address}</TableCell>
                          <TableCell>{school.principal}</TableCell>
                          <TableCell>
                            <Badge>{school.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/admin/schools/${school.id}`)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Lihat
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/admin/schools/${school.id}/edit`)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteSchool(school.id)}>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "news" && (
            <div>
              {/* Page Title */}
              <h1 className="text-3xl font-bold text-foreground mb-8">Manajemen Berita</h1>

              {/* News Table */}
              <Card className="bg-card text-foreground">
                <CardHeader>
                  <CardTitle>Daftar Berita</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Judul Berita</TableHead>
                        <TableHead>Penulis</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newsData.map((news) => (
                        <TableRow key={news.id}>
                          <TableCell className="font-medium">{news.id}</TableCell>
                          <TableCell>{news.title}</TableCell>
                          <TableCell>{news.author}</TableCell>
                          <TableCell>{news.category}</TableCell>
                          <TableCell>
                            <Badge>{news.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => router.push(`/admin/news/${news.id}`)}>
                                <Eye className="w-4 h-4 mr-1" />
                                Lihat
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/admin/news/${news.id}/edit`)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteNews(news.id)}>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Manajemen Pengguna</h1>
                  <p className="text-muted-foreground mt-2">Kelola pengguna sistem dan hak akses</p>
                </div>
                <Button className="hover:scale-105 transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Pengguna</p>
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">{usersData.length}</p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Pengguna Aktif</p>
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">
                          {usersData.filter((u) => u.status === "Aktif").length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <UserCheck className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Admin</p>
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">
                          {usersData.filter((u) => u.role.includes("Admin")).length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Login Hari Ini</p>
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">
                          {usersData.filter((u) => u.lastLogin.includes("2024-01-15")).length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Users Table */}
              <Card className="bg-card text-foreground">
                <CardHeader>
                  <CardTitle>Daftar Pengguna</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Login Terakhir</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "Super Admin" ? "default" : "secondary"}>{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Aktif" ? "default" : "destructive"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/admin/users/${user.id}`)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Lihat
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* User Form Dialog */}
              {showUserForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle>{editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={userFormData.name}
                          onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userFormData.email}
                          onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                          placeholder="Masukkan email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          value={userFormData.role}
                          onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                          className="w-full p-2 border border-input rounded-md"
                        >
                          <option value="">Pilih Role</option>
                          <option value="Super Admin">Super Admin</option>
                          <option value="Admin Sekolah">Admin Sekolah</option>
                          <option value="Admin Berita">Admin Berita</option>
                          <option value="Operator">Operator</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          value={userFormData.status}
                          onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
                          className="w-full p-2 border border-input rounded-md"
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowUserForm(false)}>
                        Batal
                      </Button>
                      <Button onClick={handleSaveUser}>{editingUser ? "Update" : "Simpan"}</Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </>
          )}

          {activeTab === "settings" && (
            <div>
              {/* Page Title */}
              <h1 className="text-3xl font-bold text-foreground mb-8">Pengaturan Sistem</h1>

              {/* Settings Navigation */}
              <div className="flex space-x-1 mb-6">
                {[
                  { id: "general", label: "Umum", icon: Settings },
                  { id: "security", label: "Keamanan", icon: Shield },
                  { id: "notifications", label: "Notifikasi", icon: Bell },
                  { id: "backup", label: "Backup", icon: Database },
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <Button
                      key={tab.id}
                      variant={activeSettingsTab === tab.id ? "default" : "outline"}
                      onClick={() => setActiveSettingsTab(tab.id)}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </Button>
                  )
                })}
              </div>

              {/* Settings Content */}
              <Card className="bg-card text-foreground">
                <CardContent className="p-6">
                  {activeSettingsTab === "general" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">Pengaturan Umum</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="siteName">Nama Situs</Label>
                          <Input
                            id="siteName"
                            value={settingsForm.general.siteName}
                            onChange={(e) => handleSettingsChange("general", "siteName", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactEmail">Email Kontak</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={settingsForm.general.contactEmail}
                            onChange={(e) => handleSettingsChange("general", "contactEmail", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPhone">Telepon</Label>
                          <Input
                            id="contactPhone"
                            value={settingsForm.general.contactPhone}
                            onChange={(e) => handleSettingsChange("general", "contactPhone", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="timezone">Zona Waktu</Label>
                          <select
                            id="timezone"
                            value={settingsForm.general.timezone}
                            onChange={(e) => handleSettingsChange("general", "timezone", e.target.value)}
                            className="w-full p-2 border border-input rounded-md"
                          >
                            <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                            <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                            <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="siteDescription">Deskripsi Situs</Label>
                          <textarea
                            id="siteDescription"
                            value={settingsForm.general.siteDescription}
                            onChange={(e) => handleSettingsChange("general", "siteDescription", e.target.value)}
                            className="w-full p-2 border border-input rounded-md h-20"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Alamat</Label>
                          <textarea
                            id="address"
                            value={settingsForm.general.address}
                            onChange={(e) => handleSettingsChange("general", "address", e.target.value)}
                            className="w-full p-2 border border-input rounded-md h-20"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === "security" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">Pengaturan Keamanan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="passwordMinLength">Panjang Minimum Password</Label>
                          <Input
                            id="passwordMinLength"
                            type="number"
                            value={settingsForm.security.passwordMinLength}
                            onChange={(e) =>
                              handleSettingsChange("security", "passwordMinLength", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="sessionTimeout">Timeout Sesi (menit)</Label>
                          <Input
                            id="sessionTimeout"
                            type="number"
                            value={settingsForm.security.sessionTimeout}
                            onChange={(e) =>
                              handleSettingsChange("security", "sessionTimeout", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxLoginAttempts">Maksimal Percobaan Login</Label>
                          <Input
                            id="maxLoginAttempts"
                            type="number"
                            value={settingsForm.security.maxLoginAttempts}
                            onChange={(e) =>
                              handleSettingsChange("security", "maxLoginAttempts", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="passwordExpiry">Masa Berlaku Password (hari)</Label>
                          <Input
                            id="passwordExpiry"
                            type="number"
                            value={settingsForm.security.passwordExpiry}
                            onChange={(e) =>
                              handleSettingsChange("security", "passwordExpiry", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="twoFactorAuth"
                              checked={settingsForm.security.twoFactorAuth}
                              onChange={(e) => handleSettingsChange("security", "twoFactorAuth", e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="twoFactorAuth">Aktifkan Autentikasi Dua Faktor</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === "notifications" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">Pengaturan Notifikasi</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            checked={settingsForm.notifications.emailNotifications}
                            onChange={(e) =>
                              handleSettingsChange("notifications", "emailNotifications", e.target.checked)
                            }
                            className="rounded"
                          />
                          <Label htmlFor="emailNotifications">Notifikasi Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="smsNotifications"
                            checked={settingsForm.notifications.smsNotifications}
                            onChange={(e) =>
                              handleSettingsChange("notifications", "smsNotifications", e.target.checked)
                            }
                            className="rounded"
                          />
                          <Label htmlFor="smsNotifications">Notifikasi SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="pushNotifications"
                            checked={settingsForm.notifications.pushNotifications}
                            onChange={(e) =>
                              handleSettingsChange("notifications", "pushNotifications", e.target.checked)
                            }
                            className="rounded"
                          />
                          <Label htmlFor="pushNotifications">Notifikasi Push</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="reportAlerts"
                            checked={settingsForm.notifications.reportAlerts}
                            onChange={(e) => handleSettingsChange("notifications", "reportAlerts", e.target.checked)}
                            className="rounded"
                          />
                          <Label htmlFor="reportAlerts">Alert Laporan Baru</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="systemMaintenance"
                            checked={settingsForm.notifications.systemMaintenance}
                            onChange={(e) =>
                              handleSettingsChange("notifications", "systemMaintenance", e.target.checked)
                            }
                            className="rounded"
                          />
                          <Label htmlFor="systemMaintenance">Notifikasi Maintenance Sistem</Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === "backup" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">Pengaturan Backup</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center space-x-2 mb-4">
                            <input
                              type="checkbox"
                              id="autoBackup"
                              checked={settingsForm.backup.autoBackup}
                              onChange={(e) => handleSettingsChange("backup", "autoBackup", e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="autoBackup">Backup Otomatis</Label>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="backupFrequency">Frekuensi Backup</Label>
                          <select
                            id="backupFrequency"
                            value={settingsForm.backup.backupFrequency}
                            onChange={(e) => handleSettingsChange("backup", "backupFrequency", e.target.value)}
                            className="w-full p-2 border border-input rounded-md"
                          >
                            <option value="daily">Harian</option>
                            <option value="weekly">Mingguan</option>
                            <option value="monthly">Bulanan</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="retentionPeriod">Periode Penyimpanan (hari)</Label>
                          <Input
                            id="retentionPeriod"
                            type="number"
                            value={settingsForm.backup.retentionPeriod}
                            onChange={(e) =>
                              handleSettingsChange("backup", "retentionPeriod", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label>Backup Terakhir</Label>
                          <p className="text-sm text-muted-foreground mt-1">{settingsForm.backup.lastBackup}</p>
                        </div>
                        <div className="md:col-span-2">
                          <Button variant="outline" className="mr-2 bg-transparent">
                            <Download className="w-4 h-4 mr-2" />
                            Backup Manual
                          </Button>
                          <Button variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Restore Backup
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-8 pt-6 border-t">
                    <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Pengaturan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "agenda" && (
            <>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Manajemen Agenda</h1>
                  <p className="text-muted-foreground mt-2">Kelola agenda dan kegiatan pendidikan</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="hover:scale-105 transition-all duration-200">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Agenda
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Tambah Agenda Baru</DialogTitle>
                    </DialogHeader>
                    <AgendaForm onSubmit={handleAddAgenda} onCancel={() => setIsAddAgendaOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Agenda Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Agenda</p>
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">{agendasData.length}</p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-chart-1/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-chart-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Berlangsung</p>
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">
                          {agendasData.filter((a) => a.status === "Berlangsung").length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-chart-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Selesai</p>
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">
                          {agendasData.filter((a) => a.status === "Selesai").length}
                        </p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-chart-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Agenda Table */}
              <Card className="bg-card text-foreground">
                <CardHeader>
                  <CardTitle>Daftar Agenda</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Waktu</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agendasData.map((agenda) => {
                        let statusColor = ""
                        switch (agenda.status) {
                          case "Terjadwal":
                            statusColor = "bg-chart-1/10 text-chart-1"
                            break
                          case "Berlangsung":
                            statusColor = "bg-chart-3/10 text-chart-3"
                            break
                          case "Selesai":
                            statusColor = "bg-chart-2/10 text-chart-2"
                            break
                          default:
                            statusColor = "bg-muted text-muted-foreground"
                        }
                        return (
                          <TableRow key={agenda.id}>
                            <TableCell className="font-medium">{agenda.id}</TableCell>
                            <TableCell>{agenda.title}</TableCell>
                            <TableCell>{agenda.date}</TableCell>
                            <TableCell>{agenda.time}</TableCell>
                            <TableCell>{agenda.location}</TableCell>
                            <TableCell>
                              <Badge className={statusColor}>{agenda.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  Lihat
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleEditAgenda(agenda)}>
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeleteAgenda(agenda.id)}>
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Hapus
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

const AgendaForm = ({ agenda, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: agenda?.title || "",
    description: agenda?.description || "",
    date: agenda?.date || new Date().toISOString().split("T")[0],
    time: agenda?.time || "08:00",
    location: agenda?.location || "",
    status: agenda?.status || "Terjadwal",
    category: agenda?.category || "Rapat",
    participants: agenda?.participants || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground">
          Judul Agenda
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground">
          Deskripsi Agenda
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300 min-h-[100px]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-foreground">
            Tanggal
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time" className="text-foreground">
            Waktu
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-foreground">
          Lokasi
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status" className="text-foreground">
            Status
          </Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="Terjadwal" className="hover:bg-accent hover:text-accent-foreground">
                Terjadwal
              </SelectItem>
              <SelectItem value="Berlangsung" className="hover:bg-accent hover:text-accent-foreground">
                Berlangsung
              </SelectItem>
              <SelectItem value="Selesai" className="hover:bg-accent hover:text-accent-foreground">
                Selesai
              </SelectItem>
              <SelectItem value="Ditunda" className="hover:bg-accent hover:text-accent-foreground">
                Ditunda
              </SelectItem>
              <SelectItem value="Dibatalkan" className="hover:bg-accent hover:text-accent-foreground">
                Dibatalkan
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-foreground">
            Kategori
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="Rapat" className="hover:bg-accent hover:text-accent-foreground">
                Rapat
              </SelectItem>
              <SelectItem value="Pelatihan" className="hover:bg-accent hover:text-accent-foreground">
                Pelatihan
              </SelectItem>
              <SelectItem value="Seminar" className="hover:bg-accent hover:text-accent-foreground">
                Seminar
              </SelectItem>
              <SelectItem value="Workshop" className="hover:bg-accent hover:text-accent-foreground">
                Workshop
              </SelectItem>
              <SelectItem value="Upacara" className="hover:bg-accent hover:text-accent-foreground">
                Upacara
              </SelectItem>
              <SelectItem value="Lomba" className="hover:bg-accent hover:text-accent-foreground">
                Lomba
              </SelectItem>
              <SelectItem value="Kegiatan Sekolah" className="hover:bg-accent hover:text-accent-foreground">
                Kegiatan Sekolah
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="participants" className="text-foreground">
          Peserta
        </Label>
        <Input
          id="participants"
          value={formData.participants}
          onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
          className="bg-background border-input hover:border-accent-foreground/20 focus:border-primary transition-all duration-300"
          required
        />
      </div>

      <DialogFooter className="gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
        >
          Batal
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
          {agenda ? "Update" : "Tambah"} Agenda
        </Button>
      </DialogFooter>
    </form>
  )
}
