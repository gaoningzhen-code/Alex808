import { useState, useEffect } from 'react';
import { Emperor } from '../types';
import { getHistoricalInsight } from '../services/gemini';
import { BookOpen, Sparkles, X, ScrollText, Scale } from 'lucide-react';

interface DetailPanelProps {
  emperor: Emperor | null;
  onClose: () => void;
}

const DetailPanel = ({ emperor, onClose }: DetailPanelProps) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'bio' | 'ai'>('bio');

  // Reset state when emperor changes
  useEffect(() => {
    setAiResponse(null);
    setLoading(false);
    setActiveTab('bio');
  }, [emperor]);

  if (!emperor) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-stone-400 p-8 text-center border-l border-stone-200 bg-white/50 backdrop-blur-sm">
        <div className="mb-4 p-4 bg-stone-100 rounded-full">
             <ScrollText size={32} />
        </div>
        <p className="font-serif text-lg">点击左侧关系网节点</p>
        <p className="text-sm">查看皇帝生平与AI历史解析</p>
      </div>
    );
  }

  const handleAskAI = async (type: 'secret' | 'summary' | 'impact') => {
    setLoading(true);
    setActiveTab('ai');
    setAiResponse("正在翻阅皇家史料...");
    const result = await getHistoricalInsight(emperor.name, emperor.eraName, type);
    setAiResponse(result);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-2xl relative z-20 overflow-hidden border-l border-amber-100">
      {/* Header with Image Background */}
      <div className="relative h-48 w-full bg-stone-900 overflow-hidden shrink-0">
        <img 
            src={emperor.image} 
            alt={emperor.eraName} 
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/20 rounded-full p-1"
        >
            <X size={20} />
        </button>
        <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-3xl font-calligraphy text-amber-400 mb-1">{emperor.eraName}</h1>
            <p className="text-sm text-stone-300">{emperor.name}</p>
            <p className="text-xs text-stone-400 mt-1">{emperor.reign}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 bg-stone-50">
          <button 
            onClick={() => setActiveTab('bio')}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'bio' ? 'text-amber-700 border-b-2 border-amber-600 bg-white' : 'text-stone-500 hover:text-stone-700'}`}
          >
              基本生平
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'text-purple-700 border-b-2 border-purple-600 bg-white' : 'text-stone-500 hover:text-stone-700'}`}
          >
              <Sparkles size={14} />
              AI 读史
          </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#fffdf5]">
        
        {activeTab === 'bio' && (
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">庙号</h3>
                    <p className="text-lg text-stone-800 font-serif">{emperor.templeName}</p>
                </div>
                
                <div className="h-px bg-stone-200 w-1/2"></div>

                <div>
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">历史简介</h3>
                    <p className="text-stone-700 leading-relaxed text-justify">
                        {emperor.description}
                    </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-amber-600"><BookOpen size={18} /></div>
                        <div>
                            <h4 className="text-amber-800 font-bold text-sm mb-1">你知道吗？</h4>
                            <p className="text-amber-700/80 text-xs">
                                点击“AI 读史”标签页，让人工智能为您揭秘这位皇帝的更多细节。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'ai' && (
            <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 gap-3">
                    <button 
                        disabled={loading}
                        onClick={() => handleAskAI('secret')}
                        className="flex items-center gap-3 p-3 bg-white border border-purple-100 rounded-lg hover:border-purple-300 hover:shadow-md transition-all text-left group"
                    >
                        <div className="bg-purple-100 p-2 rounded-md text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <h4 className="text-stone-800 font-bold text-sm">宫廷秘闻</h4>
                            <p className="text-xs text-stone-500">挖掘鲜为人知的趣事</p>
                        </div>
                    </button>

                    <button 
                        disabled={loading}
                        onClick={() => handleAskAI('summary')}
                        className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left group"
                    >
                        <div className="bg-blue-100 p-2 rounded-md text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ScrollText size={18} />
                        </div>
                        <div>
                            <h4 className="text-stone-800 font-bold text-sm">执政总结</h4>
                            <p className="text-xs text-stone-500">专业的历史评价</p>
                        </div>
                    </button>

                    <button 
                        disabled={loading}
                        onClick={() => handleAskAI('impact')}
                        className="flex items-center gap-3 p-3 bg-white border border-amber-100 rounded-lg hover:border-amber-300 hover:shadow-md transition-all text-left group"
                    >
                        <div className="bg-amber-100 p-2 rounded-md text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Scale size={18} />
                        </div>
                        <div>
                            <h4 className="text-stone-800 font-bold text-sm">历史影响</h4>
                            <p className="text-xs text-stone-500">功过是非分析</p>
                        </div>
                    </button>
                </div>

                {/* Response Area */}
                <div className="mt-6">
                     {loading ? (
                         <div className="flex flex-col items-center justify-center py-8 text-stone-400">
                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-2"></div>
                             <p className="text-sm animate-pulse">Gemini 正在查阅史书...</p>
                         </div>
                     ) : aiResponse ? (
                         <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-sm relative">
                             <div className="absolute -top-3 left-4 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                 AI Analysis
                             </div>
                             <p className="text-stone-700 leading-relaxed whitespace-pre-wrap text-sm">
                                 {aiResponse}
                             </p>
                             <div className="mt-3 pt-3 border-t border-stone-100 text-right">
                                 <span className="text-[10px] text-stone-400">Generated by Gemini 2.5 Flash</span>
                             </div>
                         </div>
                     ) : (
                         <div className="text-center py-8 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-lg">
                             请选择上方的一个话题开始对话
                         </div>
                     )}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default DetailPanel;