'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ContractAddressInput } from '@/components/verification/ContractAddressInput';
import { BytecodeUpload } from '@/components/verification/BytecodeUpload';
import { CompareButton } from '@/components/verification/CompareButton';
import { ResultCard } from '@/components/verification/ResultCard';
import { useVerification } from '@/hooks/useVerification';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FaShieldAlt, FaInfoCircle, FaLock } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import {
  normalizeContractAddress,
  contractAddressError,
  bytecodeError,
  isValidBytecode,
} from '@/lib/verification/validation';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [localBytecode, setLocalBytecode] = useState('');
  const [ignoreMetadata, setIgnoreMetadata] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { verify, loading, result, error } = useVerification();

  // Avoid hydration mismatch: wallet state (useAccount) can differ between server and client.
  // Only show wallet-dependent UI after mount so server and first client render match.
  useEffect(() => {
    setMounted(true);
  }, []);

  const addressError = contractAddressError(contractAddress);
  const bytecodeValidationError = bytecodeError(localBytecode);

  const handleCompare = () => {
    setValidationError(null);
    const addr = normalizeContractAddress(contractAddress);
    if (!addr) {
      setValidationError(addressError ?? 'Invalid contract address.');
      return;
    }
    if (!localBytecode.trim()) {
      setValidationError('Please enter or upload compiled bytecode.');
      return;
    }
    if (!isValidBytecode(localBytecode)) {
      setValidationError(bytecodeValidationError ?? 'Invalid bytecode format.');
      return;
    }
    verify(addr, localBytecode.trim(), { ignoreMetadata });
  };

  const showOverlay = !mounted || !isConnected;
  const canCompare =
    mounted &&
    isConnected &&
    contractAddress.trim().length > 0 &&
    localBytecode.trim().length > 0 &&
    !addressError &&
    !bytecodeValidationError &&
    !loading;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      {/* Subtle radial gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,107,0,0.03),_transparent_50%)] pointer-events-none" />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with icon and gradient */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-transparent">
            <FaShieldAlt className="text-4xl text-orange-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Bytecode Verification
            </h1>
            <p className="text-gray-400 mt-1 text-lg">
              Verify that a deployed smart contract matches its source code.
            </p>
          </div>
        </div>

        {/* Quick info cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-black/40 border-orange-500/10">
            <CardContent className="p-4 flex items-start gap-3">
              <FaInfoCircle className="text-orange-400 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-orange-300">Where to find Contract Address</h3>
                <p className="text-sm text-gray-400">
                  Get the address from a block explorer (like <a href="https://explorer.rootstock.io" target="_blank" className="text-orange-400 hover:underline">Rootstock Explorer</a>) or from your deployment script output.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-orange-500/10">
            <CardContent className="p-4 flex items-start gap-3">
              <FaInfoCircle className="text-orange-400 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-orange-300">Where to get Compiled Bytecode</h3>
                <p className="text-sm text-gray-400">
                  After compiling your contract, look for the <code className="text-orange-300">deployedBytecode</code> in the artifact JSON (e.g., <code>out/MyContract.sol/MyContract.json</code>).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main verification card */}
        <Card className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border-orange-500/10 shadow-2xl shadow-orange-500/5 relative">
          {showOverlay && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10 p-6">
              <FaLock className="text-orange-500 text-5xl mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Wallet Connection Required</h2>
              <p className="text-gray-300 text-center mb-6 max-w-md">
                Please connect your wallet to access the bytecode verifier. This ensures you are on the correct network and can interact with the blockchain.
              </p>
              <ConnectButton />
            </div>
          )}

          <CardContent className="p-8">
            {showOverlay && (
              <Alert className="mb-6 bg-orange-500/5 border-orange-500/20 text-orange-200/90">
                <AlertDescription>
                  Connect your wallet to enable verification. You can still read the info above.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <ContractAddressInput
                value={contractAddress}
                onChange={setContractAddress}
                disabled={!mounted || !isConnected}
                error={addressError}
              />

              <BytecodeUpload
                value={localBytecode}
                onChange={setLocalBytecode}
                disabled={!mounted || !isConnected}
                error={bytecodeValidationError}
              />

              {/* Metadata toggle */}
              <div className={`flex items-center justify-between bg-black/40 border border-orange-500/10 rounded-lg px-5 py-4 ${showOverlay ? 'opacity-50' : ''}`}>
                <Label htmlFor="ignore-metadata" className="text-gray-300 cursor-pointer text-sm">
                  Ignore metadata hash <span className="text-orange-400/70 text-xs ml-1">(strip CBOR metadata via length in last 2 bytes)</span>
                </Label>
                <Switch
                  id="ignore-metadata"
                  checked={ignoreMetadata}
                  onCheckedChange={setIgnoreMetadata}
                  disabled={!mounted || !isConnected}
                  className="data-[state=checked]:bg-orange-500"
                />
              </div>

              {/* Prominent compare button */}
              <CompareButton
                onClick={handleCompare}
                disabled={!canCompare}
                loading={loading}
              />

              {(validationError || error) && (
                <Alert variant="destructive" className="mt-4 bg-red-500/10 border-red-500/30 text-red-200">
                  <AlertDescription>{validationError ?? error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Result section */}
        {result && (
          <div className="mt-8">
            <ResultCard result={result} />
          </div>
        )}
      </main>
    </div>
  );
}
