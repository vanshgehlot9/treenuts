"use client"

import { useState } from "react";

export default function OrderTrackingPage() {
  const [awbNumber, setAwbNumber] = useState("");
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTracking = async () => {
    setLoading(true);
    // 1. Get NimbusPost token
    const authRes = await fetch("/api/nimbuspost/auth", { method: "POST" });
    const { token } = await authRes.json();

    // 2. Fetch tracking info
    const trackingRes = await fetch("/api/nimbuspost/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        awb_number: awbNumber,
        token,
      }),
    });
    const data = await trackingRes.json();
    setTracking(data);
    setLoading(false);
  };

  return (
    <div>
      <h2>Track Your Order</h2>
      <input
        placeholder="AWB Number"
        value={awbNumber}
        onChange={e => setAwbNumber(e.target.value)}
      />
      <button onClick={fetchTracking} disabled={loading}>
        {loading ? "Fetching..." : "Track"}
      </button>
      {tracking && (
        <pre style={{ textAlign: "left" }}>{JSON.stringify(tracking, null, 2)}</pre>
      )}
    </div>
  );
} 