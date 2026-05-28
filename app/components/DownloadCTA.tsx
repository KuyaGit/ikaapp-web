const APK_URL =
  process.env.NODE_ENV === "production"
    ? "/ikaapp-web/apk/ikaapp-latest.apk"
    : "/apk/ikaapp-latest.apk";

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
          Android · v1.3.2 · Free · iOS coming soon
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Android — active */}
          <a
            href={APK_URL}
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

          {/* iOS — coming soon */}
          <span className="relative inline-flex items-center justify-center gap-3 bg-gray-800 border border-gray-700 text-gray-500 font-bold px-10 py-4 rounded-2xl text-lg cursor-not-allowed select-none">
            <span className="absolute -top-3 -right-2 bg-teal-900 text-teal-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-teal-800 whitespace-nowrap">
              Coming Soon
            </span>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </span>
        </div>

        <p className="mt-5 text-sm text-gray-600">
          Enable{" "}
          <span className="text-gray-400">&ldquo;Install from unknown sources&rdquo;</span>{" "}
          in Android settings to sideload.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 border-t border-gray-800 pt-10">
          <div className="flex items-center gap-2">
            <span className="text-teal-600 font-semibold">Expo ~54</span>
            <span>/ React Native 0.81.5</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal-600 font-semibold">Local-first</span>
            <span>AsyncStorage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal-600 font-semibold">TypeScript</span>
            <span>strict · New Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
