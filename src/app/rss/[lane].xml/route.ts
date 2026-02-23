import { NextResponse } from "next/server";
import { LANES, type Lane } from "@/lib/constants";
import { getStoriesByLane } from "@/lib/content";
import { buildRssXml } from "@/lib/rss";

type Props = { params: Promise<{ lane: string }> };

export async function GET(_: Request, { params }: Props) {
  const lane = (await params).lane as Lane;

  if (!LANES.includes(lane)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const xml = buildRssXml(getStoriesByLane(lane), lane);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
