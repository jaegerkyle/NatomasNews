import Link from "next/link";
import { LANES, LANE_LABELS } from "@/lib/constants";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Link href="/" className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">
              Natomas.co
            </Link>
            <p className="text-sm text-muted">Local reporting for Natomas.</p>
          </div>
          <nav className="overflow-x-auto border-y border-line py-3">
            <ul className="flex min-w-max items-center gap-5 text-sm font-medium">
              {LANES.map((lane) => (
                <li key={lane}>
                  <Link href={lane === "events" ? "/events" : `/${lane}`} className="hover:text-accent">
                    {LANE_LABELS[lane]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="hover:text-accent">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="max-w-xl">
            <NewsletterSignup compact />
          </div>
        </div>
      </div>
    </header>
  );
}
