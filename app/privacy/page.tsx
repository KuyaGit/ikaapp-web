import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — ikaapp",
  description:
    "ikaapp collects no personal data. All financial data is stored locally on your device and never transmitted to any server.",
};

export default function PrivacyPage() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 mb-6">
            <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">
            Effective date: June 27, 2026 &middot; Last updated: June 27, 2026
          </p>
        </div>

        {/* Summary highlight */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl px-8 py-6 text-center mb-12">
          <p className="text-teal-800 font-medium text-base leading-relaxed">
            ikaapp does not collect, store, or transmit any personal data.
            Everything you enter stays on your device — always.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-gray-600 leading-relaxed">

          {/* 1. No data collection */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. We do not collect your data</h2>
            <p>
              ikaapp requires no account, no email address, no password, and no sign-up of any kind.
              The app does not collect, process, transmit, sell, or share any personal or financial
              information. Your salary figures, budget allocations, expenses, and savings entries are
              yours alone.
            </p>
          </section>

          {/* 2. On-device storage */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Data stored on your device</h2>
            <p className="mb-4">
              All app data is written to local device storage only and never leaves your device.
              The following data is stored:
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">What is stored</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Where</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-5 py-3">Budget settings, pay schedule, category allocations</td>
                    <td className="px-5 py-3 text-gray-400">AsyncStorage (on-device)</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Salary entries, income history</td>
                    <td className="px-5 py-3 text-gray-400">AsyncStorage (on-device)</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Blessings (income sources), savings, expenses, category entries</td>
                    <td className="px-5 py-3 text-gray-400">AsyncStorage (on-device)</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">App Lock PIN (4-digit)</td>
                    <td className="px-5 py-3 text-gray-400">Expo SecureStore / iOS Keychain / Android Keystore</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Uninstalling the app removes all locally stored data from your device.
            </p>
          </section>

          {/* 3. Permissions */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Permissions we request</h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 mb-1">Notifications (optional)</p>
                <p className="text-sm">
                  Used only to schedule local payday reminders on your device. Notifications are
                  created and stored entirely on-device by the operating system — no data is sent
                  to any server. You can disable this permission at any time in your device settings.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 mb-1">Biometrics — Face ID / Touch ID (optional)</p>
                <p className="text-sm">
                  Used only for the optional App Lock feature. Biometric authentication is handled
                  entirely by the operating system (iOS Face ID / Android BiometricPrompt).
                  ikaapp never receives, processes, or stores your biometric data.
                  The feature falls back to a 4-digit PIN if biometrics are unavailable.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Network activity */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Network activity</h2>
            <p className="mb-4">
              ikaapp works fully offline. The only outbound network activity is:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span>
                  <span className="font-medium text-gray-900">Version check</span> — on launch, the app
                  fetches a public{" "}
                  <code className="text-sm bg-gray-100 rounded px-1 py-0.5">release.json</code> file from
                  GitHub Pages to check for updates. This is a plain GET request with no user data attached.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span>
                  <span className="font-medium text-gray-900">APK download link</span> — if you tap
                  &ldquo;Download Update,&rdquo; the app opens the download URL in your browser. No data is
                  sent by ikaapp itself.
                </span>
              </li>
            </ul>
            <p className="mt-4">
              There are <span className="font-medium text-gray-900">no analytics, no crash reporters,
              no advertising SDKs, and no third-party data-collection libraries</span> of any kind.
            </p>
          </section>

          {/* 5. Children's privacy */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Children&apos;s privacy</h2>
            <p>
              ikaapp is a general-audience app. Because we collect no personal data from anyone,
              this policy applies equally to users of all ages. We do not knowingly collect
              information from children under 13 (or any age).
            </p>
          </section>

          {/* 6. Changes */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Changes to this policy</h2>
            <p>
              If this policy is ever updated, the revised version will be posted on this page with
              a new &ldquo;Last updated&rdquo; date. Because we collect no data, changes are likely
              to reflect new optional features rather than new data-collection practices.
            </p>
          </section>

          {/* 7. Contact */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>
              Questions about this privacy policy? Reach out at{" "}
              <a
                href="mailto:lowel.montealto@whitecloak.com"
                className="text-teal-600 hover:text-teal-700 transition-colors"
              >
                lowel.montealto@whitecloak.com
              </a>
              .
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="text-center mt-14">
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
