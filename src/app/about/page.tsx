'use client'

import { FaShieldAlt, FaCode, FaLock, FaCheckCircle } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-10">
          About RSK Bytecode Verifier
        </h1>

        <div className="space-y-8">

          {/* What is it */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <FaShieldAlt className="text-orange-500" />
              What is RSK Bytecode Verifier?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              The RSK Bytecode Verifier is an open-source tool designed to enhance
              transparency and trust within the Rootstock ecosystem. It allows
              anyone to verify that a deployed smart contract matches its publicly
              available source code by comparing on-chain bytecode with locally
              compiled bytecode.
            </p>
          </section>

          {/* Why Transparency */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <FaLock className="text-orange-500" />
              Why Transparency Matters
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Smart contracts often hold significant value and control over funds.
              Users need assurance that the code they interact with is exactly what
              was intended. Verification ensures that no malicious or unexpected
              code is running on the blockchain.
            </p>
          </section>

          {/* Mission */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <FaCode className="text-orange-500" />
              Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We aim to provide a simple, reliable, and developer-friendly tool
              that fosters a culture of verification and security in the
              Rootstock community. By making bytecode comparison accessible,
              we empower users to independently verify contracts and build
              confidence in the applications they use.
            </p>
          </section>

          {/* Tech Stack */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6">
              Technology Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Frontend: Next.js, TypeScript, Tailwind CSS, ShadCN UI",
                "Web3: RainbowKit, Wagmi, Viem",
                "Blockchain: Rootstock Mainnet & Testnet",
                "Smart Contracts: Foundry, Solidity"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Open Source */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">
              Open Source
            </h2>
            <p className="text-gray-400 leading-relaxed">
              This project is open source and available on GitHub.
              Contributions, issues, and feature requests are welcome.
              Together, we can improve security standards across the
              Rootstock ecosystem.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}