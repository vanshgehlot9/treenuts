import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { awb_number, token } = await req.json();

  const response = await fetch("https://api.nimbuspost.com/api_v2/track-order", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ awb_number })
  });

  const data = await response.json();
  return NextResponse.json(data);
} 