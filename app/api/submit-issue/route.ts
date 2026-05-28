import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER ?? "KuyaGit";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "ikaapp-web";

async function uploadScreenshot(
  base64Content: string,
  filename: string
): Promise<string | null> {
  if (!GITHUB_TOKEN) return null;

  const path = `.github/issue-assets/${filename}`;
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        message: `chore: add issue asset ${filename}`,
        content: base64Content,
      }),
    }
  );

  if (!res.ok) return null;
  const json = await res.json() as { content?: { download_url?: string } };
  return json.content?.download_url ?? null;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  // Honeypot — bots fill this, humans don't
  if (formData.get("website")) {
    return NextResponse.json({ error: "Spam detected." }, { status: 400 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "Server is not configured to submit issues. Please contact the admin." },
      { status: 503 }
    );
  }

  const type = String(formData.get("type") ?? "bug");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const steps = String(formData.get("steps") ?? "").trim();
  const expected = String(formData.get("expected") ?? "").trim();
  const device = String(formData.get("device") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  // Upload screenshot if provided
  let screenshotSection = "";
  const screenshot = formData.get("screenshot") as File | null;
  if (screenshot && screenshot.size > 0 && screenshot.size <= 5 * 1024 * 1024) {
    const arrayBuffer = await screenshot.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const ext = (screenshot.name.split(".").pop() ?? "png").toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const url = await uploadScreenshot(base64, filename);
    if (url) {
      screenshotSection = `\n### Screenshot\n\n![Screenshot](${url})\n`;
    }
  }

  // Build issue body
  const typeLabel = type === "bug" ? "🐛 Bug Report" : "✨ Feature Request";
  const labelSlug = type === "bug" ? "bug" : "enhancement";

  let body = `## ${typeLabel}\n\n`;
  body += `### Description\n\n${description}\n\n`;

  if (type === "bug") {
    if (steps) body += `### Steps to Reproduce\n\n${steps}\n\n`;
    if (expected) body += `### Expected Behavior\n\n${expected}\n\n`;
  }

  if (device) body += `### Device / App Version\n\n${device}\n\n`;
  if (email) body += `### Contact\n\n${email}\n\n`;

  if (screenshotSection) body += screenshotSection;

  body += `\n---\n*Submitted via the [ikaapp feedback form](https://kuyagit.github.io/ikaapp-web/feedback)*`;

  const issueRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ title, body, labels: [labelSlug] }),
    }
  );

  if (!issueRes.ok) {
    const err = await issueRes.json() as { message?: string };
    return NextResponse.json(
      { error: `GitHub error: ${err.message ?? "Unknown error"}` },
      { status: 502 }
    );
  }

  const issue = await issueRes.json() as { html_url: string; number: number };
  return NextResponse.json({
    success: true,
    issueUrl: issue.html_url,
    issueNumber: issue.number,
  });
}
