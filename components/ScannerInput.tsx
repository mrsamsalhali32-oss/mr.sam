import React, { useState } from 'react';

interface ScannerInputProps {
  onScan: (url: string) => void;
  isLoading: boolean;
}

export const ScannerInput: React.FC<ScannerInputProps> = ({ onScan, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('الرجاء إدخال رابط');
      return;
    }
    
    // Basic validation to ensure it looks somewhat like a URL or domain
    if (!url.includes('.') || url.length < 3) {
      setError('الرجاء إدخال رابط صحيح');
      return;
    }

    setError('');
    onScan(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-slate-800 rounded-lg p-2 shadow-2xl border border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none px-2 py-3 text-lg"
            placeholder="أدخل الرابط هنا للفحص (مثال: http://example.com)..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-md font-bold text-white transition-all duration-300 ${
              isLoading 
                ? 'bg-slate-600 cursor-not-allowed' 
                : 'bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/30'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري الفحص...
              </span>
            ) : (
              'فحص الآن'
            )}
          </button>
        </div>
      </form>
      {error && <p className="text-red-400 mt-2 mr-2 text-sm font-medium">{error}</p>}
    </div>
  );
};