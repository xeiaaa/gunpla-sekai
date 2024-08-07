import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = getAuth(req);
  return NextResponse.json({ auth });
}
