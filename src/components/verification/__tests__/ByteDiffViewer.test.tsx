import { render, screen, fireEvent } from '@testing-library/react';
import { ByteDiffViewer } from '../ByteDiffViewer';
import type { ByteDifference } from '@/lib/verification/compare';

function makeDiffs(n: number): ByteDifference[] {
  return Array.from({ length: n }, (_, i) => ({
    index: i,
    deployedByte: 'aa',
    localByte: 'bb',
  }));
}

describe('ByteDiffViewer', () => {
  it('shows 20 differences by default and can show more', () => {
    render(
      <ByteDiffViewer
        differences={makeDiffs(45)}
        deployedBytecode="0x"
        localBytecode="0x"
      />
    );

    expect(screen.getByText(/Byte-level Differences \(20 of 45\)/i)).toBeInTheDocument();
    expect(screen.getByText(/and 25 more differences/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /show more/i }));
    expect(screen.getByText(/Byte-level Differences \(40 of 45\)/i)).toBeInTheDocument();
    expect(screen.getByText(/and 5 more differences/i)).toBeInTheDocument();
  });

  it('can show all differences', () => {
    render(
      <ByteDiffViewer
        differences={makeDiffs(25)}
        deployedBytecode="0x"
        localBytecode="0x"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /show all/i }));
    expect(screen.getByText(/Byte-level Differences \(25 of 25\)/i)).toBeInTheDocument();
    expect(screen.queryByText(/more differences/i)).toBeNull();
  });
});

