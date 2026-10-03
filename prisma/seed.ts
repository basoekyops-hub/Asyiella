// @ts-ignore
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seed() {
  console.log('🌱 Memulai proses seeding database Portal Pengawas Sekolah...');

  // 1. Seed Admin
  const adminEmail = 'admin@pengawassekolah.id';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin123!', salt);

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'Administrator Portal',
        role: 'SUPERADMIN'
      }
    });
    console.log('✅ Admin default berhasil dibuat:');
    console.log(`   Email: ${adminEmail}`);
    console.log('   Password: Admin123!');
    console.log('   ⚠️  PERINGATAN: Password ini hanya untuk instalasi awal! Wajib diganti di Dashboard Admin setelah deployment.');
  }

  // 2. Seed Pengaturan Website
  const existingSettings = await prisma.pengaturanWebsite.findUnique({
    where: { id: 'default' }
  });

  if (!existingSettings) {
    await prisma.pengaturanWebsite.create({
      data: {
        id: 'default',
        namaPortal: 'PORTAL PENGAWAS SEKOLAH',
        subjudul: 'Informasi, Pendampingan, Dokumentasi dan Pengembangan Mutu Satuan Pendidikan',
        namaPengawas: 'H. Ahmad Syafii, M.Pd.',
        fotoPengawas: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
        nipPengawas: '19750812 200003 1 004',
        jabatan: 'Pengawas Sekolah Madya TK/SD',
        jenjang: 'TK / SD',
        kecamatan: 'Tapung Hilir',
        kabupaten: 'Kampar',
        provinsi: 'Riau',
        email: 'digitalpengawas@gmail.com',
        telepon: '+62 812-7654-3210',
        whatsapp: '6281276543210',
        alamat: 'Jl. Jenderal Sudirman No. 45, Kompleks Dinas Pendidikan',
        logo: '',
        favicon: '',
        deskripsi: 'Portal resmi pendampingan, informasi, dan pembinaan mutu pendidikan satuan TK/SD untuk mewujudkan transformasi pembelajaran yang berdampak.',
        footer: '© 2026 Portal Pengawas Sekolah. Informasi, Pendampingan, Dokumentasi dan Pengembangan Mutu Satuan Pendidikan. Pengawas Sekolah TK/SD.',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
        mapsUrl: 'https://maps.google.com/?q=Dinas+Pendidikan',
        latitude: 0.3297,
        longitude: 101.4478
      }
    });
    console.log('✅ Pengaturan website awal berhasil disimpan.');
  }

  // 3. Seed Pengawas
  const existingPengawas = await prisma.pengawas.findFirst();
  if (!existingPengawas) {
    await prisma.pengawas.create({
      data: {
        nama: 'H. Ahmad Syafii, M.Pd.',
        gelar: 'M.Pd.',
        nip: '19750812 200003 1 004',
        pangkatGolongan: 'Pembina Tk. I / IV b',
        jabatan: 'Pengawas Sekolah Madya',
        wilayahKerja: 'Kecamatan Tapung Hilir, Wilayah Binaan I',
        kecamatan: 'Tapung Hilir',
        kabupaten: 'Kampar',
        provinsi: 'Riau',
        email: 'digitalpengawas@gmail.com',
        noHp: '+62 812-7654-3210',
        foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
        riwayatPendidikan: 'S1 Pendidikan Guru Sekolah Dasar (Universitas Riau)\nS2 Manajemen Pendidikan (Universitas Negeri Padang)',
        pengalaman: '1. Guru Kelas SD Negeri (1998 - 2008)\n2. Kepala Sekolah Dasar Inti (2008 - 2017)\n3. Pengawas Sekolah TK/SD (2017 - Sekarang)\n4. Fasilitator Program Sekolah Penggerak Angkatan 2\n5. Narasumber Implementasi Kurikulum Merdeka',
        kompetensi: 'Supervisi Akademik, Supervisi Manajerial, Evaluasi Mutu Pendidikan, Asesmen Pembelajaran, Kepemimpinan Perubahan, Penguatan Karakter',
        tugasFungsi: 'Melaksanakan tugas pengawasan akademik dan manajerial pada satuan pendidikan yang meliputi penyusunan program pengawasan, pelaksanaan pembinaan, pemantauan pelaksanaan standar nasional pendidikan, penilaian kinerja guru dan kepala sekolah, evaluasi hasil pelaksanaan program pengawasan, serta pembimbingan dan pelatihan profesional guru dan kepala sekolah.',
        peranPengawas: '1. Pendampingan Satuan Pendidikan yang berfokus pada kebutuhan sekolah\n2. Supervisi Akademik dan Manajerial transformatif\n3. Pemantauan dan Evaluasi implementasi Kurikulum Merdeka\n4. Pembinaan Kepemimpinan Kepala Sekolah\n5. Pendampingan Guru dalam diferensiasi pembelajaran\n6. Penguatan Ekosistem dan Mutu Satuan Pendidikan'
      }
    });
    console.log('✅ Data profil pengawas berhasil disimpan.');
  }

  // 4. Seed sample schools and initial content if none exist
  const schoolCount = await prisma.sekolah.count();
  if (schoolCount === 0) {
    const s1 = await prisma.sekolah.create({
      data: {
        nama: 'UPT SD Negeri 009 Sialang Kubang',
        npsn: '10400512',
        jenjang: 'SD',
        status: 'Negeri',
        alamat: 'Jl. Poros Desa Sialang Kubang, RT 04 / RW 02',
        desaKelurahan: 'Sialang Kubang',
        kecamatan: 'Tapung Hilir',
        kabupaten: 'Kampar',
        provinsi: 'Riau',
        foto: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
        latitude: 0.6931,
        longitude: 101.2185,
        mapsUrl: 'https://maps.google.com/?q=Sialang+Kubang',
        kepalaSekolahNama: 'Drs. Supriyanto, M.Si.',
        jumlahGuru: 16,
        jumlahSiswa: 285,
        telepon: '081267890123',
        email: 'sdn009sialangkubang@sch.id',
        website: 'https://sdn009sialangkubang.sch.id'
      }
    });

    await prisma.visiMisi.create({
      data: {
        sekolahId: s1.id,
        visi: 'Terwujudnya peserta didik yang beriman, bertakwa, berakhlak mulia, cerdas, terampil, dan berwawasan lingkungan menuju Generasi Emas.',
        misi: '1. Mengembangkan budaya religius dan karakter profil pelajar Pancasila.\n2. Menyelenggarakan pembelajaran berdiferensiasi yang aktif, kreatif, dan menyenangkan.\n3. Meningkatkan kemampuan literasi dan numerasi peserta didik secara berkelanjutan.\n4. Membudayakan perilaku hidup bersih, sehat, dan peduli kelestarian lingkungan sekolah.',
        tujuan: 'Menghasilkan lulusan yang berkepribadian luhur, memiliki kompetensi dasar literasi-numerasi tinggi, dan siap melanjutkan pendidikan ke jenjang yang lebih tinggi dengan percaya diri.',
        programUnggulan: '1. Program Literasi Pagi 15 Menit\n2. Gemar Berhitung Cepat (Gemat)\n3. Sekolah Ramah Anak & Adiwiyata\n4. Pembiasaan Sholat Dhuha & Doa Bersama'
      }
    });

    await prisma.kepalaSekolah.create({
      data: {
        sekolahId: s1.id,
        nama: 'Drs. Supriyanto, M.Si.',
        nip: '19700415 199403 1 003',
        periode: '2021 - Sekarang',
        status: 'Aktif',
        foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        keterangan: 'Kepala Sekolah Penggerak Angkatan II',
        sambutan: 'Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di laman resmi informasi satuan pendidikan kami. Dengan komitmen kebersamaan antara pengawas pembina, dewan guru, orang tua, dan masyarakat, kami terus berikhtiar menghadirkan ruang belajar yang aman, nyaman, dan memberdayakan potensi terbaik setiap murid.'
      }
    });

    await prisma.keunggulan.createMany({
      data: [
        {
          sekolahId: s1.id,
          judul: 'Sekolah Penggerak Mandiri Berbagi',
          kategori: 'Akademik',
          deskripsi: 'Mengimplementasikan Kurikulum Merdeka secara menyeluruh dengan penguatan projek P5 berbasis kearifan lokal.',
          icon: 'Award'
        },
        {
          sekolahId: s1.id,
          judul: 'Pojok Baca Interaktif & Pojok Sains',
          kategori: 'Literasi & Numerasi',
          deskripsi: 'Tersedianya sudut baca di seluruh ruang kelas yang meningkatkan minat baca murid secara konsisten.',
          icon: 'BookOpen'
        }
      ]
    });

    await prisma.fasilitas.createMany({
      data: [
        {
          sekolahId: s1.id,
          nama: 'Perpustakaan Ramah Anak',
          deskripsi: 'Koleksi buku bacaan fiksi dan non-fiksi lengkap dengan ruang karpet baca yang nyaman.',
          kondisi: 'Baik',
          jumlah: 1,
          unit: 'Ruang',
          foto: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
        },
        {
          sekolahId: s1.id,
          nama: 'Ruang Kelas Representatif',
          deskripsi: 'Dilengkapi pencahayaan alami yang sehat, papan pajangan karya, dan ventilasi udara baik.',
          kondisi: 'Baik',
          jumlah: 8,
          unit: 'Ruang'
        }
      ]
    });

    await prisma.guru.createMany({
      data: [
        {
          sekolahId: s1.id,
          nama: 'Nurul Hidayati, S.Pd.',
          nip: '19820510 200902 2 007',
          nuptk: '4534760662210082',
          jabatan: 'Guru Kelas V',
          mapel: 'Guru Kelas SD',
          pendidikan: 'S1 PGSD',
          statusKepegawaian: 'PNS',
          email: 'nurul.hidayati@sekolah.id',
          tampilkanPublik: true
        },
        {
          sekolahId: s1.id,
          nama: 'Bambang Irawan, S.Pd.SD.',
          nip: '19880320 201101 1 009',
          nuptk: '1245766667130103',
          jabatan: 'Guru PJOK',
          mapel: 'Pendidikan Jasmani & Olahraga',
          pendidikan: 'S1 Penjaskesrek',
          statusKepegawaian: 'PPPK',
          email: 'bambang.irawan@sekolah.id',
          tampilkanPublik: true
        }
      ]
    });

    await prisma.prestasi.create({
      data: {
        sekolahId: s1.id,
        namaPrestasi: 'Juara 1 Lomba Budaya Literasi Sekolah Tingkat Kabupaten',
        tingkat: 'Kabupaten',
        tahun: 2025,
        bidang: 'Literasi & Perpustakaan',
        peraih: 'Tim Literasi Sekolah',
        keterangan: 'Apresiasi atas inovasi pojok baca digital dan majalah dinding berkala sekolah.',
        foto: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800'
      }
    });

    // 5. Seed initial news & activities
    await prisma.berita.create({
      data: {
        sekolahId: s1.id,
        judul: 'Pendampingan Berkelanjutan: Implementasi Asesmen Diagnostik Pembelajaran di Satuan Pendidikan',
        slug: 'pendampingan-asesmen-diagnostik-pembelajaran',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
        ringkasan: 'Pengawas Sekolah melaksanakan supervisi dan pendampingan tatap muka untuk memastikan perencanaan asesmen awal murid berjalan kontekstual.',
        konten: 'Dalam rangka memastikan pembelajaran yang berpusat pada peserta didik, Pengawas Pembina TK/SD melakukan kunjungan pendampingan intensif. Fokus supervisi kali ini menitikberatkan pada pemetaan kesiapan belajar murid di awal semester, pemanfaatan instrumen asesmen kognitif maupun non-kognitif, serta tindak lanjut diferensiasi modul ajar oleh guru kelas.',
        penulis: 'H. Ahmad Syafii, M.Pd.',
        kategori: 'Pendampingan',
        statusPublish: true,
        featured: true
      }
    });

    await prisma.pengumuman.create({
      data: {
        judul: 'Jadwal Supervisi Manajerial dan Akademik Semester Ganjil Tahun Ajaran 2026/2027',
        isi: 'Disampaikan kepada seluruh Kepala Satuan Pendidikan dan Dewan Guru di lingkungan Wilayah Binaan I untuk mempersiapkan dokumen kurikulum operasional satuan pendidikan (KOSP), lembar refleksi pembelajaran, serta administrasi ketenagaan menjelang kunjungan supervisi terpadu.',
        prioritas: 'Penting',
        statusPublish: true
      }
    });

    await prisma.galeri.create({
      data: {
        sekolahId: s1.id,
        judul: 'Kegiatan Diskusi Refleksi Pembelajaran Berdiferensiasi Bersama Dewan Guru',
        kategori: 'Pendampingan',
        jenis: 'FOTO',
        url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
        deskripsi: 'Sesi berbagi praktik baik dan diskusi interaktif peningkatan kompetensi pedagogik guru di ruang pertemuan sekolah.'
      }
    });

    console.log('✅ Data sekolah contoh & pendampingan awal berhasil disimpan.');
  }

  console.log('🎉 Seeding database selesai!');
}

if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seed()
    .catch((e) => {
      console.error('❌ Gagal menjalankan seed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
