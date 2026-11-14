import { useEffect, useState } from "react";
import { Link } from "wouter";

// Visitor analytics (Vector) load only after the visitor accepts. The choice is
// kept in localStorage; bump the key when a new tracking service is added so
// visitors are asked again.
const STORAGE_KEY = "olerivo-consent-v1";
const VECTOR_SRC = "https://d2mvefebd70kbz.cloudfront.net/scripts/01a1dae8-5b54-7a95-ab4b-27c18a15b883.js";
const OPEN_EVENT = "olerivo:cookie-settings";

type Choice = "accepted" | "rejected";

function readChoice(): Choice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Private mode or blocked storage: the choice applies to this page view only.
  }
}

function loadVector() {
  if (document.querySelector(`script[src="${VECTOR_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = VECTOR_SRC;
  script.async = true;
  document.head.appendChild(script);
}

/** Reopens the cookie choices, e.g. from the footer. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieConsent() {
  // Hidden during pre-rendering and until the stored choice has been read.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "accepted") loadVector();
    else if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (choice: Choice) => {
    const previous = readChoice();
    saveChoice(choice);
    setOpen(false);
    if (choice === "accepted") loadVector();
    // A loaded script cannot be unloaded; reload so it stops running.
    else if (previous === "accepted") window.location.reload();
  };

  if (!open) return null;

  return (
    <section
      aria-label="Cookie choices"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-[420px] rounded-2xl border border-black/[0.08] bg-white p-5 text-[#222221] shadow-[0_12px_40px_-12px_rgba(22,16,12,0.28)] sm:left-6 sm:right-auto sm:mx-0"
    >
      <p className="text-[15px] leading-[1.5]">
        Can we use analytics cookies? They help us see which companies visit this site. Nothing loads unless you
        accept.{" "}
        <Link href="/privacy#cookies" className="underline underline-offset-[3px] hover:text-[#6b6864]">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="min-h-11 rounded-full border border-[#16100c] px-4 text-[15px] font-medium transition-colors hover:bg-[#f4f2ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="min-h-11 rounded-full border border-[#16100c] px-4 text-[15px] font-medium transition-colors hover:bg-[#f4f2ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Accept
        </button>
      </div>
    </section>
  );
}
