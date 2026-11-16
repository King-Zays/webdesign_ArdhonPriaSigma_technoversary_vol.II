import Link from "next/link";

/**
 * Pratinjau 4 layar asli aplikasi BONI (`/dashboard/eco-action`, `/dashboard/marketplace`, `/gov/dashboard`)
 * dengan anatomi kartu jendela & grouped-list persis seperti referensi Linear (Gambar 3):
 * border hairline tipis (`border-white/[0.07]`), kotak konteks lembut, dan daftar baris terstruktur.
 */

function WindowControls() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2.5 text-[11px] text-[#5E6862]">
      <span>−</span>
      <span>↗</span>
      <span>×</span>
    </div>
  );
}

function SignalBars({ active = 3 }: { active?: 2 | 3 }) {
  return (
    <span aria-hidden="true" className="inline-flex items-end gap-[2px] h-3">
      <span className="w-[2px] h-1.5 rounded-xs bg-[#7A867F]" />
      <span className="w-[2px] h-2.5 rounded-xs bg-[#7A867F]" />
      <span className={`w-[2px] h-3 rounded-xs ${active === 3 ? "bg-[#7A867F]" : "bg-white/15"}`} />
    </span>
  );
}

export default function PlatformShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080D0A] py-20 text-[#ECEDEE] sm:py-28">
      {/* Header 2 Kolom Asimetris */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-start md:gap-12">
          <h2 className="text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl">
            Dari pilah di rumah <br />
            hingga voucher kampung
          </h2>

          <div className="max-w-lg md:pt-1">
            <p className="text-base leading-relaxed text-[#95A09A] sm:text-[17px]">
              Setiap layar di BONI dirancang agar kebiasaan bersih warga langsung tercatat, diperiksa otomatis, dan
              dapat ditukarkan menjadi manfaat nyata di UMKM sekitar.
            </p>
            <div className="mt-5">
              <Link
                href="/login?role=warga"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#95A09A] transition-colors hover:text-white"
              >
                <span>Buka aplikasi warga</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Window Application Strip with Edge Fade (Exact Anatomy of Reference Image 3) */}
      <div className="relative mx-auto mt-14 max-w-[1420px] px-4 sm:mt-16 sm:px-6">
        {/* Left & Right Edge Fade Overlays */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-32 bg-gradient-to-r from-[#080D0A] via-[#080D0A]/80 to-transparent xl:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-32 bg-gradient-to-l from-[#080D0A] via-[#080D0A]/80 to-transparent xl:block"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[0.72fr_1.12fr_1.18fr_0.72fr] xl:items-stretch">
          {/* Window 1 (Left Edge): /dashboard/eco-action — Kategori Aksi */}
          <div className="hidden flex-col justify-between rounded-xl border border-white/[0.07] bg-[#0C120E] p-5 opacity-55 xl:flex">
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#95A09A]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                  <span>Kategori Aksi Hijau</span>
                </div>
                <WindowControls />
              </div>

              <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.025] p-3 text-xs leading-relaxed text-[#88938D]">
                Pilih jenis aksi kebersihan harian dan lihat batas kuota pengajuan per hari
              </div>

              <p className="mt-4 text-[11px] text-[#66716B]">5 kategori tersedia di aplikasi:</p>
              <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.015] divide-y divide-white/[0.05] text-xs">
                <div className="flex items-center justify-between px-3 py-2 text-[#C8D0CC]">
                  <span className="truncate">Pilah Sampah</span>
                  <span className="font-mono text-[11px] text-emerald-400">+40 pts</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-[#C8D0CC]">
                  <span className="truncate">Setor Minyak Jelantah</span>
                  <span className="font-mono text-[11px] text-emerald-400">+50 pts</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-[#C8D0CC]">
                  <span className="truncate">Tanam Pohon</span>
                  <span className="font-mono text-[11px] text-emerald-400">+80 pts</span>
                </div>
              </div>
            </div>

            <div className="mt-4 font-mono text-[11px] text-[#5E6862]">
              Rute: <span className="text-[#88938D]">/dashboard/eco-action</span>
            </div>
          </div>

          {/* Window 2 (Center-Left Main): /dashboard/eco-action — Pemeriksaan Bukti Foto */}
          <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0D1310] p-5">
            <div>
              {/* Window Title Bar */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500/20 font-mono text-[9px] font-bold text-emerald-300">
                    ✓
                  </span>
                  <span className="font-medium text-white">Verifikasi Aksi</span>
                  <span className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-[#88938D]">
                    Skor ≥ 75%
                  </span>
                </div>
                <WindowControls />
              </div>

              {/* Inset Box */}
              <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-3 text-[13px] leading-relaxed text-[#E2E8E4]">
                Foto sampah rumah tangga yang sudah dipilah ke wadah atau kantong terpisah (organik, anorganik, daur
                ulang).
              </div>

              {/* Context Line Right-Aligned */}
              <div className="mt-2.5 flex justify-end">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#66716B]">
                  <span className="font-mono text-[#95A09A]">⊙ Pilah Sampah · 1.5 kg</span>
                  <span>diunggah warga</span>
                </span>
              </div>

              {/* Status Trace */}
              <p className="mt-5 font-mono text-xs text-[#66716B]">Diperiksa otomatis ›</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#C4CCC8]">
                Memeriksa bukti{" "}
                <span className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-xs text-amber-300">
                  ● Wonokromo
                </span>{" "}
                <span className="text-white">Botol PET & kardus terpilah</span> serta membersihkan metadata GPS foto
                demi privasi.
              </p>

              {/* Riwayat Aksi Hijau (Real App List) */}
              <div className="mt-5">
                <p className="text-xs font-medium text-[#88938D]">Riwayat Aksi Hijau · 2</p>
                <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.05] text-xs">
                  <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <SignalBars active={3} />
                      <span className="font-mono text-[11px] text-[#66716B]">AKSI-01</span>
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      <span className="truncate text-[#E2E8E4]">Pilah Sampah · 1.5 kg, Wonokromo</span>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-emerald-400">+40 pts</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <SignalBars active={3} />
                      <span className="font-mono text-[11px] text-[#66716B]">AKSI-02</span>
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      <span className="truncate text-[#E2E8E4]">Transportasi Rendah Emisi · 4 km</span>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-emerald-400">+30 pts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 font-mono text-xs text-[#88938D]">
              <span className="truncate">Metadata GPS dibersihkan otomatis...</span>
              <span className="text-[#66716B]">2x / hari</span>
            </div>
          </div>

          {/* Window 3 (Center-Right Main): /dashboard/marketplace — Katalog Voucher UMKM (Exact Grouped List Structure) */}
          <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0D1310] p-5">
            <div>
              {/* Window Title Bar */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="font-medium text-white">Pusat Hadiah & Prestasi</span>
                  <span className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-[#88938D]">
                    500 EcoPoints
                  </span>
                </div>
                <WindowControls />
              </div>

              {/* Inset Box */}
              <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-3 text-[13px] leading-relaxed text-[#E2E8E4]">
                Tukarkan saldo EcoPoints dengan voucher diskon belanja di warung sayur, kedai kopi, dan toko isi ulang
                Surabaya
              </div>

              {/* Context Line Right-Aligned */}
              <div className="mt-2.5 flex justify-end">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#66716B]">
                  <span className="font-mono text-[#95A09A]">⊙ Katalog UMKM Lokal</span>
                  <span>8 mitra aktif</span>
                </span>
              </div>

              {/* Trace Narrative */}
              <p className="mt-5 font-mono text-xs text-[#66716B]">Katalog voucher ›</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#C4CCC8]">
                Menampilkan kupon mitra UMKM dari katalog aplikasi: dua kategori pangan lokal dan dua produk daur ulang
                rumah tangga.
              </p>

              {/* Group 1: Pangan & Kedai Lokal */}
              <div className="mt-4">
                <p className="text-xs font-medium text-[#88938D]">Makanan & Minuman · 2</p>
                <div className="mt-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.05] text-xs">
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <SignalBars active={3} />
                      <span className="font-mono text-[11px] text-[#66716B]">150 pts</span>
                      <span className="h-2 w-2 shrink-0 rounded-full border border-emerald-400/80" />
                      <span className="truncate text-[#E2E8E4]">Gratis Kopi Susu (Bawa Tumbler Sendiri)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <SignalBars active={3} />
                      <span className="font-mono text-[11px] text-[#66716B]">200 pts</span>
                      <span className="h-2 w-2 shrink-0 rounded-full border border-emerald-400/80" />
                      <span className="truncate text-[#E2E8E4]">Paket Sayur Segar Lokal, Diskon 15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 2: Kebutuhan Rumah & Daur Ulang */}
              <div className="mt-3.5">
                <p className="text-xs font-medium text-[#88938D]">Kebutuhan Rumah · 2</p>
                <div className="mt-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.05] text-xs">
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-[#66716B]">···</span>
                      <span className="font-mono text-[11px] text-[#66716B]">180 pts</span>
                      <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400/80" />
                      <span className="truncate text-[#E2E8E4]">Sabun Batang Olahan Minyak Jelantah</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-[#66716B]">···</span>
                      <span className="font-mono text-[11px] text-[#66716B]">250 pts</span>
                      <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400/80" />
                      <span className="truncate text-[#E2E8E4]">Isi Ulang Sabun Cuci Piring 500 ml</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Window 4 (Right Edge): /gov/dashboard — Laporan Sampah DLH */}
          <div className="hidden flex-col justify-between rounded-xl border border-white/[0.07] bg-[#0C120E] p-5 opacity-55 xl:flex">
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#95A09A]">
                  <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                  <span>Laporan Sampah</span>
                </div>
                <WindowControls />
              </div>

              <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.025] p-3 text-xs leading-relaxed text-[#88938D]">
                Tindak lanjuti laporan titik sampah berkoordinat GPS dari warga di 31 kecamatan
              </div>

              <p className="mt-4 font-mono text-xs text-[#66716B]">Disposisi regu DLH ›</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#88938D]">
                Menghubungkan laporan lapangan dengan Tim Truk DLH dan Satuan Drainase SDA.
              </p>

              <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-[#C8D0CC]">
                <span className="font-mono text-[11px] text-[#66716B]">wr-demo-01</span>{" "}
                <span className="text-emerald-400">●</span> Wonokromo
              </div>
            </div>

            <div className="mt-4 font-mono text-[11px] text-[#5E6862]">
              Rute: <span className="text-[#88938D]">/gov/dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
