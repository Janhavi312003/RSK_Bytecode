import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaShieldAlt } from 'react-icons/fa'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-rsk-dark text-white">

      {/* subtle background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,107,0,0.05),_transparent_50%)] pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-6 py-24 text-center">

        {/* Hero Section */}
        <div className="mb-14 flex flex-col items-center">

          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-transparent mb-6">
            <FaShieldAlt className="text-5xl text-orange-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            Rootstock Bytecode Verifier
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
            Verify deployed smart contracts on the Rootstock network by comparing
            on-chain bytecode with locally compiled bytecode. Improve transparency,
            security, and trust in Web3.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
            >
              <Link href="/dashboard">Launch Verifier</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-orange-500/40 text-orange-400 hover:bg-orange-500/10"
            >
              <Link href="/docs">Documentation</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

          <div className="p-6 rounded-xl bg-gradient-to-br from-rsk-surface to-rsk-surface2 border border-orange-500/10 shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-orange-400">
              🔍 Fetch Deployed Bytecode
            </h3>
            <p className="text-gray-400 text-sm">
              Automatically retrieve smart contract bytecode directly from the
              Rootstock blockchain using RPC endpoints.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-rsk-surface to-rsk-surface2 border border-orange-500/10 shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-orange-400">
              ⚖️ Compare Bytecode Hash
            </h3>
            <p className="text-gray-400 text-sm">
              Generate keccak256 hashes of deployed and compiled bytecode to
              verify authenticity and detect mismatches.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-rsk-surface to-rsk-surface2 border border-orange-500/10 shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-orange-400">
              🔐 Improve Transparency
            </h3>
            <p className="text-gray-400 text-sm">
              Help developers and users verify smart contracts easily and build
              stronger trust within the Rootstock ecosystem.
            </p>
          </div>

        </div>

      </main>
    </div>
  )
}