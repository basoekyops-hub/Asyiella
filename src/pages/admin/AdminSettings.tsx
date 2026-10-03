import React, { useState, useEffect } from 'react';
import { Settings, Save, Globe, Share2, MapPin, Building, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import { ImageUpload } from '../../components/common/ImageUpload';

interface AdminSettingsProps {
  onShowToast: (msg: string, type: 'success' | 'error') => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onShowToast }) => {
  const { settings, refreshSettings } = useSettings();
  const [form, setForm] = useState({
    namaPortal: '',
    subjudul: '',
    namaPengawas: '',
    fotoPengawas: '',
    nipPengawas: '',
    jabatan: '',
    jenjang: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    email: '',
    telepon: '',
    whatsapp: '',
    alamat: '',
    logo: '',
    favicon: '',
    deskripsi: '',
    footer: '',
    facebook: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    mapsUrl: '',
    latitude: 0.6931,
    longitude: 101.2185
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        namaPortal: settings.namaPortal || 'PORTAL PENGAWAS SEKOLAH',
        subjudul: settings.subjudul || '',
        namaPengawas: settings.namaPengawas || '',
        fotoPengawas: settings.fotoPengawas || '',
        nipPengawas: settings.nipPengawas || '',
        jabatan: settings.jabatan || '',
        jenjang: settings.jenjang || 'TK / SD',
        kecamatan: settings.kecamatan || '',
        kabupaten: settings.kabupaten || '',
        provinsi: settings.provinsi || '',
        email: settings.email || '',
        telepon: settings.telepon || '',
        whatsapp: settings.whatsapp || '',
        alamat: settings.alamat || '',
        logo: settings.logo || '',
        favicon: settings.favicon || '',
        deskripsi: settings.deskripsi || '',
        footer: settings.footer || '',
        facebook: settings.facebook || '',
        instagram: settings.instagram || '',
        youtube: settings.youtube || '',
        tiktok: settings.tiktok || '',
        mapsUrl: settings.mapsUrl || '',
        latitude: settings.latitude || 0.6931,
        longitude: settings.longitude || 101.2185
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateSettings(form);
      await refreshSettings();
      onShowToast('Pengaturan identitas website berhasil disimpan!', 'success');
    } catch (err: any) {
      onShowToast(err.message || 'Gagal menyimpan pengaturan.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Pengaturan Identitas & Konfigurasi Portal</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ubah nama portal, pengawas pembina, footer, dan saluran media tanpa mengubah source code.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Section 1: Branding Portal */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Branding & Header Portal</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nama Portal Website <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.namaPortal}
                onChange={(e) => setForm({ ...form, namaPortal: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Jenjang Pembinaan</label>
              <input
                type="text"
                value={form.jenjang}
                onChange={(e) => setForm({ ...form, jenjang: e.target.value })}
                placeholder="TK / SD"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Subjudul Tagline Portal</label>
            <input
              type="text"
              value={form.subjudul}
              onChange={(e) => setForm({ ...form, subjudul: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Deskripsi Meta Portal (SEO)
            </label>
            <textarea
              rows={2}
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl resize-none"
            />
          </div>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <ImageUpload
              label="Logo Portal Website"
              value={form.logo}
              onChange={(url) => setForm({ ...form, logo: url })}
              helperText="Unggah file logo portal (format JPG, JPEG, atau PNG, maks 10MB)"
              aspectRatio="square"
            />
          </div>
        </div>

        {/* Section 2: Identitas Pengawas Pembina */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>Pengawas Pembina & Wilayah Tugas</span>
          </h3>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 mb-2">
            <ImageUpload
              label="Foto Profil Pengawas Pembina"
              value={form.fotoPengawas}
              onChange={(url) => setForm({ ...form, fotoPengawas: url })}
              helperText="Unggah file foto formal pengawas (format JPG, JPEG, atau PNG, maks 10MB)"
              aspectRatio="square"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nama Pengawas</label>
              <input
                type="text"
                value={form.namaPengawas}
                onChange={(e) => setForm({ ...form, namaPengawas: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">NIP Pengawas</label>
              <input
                type="text"
                value={form.nipPengawas}
                onChange={(e) => setForm({ ...form, nipPengawas: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Jabatan Fungsional</label>
              <input
                type="text"
                value={form.jabatan}
                onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kecamatan</label>
              <input
                type="text"
                value={form.kecamatan}
                onChange={(e) => setForm({ ...form, kecamatan: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kabupaten</label>
              <input
                type="text"
                value={form.kabupaten}
                onChange={(e) => setForm({ ...form, kabupaten: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Provinsi</label>
              <input
                type="text"
                value={form.provinsi}
                onChange={(e) => setForm({ ...form, provinsi: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Resmi</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">No. Telepon / WA</label>
              <input
                type="text"
                value={form.telepon}
                onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">No. WhatsApp API (Format: 628...)</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="6281276543210"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Alamat Kantor Resmi</label>
            <input
              type="text"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tautan Google Maps</label>
              <input
                type="url"
                value={form.mapsUrl}
                onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Latitude Peta</label>
              <input
                type="number"
                step="any"
                value={form.latitude}
                onChange={(e) => setForm({ ...form, latitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Longitude Peta</label>
              <input
                type="number"
                step="any"
                value={form.longitude}
                onChange={(e) => setForm({ ...form, longitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Media Sosial & Footer */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <Share2 className="w-4 h-4 text-purple-600" />
            <span>Tautan Media Sosial & Catatan Kaki (Footer)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">URL Facebook</label>
              <input
                type="url"
                value={form.facebook}
                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">URL Instagram</label>
              <input
                type="url"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">URL YouTube</label>
              <input
                type="url"
                value={form.youtube}
                onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">URL TikTok</label>
              <input
                type="url"
                value={form.tiktok}
                onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
                placeholder="https://tiktok.com/@..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Teks Hak Cipta & Catatan Footer
            </label>
            <input
              type="text"
              value={form.footer}
              onChange={(e) => setForm({ ...form, footer: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
