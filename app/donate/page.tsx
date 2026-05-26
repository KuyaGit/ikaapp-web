import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Love Gift — ikaapp",
  description:
    "ikaapp is free forever. If it has helped you manage your finances and honor God with your money, consider sending a love gift.",
};

const methods = [
  {
    name: "GCash",
    color: "bg-blue-50 border-blue-100",
    labelColor: "text-blue-700",
    iconBg: "bg-blue-100",
    icon: (
      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
    label: "GCash Number",
    value: "09XX-XXX-XXXX",
    name2: "Account Name: Your Name Here",
    instruction: "Open GCash → Send Money → Enter number → Enter amount",
  },
  {
    name: "Maya",
    color: "bg-green-50 border-green-100",
    labelColor: "text-green-700",
    iconBg: "bg-green-100",
    icon: (
      <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-6h2v2h-2zm0-8h2v6h-2z" />
      </svg>
    ),
    label: "Maya Number",
    value: "09XX-XXX-XXXX",
    name2: "Account Name: Your Name Here",
    instruction: "Open Maya → Pay → Enter number → Enter amount",
  },
  {
    name: "Bank Transfer",
    color: "bg-teal-50 border-teal-100",
    labelColor: "text-teal-700",
    iconBg: "bg-teal-100",
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    label: "BDO / BPI / UnionBank",
    value: "Account No: XXXX-XXXX-XXXX",
    name2: "Account Name: Your Name Here",
    instruction: "Use InstaPay or PESONet for zero-fee transfers between banks",
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

      <main className="max-w-2xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 mb-6 text-3xl">
            🙏
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Send a Love Gift
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
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

        {/* Payment methods */}
        <div className="space-y-4 mb-12">
          {methods.map((method) => (
            <div
              key={method.name}
              className={`rounded-2xl border p-6 ${method.color}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${method.iconBg}`}>
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${method.labelColor}`}>
                    {method.name}
                  </div>
                  <div className="text-xl font-bold text-gray-900 font-mono tracking-wide">
                    {method.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-0.5">{method.name2}</div>
                  <div className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {method.instruction}
                  </div>
                </div>
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
