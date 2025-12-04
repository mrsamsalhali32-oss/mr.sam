import React from 'react';
import { ScanResult } from '../types';

interface ResultCardProps {
  result: ScanResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400';
    if (score < 70) return 'text-yellow-400';
    return 'text-red-500';
  };

  const getRiskBg = (score: number) => {
    if (score < 30) return 'bg-green-500/10 border-green-500/30';
    if (score < 70) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  const getIcon = (verdict: string) => {
    if (verdict === 'آمن') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (verdict === 'مشبوه') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className={`mt-8 w-full max-w-3xl mx-auto rounded-xl border p-6 animate-fade-in-up ${getRiskBg(result.riskScore)}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Score and Icon */}
        <div className="flex flex-col items-center justify-center min-w-[150px]">
          {getIcon(result.verdict)}
          <h2 className={`text-3xl font-bold mt-2 ${getRiskColor(result.riskScore)}`}>{result.verdict}</h2>
          <span className="text-slate-400 text-sm mt-1">درجة الخطورة: {result.riskScore}%</span>
        </div>

        {/* Content */}
        <div className="flex-1 text-right w-full">
          <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-slate-700/50">
            <p className="text-slate-300 font-mono text-sm break-all" dir="ltr">{result.url}</p>
          </div>
          
          <p className="text-lg text-white font-medium mb-4 leading-relaxed">
            {result.summary}
          </p>

          <div className="space-y-3">
            <h3 className="text-slate-300 font-bold border-b border-slate-700 pb-2">تفاصيل التحليل:</h3>
            <ul className="space-y-2">
              {result.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 bg-slate-800/80 rounded-lg p-4 border border-slate-700">
             <h3 className="text-blue-400 font-bold mb-1 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
               </svg>
               توصية:
             </h3>
             <p className="text-white text-sm">{result.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};