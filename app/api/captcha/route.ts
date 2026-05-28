import { createHmac } from "crypto";
import { NextResponse } from "next/server";

const SECRET = process.env.CAPTCHA_SECRET ?? "dev-secret-ikaapp";

export async function GET() {
  const a = Math.floor(Math.random() * 12) + 2;
  const b = Math.floor(Math.random() * 12) + 2;
  // Only use + and - so answers are always positive integers
  const op = Math.random() > 0.5 ? "+" : "-";
  const [x, y] = op === "-" ? [Math.max(a, b), Math.min(a, b)] : [a, b];
  const answer = op === "+" ? x + y : x - y;

  const ts = Date.now().toString();
  const hmac = createHmac("sha256", SECRET)
    .update(`${answer}:${ts}`)
    .digest("hex");

  const token = Buffer.from(
    JSON.stringify({ x, op, y, ts, hmac })
  ).toString("base64");

  return NextResponse.json({
    question: `What is ${x} ${op} ${y}?`,
    token,
  });
}
