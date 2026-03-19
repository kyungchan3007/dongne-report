import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dce7f5]/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#1b64da]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#3182f6] text-white">
            D
          </span>
          dongne-report
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-[#dce7f5] bg-white p-1 text-sm text-[#4e5968] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <Link href="/" className="rounded-full px-3 py-1.5 transition hover:bg-[#f2f7ff] hover:text-[#1b64da]">
            Search
          </Link>
          <Link
            href="/about"
            className="rounded-full px-3 py-1.5 transition hover:bg-[#f2f7ff] hover:text-[#1b64da]"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
