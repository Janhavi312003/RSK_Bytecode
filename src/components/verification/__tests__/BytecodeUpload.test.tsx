import { render, screen, fireEvent, act } from '@testing-library/react';
import { BytecodeUpload } from '../BytecodeUpload';

function flushPromises() {
  return act(async () => {
    await Promise.resolve();
  });
}

describe('BytecodeUpload', () => {
  it('reads uploaded file and trims content', async () => {
    const onChange = jest.fn();

    const fileText = '  0xdeadbeef  \n';
    const readAsTextMock = jest
      .spyOn(FileReader.prototype, 'readAsText')
      .mockImplementation(function () {
        // JSDOM's FileReader#result can be readonly; emulate load event instead.
        this.onload?.(
          {
            target: { result: fileText },
          } as unknown as ProgressEvent<FileReader>
        );
      });

    render(<BytecodeUpload value="" onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    const file = new File(['ignored'], 'bytecode.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });

    await flushPromises();

    expect(onChange).toHaveBeenCalledWith('0xdeadbeef');
    readAsTextMock.mockRestore();
  });

  it('resets the file input value after selection', () => {
    const onChange = jest.fn();
    jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function () {
      this.onload?.(
        {
          target: { result: '0x00' },
        } as unknown as ProgressEvent<FileReader>
      );
    });
    render(<BytecodeUpload value="" onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [new File(['a'], 'a.txt')] } });

    expect(input.value).toBe('');
  });

  it('shows an error for files above size limit', () => {
    const onChange = jest.fn();
    render(<BytecodeUpload value="" onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = new File(['x'], 'big.txt', { type: 'text/plain' });
    Object.defineProperty(bigFile, 'size', { value: 600 * 1024 });

    fireEvent.change(input, { target: { files: [bigFile] } });

    expect(screen.getByText(/File too large/i)).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does nothing when no file is selected', () => {
    const onChange = jest.fn();
    render(<BytecodeUpload value="" onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [] } });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('prefers component error prop when fileError is not set', () => {
    const onChange = jest.fn();
    render(<BytecodeUpload value="" onChange={onChange} error="Invalid bytecode format." />);

    expect(screen.getByText('Invalid bytecode format.')).toBeInTheDocument();
  });

  it('clears fileError on new selection attempt', () => {
    const onChange = jest.fn();
    render(<BytecodeUpload value="" onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = new File(['x'], 'big.txt', { type: 'text/plain' });
    Object.defineProperty(bigFile, 'size', { value: 600 * 1024 });

    fireEvent.change(input, { target: { files: [bigFile] } });
    expect(screen.getByText(/File too large/i)).toBeInTheDocument();

    jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function () {
      this.onload?.(
        {
          target: { result: '0x01' },
        } as unknown as ProgressEvent<FileReader>
      );
    });
    fireEvent.change(input, { target: { files: [new File(['a'], 'a.txt')] } });

    expect(screen.queryByText(/File too large/i)).toBeNull();
  });
});

