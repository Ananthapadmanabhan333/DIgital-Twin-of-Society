"use client";

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function CommandCenter() {
  const [scenario, setScenario] = useState("Cyclone striking coastal areas");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="glass-header px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full animated-gradient flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/50">
            S
          </div>
          <h1 className="text-xl font-bold tracking-wider glow-text">SOCIETY TWIN AI</h1>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-success animate-pulse"/> System Online</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Command Center Alpha</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex p-6 gap-6 z-10 overflow-hidden">
        
        {/* Left Panel - Simulation Controls */}
        <aside className="w-80 flex flex-col gap-6">
          <div className="glass-panel p-5 flex flex-col gap-4">
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-2">Simulation Lab</h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Input Scenario</label>
              <textarea 
                className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none h-24"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSimulate}
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Simulating..." : "RUN SIMULATION"}
            </button>
          </div>

          <div className="glass-panel p-5 flex-1 flex flex-col gap-4">
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-2">Active Modules</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center justify-between">
                <span>Flood Prediction AI</span>
                <span className="text-success">Active</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Traffic Digital Twin</span>
                <span className="text-success">Active</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Healthcare Demand</span>
                <span className="text-warning">Standby</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Multi-Agent Gov</span>
                <span className="text-blue-400 font-semibold animate-pulse">Running</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Center Panel - Digital Twin Map */}
        <section className="flex-1 glass-panel relative overflow-hidden flex flex-col border-slate-600/50">
          
          <Map
            initialViewState={{
              longitude: -122.4,
              latitude: 37.8,
              zoom: 11
            }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken="pk.eyJ1IjoicGxhY2Vob2xkZXIiLCJhIjoiY2xhY2Vob2xkZXIifQ.placeholder" // Placeholder token
            style={{ width: '100%', height: '100%' }}
          >
            {/* Map Overlay Elements simulating Cesium/Mapbox 3D Twin */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"/>
            
            {results && (
              <Marker longitude={-122.4} latitude={37.8} anchor="center">
                 <div className="w-64 h-64 border border-danger/50 rounded-full animate-ping absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="w-64 h-64 bg-danger/20 rounded-full blur-xl absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-danger font-bold text-lg glow-danger drop-shadow-xl bg-slate-900/80 px-4 py-2 rounded-lg backdrop-blur-md whitespace-nowrap">
                   CRITICAL ZONE
                 </div>
              </Marker>
            )}
          </Map>

          {!results && (
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-slate-400 flex flex-col items-center pointer-events-none bg-slate-900/50 p-4 rounded-xl backdrop-blur-md">
                <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>3D City Engine Ready</p>
                <p className="text-xs mt-1">Awaiting scenario execution...</p>
             </div>
          )}
          
          <div className="absolute bottom-4 left-4 z-10 flex gap-2 pointer-events-none">
            <span className="bg-slate-800/80 backdrop-blur px-3 py-1 rounded text-xs border border-slate-700">Mapbox GL Rendering Engine</span>
            <span className="bg-slate-800/80 backdrop-blur px-3 py-1 rounded text-xs border border-slate-700">Live IoT Sync</span>
          </div>
        </section>

        {/* Right Panel - Governance AI Output */}
        <aside className="w-96 flex flex-col gap-6">
          <div className="glass-panel p-5 flex-1 flex flex-col gap-4 overflow-y-auto">
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Multi-Agent Governance
            </h2>
            
            {!results ? (
              <div className="flex-1 flex items-center justify-center text-sm text-slate-500 text-center">
                Submit a scenario to generate AI policy recommendations.
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-sm font-bold text-slate-300 mb-2">Climate AI Agent</h3>
                  <p className="text-sm text-danger">{results.flood_risk}</p>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-sm font-bold text-slate-300 mb-2">Traffic AI Agent</h3>
                  <p className="text-sm text-warning">{results.traffic_status}</p>
                </div>

                <div className="mt-4 p-4 rounded-lg border border-blue-500/50 bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <h3 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"/>
                    Governor AI Policy Decision
                  </h3>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    {results.final_policy}
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

      </main>
    </div>
  );
}
