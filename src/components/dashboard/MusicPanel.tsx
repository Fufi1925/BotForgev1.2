"use client";
import { useState, useEffect } from "react";
import { Music, Save } from "lucide-react";

interface MusicConfig {
  enabled: boolean; djRoleId: string | null; defaultVolume: number;
  maxQueueSize: number; allowFilters: boolean; allowPlaylists: boolean;
  autoLeave: boolean; autoLeaveDelay: number;
}

export function MusicPanel({ config, onSave, saving }: {
  config?: MusicConfig; onSave: (d: any) => void; saving: boolean;
}) {
  const [form, setForm] = useState<MusicConfig>({
    enabled: true, djRoleId: null, defaultVolume: 50, maxQueueSize: 100,
    allowFilters: true, allowPlaylists: true, autoLeave: true, autoLeaveDelay: 60,
    ...config,
  });
  useEffect(() => { if (config) setForm((p) => ({ ...p, ...config })); }, [config]);

  const toggle = (k: keyof MusicConfig) => setForm((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
            <Music className="w-7 h-7 text-green-400" /> Musik-Modul
          </h1>
          <p className="text-gray-400 text-sm">SoundCloud, Spotify, Webradio & mehr</p>
        </div>
        <button onClick={() => onSave(form)} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" /> {saving ? "Speichern…" : "Speichern"}
        </button>
      </div>

      <div className="glass-card p-5 mb-5 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">Musik aktivieren</p>
          <p className="text-gray-400 text-sm">Alle Musik-Befehle freischalten</p>
        </div>
        <Toggle checked={form.enabled} onChange={() => toggle("enabled")} />
      </div>

      <div className="glass-card p-5 mb-5">
        <h3 className="text-white font-semibold mb-4">Einstellungen</h3>
        <div className="space-y-5">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Standardlautstärke: <span className="text-white">{form.defaultVolume}%</span></label>
            <input type="range" min="1" max="150" value={form.defaultVolume}
              onChange={(e) => setForm((p) => ({ ...p, defaultVolume: +e.target.value }))}
              className="w-full accent-green-500" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Maximale Warteschlangengröße</label>
            <input type="number" min="1" max="1000" value={form.maxQueueSize}
              onChange={(e) => setForm((p) => ({ ...p, maxQueueSize: +e.target.value }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">DJ-Rollen-ID (optional)</label>
            <input type="text" placeholder="Rollen-ID einfügen" value={form.djRoleId || ""}
              onChange={(e) => setForm((p) => ({ ...p, djRoleId: e.target.value || null }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500" />
          </div>
          {[
            { key: "allowFilters", label: "Audio-Filter erlauben (Bassboost, Nightcore)" },
            { key: "allowPlaylists", label: "Wiedergabelisten erlauben" },
            { key: "autoLeave", label: "Bot verlässt Kanal wenn leer" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{label}</span>
              <Toggle checked={form[key as keyof MusicConfig] as boolean} onChange={() => toggle(key as keyof MusicConfig)} />
            </div>
          ))}
        </div>
      </div>

      {/* Supported sources */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-3">Unterstützte Quellen</h3>
        <div className="flex flex-wrap gap-2">
          {["SoundCloud", "Spotify*", "Webradio", "Direkte URLs", "Bandcamp", "Vimeo"].map((s) => (
            <span key={s} className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-3 py-1 rounded-full">{s}</span>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-3">* Spotify wird über Metadaten + alternativer Quelle gestreamt</p>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-green-600" : "bg-gray-700"}`}>
      <span className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
