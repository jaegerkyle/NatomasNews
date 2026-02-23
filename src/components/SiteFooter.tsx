import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted sm:px-6 lg:px-8">
        <p>Sample/demo local newsroom build for Natomas.co.</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <Link href="/tips" className="hover:text-accent">
            Tip line
          </Link>
          <Link href="/rss.xml" className="hover:text-accent">
            RSS
          </Link>
          <Link href="/sitemap.xml" className="hover:text-accent">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
