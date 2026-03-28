"use client";
import { useState, useEffect } from "react";
import { Shield, Save, Info } from "lucide-react";

interface AutoModConfig {
  enabled: boolean;
  filterHateSpeech: boolean;
  filterLinks: boolean;
  filterSpam: boolean;
  filterInvites: boolean;
  filterCaps: boolean;
  filterEmojis: boolean;
  filterUnicode: boolean;
  aiToxicityEnabled: boolean;
  aiToxicityThreshold: number;
  spamMessageCount: number;
  spamTimeWindowSec: number;
  capsPercentage: number;
  maxEmojis: number;
  warnThreshold: number;
  muteThreshold: number;
  timeoutThreshold: number;
  kickThreshold: number;
  banThreshold: number;
  muteDurationMin: number;
}

export function AutoModPanel({ config, onSave, saving }: {
  config?: AutoModConfig; onSave: (d: any) => void; saving: boolean;
}) {
  const [form, setForm] = useState<AutoModConfig>({
    enabled: false, filterHateSpeech: true, filterLinks: true, filterSpam: true,
    filterInvites: true, filterCaps: true, filterEmojis: false, filterUnicode: false,
    aiToxicityEnabled: false, aiToxicityThreshold: 0.7, spamMessageCount: 5,
    spamTimeWindowSec: 10, capsPercentage: 70, maxEmojis: 10,
    warnThreshold: 3, muteThreshold: 5, timeoutThreshold: 7,
    kickThreshold: 10, banThreshold: 15, muteDurationMin: 10,
    ...config,
  });

  useEffect(() => { if (config) setForm((p) => ({ ...p, ...config })); }, [config]);

  const toggle = (key: keyof AutoModConfig) =>
    setForm((p) => ({ ...p, [key]: !p[key] }));

  const num = (key: keyof AutoModConfig, val: string) =>
    setForm((p) => ({ ...p, [key]: parseFloat(val) }));

  const filters = [
    { key: "filterHateSpeech", label: "Hassrede & Beleidigungen" },
    { key: "filterLinks", label: "Externe Links blockieren" },
    { key: "filterSpam", label: "Spam-Erkennung" },
    { key: "filterInvites", label: "Discord-Einladungen blockieren" },
    { key: "filterCaps", label: "Großbuchstaben-Filter" },
    { key: "filterEmojis", label: "Emoji-Spam-Filter" },
    { key: "filterUnicode", label: "Unicode-Verschleierung erkennen" },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
            <Shield className="w-7 h-7 text-red-400" /> Auto-Moderation
          </h1>
          <p className="text-gray-400 text-sm">Mehrstufige Filter + KI-Toxizitätsprüfung</p>
        </div>
        <button onClick={() => onSave(form)} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" />
          {saving ? "Speichern…" : "Speichern"}
        </button>
      </div>

      {/* Master toggle */}
      <div className="glass-card p-5 mb-5 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">Auto-Mod aktivieren</p>
          <p className="text-gray-400 text-sm">Alle Filter global ein-/ausschalten</p>
        </div>
        <ToggleSwitch checked={form.enabled} onChange={() => toggle("enabled")} />
      </div>

      {/* Filters */}
      <div className="glass-card p-5 mb-5">
        <h3 className="text-white font-semibold mb-4">Inhaltsfilter</h3>
        <div className="space-y-3">
          {filters.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{label}</span>
              <ToggleSwitch
                checked={form[key] as boolean}
                onChange={() => toggle(key as keyof AutoModConfig)}
                disabled={!form.enabled}
              />
            </div>
          ))}
        </div>
      </div>

      {/* AI Toxicity */}
      <div className="glass-card p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-white font-semibold">KI-Toxizitätsprüfung</h3>
          <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">Google Perspective API</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300 text-sm">KI-Analyse aktivieren</span>
          <ToggleSwitch checked={form.aiToxicityEnabled} onChange={() => toggle("aiToxicityEnabled")} disabled={!form.enabled} />
        </div>
        {form.aiToxicityEnabled && (
          <div>
            <label className="text-gray-400 text-xs mb-1 block">
              Toxizitätsschwellenwert: <span className="text-white">{form.aiToxicityThreshold}</span>
            </label>
            <input type="range" min="0.1" max="1" step="0.05"
              value={form.aiToxicityThreshold}
              onChange={(e) => num("aiToxicityThreshold", e.target.value)}
              className="w-full accent-violet-500"
            />
          </div>
        )}
      </div>

      {/* Punishment thresholds */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-white font-semibold">Strafen-Schwellenwerte</h3>
          <Info className="w-4 h-4 text-gray-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "warnThreshold", label: "Verwarnung ab Punkt" },
            { key: "muteThreshold", label: "Mute ab Punkt" },
            { key: "timeoutThreshold", label: "Timeout ab Punkt" },
            { key: "kickThreshold", label: "Kick ab Punkt" },
            { key: "banThreshold", label: "Ban ab Punkt" },
            { key: "muteDurationMin", label: "Mute-Dauer (Min.)" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-gray-400 text-xs mb-1 block">{label}</label>
              <input type="number" min="1"
                value={form[key as keyof AutoModConfig] as number}
                onChange={(e) => num(key as keyof AutoModConfig, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange, disabled = false }: {
  checked: boolean; onChange: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`toggle-switch ${checked ? "bg-violet-600" : "bg-gray-700"} ${disabled ? "opacity-50" : ""}`}
      style={{ width: 44, height: 24 }}
    >
      <span className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
