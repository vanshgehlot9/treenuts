import { NextResponse } from "next/server";

export async function POST() {
  const email = "treenuts09+2453@gmail.com";
  const password = "WOd2YICYEf";

  const response = await fetch("https://api.nimbuspost.com/v1/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return NextResponse.json(data);
} 