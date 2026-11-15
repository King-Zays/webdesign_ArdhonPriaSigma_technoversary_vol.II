"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import styles from "./contact.module.css";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const hydrated = useHydrated();

  function previewInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={styles.form} aria-labelledby="contact-form-title" onSubmit={previewInquiry} onChange={() => setSubmitted(false)}>
      <h2 id="contact-form-title">Sampaikan kebutuhanmu</h2>
      <div className={styles.names}>
        <input aria-label="Nama depan" name="firstName" autoComplete="given-name" placeholder="Nama depan" required />
        <input aria-label="Nama belakang" name="lastName" autoComplete="family-name" placeholder="Nama belakang" />
      </div>
      <input aria-label="Email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" required />
      <select aria-label="Topik" name="topic" defaultValue="" required>
        <option value="" disabled>Topik pertanyaan</option>
        <option value="sorting">Pilah dan setor sampah</option>
        <option value="demo">Akses demo BONI</option>
        <option value="collaboration">Kolaborasi</option>
        <option value="other">Lainnya</option>
      </select>
      <textarea aria-label="Pesan" name="message" placeholder="Ceritakan yang ingin kamu diskusikan" rows={3} required />
      <label className={styles.confirm}>
        <input name="demoConfirmed" type="checkbox" required />
        Saya memahami formulir ini hanya untuk simulasi.
      </label>
      <button type="submit" disabled={!hydrated}>Coba kirim pesan</button>
      {submitted && <p role="status" className={styles.status}>Simulasi berhasil. Isian ini tidak dikirim atau disimpan.</p>}
    </form>
  );
}
