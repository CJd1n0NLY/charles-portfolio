import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 border-b border-line mb-12 gap-4">
      <Link href="/" className="font-display font-bold text-2xl tracking-tight text-ink hover:text-ribbon transition-colors">
        CJCP
      </Link>
      <nav className="flex flex-wrap gap-6 font-mono text-sm">
        <Link href="/" className="text-ink-soft hover:text-ribbon transition-colors">~/home</Link>
        <Link href="/about" className="text-ink-soft hover:text-ribbon transition-colors">~/about</Link>
        <Link href="/contact" className="text-ink-soft hover:text-ribbon transition-colors">~/contact</Link>
        
        {/* Discrete Admin Access */}
        {/* <Link href="/admin" className="text-ink-soft/40 hover:text-ribbon transition-colors ml-4">
          _admin
        </Link> */}
      </nav>
    </header>
  );
}