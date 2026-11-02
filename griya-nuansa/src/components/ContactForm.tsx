'use client';

import { useId, useState } from 'react';
import { WhatsAppIcon } from './WhatsApp';
import { useLang } from '@/i18n/client';
import { buildWhatsAppLink } from '@/lib/config';

/*
 * Form kontak sesuai brief (nama, telepon, email, pesan) → dikirim lewat WhatsApp.
 * BUKAN form server: tidak ada <form>/submit, tidak ada penyimpanan, tidak ada data yang dikirim
 * ke server mana pun. Isian hanya dirangkai menjadi link wa.me yang dibuka pengunjung sendiri.
 */
const LIMIT = { name: 60, phone: 16, email: 80, message: 500 } as const;

const clean = (v: string, max: number) =>
  v
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, max);
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v: string) => /^\+?[\d\s-]{8,16}$/.test(v);

const copy = {
  id: {
    title: 'Kirim pesan',
    intro: 'Isi data di bawah, pesan akan terbuka di WhatsApp Anda dan siap dikirim ke tim kami.',
    name: 'Nama *',
    phone: 'Nomor telepon',
    email: 'Email',
    message: 'Pesan *',
    messagePh: 'Ceritakan rencana atau kebutuhan ruang Anda',
    phoneError: 'Nomor telepon tidak valid.',
    emailError: 'Alamat email tidak valid.',
    send: 'Kirim Pesan',
    hint: 'Nama dan pesan wajib diisi. Data tidak disimpan di website ini.',
    wa: (p: { n: string; t: string; e: string; m: string }) => [
      'Halo Griya Nuansa,',
      '',
      p.m,
      '',
      `Nama: ${p.n}`,
      p.t && `Telepon: ${p.t}`,
      p.e && `Email: ${p.e}`,
    ],
  },
  en: {
    title: 'Send a message',
    intro:
      'Fill in the details below; the message opens in your WhatsApp, ready to send to our team.',
    name: 'Name *',
    phone: 'Phone number',
    email: 'Email',
    message: 'Message *',
    messagePh: 'Tell us about your plans or space needs',
    phoneError: 'Invalid phone number.',
    emailError: 'Invalid email address.',
    send: 'Send Message',
    hint: 'Name and message are required. Nothing is stored on this website.',
    wa: (p: { n: string; t: string; e: string; m: string }) => [
      'Hello Griya Nuansa,',
      '',
      p.m,
      '',
      `Name: ${p.n}`,
      p.t && `Phone: ${p.t}`,
      p.e && `Email: ${p.e}`,
    ],
  },
};

export function ContactForm() {
  const id = useId();
  const { lang, t } = useLang();
  const c = copy[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const n = name.trim();
  const p = phone.trim();
  const e = email.trim();
  const m = message.trim();
  const phoneInvalid = p !== '' && !isPhone(p);
  const emailInvalid = e !== '' && !isEmail(e);
  const ready = Boolean(n && m) && !phoneInvalid && !emailInvalid;

  const text = c
    .wa({ n, t: p, e, m })
    .filter((l): l is string => typeof l === 'string')
    .join('\n');

  const field =
    'mt-1 w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base font-light text-fg focus:border-fg focus:outline-none';
  const labelCls = 'block text-xs tracking-[0.15em] text-muted uppercase';
  const btn =
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] uppercase';

  return (
    <div className="rounded-md bg-bg p-6 ring-1 ring-line md:p-12">
      <h2 className="font-serif text-3xl md:text-4xl">{c.title}</h2>
      <p className="mt-3 mb-8 max-w-sm text-sm leading-relaxed text-muted">{c.intro}</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor={`${id}-n`} className={labelCls}>
            {c.name}
          </label>
          <input
            id={`${id}-n`}
            className={field}
            value={name}
            maxLength={LIMIT.name}
            autoComplete="name"
            onChange={(ev) => setName(clean(ev.target.value, LIMIT.name))}
          />
        </div>
        <div>
          <label htmlFor={`${id}-t`} className={labelCls}>
            {c.phone}
          </label>
          <input
            id={`${id}-t`}
            type="tel"
            inputMode="tel"
            className={field}
            value={phone}
            maxLength={LIMIT.phone}
            autoComplete="tel"
            aria-invalid={phoneInvalid}
            aria-describedby={phoneInvalid ? `${id}-te` : undefined}
            onChange={(ev) =>
              setPhone(ev.target.value.replace(/[^\d+\s-]/g, '').slice(0, LIMIT.phone))
            }
          />
          {phoneInvalid && (
            <p id={`${id}-te`} className="mt-1 text-sm text-red-700 dark:text-red-300">
              {c.phoneError}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-e`} className={labelCls}>
            {c.email}
          </label>
          <input
            id={`${id}-e`}
            type="email"
            className={field}
            value={email}
            maxLength={LIMIT.email}
            autoComplete="email"
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? `${id}-ee` : undefined}
            onChange={(ev) => setEmail(ev.target.value.replace(/\s/g, '').slice(0, LIMIT.email))}
          />
          {emailInvalid && (
            <p id={`${id}-ee`} className="mt-1 text-sm text-red-700 dark:text-red-300">
              {c.emailError}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${id}-m`} className={labelCls}>
            {c.message}
          </label>
          <textarea
            id={`${id}-m`}
            rows={4}
            className={`${field} resize-y`}
            value={message}
            maxLength={LIMIT.message}
            placeholder={c.messagePh}
            onChange={(ev) => setMessage(ev.target.value.slice(0, LIMIT.message))}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {ready ? (
          <a
            href={buildWhatsAppLink(text)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn} bg-fg text-bg hover:opacity-85`}
          >
            <WhatsAppIcon />
            {c.send}
            <span className="sr-only">{t.waNewTab}</span>
          </a>
        ) : (
          <span
            aria-disabled="true"
            className={`${btn} cursor-not-allowed border border-line text-muted`}
          >
            <WhatsAppIcon />
            {c.send}
          </span>
        )}
        <p className="text-xs text-muted">{c.hint}</p>
      </div>
    </div>
  );
}
