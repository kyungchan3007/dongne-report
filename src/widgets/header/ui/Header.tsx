import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-bold text-primary">
          dongne-report
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <Link href="/">Search</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
