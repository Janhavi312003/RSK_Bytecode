import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAccount, usePublicClient } from 'wagmi';
import DashboardPage from '../page';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  usePublicClient: jest.fn(),
}));

jest.mock('@/components/verification/ContractAddressInput', () => {
  const { useAccount } = require('wagmi');
  return {
    ContractAddressInput: () => {
      const { isConnected } = useAccount();
      return isConnected ? <div data-testid="contract-input" /> : null;
    },
  };
});
jest.mock('@/components/verification/BytecodeUpload', () => ({
  BytecodeUpload: () => <div data-testid="bytecode-upload" />,
}));
jest.mock('@/components/verification/CompareButton', () => ({
  CompareButton: () => <div data-testid="compare-button" />,
}));
jest.mock('@/components/verification/ResultCard', () => ({
  ResultCard: () => <div data-testid="result-card" />,
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // provide a no‑op implementation so DashboardPage can invoke it
    (usePublicClient as jest.Mock).mockReturnValue(jest.fn());
  });

  it('shows connect wallet message when not connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });

    render(<DashboardPage />);

    expect(screen.getByText(/connect your wallet/i)).toBeInTheDocument();
    expect(screen.queryByTestId('contract-input')).not.toBeInTheDocument();
  });

  it('shows verification form when wallet is connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });

    render(<DashboardPage />);

    expect(screen.queryByText(/connect your wallet/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('contract-input')).toBeInTheDocument();
    expect(screen.getByTestId('bytecode-upload')).toBeInTheDocument();
    expect(screen.getByTestId('compare-button')).toBeInTheDocument();
  });
});