export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      {/* Love gift strip */}
      <div className="bg-rose-50 border-b border-rose-100 py-3 px-6 text-center text-sm text-rose-600">
        ikaapp is free forever.{" "}
        <a href="/donate" className="font-semibold underline underline-offset-2 hover:text-rose-700 transition-colors">
          Send a love gift 🙏
        </a>{" "}
        if it has blessed you.
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <span className="font-light text-gray-400">ika</span>
          <span className="font-bold text-teal-600">app</span>
        </div>

        <div className="text-center">
          v1.0.0 &middot; Android &middot; Built with Expo &amp; React Native
        </div>

        <div>&copy; 2026 ikaapp. All data stays on your device.</div>
      </div>
    </footer>
  );
}
