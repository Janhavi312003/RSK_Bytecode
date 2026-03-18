const HEX_REGEX = /^0x[0-9a-fA-F]*$/;
const ADDRESS_LENGTH = 42; // 0x + 40 hex chars

export function isValidContractAddress(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length !== ADDRESS_LENGTH) return false;
  if (!HEX_REGEX.test(trimmed)) return false;
  return true;
}

export function contractAddressError(value: string): string | null {
  if (!value || !value.trim()) return null;
  const trimmed = value.trim();
  if (trimmed.length !== ADDRESS_LENGTH) {
    return `Address must be exactly ${ADDRESS_LENGTH} characters (0x + 40 hex digits).`;
  }
  if (!HEX_REGEX.test(trimmed)) {
    return 'Address must be a valid hex string (0x followed by hexadecimal characters).';
  }
  return null;
}

export function isValidBytecode(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  const normalized = value.trim().startsWith('0x') ? value.trim().slice(2) : value.trim();
  if (normalized.length === 0) return false;
  if (normalized.length % 2 !== 0) return false;
  return /^[0-9a-fA-F]+$/.test(normalized);
}

export function bytecodeError(value: string): string | null {
  if (!value || !value.trim()) return null;
  const normalized = value.trim().startsWith('0x') ? value.trim().slice(2) : value.trim();
  if (normalized.length === 0) return null;
  if (normalized.length % 2 !== 0) {
    return 'Bytecode must have an even number of hex characters (full bytes).';
  }
  if (!/^[0-9a-fA-F]+$/.test(normalized)) {
    return 'Bytecode must contain only hexadecimal characters (0-9, a-f, A-F).';
  }
  return null;
}

export function normalizeContractAddress(value: string): `0x${string}` | null {
  if (!isValidContractAddress(value)) return null;
  return value.trim().toLowerCase() as `0x${string}`;
}
