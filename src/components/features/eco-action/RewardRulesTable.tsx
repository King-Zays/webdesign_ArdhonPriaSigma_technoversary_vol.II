import { GREEN_ACTION_LIST } from "@/config/green-actions";
import { IMPACT_FACTORS } from "@/config/impact-factors";
import DataBadge from "@/components/common/DataBadge";
import { GreenActionIcon } from "@/components/common/icons";

/** Action → Evidence → Verification → Impact → EcoPoints, rendered from config. */
export default function RewardRulesTable() {
  return (
    <section
      aria-labelledby="rules-heading"
      className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 id="rules-heading" className="text-base font-bold text-[#1A1A1A]">
              Ketentuan Perolehan EcoPoints
            </h2>
            <DataBadge variant="prototype" label="Ketentuan Poin" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Ringkasan syarat bukti foto, batas pengajuan harian, dan perolehan poin per aksi terverifikasi.
          </p>
        </div>
      </div>

      {/* Mobile: daftar terstruktur agar nama aksi langsung terhubung dengan syarat & poinnya */}
      <ul className="divide-y divide-[#E5E7EB] overflow-hidden rounded-xl border border-[#E5E7EB] md:hidden">
        {GREEN_ACTION_LIST.map((a) => (
          <li key={a.type} className="space-y-2.5 bg-white p-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F0FAF4]">
                  <GreenActionIcon type={a.type} size={16} />
                </span>
                <p className="text-sm font-bold text-[#1A1A1A]">{a.labelId}</p>
              </div>
              <span className="shrink-0 rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-xs font-extrabold tabular-nums text-[#2D5F3F]">
                +{a.ecoPoints} EcoPoints
              </span>
            </div>
            <dl className="space-y-1.5 text-xs">
              <div>
                <dt className="text-[11px] font-semibold text-gray-500">Kriteria Bukti Foto</dt>
                <dd className="mt-0.5 leading-relaxed text-gray-700">{a.evidenceRequirement}</dd>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <dt className="text-[11px] font-semibold text-gray-500">Batas &amp; Verifikasi</dt>
                  <dd className="mt-0.5 text-gray-700">
                    <span className="font-semibold text-[#1A1A1A]">Maks {a.dailyLimit}x/hari</span> · Analisis AI + validasi
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold text-gray-500">Metrik Dampak</dt>
                  <dd className="mt-0.5 text-gray-700">{a.impactMetric}</dd>
                </div>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Desktop/Tablet: tabel lebar dengan ruang utama untuk Kriteria Bukti Foto */}
      <div className="hidden overflow-x-auto rounded-xl border border-[#E5E7EB] md:block">
        <table className="w-full min-w-[680px] border-collapse text-left text-xs">
          <caption className="sr-only">Tabel ketentuan perolehan poin aksi hijau</caption>
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-bold uppercase tracking-wide text-gray-600">
              <th scope="col" className="w-[21%] px-4 py-3">Aksi Hijau</th>
              <th scope="col" className="w-[37%] px-4 py-3">Kriteria Bukti Foto</th>
              <th scope="col" className="w-[17%] px-4 py-3">Batas &amp; Verifikasi</th>
              <th scope="col" className="w-[15%] px-4 py-3">Metrik Dampak</th>
              <th scope="col" className="w-[10%] px-4 py-3 text-right">EcoPoints</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]/80 bg-white">
            {GREEN_ACTION_LIST.map((a) => (
              <tr key={a.type} className="align-top transition-colors hover:bg-[#FAFCFB]">
                <th scope="row" className="px-4 py-3.5 font-bold text-[#1A1A1A]">
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F0FAF4]">
                      <GreenActionIcon type={a.type} size={15} />
                    </span>
                    <span className="leading-snug">{a.labelId}</span>
                  </span>
                </th>
                <td className="whitespace-normal px-4 py-3.5 leading-relaxed text-gray-700">
                  {a.evidenceRequirement}
                </td>
                <td className="px-4 py-3.5 leading-relaxed text-gray-600">
                  <span className="block font-semibold text-[#1A1A1A]">Maks {a.dailyLimit}x/hari</span>
                  <span className="text-[11px] text-gray-500">Analisis AI + validasi</span>
                </td>
                <td className="px-4 py-3.5 leading-relaxed text-gray-600">{a.impactMetric}</td>
                <td className="px-4 py-3.5 text-right tabular-nums">
                  <span className="inline-block rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-xs font-extrabold text-[#2D5F3F]">
                    +{a.ecoPoints}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-xl border border-[#E5E7EB]/80 bg-[#F9FAFB] px-4 py-3 text-xs leading-relaxed text-gray-600">
        EcoPoints merupakan sistem poin penghargaan komunitas (bukan uang tunai atau instrumen spekulatif) yang hanya diterbitkan untuk aksi dengan status
        &ldquo;Terverifikasi&rdquo;. Estimasi pengurangan emisi CO₂e mengacu pada faktor emisi kelistrikan nasional ESDM ({IMPACT_FACTORS.gridElectricity.value} kg CO₂/kWh) dan{" "}
        faktor emisi perjalanan motor ({IMPACT_FACTORS.motorcycleTravel.value} kg CO₂e/km). Aksi tanpa faktor konversi baku dilaporkan dalam satuan fisik.
      </p>
    </section>
  );
}
