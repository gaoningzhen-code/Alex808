import { useState } from 'react';
import { qingData } from './services/data';
import ForceGraph from './components/ForceGraph';
import DetailPanel from './components/DetailPanel';
import { Emperor } from './types';
import { Info } from 'lucide-react';

function App() {
  const [selectedEmperor, setSelectedEmperor] = useState<Emperor | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleNodeClick = (emperor: Emperor) => {
    setSelectedEmperor(emperor);
  };

  const closePanel = () => {
    setSelectedEmperor(null);
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#fdfbf7] text-stone-800 font-serif">
      
      {/* Main Graph Area */}
      <main className="flex-1 relative transition-all duration-500 ease-in-out">
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 w-full z-10 p-6 pointer-events-none flex justify-between items-start bg-gradient-to-b from-[#fdfbf7] to-transparent h-32">
          <div>
            <h1 className="text-4xl font-calligraphy text-red-900 drop-shadow-sm mb-1">清朝皇帝关系网</h1>
            <p className="text-stone-500 text-sm font-sans tracking-wide">The Qing Dynasty Lineage (1616–1912)</p>
          </div>
          
          <div className="pointer-events-auto flex gap-2">
             <button 
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-full bg-white shadow-md text-stone-600 hover:text-amber-700 transition-colors border border-stone-200"
                title="About"
             >
               <Info size={20} />
             </button>
          </div>
        </div>

        {/* Info Modal (Simple absolute positioning for demo) */}
        {showInfo && (
            <div className="absolute top-20 right-6 z-50 w-72 bg-white p-6 rounded-xl shadow-xl border border-stone-200 animate-fade-in">
                <h3 className="font-bold text-amber-800 mb-2">关于本项目</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    本项目展示了清朝十二位皇帝的传承关系。使用 D3.js 构建力导向图，结合 Google Gemini API 提供深度的历史见解。
                </p>
                <p className="text-xs text-stone-500">
                    点击节点查看详情，并在侧边栏使用 AI 功能探索更多历史秘闻。
                </p>
            </div>
        )}

        <ForceGraph 
          data={qingData} 
          onNodeClick={handleNodeClick} 
          selectedNodeId={selectedEmperor?.id || null}
        />

        {/* Timeline/Filter Hint (Bottom) */}
        <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
            <div className="flex gap-4 text-xs font-sans text-stone-400">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm"></div>
                    <span>皇帝 (Emperor)</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-8 h-[2px] bg-stone-400 opacity-50"></div>
                    <span>传承 (Succession)</span>
                </div>
            </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside 
        className={`
            fixed inset-y-0 right-0 w-full md:w-[400px] shadow-2xl transform transition-transform duration-300 ease-in-out z-30
            ${selectedEmperor ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <DetailPanel emperor={selectedEmperor} onClose={closePanel} />
      </aside>

      {/* Mobile Overlay to close sidebar */}
      {selectedEmperor && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-[1px]"
            onClick={closePanel}
          ></div>
      )}

    </div>
  );
}

export default App;