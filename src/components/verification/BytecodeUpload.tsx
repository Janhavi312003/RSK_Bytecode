'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';

const MAX_FILE_SIZE_BYTES = 512 * 1024; // 512 KB

interface BytecodeUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string | null;
}

export function BytecodeUpload({ value, onChange, disabled, error }: BytecodeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    } else {
      e.target.value = '';
    }
    setFileError(null);
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File too large. Maximum size is ${MAX_FILE_SIZE_BYTES / 1024} KB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onChange(content.trim());
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="bytecode" className="text-gray-300">
        Compiled Bytecode <span className="text-orange-400/70 text-sm">(hex)</span>
      </Label>
      <Textarea
        id="bytecode"
        placeholder="0x..."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        rows={6}
        disabled={disabled}
        className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="flex items-center gap-2 flex-wrap">
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
          disabled={disabled}
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
      {(fileError || error) && (
        <p className="text-sm text-red-400">{fileError ?? error}</p>
      )}
    </div>
  );
}