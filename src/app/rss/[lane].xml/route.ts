import { NextRequest, NextResponse } from "next/server";
import { LANES, type Lane } from "@/lib/constants";
import { getStoriesByLane } from "@/lib/content";
import { buildRssXml } from "@/lib/rss";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ lane: string }> }
) {
  const { lane } = await params;
  const laneTyped = lane as Lane;

  if (!LANES.includes(laneTyped)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const xml = buildRssXml(getStoriesByLane(laneTyped), laneTyped);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
