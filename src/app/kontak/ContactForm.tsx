"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Handshake,
  HelpCircle,
  MessageSquare,
  Recycle,
  Store,
  User,
  Users,
} from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import ContactSelect, { type ContactSelectOption } from "./ContactSelect";

export type ContactTopic = "" | "sorting" | "demo" | "collaboration" | "other";
export type ContactRole =
  | "warga"
  | "bank-sampah"
  | "umkm"
  | "pemerintah"
  | "lainnya";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TOPIC_OPTIONS: readonly ContactSelectOption<
  Exclude<ContactTopic, "">
>[] = [
  {
    value: "collaboration",
    label: "Kolaborasi bank sampah / UMKM",
    description: "Kemitraan pengumpulan, voucher, & komunitas",
    icon: Handshake,
  },
  {
    value: "demo",
    label: "Bantuan & akses demo BONI",
    description: "Kendala simulasi, Portal Warga, atau Pemkot",
    icon: HelpCircle,
  },
  {
    value: "sorting",
    label: "Pilah dan setor sampah",
    description: "Panduan botol PET, kardus, & jelantah",
    icon: Recycle,
  },
  {
    value: "other",
    label: "Pertanyaan umum / lainnya",
    description: "Masukan, saran fitur, atau hal lainnya",
    icon: MessageSquare,
  },
];

const ROLE_OPTIONS: readonly ContactSelectOption<ContactRole>[] = [
  {
    value: "warga",
    label: "Warga / Masyarakat",
    description: "Pelapor aksi hijau & pengguna demo warga",
    icon: User,
  },
  {
    value: "bank-sampah",
    label: "Pengelola Bank Sampah",
    description: "Unit bank sampah RW / kelurahan",
    icon: Recycle,
  },
  {
    value: "umkm",
    label: "Mitra UMKM Lokal",
    description: "Penyedia hadiah dan voucher",
    icon: Store,
  },
  {
    value: "pemerintah",
    label: "Instansi / Dinas Terkait",
    description: "Pemantauan wilayah & kelurahan/DLH",
    icon: Building2,
  },
  {
    value: "lainnya",
    label: "Lainnya",
    description: "Akademisi, relawan, atau tamu umum",
    icon: Users,
  },
];

const TOPIC_META: Record<
  Exclude<ContactTopic, "">,
  {
    badge: string;
    hint: string;
    icon: typeof Handshake;
  }
> = {
  collaboration: {
    badge: "Kemitraan Ekosistem",
    hint: "Cocok untuk pengelola bank sampah, UMKM lokal, sekolah, dan komunitas Surabaya.",
    icon: Handshake,
  },
  demo: {
    badge: "Akses & Kendala Demo",
    hint: "Laporkan bug tampilan, alur Portal Warga/Pemkot, atau kendala simulasi AI verifikasi aksi.",
    icon: HelpCircle,
  },
  sorting: {
    badge: "Edukasi Pilah Sampah",
    hint: "Tanyakan standar pemilahan botol PET, kardus kering, atau penyimpanan minyak jelantah rumah tangga.",
    icon: Recycle,
  },
  other: {
    badge: "Masukan & Pertanyaan",
    hint: "Sampaikan saran pengembangan BONI atau pertanyaan umum lainnya kepada tim kami.",
    icon: MessageSquare,
  },
};

