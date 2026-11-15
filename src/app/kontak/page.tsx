import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import ContactForm from "./ContactForm";
import PartnerMarquee from "./PartnerMarquee";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Kontak & FAQ | BONI",
  description: "Informasi kontak dan jawaban atas pertanyaan umum tentang demo BONI.",
};

const questions = [
  {
    question: "Apa yang bisa saya coba di BONI?",
    answer:
      "Demo warga menyediakan pencatatan Aksi Hijau, unggah bukti foto, EcoPoints, katalog hadiah, laporan titik sampah, dan peta dampak.",
  },
  {
    question: "Bagaimana status fitur setor dan jemput oleh pengepul?",
    answer:
      "Untuk versi demo saat ini, jalur yang aktif adalah Portal Warga (Aksi Hijau AI, EcoPoints, dan Laporan Sampah) serta Portal Pemkot. Formulir pengajuan setor/jemput dan Portal Pengepul disimpan sebagai rancangan tahap berikutnya, sementara penyetoran langsung di lapangan tetap mengikuti jadwal bank sampah setempat.",
  },
  {
    question: "Bagaimana BONI memeriksa bukti foto?",
    answer:
      "AI membantu membaca bukti dan menandai foto yang perlu ditinjau. Berat dan kondisi material pada rancangan transaksi diperiksa saat penimbangan.",
  },
  {
    question: "Apakah EcoPoints di demo dapat ditukar di toko?",
    answer: "EcoPoints, katalog hadiah, dan voucher di demo menggunakan data contoh.",
  },
];

function LeafSilhouettes() {
  return (
    <div className={styles.leafBackdrop} aria-hidden="true">
      <svg className={styles.leafLeft} viewBox="0 0 260 280" fill="none">
        <path
          d="M28 248C14 166 56 84 148 34C178 18 214 14 238 22C222 86 176 164 98 214C74 230 50 242 28 248Z"
          fill="currentColor"
        />
        <path
          d="M12 132C2 84 22 36 74 10C94 2 114 0 130 6C118 48 88 94 44 120C32 126 22 130 12 132Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
      <svg className={styles.leafRight} viewBox="0 0 280 280" fill="none">
        <path
          d="M244 26C258 112 214 198 118 248C86 264 50 268 24 258C42 192 90 110 172 58C196 42 222 32 244 26Z"
          fill="currentColor"
        />
        <path
          d="M266 152C274 202 252 246 202 268C184 276 164 276 148 270C160 230 190 186 232 162C244 156 256 152 266 152Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

export default function ContactPage() {
  return (
    <LayoutWrapper>
      <div className={styles.page}>
        <section aria-labelledby="contact-title" className={styles.hero}>
          <LeafSilhouettes />
          <div className={styles.layout}>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>Kami bisa bantu</p>
              <h1 id="contact-title">Mari diskusikan pertanyaan dan kolaborasi dengan BONI.</h1>
              <dl className={styles.details}>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>Segera tersedia</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>Segera tersedia</dd>
                </div>
                <div>
                  <dt>Wilayah fokus</dt>
                  <dd>Surabaya, Jawa Timur</dd>
                </div>
              </dl>
              <PartnerMarquee />
            </div>
            <ContactForm />
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className={`${styles.faqSection} scroll-mt-24`}>
          <div className={styles.faqLayout}>
            <div className={styles.faqHeader}>
              <h2 id="faq-title">Pertanyaan umum</h2>
              <p>Temukan jawaban tentang akses demo, proses setoran, dan EcoPoints.</p>
            </div>
            <div className={styles.faqCard}>
              {questions.map(({ question, answer }) => (
                <details key={question} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{question}</span>
                    <ChevronDown size={18} className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p className={styles.faqAnswer}>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
