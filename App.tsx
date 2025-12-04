import React, { useState } from 'react';
import { ScannerInput } from './components/ScannerInput';
import { ResultCard } from './components/ResultCard';
import { History } from './components/History';
import { analyzeUrl } from './services/geminiService';
import { ScanResult, HistoryItem } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (url: string) => {
    setLoading(true);
    setError(null);
    setCurrentResult(null);

    try {
      const result = await analyzeUrl(url);
      setCurrentResult(result);
      
      const newItem: HistoryItem = { ...result, timestamp: Date.now() };
      setHistory(prev => [newItem, ...prev].slice(0, 5)); // Keep last 5
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء تحليل الرابط. يرجى التأكد من المفتاح الخاص بك أو المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setCurrentResult(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
            </div>
            <h1 className="text-xl font-bold tracking-wide">كاشف <span className="text-blue-400">الاحتيال</span></h1>
          </div>
          <div className="text-xs font-mono text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
            مدعوم بواسطة Gemini AI
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center p-4 pt-12 md:pt-20 max-w-6xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            تحقق من سلامة <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">الروابط</span>
          </h2>
          <p className="text-slate-400 text-lg">
            أداة ذكية لتحليل الروابط وكشف محاولات التصيد الاحتيالي قبل أن تقع في الفخ.
          </p>
        </div>

        {/* Scanner Input */}
        <ScannerInput onScan={handleScan} isLoading={loading} />

        {/* Error Message */}
        {error && (
          <div className="mt-8 bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-lg w-full max-w-2xl text-center">
            {error}
          </div>
        )}

        {/* Result Area */}
        {currentResult && <ResultCard result={currentResult} />}

        {/* History Area */}
        <History items={history} onSelect={handleSelectHistory} />

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 mt-20 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} كاشف الاحتيال. جميع الحقوق محفوظة.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            <span>تنبيه: النتائج تعتمد على الذكاء الاصطناعي وقد لا تكون دقيقة بنسبة 100%</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;