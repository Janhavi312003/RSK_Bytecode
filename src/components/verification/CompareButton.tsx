'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CompareButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export function CompareButton({ onClick, disabled, loading }: CompareButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled || loading} className="w-full">
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? 'Comparing...' : 'Compare Bytecode'}
    </Button>
  );
}