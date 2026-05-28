import puppeteer from "puppeteer";

const BASE = "http://localhost:8082";
const WIDTH = 390;
const HEIGHT = 844;
const OUT = "public/screenshots";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

// Load the app once and wait for it to fully render past the splash screen
await page.goto(BASE, { waitUntil: "networkidle0", timeout: 30000 });

// Wait until the Dashboard text appears (splash is gone)
await page.waitForFunction(
  () => document.body.innerText.includes("Dashboard"),
  { timeout: 15000 }
);
// Extra settle time
await new Promise(r => setTimeout(r, 800));

async function shot(name) {
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`Saved ${OUT}/${name}.png`);
}

async function clickTab(label) {
  await page.evaluate((text) => {
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    const tab = tabs.find(t => t.textContent.includes(text));
    if (tab) tab.click();
    else throw new Error(`Tab not found: ${text}`);
  }, label);
}

// ── Home ──────────────────────────────────────────────────────────────────────
console.log("Capturing home...");
await shot("home");

// ── Savings ───────────────────────────────────────────────────────────────────
console.log("Capturing savings...");
await clickTab("Savings");
await shot("savings");

// ── Expenses ──────────────────────────────────────────────────────────────────
console.log("Capturing expenses...");
await clickTab("Expenses");
await shot("expenses");

// ── Tithes ────────────────────────────────────────────────────────────────────
console.log("Capturing tithes...");
await clickTab("Tithes");
await shot("tithes");

// ── Settings — go back to Home then tap the ⚙️ gear ──────────────────────────
console.log("Capturing settings...");
await clickTab("Home");
await new Promise(r => setTimeout(r, 800));

// Find and click the gear/settings button (top-right of Dashboard)
const gearFound = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('[role="button"], button, [accessibilityRole="button"]')];
  const gear = btns.find(b =>
    b.textContent.includes("⚙") ||
    b.getAttribute("aria-label")?.toLowerCase().includes("setting") ||
    b.getAttribute("data-testid")?.toLowerCase().includes("setting")
  );
  if (gear) { gear.click(); return true; }
  return false;
});

if (!gearFound) {
  // Click by coordinate — gear icon is top-right at roughly (360, 45)
  await page.mouse.click(360, 45);
  console.log("Clicked gear by coordinate");
}

await shot("settings");

await browser.close();
console.log("\nDone — all screenshots saved to public/screenshots/");
