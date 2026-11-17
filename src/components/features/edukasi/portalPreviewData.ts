import type { GreenActionType } from "@/config/green-actions";

export type PortalTabKey =
  | "/dashboard"
  | "/dashboard/eco-action"
  | "/dashboard/marketplace"
  | "/dashboard/laporan-sampah"
  | "/dashboard/collaboration"
  | "/dashboard/profile";

export interface PreviewHistoryItem {
  id: string;
  actionType: GreenActionType;
  label: string;
  quantityText: string;
  co2Kg: number | null;
  district: string;
  timestampLabel: string;
  points: number;
  confidence: number;
  hashPreview: string;
  isNew?: boolean;
}

export interface PreviewVoucherTicket {
  id: string;
  rewardId: string;
  title: string;
  merchant: string;
  code: string;
  cost: number;
}

export interface PreviewCommunityPost {
  id: string;
  author: string;
  district: string;
  actionType: GreenActionType;
  caption: string;
  impactLabel: string;
  timeAgo: string;
  likes: number;
}

export interface JourneyJumpLink {
  readonly href: string;
  readonly step: string;
  readonly label: string;
}

export const PORTAL_URL_LABELS: Record<PortalTabKey, string> = {
  "/dashboard": "boni.app/dashboard · Pratinjau Portal Warga",
  "/dashboard/eco-action": "boni.app/dashboard/eco-action · Simulasi Verifikasi AI",
  "/dashboard/marketplace": "boni.app/dashboard/marketplace · Kupon UMKM Surabaya",
  "/dashboard/laporan-sampah": "boni.app/dashboard/laporan-sampah · Peta Titik Kebersihan",
  "/dashboard/collaboration": "boni.app/dashboard/collaboration · Jaringan Komunitas",
  "/dashboard/profile": "boni.app/dashboard/profile · Profil Rendra Pratama",
};

export const INITIAL_ECOPOINTS = 500;
export const INITIAL_SORTED_KG = 1.5;
export const INITIAL_CHALLENGE_TARGET = 3;
export const INITIAL_CHALLENGE_PROGRESS = 2;
export const INITIAL_CHALLENGE_REWARD = 100;

export const INITIAL_HISTORY: PreviewHistoryItem[] = [
  {
    id: "ga_preview_2",
    actionType: "sustainable_transport",
    label: "Transportasi Rendah Emisi",
    quantityText: "4 km",
    co2Kg: 0.46,
    district: "Wonokromo",
    timestampLabel: "15 Nov, 14.03",
    points: 50,
    confidence: 94,
    hashPreview: "sha256:9d4e…a21c",
  },
  {
    id: "ga_preview_1",
    actionType: "waste_sorting",
    label: "Pilah Sampah",
    quantityText: "1.5 kg",
    co2Kg: 0.5,
    district: "Wonokromo",
    timestampLabel: "14 Nov, 14.03",
    points: 40,
    confidence: 96,
    hashPreview: "sha256:3c8b…f470",
  },
];

export const INITIAL_COMMUNITY_POSTS: PreviewCommunityPost[] = [
  {
    id: "cp_1",
    author: "Siti Rahma",
    district: "Wonokromo",
    actionType: "waste_sorting",
    caption: "Botol PET kode 1 & kardus kering sudah dipilah bersih siap setor ke bank sampah RW 04.",
    impactLabel: "2.4 kg terpilah",
    timeAgo: "18 menit lalu",
    likes: 14,
  },
  {
    id: "cp_2",
    author: "Bagus Pratama",
    district: "Gubeng",
    actionType: "used_cooking_oil",
    caption: "Setor jelantah 1.5 liter ke gerai pengumpulan kelurahan agar tidak masuk selokan.",
    impactLabel: "1.5 L jelantah",
    timeAgo: "1 jam lalu",
    likes: 9,
  },
];

export const REPORT_CATEGORIES = [
  { id: "tumpukan", label: "Tumpukan Sampah Liar" },
  { id: "saluran", label: "Saluran Air Tersumbat" },
  { id: "pembakaran", label: "Pembakaran Terbuka" },
] as const;

export const SURABAYA_SAMPLE_DISTRICTS = [
  "Wonokromo",
  "Gubeng",
  "Rungkut",
  "Sukolilo",
] as const;
