const items = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    title: "No account required",
    description:
      "Open the app and start tracking immediately. No email, no password, no sign-up — just open and go.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
        />
      </svg>
    ),
    title: "Works fully offline",
    description:
      "No internet connection needed — ever. Track your finances anywhere, even where there's no signal.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3v.008h-3V9.75zm0 3h3v.008h-3v-.008zm0 3h3v.008h-3v-.008z"
        />
      </svg>
    ),
    title: "Data stays on your device",
    description:
      "All data is stored locally with AsyncStorage. Nothing is ever sent to any server — your finances stay private.",
  },
];

export default function Privacy() {
  return (
    <section className="py-20 bg-teal-50 border-y border-teal-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Private by design
          </h2>
          <p className="mt-3 text-gray-500">
            Your salary data is yours alone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-teal-100 shadow-sm flex items-center justify-center text-teal-600">
                {icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1.5">{title}</div>
                <div className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
