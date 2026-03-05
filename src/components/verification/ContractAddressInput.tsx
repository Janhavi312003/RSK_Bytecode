'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContractAddressInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContractAddressInput({ value, onChange }: ContractAddressInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="contract-address">Contract Address</Label>
      <Input
        id="contract-address"
        placeholder="0x..."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
}