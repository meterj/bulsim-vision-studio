/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Info, 
  RefreshCw, 
  Download, 
  Share2, 
  Layers, 
  Palette, 
  Sun,
  Loader2,
  ChevronRight,
  History,
  ThumbsUp,
  ThumbsDown,
  Key,
  X,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Zap,
  BookOpen,
  Flower2,
  Sunrise
} from 'lucide-react';
import { interpretUserIntent, generateBuddhistImage, InterpretationResult } from './lib/gemini';
import { BUDDHIST_KNOWLEDGE, INTENT_CATEGORIES } from './constants';
import { generateBuddhistHtml } from './lib/export';

export default function App() {
  const [input, setInput] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<InterpretationResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [resolution, setResolution] = useState<'512px' | '1K' | '2K' | '4K'>('2K');
  const [genMode, setGenMode] = useState<'vision' | 'dharani'>('vision');
  const [selectedDeity, setSelectedDeity] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedSpace, setSelectedSpace] = useState('');
  const [intensity, setIntensity] = useState(50); // 0: Modern, 100: Traditional
  const [visualStyle, setVisualStyle] = useState<'human' | 'symbol' | 'space' | 'avatar' | 'phenomenon'>('symbol');
  const [artStyle, setArtStyle] = useState<'taenghwa' | 'zen_ink' | 'statue' | 'modern'>('taenghwa');
  const [history, setHistory] = useState<{
    input: string, 
    imageUrl: string, 
    result: InterpretationResult,
    rating?: 'up' | 'down'
  }[]>(() => {
    try {
      const saved = localStorage.getItem('buddhist_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load history from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    const saveHistory = (data: typeof history) => {
      try {
        localStorage.setItem('buddhist_history', JSON.stringify(data));
      } catch (e: any) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          console.warn("LocalStorage quota exceeded, pruning history...");
          if (data.length > 1) {
            saveHistory(data.slice(0, -1));
          }
        } else {
          console.error("Failed to save history to localStorage:", e);
        }
      }
    };
    saveHistory(history);
  }, [history]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('GEMINI_API_KEY') || '';
    }
    return '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [keySaved, setKeySaved] = useState(false);

  const hasApiKey = !!apiKey;

  const handleSaveKey = () => {
    if (tempKey.trim()) {
      sessionStorage.setItem('GEMINI_API_KEY', tempKey.trim());
      setApiKey(tempKey.trim());
      setKeySaved(true);
      setTimeout(() => {
        setShowKeyModal(false);
        setKeySaved(false);
      }, 1000);
    }
  };
  const [activeGenImage, setActiveGenImage] = useState(true);
  const [activeGenPrompt, setActiveGenPrompt] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleImage = () => {
    if (!activeGenPrompt && activeGenImage) return;
    setActiveGenImage(!activeGenImage);
  };

  const handleTogglePrompt = () => {
    if (!activeGenImage && activeGenPrompt) return;
    setActiveGenPrompt(!activeGenPrompt);
  };

  const handleCopyPrompt = () => {
    if (!result?.englishPrompt) return;
    navigator.clipboard.writeText(result.englishPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearKey = () => {
    sessionStorage.removeItem('GEMINI_API_KEY');
    setApiKey('');
    setTempKey('');
    setShowKeyModal(false);
  };

  const handleSupremeAwakening = () => {
    const combinations = [
      { deity: '석가모니불', purpose: '정진/깨달음', space: '대웅전/법당', art: 'taenghwa', visual: 'avatar', input: '보리수 아래 무상정등각을 이루신 석가모니불의 장엄한 성불의 순간' },
      { deity: '관세음보살', purpose: '자비/사랑', space: '연꽃 피는 극락국토', art: 'taenghwa', visual: 'phenomenon', input: '대자대비의 마음으로 감로수를 내려 중생의 고통을 씻어주는 관세음보살' },
      { deity: '비로자나불', purpose: '지혜/통찰', space: '석탑/도량', art: 'statue', visual: 'symbol', input: '온 우주에 가득한 진리의 빛을 발하는 비로자나불의 지혜와 법신' },
      { deity: '아미타불', purpose: '극락왕생', space: '극락정토', art: 'modern', visual: 'space', input: '황금빛 찬란한 서방정토 극락세계로 중생을 인도하는 아미타불의 광명' },
      { deity: '지장보살', purpose: '업장소멸', space: '산사/사찰', art: 'zen_ink', visual: 'avatar', input: '모든 중생이 구제될 때까지 멈추지 않는 지장보살의 거대한 원력과 자비' }
    ];

    const pick = combinations[Math.floor(Math.random() * combinations.length)];
    
    setSelectedDeity(pick.deity);
    setSelectedPurpose(pick.purpose);
    setSelectedSpace(pick.space);
    setArtStyle(pick.art as any);
    setVisualStyle(pick.visual as any);
    setIntensity(100);
    setResolution('4K');
    setInput(pick.input);
  };

  const handleGenerate = async (targetInput?: string) => {
    const inputToUse = targetInput || input;
    if (!inputToUse.trim()) return;
    
    setError(null);
    
    try {
      if (!hasApiKey) {
        setShowKeyModal(true);
        return;
      }

      setIsInterpreting(true);
      setImageUrl(null);

      const fullInput = [
        inputToUse,
        selectedDeity ? `신격: ${selectedDeity}` : '',
        selectedPurpose ? `기도 목적: ${selectedPurpose}` : '',
        selectedSpace ? `수행 공간: ${selectedSpace}` : '',
        `전통성: ${intensity}% 고증`,
        `시각 스타일: ${artStyle}`,
        `예술 양식: ${visualStyle}`
      ].filter(Boolean).join(', ');

      let interpretation: InterpretationResult;
      
      if (activeGenPrompt) {
        interpretation = await interpretUserIntent(fullInput);
        setResult(interpretation);
      } else {
        interpretation = {
          intent: "사용자 직접 입력",
          selectedSymbols: [],
          selectedColors: [],
          deity: "직접 설계",
          ritualPurpose: "직접 설계",
          ritualSpace: "직접 설계",
          composition: "직접 입력한 텍스트 기반 시각화",
          explanation: "AI 해석 없이 입력한 텍스트로 직접 이미지를 생성합니다.",
          englishPrompt: inputToUse
        };
        setResult(interpretation);
      }
      
      setIsInterpreting(false);

      if (activeGenImage) {
        setIsGenerating(true);
        const promptToUse = activeGenPrompt ? interpretation.englishPrompt : inputToUse;
        const generatedImage = await generateBuddhistImage(promptToUse, aspectRatio, genMode, artStyle, resolution);
        setImageUrl(generatedImage);
        setHistory(prev => [{ input: inputToUse, imageUrl: generatedImage, result: interpretation }, ...prev].slice(0, 15));
      }
    } catch (error: any) {
      console.error("Generation failed:", error);
      let errorMsg = "알 수 없는 오류가 발생했습니다.";
      
      if (error.message?.includes("API_KEY_NOT_FOUND")) errorMsg = "API 키가 설정되지 않았습니다.";
      else if (error.message?.includes("SAFETY_BLOCK")) errorMsg = "안전 필터에 의해 생성이 제한되었습니다.";
      else if (error.message?.includes("quota")) errorMsg = "API 사용량이 초과되었습니다.";
      else if (error.message?.includes("404")) errorMsg = "모델을 찾을 수 없습니다.";
      
      setError(errorMsg);
    } finally {
      setIsInterpreting(false);
      setIsGenerating(false);
    }
  };

  const handleDownloadHtml = () => {
    const html = generateBuddhistHtml(input, imageUrl, result, { artStyle, intensity, visualStyle });
    
    // Sanitize filename and intent for the HTML title tag
    const safeIntent = result.intent.replace(/[^a-z0-9가-힣]/gi, '_');
    const filename = `불심비전_법보_${safeIntent}.html`;
    
    // Ensure the HTML content has a title for the browser to recognize
    const titledHtml = html.replace('<head>', `<head><title>${filename}</title>`);
    
    // Use Blob with explicit encoding for the most robust file generation
    const blob = new Blob([titledHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    
    // Extra safety: manual event trigger
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    a.dispatchEvent(clickEvent);
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleDownloadImage = () => {
    if (!imageUrl || !result) return;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // High-quality rendering settings
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        
        const safeIntent = result.intent.replace(/[^a-z0-9가-힣]/gi, '_');
        const filename = `불심비전_이미지_${safeIntent}.jpg`;
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        a.dispatchEvent(clickEvent);
        
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      }, 'image/jpeg', 0.95);
    };
    img.src = imageUrl;
  };

  const getSymbolName = (id: string) => {
    const flattenedDeities = BUDDHIST_KNOWLEDGE.deities.flatMap(d => d.items);
    const symbol = [
      ...BUDDHIST_KNOWLEDGE.patterns, 
      ...BUDDHIST_KNOWLEDGE.bulguji, 
      ...flattenedDeities,
      ...BUDDHIST_KNOWLEDGE.prayer_purposes,
      ...BUDDHIST_KNOWLEDGE.spaces
    ].find(s => s.id === id);
    return symbol ? symbol.name : id;
  };

  const getColorHex = (id: string) => {
    const color = BUDDHIST_KNOWLEDGE.colors.find(c => c.id === id);
    return color ? color.hex : '#ffffff';
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="buddhist-bg" />
      
      {/* Buddhist Animations (Floating Lotus Petals/Light) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 100],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.2, 0.8],
              x: [null, (Math.random() - 0.5) * 100]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10
            }}
            className="absolute w-2 h-2 bg-pink-200/30 rounded-full blur-[4px]"
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`spirit-${i}`}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              opacity: 0
            }}
            animate={{ 
              y: -200,
              opacity: [0, 0.2, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 25 + Math.random() * 30, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20
            }}
            className="absolute flex items-center justify-center"
          >
            <Flower2 className="text-pink-300/10 w-12 h-12" />
          </motion.div>
        ))}
      </div>
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-yellow-500/10 sticky top-0 z-50 bg-stone-900/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-200 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Flower2 className="text-stone-900 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight buddhist-gradient-text">BULSIM VISION V2.0</h1>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono">무상정등각 (無上正等覺)</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowKeyModal(true)}
            className={`p-2 rounded-full transition-colors ${hasApiKey ? 'text-green-400/60 hover:text-green-400' : 'text-amber-400/60 hover:text-amber-400'} hover:bg-white/5`}
            title="API 키 설정"
          >
            <Key className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white"
          >
            <History className="w-5 h-5" />
          </button>
          <div className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-200 uppercase tracking-widest">
            Zen Mode
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12">
        
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <section className="glass-panel p-8 flex flex-col gap-6 border-amber-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Sunrise className="w-4 h-4" />
                <h2 className="text-sm uppercase tracking-widest font-bold">심인 설계 (Mind Design)</h2>
              </div>
              <button 
                onClick={handleSupremeAwakening}
                className="btn-supreme px-6 py-2.5 rounded-2xl text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 group hover:scale-105 transition-all shadow-xl shadow-amber-900/20"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
                무상정등각 (Supreme Awakening)
              </button>
            </div>
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                <button 
                  onClick={() => setGenMode('vision')}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                    genMode === 'vision' 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  장엄한 비전
                </button>
                <button 
                  onClick={() => setGenMode('dharani')}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                    genMode === 'dharani' 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                   sacred 다라니
                </button>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/30 font-mono">Buddha/Deity</label>
                <select 
                  value={selectedDeity}
                  onChange={(e) => setSelectedDeity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                >
                  <option value="" className="bg-[#1a1a1a]">부처님/보살님 선택</option>
                  {BUDDHIST_KNOWLEDGE.deities.map(cat => (
                    <optgroup key={cat.category} label={cat.category} className="bg-[#1a1a1a]">
                      {cat.items.map(d => (
                        <option key={d.id} value={d.name} className="bg-[#1a1a1a]">{d.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/30 font-mono">Prayer Purpose</label>
                <select 
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                >
                  <option value="" className="bg-[#1a1a1a]">기도 목적 선택</option>
                  {BUDDHIST_KNOWLEDGE.prayer_purposes.map(p => (
                    <option key={p.id} value={p.name} className="bg-[#1a1a1a]">{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/30 font-mono">Space</label>
                <select 
                  value={selectedSpace}
                  onChange={(e) => setSelectedSpace(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                >
                  <option value="" className="bg-[#1a1a1a]">수행 공간 선택</option>
                  {BUDDHIST_KNOWLEDGE.spaces.map(s => (
                    <option key={s.id} value={s.name} className="bg-[#1a1a1a]">{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 p-4 rounded-2xl bg-stone-900/20 border border-white/5">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-widest text-white/30 font-mono">Dharma Intensity (수행의 깊이)</label>
                <span className="text-sm text-amber-400 font-bold">{intensity}% 전통</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={intensity} 
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[8px] text-white/20 uppercase tracking-tighter">
                <span>Modern Zen Style</span>
                <span>Traditional Mandala</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-white/30 mr-2 font-mono">Art Style</span>
              {[
                { id: 'taenghwa', name: '탱화' },
                { id: 'zen_ink', name: '선묵화' },
                { id: 'statue', name: '불상 조각' },
                { id: 'modern', name: '현대적' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setArtStyle(style.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all border ${
                    artStyle === style.id 
                      ? 'bg-amber-600 border-amber-500 text-white shadow-lg' 
                      : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-white/30 mr-2 font-mono">Visual Style</span>
              {[
                { id: 'human', name: '인간형' },
                { id: 'avatar', name: '현신(Avatar)' },
                { id: 'phenomenon', name: '영적 현상' },
                { id: 'symbol', name: '상징형' },
                { id: 'space', name: '공간형' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setVisualStyle(style.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all border ${
                    visualStyle === style.id 
                      ? 'bg-stone-100 border-white text-stone-900 shadow-lg' 
                      : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 items-center justify-between">
              <span className="text-sm font-bold text-white/40 uppercase tracking-widest font-serif">시각적 작업 설정</span>
              <div className="flex gap-3">
                <button onClick={handleTogglePrompt} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${activeGenPrompt ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'text-white/20'}`}>지혜 해석</button>
                <button onClick={handleToggleImage} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${activeGenImage ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'text-white/20'}`}>비전 생성</button>
              </div>
            </div>

            <div className="relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="마음의 소원이나 화두를 입력하세요... (예: 모든 생명에 대한 자비와 깨달음)"
                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none placeholder:text-white/20"
              />
            </div>

            <div className="space-y-6">
              {/* Aspect Ratio Selector */}
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-white/40 font-mono w-24">Aspect Ratio</span>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                  {['1:1', '16:9', '9:16', '2:3', '3:2'].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        aspectRatio === ratio 
                          ? 'bg-orange-600 text-white shadow-lg' 
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selector */}
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-white/40 font-mono w-24">Quality</span>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                  {['512', '1K', '2K', '4K'].map((q) => (
                    <button
                      key={q}
                      onClick={() => setResolution(q as any)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        resolution === q 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {Object.keys(INTENT_CATEGORIES).map((intent) => (
                <button 
                  key={intent}
                  onClick={() => {
                    const newInput = intent + "를 위한 기도를 드립니다";
                    setInput(newInput);
                    handleGenerate(newInput);
                  }}
                  className={`px-2 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-medium transition-all hover:bg-white/10 hover:border-white/20 text-white/80 ${
                    input.includes(intent) ? 'border-amber-500/50 bg-amber-500/10 text-amber-200' : ''
                  }`}
                >
                  {intent}
                </button>
              ))}
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isInterpreting || isGenerating || !input.trim()}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-black uppercase tracking-[0.3em] text-lg shadow-2xl shadow-amber-900/40 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
            >
              {isInterpreting || isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  비전을 빚는 중...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 text-yellow-300 group-hover:scale-125 transition-transform" />
                  불심 비전 생성 시작 (Start Vision)
                  <Zap className="w-6 h-6 text-yellow-300 group-hover:scale-125 transition-transform" />
                </>
              )}
            </button>
          </section>

          <AnimatePresence>
            {result && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm uppercase tracking-widest font-bold text-amber-400">지혜 해석 (Dharma Logic)</h2>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">{result.intent}</span>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 rounded-xl bg-white/5"><h4 className="text-[9px] text-white/30 uppercase font-mono">Deity</h4><p className="text-xs text-amber-200 font-bold">{result.deity}</p></div>
                    <div className="p-3 rounded-xl bg-white/5"><h4 className="text-[9px] text-white/30 uppercase font-mono">Purpose</h4><p className="text-xs text-amber-200 font-bold">{result.ritualPurpose}</p></div>
                    <div className="p-3 rounded-xl bg-white/5"><h4 className="text-[9px] text-white/30 uppercase font-mono">Space</h4><p className="text-xs text-amber-200 font-bold">{result.ritualSpace}</p></div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 italic text-sm text-white/80 leading-relaxed">"{result.explanation}"</div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Result Display */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <section className="glass-panel aspect-square relative overflow-hidden group">
            <AnimatePresence mode="wait">
              {imageUrl ? (
                <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                  <img src={imageUrl} alt="Buddhist Vision" className="w-full h-full object-cover" />
                </motion.div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center gap-6">
                  {isGenerating ? <div className="flex flex-col items-center gap-8"><RefreshCw className="w-10 h-10 text-amber-500 animate-spin" /><p className="text-amber-200/60 font-serif italic text-lg animate-pulse">심상(心相)을 빚는 중입니다...</p></div> : <div className="space-y-4"><Flower2 className="w-20 h-20 text-white/5 mx-auto" /><p className="text-white/20 font-serif italic">당신의 마음 속 빛이 이곳에 시각화됩니다.</p></div>}
                </div>
              )}
            </AnimatePresence>
          </section>

          <AnimatePresence>
            {imageUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 flex gap-4 border-amber-500/20"
              >
                <button 
                  onClick={handleDownloadImage} 
                  className="flex-1 py-4 rounded-2xl bg-amber-600 text-sm font-black uppercase flex items-center justify-center gap-3 hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/40 group active:scale-95"
                >
                  <Download className="w-5 h-5 group-hover:bounce" />
                  이미지 저장
                </button>
                <button 
                  onClick={handleDownloadHtml} 
                  className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-black uppercase flex items-center justify-center gap-3 hover:bg-white/10 transition-all group active:scale-95"
                >
                  <Layers className="w-5 h-5 text-amber-400" />
                  법보 리포트 (HTML)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* API Key Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKeyModal(false)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-panel p-8 border-amber-500/30 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Key className="w-8 h-8 text-amber-500" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-amber-200">심인(心印) 가피 열쇠 설정</h2>
                  <p className="text-sm text-white/40">불심 비전을 생성하기 위해 Google Gemini API 키가 필요합니다.</p>
                </div>

                <div className="w-full space-y-4">
                  <div className="relative">
                    <input 
                      type="password"
                      value={tempKey}
                      onChange={(e) => setTempKey(e.target.value)}
                      placeholder="API 키를 입력하세요..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    />
                    {keySaved && (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={handleClearKey}
                      className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase transition-all text-white/40"
                    >
                      초기화
                    </button>
                    <button 
                      onClick={handleSaveKey}
                      className="flex-[2] py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold uppercase transition-all shadow-lg shadow-amber-900/20"
                    >
                      가피 받기 (저장)
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 w-full">
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/api-key" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-amber-500/60 hover:text-amber-500 transition-colors uppercase tracking-widest font-bold"
                  >
                    Google AI Studio에서 키 발급 받기
                  </a>
                </div>
              </div>
              
              <button 
                onClick={() => setShowKeyModal(false)}
                className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full max-w-xl h-full bg-stone-900/90 backdrop-blur-2xl border-l border-white/5 p-8 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <History className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-amber-100">공덕 기록 (Merit History)</h2>
                    <p className="text-xs text-white/30 uppercase tracking-widest">저장된 불심 비전 기록</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowClearConfirm(true)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400/40 hover:text-red-400 transition-all"
                    title="기록 삭제"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowHistory(false)}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-20 gap-4">
                    <Flower2 className="w-20 h-20" />
                    <p className="font-serif italic">아직 기록된 공덕이 없습니다.</p>
                  </div>
                ) : (
                  history.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group glass-panel p-4 flex gap-4 hover:border-amber-500/30 transition-all cursor-pointer overflow-hidden border-white/5"
                      onClick={() => {
                        setInput(item.input);
                        setImageUrl(item.imageUrl);
                        setResult(item.result);
                        setShowHistory(false);
                      }}
                    >
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-white/10 group-hover:border-amber-500/50 transition-colors">
                        <img src={item.imageUrl} className="w-full h-full object-cover" alt="History Vision" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter">{item.result.intent}</span>
                          <p className="text-sm text-white/80 line-clamp-2 font-medium leading-relaxed italic">"{item.input}"</p>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-white/20 uppercase font-mono">
                          <span>{item.result.deity}</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clear Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowClearConfirm(false)} className="absolute inset-0 bg-stone-950/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm glass-panel p-8 border-red-500/30 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mx-auto">
                <RefreshCw className="w-8 h-8 text-red-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-red-200">기록 초기화</h3>
                <p className="text-sm text-white/40 leading-relaxed">지금까지의 모든 공덕 기록(히스토리)이 삭제됩니다. 계속하시겠습니까?</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase transition-all">취소</button>
                <button 
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem('buddhist_history');
                    setShowClearConfirm(false);
                  }} 
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold uppercase transition-all shadow-lg shadow-red-900/20"
                >
                  삭제하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

