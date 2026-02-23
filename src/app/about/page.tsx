import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <h1 className="text-4xl">About Natomas.co</h1>
      <p>
        Natomas.co is a local reporting concept focused on practical, neighborhood-level journalism. This MVP uses
        sample/demo content to illustrate a modern local-news workflow.
      </p>
      <h2 className="text-2xl">What we cover</h2>
      <p>
        Public safety, city policy, arts, schools, development, housing, and day-to-day community life in North and South Natomas.
      </p>
      <h2 className="text-2xl">Ethics and standards</h2>
      <p>
        We aim for fairness, sourcing transparency, corrections when needed, and clear distinctions between reported facts and analysis.
      </p>
    </article>
  );
}
