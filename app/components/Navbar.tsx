import Link from "next/link";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-0.5">
          <span className="text-xl font-light text-gray-500 tracking-tight">ika</span>
          <span className="text-xl font-bold text-teal-600 tracking-tight">app</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-0.5 mb-3" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <a href={`${bp}/#features`} className="hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href={`${bp}/#screens`} className="hover:text-gray-900 transition-colors">
            Screenshots
          </a>
          <a href={`${bp}/#download`} className="hover:text-gray-900 transition-colors">
            Download
          </a>
          <Link href="/donate" className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-medium transition-colors">
            🙏 Love Gift
          </Link>
          <Link href="/feedback" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors">
            Report Issue
          </Link>
        </nav>

        <a
          href={`${bp}/#download`}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          <svg
            className="w-4 h-4"
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
      </div>
    </header>
  );
}
