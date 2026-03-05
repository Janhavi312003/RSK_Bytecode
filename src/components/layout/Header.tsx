'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="border-b border-border  backdrop-blur flex bg-black">
  <div className="container flex h-16 items-center justify-between">
    <Link href="/" className="text-xl font-bold text-rsk-orange hover:text-orange-400 transition-colors">
      RSK Bytecode Verifier
    </Link>
    <nav className="flex items-center gap-6">
      <Link href="/dashboard" className="text-white hover:text-rsk-orange transition-colors">
        Dashboard
      </Link>
      <Link href="/docs" className="text-white hover:text-rsk-orange transition-colors">
        Docs
      </Link>
      <Link href="/about" className="text-white hover:text-rsk-orange transition-colors">
        About
      </Link>
      <Link href="/contact" className="text-white hover:text-rsk-orange transition-colors">
        Contact
      </Link>
      <ConnectButton />
    </nav>
  </div>
</header>

  );
}