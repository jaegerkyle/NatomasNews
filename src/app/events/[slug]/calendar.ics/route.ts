import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

function toICSDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeICS(value: string) {
  return value.replace(/\n/g, "\\n").replace(/,/g, "\\,");
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const eventItem = getEventBySlug(slug);

  if (!eventItem) {
    return new NextResponse("Not found", { status: 404 });
  }

  const starts = toICSDate(eventItem.startsAt);
  const ends = toICSDate(eventItem.endsAt ?? eventItem.startsAt);
  const uid = `${slug}@natomas.co`;
  const now = toICSDate(new Date().toISOString());

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${SITE_NAME}//EN`,
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${starts}`,
    `DTEND:${ends}`,
    `SUMMARY:${escapeICS(eventItem.title)}`,
    `DESCRIPTION:${escapeICS(eventItem.description ?? "")}`,
    `LOCATION:${escapeICS(
      [eventItem.venue, eventItem.address].filter(Boolean).join(", ")
    )}`,
    `URL:${SITE_URL}/events`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}