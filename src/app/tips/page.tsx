import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tips",
  alternates: { canonical: "/tips" }
};

export default function TipsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <h1 className="text-4xl">Tip line guidance</h1>
      <p>
        If you have a story tip, include who is involved, what happened, where and when it occurred, and any public records or documents that help verify details.
      </p>
      <h2 className="text-2xl">Helpful details</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Timeline of events with dates and locations.</li>
        <li>Names, agencies, or organizations connected to the issue.</li>
        <li>Links to agendas, notices, reports, or public documents.</li>
      </ul>
      <h2 className="text-2xl">Sharing files safely</h2>
      <p>
        Avoid sharing sensitive personal data unless necessary for reporting. Remove metadata from files when possible, and use trusted secure-sharing tools. Never access systems or materials you are not authorized to access.
      </p>
    </article>
  );
}
