"use client";

import { useEffect } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { DEPOSIT_DEMO_KEY, useDepositDemoStore } from "@/store/deposit-demo.store";
import type { DemoDeposit } from "@/store/deposit-demo.store";

const EMPTY_DEPOSITS: DemoDeposit[] = [];

export function useDepositDemoRecords() {
  const deposits = useDepositDemoStore((state) => state.deposits);
  const hydrated = useHydrated();

  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === DEPOSIT_DEMO_KEY) void useDepositDemoStore.persist?.rehydrate();
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return { deposits: hydrated ? deposits : EMPTY_DEPOSITS, hydrated };
}
