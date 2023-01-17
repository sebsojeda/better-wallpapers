import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const ip = req.headers.get("x-real-ip");
    const isThrottled = !ip || !(await ratelimit.limit(ip)).success;
    if (isThrottled) {
      return NextResponse.json({ error: "too many requests" }, { status: 429 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
