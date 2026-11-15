const programExamples = [
  {
    name: "Edukasi pilah PET dan kardus",
    area: "Wonokromo",
    status: "Draf materi",
    indicator: "Jumlah peserta edukasi",
  },
  {
    name: "Setoran berkala warga",
    area: "Gubeng",
    status: "Rencana uji coba",
    indicator: "Berat setoran terverifikasi",
  },
];

export default function ProgramPreviewList({ variant = "admin" }: { variant?: "admin" | "gov" }) {
  if (variant === "gov") {
    return (
      <div>
        <p className="text-xs leading-5 text-gray-500">
          Data contoh untuk rancangan pengelolaan program lingkungan.
        </p>
        <ul className="mt-4 grid gap-3.5 md:grid-cols-2">
          {programExamples.map((program) => (
            <li
              key={program.name}
              className="rounded-xl border border-gray-200/90 bg-[#FAFCFB] p-4 shadow-2xs"
            >
              <h3 className="text-[14px] leading-[20px] font-bold text-[#0F3D2E]">
                {program.name}
              </h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs leading-[18px] text-gray-600">
                <span className="font-semibold text-gray-700">{program.area}</span>
                <span aria-hidden="true" className="text-gray-300">·</span>
                <span>{program.status}</span>
              </p>
              <p className="mt-2 border-t border-gray-200/70 pt-2 text-[11px] leading-[16px] font-medium text-gray-500">
                Indikator {program.indicator.toLowerCase()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-700">Data contoh untuk rancangan pengelolaan program lingkungan.</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {programExamples.map((program) => (
          <li key={program.name} className="rounded-xl border border-emerald-100 bg-[#FAFDFB] p-4">
            <h3 className="font-semibold text-[#0F3D2E]">{program.name}</h3>
            <p className="mt-1 text-sm text-slate-700">{program.area} · {program.status}</p>
            <p className="mt-2 text-sm text-slate-700">Indikator {program.indicator.toLowerCase()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
