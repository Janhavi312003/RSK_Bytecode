'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useRef } from 'react';

interface BytecodeUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function BytecodeUpload({ value, onChange }: BytecodeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onChange(content.trim());
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
    <Label htmlFor="bytecode">Compiled Bytecode (hex)</Label>
    <Textarea
      id="bytecode"
      placeholder="0x..."
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      rows={5}
    />
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept=".txt,.hex"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </Button>
        {value && (
          <span className="text-xs text-muted-foreground">
            Bytecode length: {value.length} chars
          </span>
        )}
      </div>
    </div>
  );
}