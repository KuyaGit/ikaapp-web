"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";

type IssueType = "bug" | "feature";

interface SubmitResult {
  issueUrl: string;
  issueNumber: number;
}

export default function FeedbackPage() {
  const [type, setType] = useState<IssueType>("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [expected, setExpected] = useState("");
  const [device, setDevice] = useState("");
  const [email, setEmail] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!screenshot) { setPreviewUrl(null); return; }
    const url = URL.createObjectURL(screenshot);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [screenshot]);

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) setScreenshot(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData();
    fd.append("type", type);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("steps", steps);
    fd.append("expected", expected);
    fd.append("device", device);
    fd.append("email", email);
    fd.append("website", ""); // honeypot — must stay empty
    if (screenshot) fd.append("screenshot", screenshot);

    try {
      const res = await fetch("/api/submit-issue", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult({ issueUrl: data.issueUrl, issueNumber: data.issueNumber });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success" && result) {
    return (
      <>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Issue Submitted!</h1>
            <p className="text-gray-500 mb-8">
              Your {type === "bug" ? "bug report" : "feature request"} has been created as{" "}
              <span className="font-semibold text-gray-700">#{result.issueNumber}</span> on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={result.issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View Issue #{result.issueNumber}
              </a>
              <button
                onClick={() => {
                  setStatus("idle");
                  setTitle("");
                  setDescription("");
                  setSteps("");
                  setExpected("");
                  setDevice("");
                  setEmail("");
                  setScreenshot(null);
                  setResult(null);
                }}
                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-600 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Submit Another
              </button>
            </div>
            <Link href="/" className="block mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to home
            </Link>
          </div>
        </main>
      </>
    );
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
              it will be submitted directly to our{" "}
              <a
                href="https://github.com/KuyaGit/ikaapp-web/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                GitHub Issues
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

            {/* Screenshot upload */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-1">Screenshot (optional)</p>
              <p className="text-xs text-gray-400 mb-4">Attach a screenshot to help explain the issue. Max 5 MB.</p>

              {previewUrl ? (
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={previewUrl}
                      alt="Screenshot preview"
                      className="w-full max-h-64 object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => { setScreenshot(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className="absolute top-2 right-2 w-7 h-7 bg-gray-900/70 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors text-xs font-bold"
                  >
                    ✕
                  </button>
                  <p className="text-xs text-gray-400 mt-2 truncate">{screenshot?.name}</p>
                </div>
              ) : (
                <div
                  ref={dropRef}
                  onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add("border-teal-400", "bg-teal-50"); }}
                  onDragLeave={() => { dropRef.current?.classList.remove("border-teal-400", "bg-teal-50"); }}
                  onDrop={e => { dropRef.current?.classList.remove("border-teal-400", "bg-teal-50"); handleFileDrop(e); }}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-teal-100 flex items-center justify-center mx-auto mb-3 transition-colors">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 12h18M3 6h18" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 group-hover:text-teal-700 transition-colors">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, WEBP up to 5 MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) setScreenshot(file);
                }}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Honeypot — hidden from real users */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Submit to GitHub Issues
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 pb-8">
              Your submission will be publicly visible as a GitHub Issue.{" "}
              <a href="https://github.com/KuyaGit/ikaapp-web/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
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
