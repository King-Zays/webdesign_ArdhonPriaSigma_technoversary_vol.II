import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const DEPOSIT_DEMO_KEY = "boni-deposit-demo";

export const DEPOSIT_MATERIALS = {
  pet: "Botol plastik PET",
  cardboard: "Kardus",
} as const;

export const DEPOSIT_METHODS = {
  dropoff: "Setor langsung",
  pickup: "Minta penjemputan",
} as const;

export const DEPOSIT_AREAS = ["Wonokromo", "Gubeng"] as const;

export const DEPOSIT_STATUS_LABELS = {
  requested: "Pengajuan diterima",
  scheduled: "Jemput terjadwal",
  collected: "Sampah sudah dijemput",
  weighed: "Menunggu verifikasi",
  verified: "Terverifikasi (simulasi)",
} as const;

export type DepositDraft = {
  material: keyof typeof DEPOSIT_MATERIALS;
  method: keyof typeof DEPOSIT_METHODS;
  estimatedKg: number;
  area?: (typeof DEPOSIT_AREAS)[number];
  preferredDate?: string;
};

export type DemoDeposit = DepositDraft & {
  id: string;
  scheduledDate?: string;
  materialConfirmed?: true;
} & (
  | { status: "requested" | "scheduled" | "collected"; actualKg: null }
  | { status: "weighed" | "verified"; actualKg: number }
);

type DepositDemoStore = {
  deposits: DemoDeposit[];
  submit: (draft: DepositDraft) => boolean;
  schedule: (id: string, date: string) => boolean;
  collect: (id: string) => boolean;
  weigh: (id: string, kg: number, materialConfirmed: boolean) => boolean;
  verify: (id: string) => boolean;
};

function validWeight(kg: number): boolean {
  return Number.isFinite(kg) && kg > 0;
}

function validCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function getDepositTotals(deposits: DemoDeposit[]) {
  const totals = { count: 0, kg: 0, byMaterial: { pet: 0, cardboard: 0 } };
  for (const deposit of deposits) {
    if (deposit.status === "verified") {
      totals.count++;
      totals.kg += deposit.actualKg;
      totals.byMaterial[deposit.material] += deposit.actualKg;
    }
  }
  return totals;
}

export const useDepositDemoStore = create<DepositDemoStore>()(
  persist(
    (set, get) => {
      function update(id: string, next: (deposit: DemoDeposit) => DemoDeposit | undefined) {
        const deposit = get().deposits.find((item) => item.id === id);
        const replacement = deposit && next(deposit);
        if (!replacement) return false;
        set((state) => ({
          deposits: state.deposits.map((item) => item.id === id ? replacement : item),
        }));
        return true;
      }

      return {
        deposits: [],
        submit: (draft) => {
          if (!validWeight(draft.estimatedKg) ||
              (draft.method === "pickup" && !validCalendarDate(draft.preferredDate ?? ""))) return false;
          const deposit: DemoDeposit = {
            ...draft,
            id: crypto.randomUUID(),
            status: "requested",
            actualKg: null,
          };
          set((state) => ({ deposits: [deposit, ...state.deposits] }));
          return true;
        },
        schedule: (id, date) => validCalendarDate(date) && update(id, (deposit) => {
          if (deposit.method !== "pickup" || !["requested", "scheduled"].includes(deposit.status)) return;
          return { ...deposit, status: "scheduled", scheduledDate: date, actualKg: null };
        }),
        collect: (id) => update(id, (deposit) => {
          if (deposit.method !== "pickup" || deposit.status !== "scheduled") return;
          return { ...deposit, status: "collected", actualKg: null };
        }),
        weigh: (id, kg, materialConfirmed) => {
          if (!validWeight(kg) || !materialConfirmed) return false;
          return update(id, (deposit) => {
            const ready = deposit.method === "pickup" ? deposit.status === "collected" : deposit.status === "requested";
            if (!ready) return;
            return { ...deposit, status: "weighed", actualKg: kg, materialConfirmed: true };
          });
        },
        verify: (id) => update(id, (deposit) => {
          if (deposit.status !== "weighed") return;
          return { ...deposit, status: "verified" };
        }),
      };
    },
    {
      name: DEPOSIT_DEMO_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ deposits: state.deposits }),
    }
  )
);
