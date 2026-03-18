import React from 'react';
import { ComparisonResult } from '@/lib/verification/compare';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ByteDiffViewer } from './ByteDiffViewer';

interface ResultCardProps {
  result: ComparisonResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const { match, deployedHash, localHash, differences, deployedBytecode, localBytecode, lengthMismatch } = result;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Verification Result
          {match ? (
            <Badge className="bg-green-600">✅ Match</Badge>
          ) : (
            <Badge variant="destructive">❌ Mismatch</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Deployed Bytecode Hash</p>
            <p className="font-mono text-xs break-all">{deployedHash}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Local Bytecode Hash</p>
            <p className="font-mono text-xs break-all">{localHash}</p>
          </div>
        </div>

        {!match && lengthMismatch && (
          <p className="text-sm text-amber-500">
            Bytecode lengths differ — one side has missing bytes (shown as <code>--</code> in the diff).
          </p>
        )}
        {!match && differences && (
          <ByteDiffViewer
            differences={differences}
            deployedBytecode={deployedBytecode}
            localBytecode={localBytecode}
          />
        )}

        <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
          <p className="font-medium">Verification Logic:</p>
          <ul className="list-disc list-inside text-xs mt-1">
            <li>Deployed bytecode fetched via eth_getCode</li>
            <li>Both bytecodes normalized (lowercase, optional metadata removal)</li>
            <li>keccak256 hash computed for each</li>
            <li>Hashes compared for equality</li>
            <li>If mismatch, byte-level differences are shown</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}