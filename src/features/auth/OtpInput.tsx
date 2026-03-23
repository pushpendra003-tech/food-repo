import { useState, useCallback } from 'react';
import { Phone, KeyRound } from 'lucide-react';

interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
}

export default function OtpInput({ value, onChange, onComplete }: OtpInputProps) {
  const handleChange = useCallback((index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = value.substring(0, index) + val + value.substring(index + 1);
    onChange(newOtp);
    if (newOtp.length === 6 && onComplete) {
      onComplete(newOtp);
    }
  }, [value, onChange, onComplete]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      (e.target as HTMLInputElement).previousElementSibling?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      (e.target as HTMLInputElement).previousElementSibling?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      (e.target as HTMLInputElement).nextElementSibling?.focus();
    }
  }, [value]);

  return (
    <div className="flex gap-3 justify-center mb-6">
      {Array.from('------').map((_, index) => (
        <div key={index} className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all group">
          <input
            className="w-full h-full text-center text-2xl font-bold text-gray-900 outline-none bg-transparent rounded-lg"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      ))}
      <div className="flex flex-col items-center ml-4">
        <KeyRound className="w-8 h-8 text-gray-400 mb-1" />
        <span className="text-xs text-gray-500 font-medium">Enter 6-digit code</span>
      </div>
    </div>
  );
}
