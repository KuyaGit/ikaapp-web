import Image from "next/image";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const screens = [
  {
    src: `${bp}/screenshots/home.png`,
    label: "Dashboard",
    description: "Income, savings & budget overview",
  },
  {
    src: `${bp}/screenshots/savings.png`,
    label: "Savings",
    description: "Track progress toward your goal",
  },
  {
    src: `${bp}/screenshots/expenses.png`,
    label: "Expenses",
    description: "Monitor daily spending",
  },
  {
    src: `${bp}/screenshots/tithes.png`,
    label: "Tithes & Blessings",
    description: "Weekly blessings & tithe calculation",
  },
  {
    src: `${bp}/screenshots/settings.png`,
    label: "Budget Settings",
    description: "Income, categories & pay schedule",
  },
];

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-40 flex-shrink-0 overflow-hidden rounded-[2.25rem] border-[5px] border-gray-800 shadow-xl shadow-gray-300/60 bg-gray-800">
      <div className="h-6 bg-gray-800 flex items-center justify-center">
        <div className="w-14 h-1 rounded-full bg-gray-600" />
      </div>
      <div className="bg-[#f2f2f7] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={390}
          height={844}
          className="w-full h-auto"
        />
      </div>
      <div className="h-4 bg-gray-800 flex items-center justify-center">
        <div className="w-16 h-0.5 rounded-full bg-gray-600" />
      </div>
    </div>
  );
}

export default function Screens() {
  return (
    <section id="screens" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Everything in one place
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Simple, focused screens that stay out of your way.
          </p>
        </div>

        {/* Scrollable on mobile, centered on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-6 md:justify-center md:overflow-visible md:flex-wrap">
          {screens.map(({ src, label, description }) => (
            <div key={label} className="flex flex-col items-center gap-4">
              <PhoneFrame src={src} alt={label} />
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-800">
                  {label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
