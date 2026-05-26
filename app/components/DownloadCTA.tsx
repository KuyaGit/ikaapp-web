export default function DownloadCTA() {
  return (
    <section id="download" className="py-28 bg-gray-900 relative overflow-hidden">
      {/* Decorative circle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-teal-900/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-teal-900/20"
      />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/60 text-teal-400 text-sm font-medium mb-8 border border-teal-800">
          Android only · v1.0.0 · Free
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Start budgeting
          <br />
          smarter today
        </h2>

        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          ikaapp is free, ad-free, and works forever without an internet
          connection. Download the APK and sideload it on any Android device.
        </p>

        <a
          href="/ikaapp-web/apk/ikaapp-latest.apk"
          download="ikaapp-latest.apk"
          className="inline-flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold px-10 py-4 rounded-2xl transition-colors text-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download APK
        </a>

        <p className="mt-5 text-sm text-gray-600">
          Enable{" "}
          <span className="text-gray-400">&ldquo;Install from unknown sources&rdquo;</span>{" "}
          in Android settings to sideload.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 border-t border-gray-800 pt-10">
          <div className="flex items-center gap-2">
            <span className="text-teal-600 font-semibold">Expo 54</span>
            <span>/ React Native 0.81</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal-600 font-semibold">Local-first</span>
            <span>AsyncStorage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal-600 font-semibold">TypeScript</span>
            <span>strict mode</span>
          </div>
        </div>
      </div>
    </section>
  );
}
