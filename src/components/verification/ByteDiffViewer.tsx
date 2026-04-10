import React, { useMemo, useState } from 'react';
import { ByteDifference } from '@/lib/verification/compare';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  const STEP = 20;
  const [visibleCount, setVisibleCount] = useState(STEP);

  const sample = useMemo(() => differences.slice(0, visibleCount), [differences, visibleCount]);
  const remaining = Math.max(0, differences.length - sample.length);

  return (
    <Card className="p-4 bg-muted/50 font-mono text-sm overflow-x-auto">
      <h4 className="text-sm font-semibold mb-2">
        Byte-level Differences ({sample.length} of {differences.length})
      </h4>
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
      {remaining > 0 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">... and {remaining} more differences</p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setVisibleCount((c) => Math.min(differences.length, c + STEP))}
            >
              Show more
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setVisibleCount(differences.length)}
            >
              Show all
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}