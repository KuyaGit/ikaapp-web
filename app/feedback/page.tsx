"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState } from "react";

type IssueType = "bug" | "feature";

const GITHUB_REPO = "KuyaGit/ikaapp-web";

function buildIssueUrl(
  type: IssueType,
  title: string,
  description: string,
  steps: string,
  expected: string,
  device: string,
  email: string
): string {
  const typeLabel = type === "bug" ? "🐛 Bug Report" : "✨ Feature Request";
  const label = type === "bug" ? "bug" : "enhancement";

  let body = `## ${typeLabel}\n\n`;
  body += `### Description\n\n${description}\n\n`;

  if (type === "bug") {
    if (steps) body += `### Steps to Reproduce\n\n${steps}\n\n`;
    if (expected) body += `### Expected Behavior\n\n${expected}\n\n`;
  }

  if (device) body += `### Device & App Version\n\n${device}\n\n`;
  if (email) body += `### Contact\n\n${email}\n\n`;

  body += `\n---\n*Submitted via the [ikaapp feedback form](https://kuyagit.github.io/ikaapp-web/feedback)*`;

  const params = new URLSearchParams({ title, body, labels: label });
  return `https://github.com/${GITHUB_REPO}/issues/new?${params}`;
}

export default function FeedbackPage() {
  const [type, setType] = useState<IssueType>("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [expected, setExpected] = useState("");
  const [device, setDevice] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = buildIssueUrl(type, title, description, steps, expected, device, email);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50 py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Report an Issue or Request a Feature
            </h1>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Found a bug or have an idea to improve ikaapp? Fill out the form below and
              it will open a pre-filled issue on our{" "}
              <a
                href={`https://github.com/${GITHUB_REPO}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                GitHub Issues
              </a>
              .
            </p>
          </div>

          {/* How it works */}
          <div className="mb-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-4">How to submit</p>
            <ol className="space-y-3">
              {[
                { n: "1", text: "Fill out the form below with as much detail as possible." },
                { n: "2", text: 'Click "Open Issue on GitHub" — a pre-filled GitHub issue will open in a new tab.' },
                { n: "3", text: 'Review the content, attach a screenshot if needed, then click "Submit new issue" on GitHub.' },
              ].map(({ n, text }) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {n}
                  </span>
                  <span className="text-sm text-gray-500 leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-gray-400">
              A GitHub account is required to submit. Don&apos;t have one?{" "}
              <a
                href="https://github.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                Sign up for free
              </a>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Issue Type */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-4">What are you submitting?</p>
              <div className="grid grid-cols-2 gap-3">
                <TypeCard
                  active={type === "bug"}
                  onClick={() => setType("bug")}
                  icon="🐛"
                  label="Bug Report"
                  desc="Something isn't working correctly"
                />
                <TypeCard
                  active={type === "feature"}
                  onClick={() => setType("feature")}
                  icon="✨"
                  label="Feature Request"
                  desc="An idea or improvement for the app"
                />
              </div>
            </div>

            {/* Main fields */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
              <Field
                label="Title"
                required
                hint="A clear, concise summary of the issue or request"
              >
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={type === "bug" ? "e.g. App crashes when adding expense" : "e.g. Add dark mode support"}
                  required
                  maxLength={200}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-gray-900 placeholder-gray-400 transition"
                />
              </Field>

              <Field
                label="Description"
                required
                hint={type === "bug"
                  ? "Describe what happened and what you expected to happen"
                  : "Describe the feature you'd like and the problem it solves"}
              >
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={type === "bug"
                    ? "When I tap on 'Add Expense', the app closes unexpectedly..."
                    : "It would be helpful to have a dark mode because..."}
                  required
                  rows={5}
                  maxLength={2000}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-gray-900 placeholder-gray-400 resize-y transition"
                />
              </Field>

              {type === "bug" && (
                <>
                  <Field
                    label="Steps to Reproduce"
                    hint="List the exact steps that cause the issue"
                  >
                    <textarea
                      value={steps}
                      onChange={e => setSteps(e.target.value)}
                      placeholder={"1. Open the app\n2. Tap on Expenses tab\n3. Tap the + Add button\n4. App crashes"}
                      rows={4}
                      maxLength={1000}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-gray-900 placeholder-gray-400 resize-y transition"
                    />
                  </Field>

                  <Field
                    label="Expected Behavior"
                    hint="What should have happened instead?"
                  >
                    <textarea
                      value={expected}
                      onChange={e => setExpected(e.target.value)}
                      placeholder="The expense entry form should open so I can log the expense."
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-gray-900 placeholder-gray-400 resize-y transition"
                    />
                  </Field>
                </>
              )}

              <Field
                label="Device & App Version"
                hint="e.g. Samsung Galaxy A54, Android 14, ikaapp v1.3.2"
              >
                <input
                  type="text"
                  value={device}
                  onChange={e => setDevice(e.target.value)}
                  placeholder="Samsung Galaxy A54, Android 14, ikaapp v1.3.2"
                  maxLength={200}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-gray-900 placeholder-gray-400 transition"
                />
              </Field>

              <Field
                label="Email (optional)"
                hint="Leave your email if you'd like a follow-up"
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  maxLength={200}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-gray-900 placeholder-gray-400 transition"
                />
              </Field>
            </div>

            {/* Screenshot note */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 text-sm text-amber-700">
              <span className="font-semibold">Screenshot?</span> You can attach one directly on GitHub after the issue is opened.
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Open Issue on GitHub
            </button>

            <p className="text-center text-xs text-gray-400 pb-8">
              Your submission will be publicly visible as a GitHub Issue.{" "}
              <a href={`https://github.com/${GITHUB_REPO}/issues`} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
                View all issues
              </a>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function TypeCard({
  active, onClick, icon, label, desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-4 rounded-xl border-2 transition-all ${
        active
          ? "border-teal-500 bg-teal-50"
          : "border-gray-100 hover:border-gray-200 bg-white"
      }`}
    >
      <div className="text-xl mb-2">{icon}</div>
      <div className={`text-sm font-semibold ${active ? "text-teal-700" : "text-gray-800"}`}>
        {label}
      </div>
      <div className="text-xs text-gray-400 mt-0.5 leading-snug">{desc}</div>
    </button>
  );
}

function Field({
  label, required, hint, children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-1 mb-1.5">
        <label className="text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-teal-500 ml-0.5">*</span>}
        </label>
      </div>
      {hint && <p className="text-xs text-gray-400 mb-2 leading-snug">{hint}</p>}
      {children}
    </div>
  );
}
