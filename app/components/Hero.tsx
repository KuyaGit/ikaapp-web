import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative teal blob top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-teal-50 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-20 w-72 h-72 rounded-full bg-teal-100 opacity-30"
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-8">
            <span className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium">
              🇵🇭 Built for Filipino Christians · iOS &amp; Android
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.08]">
              Your salary,
              <br />
              budgeted.
              <br />
              Your goals,{" "}
              <span className="text-teal-600">tracked.</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-md">
              Allocate your salary across savings, expenses, and tithes — synced
              to your payday schedule. Tracks blessings, auto-calculates tithes,
              and sends payday reminders. 100% offline, no account needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download APK
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors text-base"
              >
                See Features
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 pt-1">
              {[
                "Free forever",
                "No ads",
                "No account",
                "v1.3.2",
              ].map((label) => (
                <div key={label} className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-teal-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[4rem] border-2 border-teal-100 opacity-60"
              />
              <div
                aria-hidden
                className="absolute -inset-12 rounded-[5rem] border border-teal-50 opacity-40"
              />

              {/* Phone frame */}
              <div className="relative w-64 overflow-hidden rounded-[3rem] border-[6px] border-gray-800 shadow-2xl shadow-gray-300 ring-1 ring-gray-700 bg-gray-800">
                <div className="h-7 bg-gray-800 flex items-center justify-center">
                  <div className="w-20 h-1.5 rounded-full bg-gray-600" />
                </div>
                <div className="bg-[#f2f2f7] overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/screenshots/home.png?v=${process.env.NEXT_PUBLIC_BUILD_ID ?? ""}`}
                    alt="ikaapp Dashboard"
                    width={390}
                    height={844}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="h-6 bg-gray-800 flex items-center justify-center">
                  <div className="w-24 h-1 rounded-full bg-gray-600" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -left-8 top-1/3 bg-white rounded-2xl shadow-lg shadow-gray-200 border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-lg">
                  💰
                </div>
                <div>
                  <div className="text-xs text-gray-400 leading-none mb-0.5">
                    Total Savings
                  </div>
                  <div className="text-sm font-bold text-gray-900">₱3,200</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -right-6 bottom-1/3 bg-white rounded-2xl shadow-lg shadow-gray-200 border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-lg">
                  ✅
                </div>
                <div>
                  <div className="text-xs text-gray-400 leading-none mb-0.5">
                    Savings Goal
                  </div>
                  <div className="text-sm font-bold text-gray-900">80% done</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
