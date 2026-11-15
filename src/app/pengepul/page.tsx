import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Portal Pengepul dinonaktifkan sementara; kode prototipe tetap tersimpan di
// @/components/features/deposit-demo/DepositDemo (CollectorDepositDemo) & @/store/deposit-demo.store.
export default function CollectorPreviewPage() {
  redirect("/#gateway");
}
