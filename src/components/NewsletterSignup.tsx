const actionUrl = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION_URL;

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  if (!actionUrl) {
    return (
      <div id="subscribe" className="rounded-xl border border-line bg-white p-5 shadow-subtle">
        <h3 className="font-serif text-xl">Subscribe to Natomas.co</h3>
        <p className="mt-2 text-sm text-muted">
          Newsletter endpoint is not configured. Set `NEXT_PUBLIC_NEWSLETTER_ACTION_URL` to enable signup.
        </p>
      </div>
    );
  }

  return (
    <form
      id="subscribe"
      action={actionUrl}
      method="post"
      className="rounded-xl border border-line bg-white p-5 shadow-subtle"
    >
      <h3 className="font-serif text-xl">Subscribe for local updates</h3>
      <p className="mt-2 text-sm text-muted">Weekly headlines, events, and quick local context.</p>
      <div className={`mt-4 ${compact ? "space-y-3" : "flex flex-col gap-3 sm:flex-row"}`}>
        <input
          className="w-full rounded-md border border-line px-3 py-2 text-sm"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email"
        />
        <button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:opacity-90" type="submit">
          Subscribe
        </button>
      </div>
    </form>
  );
}
