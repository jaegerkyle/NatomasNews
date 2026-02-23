import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl">Contact</h1>
        <p className="mt-2 text-muted">General inquiries: hello@natomas.co (demo)</p>
      </div>

      <section className="rounded-xl border border-line p-6">
        <h2 className="text-2xl">Tip line</h2>
        <p className="mt-2 text-sm text-muted">
          Share a lead through our tips page with as much detail as possible.
        </p>
        <Link href="/tips" className="mt-3 inline-block text-sm text-accent underline">
          Go to tips guidance
        </Link>
      </section>

      <section className="rounded-xl border border-line p-6">
        <h2 className="text-2xl">Send a message</h2>
        <p className="mt-2 text-sm text-muted">Placeholder form for MVP. Submit handling is intentionally non-operational.</p>
        <form className="mt-4 space-y-3" action="#" method="post">
          <input className="w-full rounded-md border border-line px-3 py-2" type="text" placeholder="Name" />
          <input className="w-full rounded-md border border-line px-3 py-2" type="email" placeholder="Email" />
          <textarea className="w-full rounded-md border border-line px-3 py-2" rows={5} placeholder="Message" />
          <button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white" type="submit">
            Submit (demo)
          </button>
        </form>
      </section>
    </section>
  );
}
