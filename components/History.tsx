import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const History: React.FC<HistoryProps> = ({ items, onSelect }) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-12 w-full max-w-3xl mx-auto">
      <h3 className="text-xl text-slate-400 font-bold mb-4 px-2">عمليات الفحص الأخيرة</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => onSelect(item)}
            className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-4 cursor-pointer border border-slate-700 flex items-center justify-between group"
          >
            <div className="flex-1 overflow-hidden">
               <div className="flex items-center gap-2 mb-1">
                 <span className={`w-2 h-2 rounded-full ${item.verdict === 'آمن' ? 'bg-green-500' : item.verdict === 'مشبوه' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                 <span className={`text-sm font-bold ${item.verdict === 'آمن' ? 'text-green-400' : item.verdict === 'مشبوه' ? 'text-yellow-400' : 'text-red-400'}`}>
                    {item.verdict}
                 </span>
                 <span className="text-slate-500 text-xs mx-2">
                    {new Date(item.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                 </span>
               </div>
               <p className="text-slate-300 text-sm truncate font-mono" dir="ltr">{item.url}</p>
            </div>
            <div className="text-slate-500 group-hover:text-blue-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};