import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl text-center">
      <p className="text-xs uppercase tracking-wider text-muted">404</p>
      <h1 className="mt-3 text-4xl">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-5 inline-block text-accent underline">
        Return home
      </Link>
    </section>
  );
}
