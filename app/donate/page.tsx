import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Love Gift — ikaapp",
  description:
    "ikaapp is free forever. If it has helped you manage your finances and honor God with your money, consider sending a love gift.",
};

const methods = [
  {
    name: "GCash",
    qr: "/qr-banks-donations/gcash.jpeg",
    accent: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    account: "09XX-XXX-XXXX",
    instruction: "Open GCash → Send Money → Scan QR or enter number",
  },
  {
    name: "Maya",
    qr: "/qr-banks-donations/maya.jpeg",
    accent: "border-green-200 bg-green-50",
    badge: "bg-green-100 text-green-700",
    account: "09XX-XXX-XXXX",
    instruction: "Open Maya → Pay → Scan QR or enter number",
  },
  {
    name: "GoTyme",
    qr: "/qr-banks-donations/gotyme.jpeg",
    accent: "border-orange-200 bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
    account: "Account details on QR",
    instruction: "Open GoTyme → Send → Scan QR code",
  },
  {
    name: "Maribank",
    qr: "/qr-banks-donations/maribank.jpeg",
    accent: "border-red-200 bg-red-50",
    badge: "bg-red-100 text-red-700",
    account: "Account details on QR",
    instruction: "Open Maribank → Transfer → Scan QR code",
  },
  {
    name: "RCBC",
    qr: "/qr-banks-donations/rcbc.jpeg",
    accent: "border-yellow-200 bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-700",
    account: "Account details on QR",
    instruction: "Open RCBC → Transfer → Scan QR code",
  },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-xl font-light text-gray-500 tracking-tight">ika</span>
            <span className="text-xl font-bold text-teal-600 tracking-tight">app</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-0.5 mb-3" />
          </Link>
          <Link
            href="/#download"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download APK
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 mb-6 text-3xl">
            🙏
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Send a Love Gift
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            ikaapp is free, ad-free, and will always stay that way.
            If it has helped you manage your finances and honor God with
            your money, your love gift — however small — means the world.
          </p>
        </div>

        {/* Scripture */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl px-8 py-6 text-center mb-12">
          <p className="text-teal-800 italic text-base leading-relaxed">
            &ldquo;Each of you should give what you have decided in your heart to
            give, not reluctantly or under compulsion, for God loves a cheerful
            giver.&rdquo;
          </p>
          <p className="mt-3 text-sm text-teal-600 font-medium">2 Corinthians 9:7</p>
        </div>

        {/* QR code grid */}
        <p className="text-center text-sm text-gray-400 mb-6 uppercase tracking-widest font-medium">
          Scan to send a love gift
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-12">
          {methods.map((method) => (
            <div
              key={method.name}
              className={`rounded-2xl border p-4 flex flex-col items-center gap-3 ${method.accent}`}
            >
              {/* Bank name badge */}
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${method.badge}`}>
                {method.name}
              </span>

              {/* QR code */}
              <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
                <Image
                  src={method.qr}
                  alt={`${method.name} QR code`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Account info */}
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700 font-mono">
                  {method.account}
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  {method.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-5 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            No amount is too small. Every gift goes directly toward maintaining
            ikaapp, adding features, and keeping it free for every Filipino
            Christian who needs it. Thank you and God bless you! 🙏
          </p>
        </div>

        {/* Back link */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-teal-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to ikaapp
          </Link>
        </div>
      </main>
    </div>
  );
}
