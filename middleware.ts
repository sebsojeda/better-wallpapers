import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const ip = req.headers.get("x-real-ip");
  const isNotLimited = !!ip && (await ratelimit.limit(ip)).success;
  if (isNotLimited) {
    return NextResponse.next();
  } else {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
