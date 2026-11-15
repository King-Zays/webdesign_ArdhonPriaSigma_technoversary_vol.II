"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDepositDemoRecords } from "@/hooks/useDepositDemoRecords";
import {
  DEPOSIT_AREAS,
  DEPOSIT_MATERIALS,
  DEPOSIT_METHODS,
  DEPOSIT_STATUS_LABELS,
  getDepositTotals,
  useDepositDemoStore,
} from "@/store/deposit-demo.store";
import type { DemoDeposit, DepositDraft } from "@/store/deposit-demo.store";
import { cn } from "@/utils/cn";

const weight = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 });
const dateFormat = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeZone: "UTC" });
const fieldClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
const dashboardFieldClass =
  "w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20";
const dashboardLabelClass = "mb-1 block text-xs font-semibold text-gray-600";
const dashboardButtonClass =
  "inline-flex items-center justify-center rounded-xl bg-[#2D5F3F] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#245033] sm:text-sm";
const buttonClass = "rounded-lg bg-[#0F3D2E] px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900";

const CITIZEN_STATUS_CLASSES: Record<DemoDeposit["status"], string> = {
  requested: "border-gray-200 bg-gray-50 text-gray-700",
  scheduled: "border-sky-200 bg-sky-50 text-sky-800",
  collected: "border-amber-200 bg-amber-50 text-amber-800",
  weighed: "border-amber-200 bg-amber-50 text-amber-800",
  verified: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

function formatDate(date: string) {
  return dateFormat.format(new Date(`${date}T00:00:00Z`));
}

function DepositHistory({
  title,
  deposits,
  hydrated,
  actions,
  variant = "collector",
}: {
  title: string;
  deposits: DemoDeposit[];
  hydrated: boolean;
  actions?: (deposit: DemoDeposit) => ReactNode;
  variant?: "collector" | "citizen";
}) {
  if (variant === "citizen") {
    return (
      <div className="border-t border-gray-100 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-bold text-[#0F3D2E]">{title}</h3>
          <span className="text-[11px] font-medium text-gray-500">
            {hydrated ? `${deposits.length} pengajuan` : "Memuat…"}
          </span>
        </div>
        {hydrated && deposits.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {deposits.map((deposit) => (
              <li key={deposit.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold text-gray-800 sm:text-sm">
                    {DEPOSIT_MATERIALS[deposit.material]}
                  </p>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold",
                      CITIZEN_STATUS_CLASSES[deposit.status]
                    )}
                  >
                    {DEPOSIT_STATUS_LABELS[deposit.status]}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
                  {DEPOSIT_METHODS[deposit.method]} · Estimasi {weight.format(deposit.estimatedKg)} kg
                  {deposit.actualKg !== null && ` · Hasil timbang ${weight.format(deposit.actualKg)} kg`}
                  {deposit.scheduledDate && ` · Jadwal jemput ${formatDate(deposit.scheduledDate)}`}
                </p>
                <details className="mt-1.5 text-xs text-gray-600">
                  <summary className="inline-block cursor-pointer text-[11px] font-semibold text-[#1D9E75] transition-colors hover:text-[#15803D]">
                    Detail setoran {deposit.id.slice(0, 8)}
                  </summary>
                  <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-xl bg-[#F9FAFB] px-3 py-2.5 text-[11px] text-gray-600">
                    <dt className="font-semibold text-gray-700">Wilayah</dt>
                    <dd>{deposit.area ?? "Tanpa catatan"}</dd>
                    {deposit.method === "pickup" && (
                      <>
                        <dt className="font-semibold text-gray-700">Tanggal usulan</dt>
                        <dd>{deposit.preferredDate ? formatDate(deposit.preferredDate) : "Tanpa catatan"}</dd>
                      </>
                    )}
                    <dt className="font-semibold text-gray-700">Pemeriksaan material</dt>
                    <dd>{deposit.materialConfirmed ? "Material sesuai pengajuan" : "Tanpa catatan pemeriksaan"}</dd>
                  </dl>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl bg-[#F9FAFB] px-4 py-8 text-center text-xs text-gray-500">
            {hydrated ? "Pengajuan simulasi akan muncul di sini." : "Memuat setoran…"}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-[#0F3D2E]">{title}</h3>
      {hydrated && deposits.length > 0 ? (
        <ul className="mt-3 space-y-3">
          {deposits.map((deposit) => (
            <li key={deposit.id} className="rounded-xl border border-emerald-100 bg-white p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-[#0F3D2E]">{DEPOSIT_MATERIALS[deposit.material]}</p>
                <p className="text-sm font-medium text-emerald-800">{DEPOSIT_STATUS_LABELS[deposit.status]}</p>
              </div>
              <p className="mt-1 text-sm text-slate-700">
                {DEPOSIT_METHODS[deposit.method]} · Estimasi {weight.format(deposit.estimatedKg)} kg
                {deposit.actualKg !== null && ` · Hasil timbang ${weight.format(deposit.actualKg)} kg`}
              </p>
              {deposit.scheduledDate && (
                <p className="mt-1 text-sm font-medium text-slate-700">Jadwal jemput {formatDate(deposit.scheduledDate)}</p>
              )}
              <details className="mt-3 text-sm text-slate-700">
                <summary className="cursor-pointer font-semibold text-emerald-800">
                  Detail setoran {deposit.id.slice(0, 8)}
                </summary>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                  <dt>Wilayah</dt><dd>{deposit.area ?? "Tanpa catatan"}</dd>
                  {deposit.method === "pickup" && <>
                    <dt>Tanggal usulan</dt>
                    <dd>{deposit.preferredDate ? formatDate(deposit.preferredDate) : "Tanpa catatan"}</dd>
                  </>}
                  <dt>Pemeriksaan material</dt>
                  <dd>{deposit.materialConfirmed ? "Material sesuai pengajuan" : "Tanpa catatan pemeriksaan"}</dd>
                </dl>
              </details>
              {actions?.(deposit)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-600">{hydrated ? "Pengajuan simulasi akan muncul di sini." : "Memuat setoran…"}</p>
      )}
    </div>
  );
}

export function CitizenDepositDemo() {
  const [method, setMethod] = useState<DepositDraft["method"]>("dropoff");
  const [message, setMessage] = useState("");
  const history = useDepositDemoRecords();
  const submit = useDepositDemoStore((state) => state.submit);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const added = submit({
      material: data.get("material") as DepositDraft["material"],
      method,
      estimatedKg: Number(data.get("estimatedKg")),
      area: data.get("area") as DepositDraft["area"],
      preferredDate: method === "pickup" ? String(data.get("preferredDate") ?? "") : undefined,
    });
    if (added) {
      form.reset();
      setMethod("dropoff");
    }
    setMessage(added ? "Pengajuan simulasi masuk ke antrean pengepul." : "Periksa estimasi berat dan tanggal jemput.");
  }

  return (
    <section
      id="setoran-sampah"
      className="scroll-mt-6 rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-[#0F3D2E]">Simulasi Setoran Sampah</h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Pilih material dan cara setor. Data contoh tersimpan di browser ini.
          </p>
        </div>
        <Link
          href="/pengepul"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D9E75] transition-colors hover:text-[#15803D]"
        >
          Buka simulasi pengepul
          <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 grid gap-6 border-t border-gray-100 pt-4 lg:grid-cols-2 lg:items-start lg:gap-8">
        <div>
          <h3 className="mb-3 text-xs font-bold text-[#0F3D2E]">Formulir pengajuan</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={dashboardLabelClass}>Jenis material</span>
                <select name="material" className={dashboardFieldClass}>
                  {Object.entries(DEPOSIT_MATERIALS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={dashboardLabelClass}>Cara setor</span>
                <select
                  name="method"
                  value={method}
                  onChange={(event) => setMethod(event.target.value as DepositDraft["method"])}
                  className={dashboardFieldClass}
                >
                  {Object.entries(DEPOSIT_METHODS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className={cn("grid gap-3", method === "pickup" ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
              <label className="block">
                <span className={dashboardLabelClass}>Wilayah contoh</span>
                <select name="area" className={dashboardFieldClass}>
                  {DEPOSIT_AREAS.map((area) => <option key={area}>{area}</option>)}
                </select>
              </label>
              {method === "pickup" && (
                <label className="block">
                  <span className={dashboardLabelClass}>Tanggal jemput yang diusulkan</span>
                  <input name="preferredDate" type="date" required className={dashboardFieldClass} />
                </label>
              )}
              <label className="block">
                <span className={dashboardLabelClass}>Perkiraan berat (kg)</span>
                <input
                  name="estimatedKg"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  placeholder="Contoh: 1.5"
                  className={dashboardFieldClass}
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button type="submit" className={dashboardButtonClass}>
                Ajukan setoran simulasi
              </button>
              {message && (
                <p role="status" className="text-xs font-medium text-gray-600">
                  {message}
                </p>
              )}
            </div>
          </form>
        </div>

        <DepositHistory title="Riwayat dan status setoran" variant="citizen" {...history} />
      </div>
    </section>
  );
}

function CollectorActions({ deposit }: { deposit: DemoDeposit }) {
  const schedule = useDepositDemoStore((state) => state.schedule);
  const collect = useDepositDemoStore((state) => state.collect);
  const weigh = useDepositDemoStore((state) => state.weigh);
  const verify = useDepositDemoStore((state) => state.verify);

  function handleSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    schedule(deposit.id, String(data.get("scheduledDate") ?? ""));
  }

  function handleWeigh(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    weigh(deposit.id, Number(data.get("actualKg")), data.get("materialConfirmed") === "on");
  }

  if (deposit.method === "pickup" && (deposit.status === "requested" || deposit.status === "scheduled")) {
    return (
      <div className="mt-4 space-y-3">
        <form onSubmit={handleSchedule} className="flex flex-wrap items-end gap-3">
          <label className="w-full text-sm font-medium sm:w-48">
            Tanggal jemput
            <input name="scheduledDate" type="date" required defaultValue={deposit.scheduledDate ?? deposit.preferredDate} className={fieldClass} />
          </label>
          <button type="submit" className={buttonClass}>
            {deposit.status === "scheduled" ? "Ubah jadwal jemput" : "Jadwalkan jemput"}
          </button>
        </form>
        {deposit.status === "scheduled" && (
          <button type="button" onClick={() => collect(deposit.id)} className={buttonClass}>Tandai sudah dijemput</button>
        )}
      </div>
    );
  }
  if (deposit.status === "requested" || deposit.status === "collected") {
    return (
      <form onSubmit={handleWeigh} className="mt-4 space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input name="materialConfirmed" type="checkbox" required />
          Saya sudah memeriksa bahwa material sesuai pengajuan
        </label>
        <div className="flex flex-wrap items-end gap-3">
          <label className="w-full text-sm font-medium sm:w-48">
            Hasil timbang (kg)
            <input name="actualKg" type="number" min="0.01" step="0.01" required className={fieldClass} />
          </label>
          <button type="submit" className={buttonClass}>Catat hasil timbang</button>
        </div>
      </form>
    );
  }
  if (deposit.status === "weighed") {
    return (
      <button type="button" onClick={() => verify(deposit.id)} className={`mt-4 ${buttonClass}`}>
        Simulasikan verifikasi
      </button>
    );
  }
  return null;
}

export function CollectorDepositDemo() {
  const history = useDepositDemoRecords();
  const { deposits } = history;
  const totals = getDepositTotals(deposits);
  const schedule = deposits
    .filter((deposit) => deposit.status === "scheduled")
    .sort((a, b) => (a.scheduledDate ?? "").localeCompare(b.scheduledDate ?? ""));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-emerald-100 bg-[#FAFDFB] p-4">
          <h2 className="font-bold text-[#0F3D2E]">Profil pengepul contoh</h2>
          <p className="mt-2 text-sm text-slate-700">Pengepul Demo BONI</p>
          <p className="mt-1 text-sm text-slate-700">Wilayah simulasi {DEPOSIT_AREAS.join(" dan ")}.</p>
        </section>
        <section className="rounded-xl border border-emerald-100 bg-[#FAFDFB] p-4">
          <h2 className="font-bold text-[#0F3D2E]">Statistik simulasi</h2>
          <p className="mt-2 text-sm text-slate-700">{deposits.length} pengajuan · {totals.count} terverifikasi</p>
          <p className="mt-1 text-sm text-slate-700">{weight.format(totals.kg)} kg berat terverifikasi</p>
        </section>
      </div>
      <section className="rounded-xl border border-emerald-100 bg-[#FAFDFB] p-4">
        <h2 className="font-bold text-[#0F3D2E]">Jadwal penjemputan</h2>
        {schedule.length ? (
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {schedule.map((deposit) => (
              <li key={deposit.id}>
                {deposit.scheduledDate && formatDate(deposit.scheduledDate)} · {DEPOSIT_MATERIALS[deposit.material]}
                {deposit.area && ` · ${deposit.area}`} · {deposit.id.slice(0, 8)}
              </li>
            ))}
          </ul>
        ) : <p className="mt-2 text-sm text-slate-700">Belum ada penjemputan terjadwal.</p>}
      </section>
      <DepositHistory title="Antrean dan riwayat setoran" {...history} actions={(deposit) => <CollectorActions deposit={deposit} />} />
      <Link href="/dashboard#setoran-sampah" className="mt-6 inline-block font-semibold text-emerald-800 underline underline-offset-4">
        Buka setoran di Dashboard Warga
      </Link>
    </div>
  );
}
