import React from 'react';
import { ByteDifference } from '@/lib/verification/compare';
import { Card } from '@/components/ui/card';

interface ByteDiffViewerProps {
  differences: ByteDifference[];
  deployedBytecode: string;
  localBytecode: string;
}

export function ByteDiffViewer({
  differences,
  deployedBytecode,
  localBytecode,
}: ByteDiffViewerProps) {
  // Show first 20 differences as a sample
  const sample = differences.slice(0, 20);

  return (
    <Card className="p-4 bg-muted/50 font-mono text-sm overflow-x-auto">
      <h4 className="text-sm font-semibold mb-2">Byte-level Differences (first 20)</h4>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-muted-foreground">Offset</div>
        <div className="text-muted-foreground">Deployed</div>
        <div className="text-muted-foreground">Local</div>
        {sample.map((diff) => (
          <React.Fragment key={diff.index}>
            <div className="text-orange-500">0x{diff.index.toString(16)}</div>
            <div className="text-red-400">{diff.deployedByte}</div>
            <div className="text-green-400">{diff.localByte}</div>
          </React.Fragment>
        ))}
      </div>
      {differences.length > 20 && (
        <p className="text-xs text-muted-foreground mt-2">
          ... and {differences.length - 20} more differences
        </p>
      )}
    </Card>
  );
}