function FieldCheckBadge({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          aria-hidden="true"
          className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#1D9E75]/15 text-[#1D9E75]"
        >
          <Check size={10} strokeWidth={3} />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function ContactForm({
  initialTopic = "collaboration",
}: {
  initialTopic?: ContactTopic;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const [role, setRole] = useState<ContactRole>("warga");
  const [message, setMessage] = useState("");
  const [demoConfirmed, setDemoConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hydrated = useHydrated();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(29, 158, 117, 0.095), transparent 72%)`;

  const hasName = fullName.trim().length >= 2;
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasTopic = topic !== "";
  const hasMessage = message.trim().length >= 5;
  const completedCount = [
    hasName,
    hasEmail,
    hasTopic,
    hasMessage,
    demoConfirmed,
  ].filter(Boolean).length;
  const progressRatio = completedCount / 5;

  const activeTopicMeta = topic ? TOPIC_META[topic] : null;
  const TopicIcon = activeTopicMeta?.icon ?? MessageSquare;

  function handleMouseMove(event: MouseEvent<HTMLFormElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function previewInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const inputClassName =
    "w-full rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-all duration-200 hover:border-emerald-900/25 focus:border-[#1D9E75] focus:bg-white focus:shadow-[0_0_0_3px_rgba(29,158,117,0.12)] focus:outline-none";

  return (
    <motion.form
      aria-labelledby="contact-title"
      onSubmit={previewInquiry}
      onChange={() => {
        if (submitted) setSubmitted(false);
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.12, ease: EASE_OUT_EXPO }}
      className={`group/card relative space-y-4 rounded-2xl border bg-white p-6 transition-shadow duration-300 sm:p-7 ${
        submitted
          ? "border-[#1D9E75]/55 shadow-[0_22px_48px_-18px_rgba(29,158,117,0.22)]"
          : "border-emerald-900/12 shadow-[0_14px_34px_-16px_rgba(15,61,46,0.10)] hover:border-emerald-900/20 hover:shadow-[0_24px_52px_-20px_rgba(15,61,46,0.16)]"
      }`}
    >
      {/* Decorative clipped frame for spotlight & top progress bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        {/* Interactive cursor spotlight */}
        <motion.div
          className="absolute inset-0 transition-opacity duration-300 motion-reduce:hidden"
          style={{
            background: spotlightBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Top animated progress bar along card edge */}
        <div className="absolute inset-x-0 top-0 h-1 bg-emerald-950/[0.05]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-[#1D9E75] via-[#10B981] to-[#0F3D2E]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: submitted ? 1 : progressRatio }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          />
        </div>
      </div>

      {/* Live status & progress header */}
      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/8 pb-3.5 pt-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 motion-reduce:hidden ${
                submitted
                  ? "animate-ping bg-[#1D9E75]"
                  : completedCount === 5
                    ? "animate-ping bg-emerald-500"
                    : "animate-pulse bg-[#1D9E75]/70"
              }`}
            />
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                submitted ? "bg-[#0F3D2E]" : "bg-[#1D9E75]"
              }`}
            />
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={
                submitted
                  ? "submitted"
                  : completedCount === 5
                    ? "ready"
                    : "draft"
              }
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="text-xs font-bold tracking-tight text-[#0F3D2E]"
            >
              {submitted
                ? "Simulasi berhasil dijalankan"
                : completedCount === 5
                  ? "Isian lengkap · siap disimulasikan"
                  : "Formulir simulasi interaktif"}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.span
          key={completedCount}
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors ${
            completedCount === 5 || submitted
              ? "bg-[#E6F7EE] text-[#0F3D2E]"
              : "bg-[#F4F9F6] text-[#426352]"
          }`}
        >
          {completedCount}/5 wajib terisi
        </motion.span>
      </div>

      {/* Row 1: Full Name & Email */}
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-full-name"
            className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#0F3D2E]"
          >
            <span>Nama lengkap</span>
            <FieldCheckBadge active={hasName} />
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nama lengkap Anda"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#0F3D2E]"
          >
            <span>Alamat email</span>
            <FieldCheckBadge active={hasEmail} />
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            required
            className={inputClassName}
          />
        </div>
      </div>

      {/* Row 2: Topic & Organization */}
      <div className="relative z-30 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            id="contact-topic-label"
            htmlFor="contact-topic"
            className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#0F3D2E]"
          >
            <span>Topik kebutuhan</span>
            <FieldCheckBadge active={hasTopic} />
          </label>
          <ContactSelect
            id="contact-topic"
            name="topic"
            labelId="contact-topic-label"
            value={topic}
            onChange={(nextTopic) => {
              setTopic(nextTopic);
              if (submitted) setSubmitted(false);
            }}
            options={TOPIC_OPTIONS}
            placeholder="Pilih topik pertanyaan"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact-org"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Komunitas / UMKM (opsional)
          </label>
          <input
            id="contact-org"
            name="organization"
            placeholder="Contoh: Bank Sampah RW 04"
            className={inputClassName}
          />
        </div>
      </div>

      {/* Animated contextual topic note */}
      <AnimatePresence mode="wait">
        {activeTopicMeta && (
          <motion.div
            key={topic}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            className="relative flex items-start gap-2.5 rounded-xl border border-emerald-900/10 bg-[#F5FAF7]/90 px-3.5 py-2.5 text-xs text-[#2D5542]"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white text-[#1D9E75] shadow-sm">
              <TopicIcon size={13} aria-hidden="true" />
            </span>
            <div className="min-w-0 leading-relaxed">
              <span className="font-bold text-[#0F3D2E]">
                {activeTopicMeta.badge}:{" "}
              </span>
              <span>{activeTopicMeta.hint}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 3: Role & Area */}
      <div className="relative z-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            id="contact-role-label"
            htmlFor="contact-role"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Peran
          </label>
          <ContactSelect
            id="contact-role"
            name="role"
            labelId="contact-role-label"
            value={role}
            onChange={(nextRole) => {
              setRole(nextRole);
              if (submitted) setSubmitted(false);
            }}
            options={ROLE_OPTIONS}
            placeholder="Pilih peran Anda"
          />
        </div>

        <div>
          <label
            htmlFor="contact-region"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Wilayah / Kecamatan
          </label>
          <input
            id="contact-region"
            name="region"
            placeholder="Contoh: Wonokromo, Surabaya"
            className={inputClassName}
          />
        </div>
      </div>

      {/* Row 4: Message */}
      <div className="relative">
        <label
          htmlFor="contact-message"
          className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#0F3D2E]"
        >
          <span>Bagaimana kami dapat membantu?</span>
          <FieldCheckBadge active={hasMessage} />
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ceritakan rencana kolaborasi, kendala fitur demo, atau pertanyaan seputar pemilahan sampah..."
          required
          className={`${inputClassName} resize-none`}
        />
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="relative flex items-center gap-2.5 rounded-xl border border-emerald-300/70 bg-[#EFFAF3] px-3.5 py-2.5 text-xs font-semibold text-[#0F3D2E]"
          >
            <CheckCircle2
              size={16}
              className="shrink-0 text-[#1D9E75]"
              aria-hidden="true"
            />
            <span>
              Simulasi berhasil. Isian ini tidak dikirim atau disimpan ke server.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consent + Submit Row (matches Vercel Enterprise footer row) */}
      <div className="relative flex flex-col gap-4 border-t border-emerald-900/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <label
          className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2 text-xs leading-relaxed transition-colors duration-200 ${
            demoConfirmed
              ? "border-[#1D9E75]/35 bg-[#F2FBF6] text-[#0F3D2E]"
              : "border-transparent bg-transparent text-[#426352] hover:bg-[#F7FBF9]"
          }`}
        >
          <input
            name="demoConfirmed"
            type="checkbox"
            checked={demoConfirmed}
            onChange={(e) => setDemoConfirmed(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-emerald-950/25 accent-[#0F3D2E]"
          />
          <span>
            Saya memahami formulir ini hanya untuk simulasi pratinjau demo.
          </span>
        </label>

        <motion.button
          type="submit"
          disabled={!hydrated}
          whileHover={{ y: -2, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-colors hover:bg-[#18533F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2 disabled:opacity-50"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full motion-reduce:hidden"
          />
          <span className="relative">Coba kirim pesan</span>
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="relative transition-transform duration-200 group-hover/btn:translate-x-1"
          />
        </motion.button>
      </div>
    </motion.form>
  );
}
