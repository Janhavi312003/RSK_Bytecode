"use client";

import Link from "next/link";
import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaBook,
  FaHeart,
  FaExternalLinkAlt,
  FaCode,
  FaShieldAlt
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-[#2a2a2a] mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              RSK Bytecode Verifier
            </h3>
            <p className="text-[#a0a0a0] text-sm mb-4">
              A smart contract verification tool that compares deployed
              contract bytecode with locally compiled bytecode on Rootstock.
            </p>
            <p className="text-[#a0a0a0] text-sm flex items-center gap-2">
              <FaShieldAlt className="text-[#FF6600]" />
              Secure & Transparent Verification
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://rootstock.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm flex items-center gap-2 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Rootstock Website
                </a>
              </li>
              <li>
                <a
                  href="https://developers.rsk.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm flex items-center gap-2 transition-colors"
                >
                  <FaBook className="text-xs" />
                  Developer Docs
                </a>
              </li>
              <li>
                <a
                  href="https://explorer.rsk.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm flex items-center gap-2 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  RSK Explorer
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/rootstock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm flex items-center gap-2 transition-colors"
                >
                  <FaGithub className="text-xs" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/rootstock_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm flex items-center gap-2 transition-colors"
                >
                  <FaTwitter className="text-xs" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/rootstock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm flex items-center gap-2 transition-colors"
                >
                  <FaDiscord className="text-xs" />
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Internal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Project</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/verify"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm transition-colors"
                >
                  Verify Contract
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#a0a0a0] hover:text-[#FF6600] text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#a0a0a0] text-sm">
              © {currentYear} RSK Bytecode Verifier. All rights reserved.
            </p>
             <p className="text-[#a0a0a0] text-sm flex items-center gap-2">
              Built with <FaHeart className="text-[#FF6600]" /> for Rootstock
            </p>
            <p className="text-[#a0a0a0] text-sm flex items-center gap-2">
              <FaCode className="text-[#FF6600]" />
              Built on Rootstock (RSK)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}