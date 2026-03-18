'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContractAddressInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string | null;
}

export function ContractAddressInput({ value, onChange, disabled, error }: ContractAddressInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="contract-address" className="text-gray-300">Contract Address</Label>
      <Input
        id="contract-address"
        placeholder="0x..."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        disabled={disabled}
        className="bg-black/50 border-orange-500/20 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}