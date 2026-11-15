import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Pratinjau Admin dinonaktifkan sementara; modul prototipe tersimpan di
// @/components/features/deposit-demo/AdminPreviewModules dan @/components/features/deposit-demo/AdminDepositPreview.
export default function AdminPreviewPage() {
  redirect("/#gateway");
}
