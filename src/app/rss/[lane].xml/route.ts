import { NextRequest, NextResponse } from "next/server";
import { LANES, type Lane } from "@/lib/constants";
import { getStoriesByLane } from "@/lib/content";
import { buildRssXml } from "@/lib/rss";

export async function GET(
  _request: NextRequest,
  { params }: { params: { lane: string } }
) {
  const lane = params.lane

  if (!LANES.includes(lane)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const xml = buildRssXml(getStoriesByLane(lane), lane);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}