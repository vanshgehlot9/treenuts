import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { from_pincode, to_pincode, weight, order_type, token } = await req.json();

  const response = await fetch("https://api.nimbuspost.com/api_v2/international/shipping/rate/calculate", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from_pincode,
      to_pincode,
      weight,
      order_type
    })
  });

  const data = await response.json();
  return NextResponse.json(data);
} 