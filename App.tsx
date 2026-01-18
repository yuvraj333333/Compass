
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CompassDial } from './components/CompassDial';
import { DIRECTIONS, ROOM_TYPES } from './constants';
import { DirectionData, RoomType, VastuRemedy } from './types';
import { getVastuRemedy } from './services/geminiService';

const App: React.FC = () => {
  const [heading, setHeading] = useState<number>(0);
  const [selectedDir, setSelectedDir] = useState<DirectionData>(DIRECTIONS[0]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(ROOM_TYPES[0]);
  const [analysis, setAnalysis] = useState<VastuRemedy | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [manualMode, setManualMode] = useState(true);

  // Request Permissions for Device Orientation (iOS)
  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          setManualMode(false);
        }
      } catch (err) {
        console.error("Permission request failed", err);
      }
    } else {
      setPermissionGranted(true);
      setManualMode(false);
    }
  };

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // Fix: Use type assertion to access webkitCompassHeading which is not in the standard DeviceOrientationEvent type
      const webkitHeading = (e as any).webkitCompassHeading;
      if (webkitHeading !== undefined && webkitHeading !== null) {
        setHeading(webkitHeading);
      } else if (e.alpha !== null) {
        // Fallback for non-iOS
        setHeading(360 - e.alpha);
      }
    };

    if (!manualMode) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [manualMode]);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getVastuRemedy(selectedDir, selectedRoom);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col items-center mb-8 text-center">
        <div className="mb-2">
          <span className="text-xs uppercase tracking-[0.4em] text-blue-500 font-bold">The Great Astro</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-serif bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          16 Direction Compass
        </h1>
        <p className="mt-4 text-slate-400 max-w-lg">
          Align your space with Vedic wisdom and elemental balance using our high-precision architectural tool.
        </p>
      </header>

      {/* Main Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Compass & Controls */}
        <div className="flex flex-col items-center space-y-8">
          
          <div className="relative group">
            <CompassDial 
              heading={heading} 
              onSelectDirection={setSelectedDir}
              selectedId={selectedDir.id}
            />
            
            {/* Compass Overlay Controls */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700">
               <span className="text-xs uppercase tracking-widest text-slate-500">Heading:</span>
               <span className="font-mono text-blue-400 font-bold">{Math.round(heading)}°</span>
            </div>
          </div>

          <div className="w-full max-w-md bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">🧭</span> Navigation Mode
            </h3>
            <div className="flex p-1 bg-slate-800 rounded-lg">
              <button 
                onClick={() => setManualMode(true)}
                className={`flex-1 py-2 text-sm rounded-md transition-all ${manualMode ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Manual Dial
              </button>
              <button 
                onClick={requestPermission}
                className={`flex-1 py-2 text-sm rounded-md transition-all ${!manualMode ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Live Compass
              </button>
            </div>
            {manualMode && (
              <div className="mt-4">
                <input 
                  type="range" 
                  min="0" max="360" 
                  value={heading} 
                  onChange={(e) => setHeading(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">
                  <span>N</span><span>E</span><span>S</span><span>W</span><span>N</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Direction Details & Analysis */}
        <div className="flex flex-col space-y-6">
          
          {/* Direction Card */}
          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800/50 backdrop-blur shadow-xl relative overflow-hidden group">
            {/* Elemental background glow */}
            <div 
              className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-20 transition-colors duration-1000"
              style={{ backgroundColor: selectedDir.color }}
            />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold font-serif text-white">{selectedDir.fullName}</h2>
                  <p className="text-sm text-slate-400 uppercase tracking-widest mt-1">
                    {selectedDir.degree}° — Ruler: <span className="text-slate-200">{selectedDir.ruler}</span>
                  </p>
                </div>
                <div 
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
                  style={{ borderColor: selectedDir.color, color: selectedDir.color, backgroundColor: `${selectedDir.color}15` }}
                >
                  {selectedDir.element} Element
                </div>
              </div>

              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                {selectedDir.significance}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Recommended Practices</h4>
                  {selectedDir.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <span className="text-emerald-500 mr-2">✓</span>
                      <span className="text-slate-400">{tip}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Vastu Compatibility Checker</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-2 uppercase">Select Room Type</label>
                      <select 
                        value={selectedRoom.id}
                        onChange={(e) => setSelectedRoom(ROOM_TYPES.find(r => r.id === e.target.value)!)}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {ROOM_TYPES.map(r => (
                          <option key={r.id} value={r.id}>{r.icon} {r.label}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 flex items-center justify-center"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        "Analyze with AI"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis Result */}
          {analysis && (
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Vastu Insights</h3>
                    <p className="text-xs text-slate-500">Powered by Gemini AI Engine</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${analysis.score >= 80 ? 'text-emerald-400' : analysis.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {analysis.score}<span className="text-sm text-slate-500 ml-1">/100</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Vastu Score</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950/50 rounded-xl border-l-4 border-blue-500">
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    "{analysis.assessment}"
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Suggested Remedies</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {analysis.remedies.map((remedy, i) => (
                      <div key={i} className="flex items-center p-3 bg-slate-800/30 rounded-lg text-sm border border-slate-800">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] mr-3 font-bold border border-slate-700 text-blue-400">
                          {i+1}
                        </span>
                        <span className="text-slate-300">{remedy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!analysis && !loading && (
            <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
              <p>Select a room type and hit analyze to get customized Vastu advice for this direction from The Great Astro.</p>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 w-full max-w-4xl border-t border-slate-800 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="text-blue-500 font-bold">The Great Astro</span>
          <span>&copy; 2024 Vastu Solutions</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Elemental Guide</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
