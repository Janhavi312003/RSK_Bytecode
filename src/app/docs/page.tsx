'use client'

import { FaBook, FaCode, FaShieldAlt, FaSearch } from 'react-icons/fa'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <FaBook className="text-orange-500 text-3xl" />
          <h1 className="text-4xl font-bold">Documentation</h1>
        </div>

        <div className="space-y-8">

          {/* Overview */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <FaShieldAlt className="text-orange-500" />
              Overview
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Smart contract verification ensures that the code running on-chain
              matches the publicly available source code. The RSK Bytecode Verifier
              compares deployed bytecode (stored on the blockchain) with bytecode
              compiled locally from source.
            </p>
          </section>

          {/* Comparison Process */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <FaSearch className="text-orange-500" />
              Comparison Process
            </h2>

            <div className="space-y-5 text-gray-400">
              <div className="flex gap-3">
                <span className="text-orange-500 font-bold">1.</span>
                <p>
                  <strong className="text-white">Fetch deployed bytecode:</strong> 
                  Using the Rootstock RPC method <code className="text-orange-400">eth_getCode</code>, 
                  we retrieve runtime bytecode from the specified contract address.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-orange-500 font-bold">2.</span>
                <p>
                  <strong className="text-white">Normalization:</strong> 
                  Bytecode strings are converted to lowercase and optionally have 
                  the Solidity metadata hash removed for consistent comparison.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-orange-500 font-bold">3.</span>
                <p>
                  <strong className="text-white">Hash computation:</strong> 
                  A keccak256 hash is computed for each normalized bytecode.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-orange-500 font-bold">4.</span>
                <p>
                  <strong className="text-white">Comparison:</strong> 
                  If hashes match, the contracts are identical. If not, a byte-by-byte 
                  diff highlights discrepancies.
                </p>
              </div>
            </div>
          </section>

          {/* Deployed vs Compiled */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <FaCode className="text-orange-500" />
              Deployed vs Compiled Bytecode
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Deployed bytecode is the runtime code that executes on-chain. It does 
              <em> not </em> include constructor logic or arguments. When compiling,
              you receive both <strong className="text-white">bytecode</strong> 
              (creation code) and <strong className="text-white">deployedBytecode</strong> 
              (runtime code). Always use <strong className="text-white">deployedBytecode</strong> 
              for verification.
            </p>
          </section>

          {/* Metadata */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">
              Metadata Hash
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Solidity appends a CBOR-encoded metadata hash to the end of the bytecode.
              This includes compiler version and source mappings. Two compilations of
              identical source may produce different metadata. The “Ignore metadata”
              option removes the last ~53 bytes to compare only the logical code.
            </p>
          </section>

          {/* Constructor */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">
              Constructor Arguments
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Constructor arguments are appended to creation bytecode during deployment.
              They are not part of runtime bytecode stored on-chain and therefore do not
              affect verification.
            </p>
          </section>

          {/* Security */}
          <section className="bg-rsk-panel border border-rsk-panelBorder p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">
              Security Considerations
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                Verify that your RPC endpoint is trustworthy.
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                Never share private keys — this tool does not require them.
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                Always review source code independently before trusting a contract.
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  )
}