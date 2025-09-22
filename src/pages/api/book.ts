import type { NextApiRequest, NextApiResponse } from "next";

type BookBody = {
  name?: string;
  phone?: string;
  service?: string;
  address?: string;
  date?: string;
  time?: string;
  notes?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }
  const body = req.body as BookBody;
  const required = ["name", "phone", "service", "address", "date", "time"] as const;
  for (const k of required) {
    if (!body[k] || (typeof body[k] === "string" && body[k]!.trim() === "")) {
      return res.status(400).json({ ok: false, error: `Missing field: ${k}` });
    }
  }
  // Mock success
  return res.status(200).json({ ok: true, message: "Booking received", ref: `RX-${Date.now()}` });
}
