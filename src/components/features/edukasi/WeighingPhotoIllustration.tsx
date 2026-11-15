interface WeighingPhotoIllustrationProps {
  compact?: boolean;
}

/**
 * Labeled vector illustration depicting a single transaction photo that captures
 * both sorted material (PET bottles & folded cardboard) and the digital scale display.
 */
export default function WeighingPhotoIllustration({
  compact = false,
}: WeighingPhotoIllustrationProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-emerald-900/15 bg-gradient-to-br from-[#F4FBF7] via-white to-[#ECF7F1] ${
        compact ? "h-full rounded-none border-0" : "p-3 sm:p-4"
      }`}
    >
      {!compact && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-900">
            Ilustrasi berlabel · Sampai foto asli tersedia
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#3B5B49]">
            1 bingkai foto = material + angka timbang
          </span>
        </div>
      )}

      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-label="Ilustrasi satu foto yang menampilkan botol PET dan kardus di atas timbangan digital dengan angka layar 3.45 kg secara bersamaan"
        className={`h-auto w-full ${compact ? "h-full object-cover" : "rounded-xl border border-emerald-950/10 bg-[#0F3D2E]"}`}
      >
        <defs>
          <linearGradient id="bgScene" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#124735" />
            <stop offset="100%" stopColor="#09291E" />
          </linearGradient>
          <linearGradient id="scalePlate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="cardboardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D6A874" />
            <stop offset="100%" stopColor="#B68049" />
          </linearGradient>
          <linearGradient id="petGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.72" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="640" height="360" fill="url(#bgScene)" />

        {/* Subtle floor surface */}
        <rect x="0" y="276" width="640" height="84" fill="#071F17" />
        <line x1="0" y1="276" x2="640" y2="276" stroke="#1D9E75" strokeOpacity="0.35" strokeWidth="2" />

        {/* Camera viewfinder framing */}
        <g stroke="#6EE7B7" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M24 52 V24 H56" />
          <path d="M584 24 H616 V52" />
          <path d="M24 308 V336 H56" />
          <path d="M584 336 H616 V308" />
        </g>

        {/* Camera frame top indicator */}
        <g transform="translate(38, 36)">
          <rect width="198" height="26" rx="13" fill="#062017" fillOpacity="0.82" stroke="#34D399" strokeOpacity="0.45" />
          <circle cx="16" cy="13" r="4.5" fill="#10B981" />
          <text
            x="28"
            y="17"
            fill="#ECFDF5"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            KAMERA BUKTI BONI
          </text>
        </g>

        {/* Digital scale back pole & LCD head unit (clearly visible next to material) */}
        <g transform="translate(362, 74)">
          {/* Vertical stand */}
          <rect x="92" y="108" width="16" height="106" rx="4" fill="#475569" />
          <rect x="96" y="108" width="5" height="106" fill="#64748B" />

          {/* Display housing */}
          <rect x="14" y="14" width="174" height="102" rx="14" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
          {/* Highlight ring around LCD */}
          <rect
            x="26"
            y="30"
            width="150"
            height="64"
            rx="8"
            fill="#064E3B"
            stroke="#34D399"
            strokeWidth="2"
          />
          <text
            x="36"
            y="47"
            fill="#A7F3D0"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            BERAT AKTUAL
          </text>
          <text
            x="101"
            y="81"
            textAnchor="middle"
            fill="#6EE7B7"
            fontSize="30"
            fontWeight="800"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            3.45 kg
          </text>
        </g>

        {/* Scale base & weighing platform */}
        <g transform="translate(110, 232)">
          {/* Base shadow */}
          <ellipse cx="176" cy="64" rx="164" ry="12" fill="#020D09" fillOpacity="0.6" />
          {/* Scale body */}
          <rect x="24" y="24" width="304" height="32" rx="8" fill="#334155" stroke="#64748B" strokeWidth="2" />
          {/* Feet */}
          <rect x="44" y="56" width="22" height="8" rx="3" fill="#0F172A" />
          <rect x="286" y="56" width="22" height="8" rx="3" fill="#0F172A" />
          {/* Stainless weighing plate */}
          <rect x="16" y="10" width="320" height="16" rx="6" fill="url(#scalePlate)" stroke="#F8FAFC" strokeWidth="1.5" />
        </g>

        {/* Folded cardboard stack on scale platform */}
        <g transform="translate(136, 178)">
          <rect x="0" y="38" width="166" height="16" rx="3" fill="url(#cardboardGrad)" stroke="#78350F" strokeWidth="1.5" />
          <rect x="4" y="22" width="160" height="16" rx="3" fill="#C9965E" stroke="#78350F" strokeWidth="1.5" />
          <rect x="2" y="6" width="156" height="16" rx="3" fill="url(#cardboardGrad)" stroke="#78350F" strokeWidth="1.5" />
          {/* Corrugated line detail */}
          <line x1="12" y1="30" x2="152" y2="30" stroke="#92400E" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="6 4" />
          <line x1="10" y1="46" x2="154" y2="46" stroke="#92400E" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="6 4" />
        </g>

        {/* Sorted PET bottles on top / beside cardboard on the scale */}
        <g transform="translate(292, 134)">
          {/* Clear/blue PET bottle 1 standing */}
          <g transform="translate(0, 0)">
            <rect x="18" y="0" width="14" height="9" rx="2" fill="#0284C7" />
            <path d="M16 9 H34 L42 26 V96 C42 100 38 104 34 104 H16 C12 104 8 100 8 96 V26 Z" fill="url(#petGrad)" stroke="#E0F2FE" strokeWidth="1.8" />
            <rect x="10" y="42" width="30" height="24" rx="2" fill="#0EA5E9" fillOpacity="0.8" />
            <text x="25" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">PET 1</text>
          </g>
          {/* Clear PET bottle 2 */}
          <g transform="translate(42, 12)">
            <rect x="16" y="0" width="12" height="8" rx="2" fill="#059669" />
            <path d="M14 8 H30 L37 22 V84 C37 88 34 92 30 92 H14 C10 92 7 88 7 84 V22 Z" fill="url(#petGrad)" stroke="#E0F2FE" strokeWidth="1.8" />
            <rect x="9" y="38" width="26" height="20" rx="2" fill="#10B981" fillOpacity="0.75" />
            <text x="22" y="51" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800">PET</text>
          </g>
        </g>

        {/* Annotation callout 1: Material */}
        <g transform="translate(56, 102)">
          <rect width="194" height="44" rx="10" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="12" y="19" fill="#0F3D2E" fontSize="11" fontWeight="800">
            1. Material terpilah terlihat
          </text>
          <text x="12" y="34" fill="#3B5B49" fontSize="10" fontWeight="600">
            Botol PET &amp; kardus terlipat utuh
          </text>
          <path d="M150 44 L190 76" stroke="#6EE7B7" strokeWidth="2" strokeDasharray="4 3" />
        </g>

        {/* Annotation callout 2: Scale reading */}
        <g transform="translate(370, 212)">
          <rect width="218" height="44" rx="10" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="12" y="19" fill="#0F3D2E" fontSize="11" fontWeight="800">
            2. Layar timbang terbaca jelas
          </text>
          <text x="12" y="34" fill="#3B5B49" fontSize="10" fontWeight="600">
            Angka 3.45 kg di frame yang sama
          </text>
          <path d="M96 0 L96 -26" stroke="#6EE7B7" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      </svg>
    </div>
  );
}
