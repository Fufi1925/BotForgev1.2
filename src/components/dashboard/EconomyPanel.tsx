"use client";
import { useState, useEffect } from "react";
import { Coins, Save } from "lucide-react";

interface EconomyConfig {
  enabled: boolean; currencyName: string; currencySymbol: string;
  dailyAmount: number; workMinAmount: number; workMaxAmount: number;
  messageXpMin: number; messageXpMax: number; voiceXpPerMin: number; xpCooldownSec: number;
}

export function EconomyPanel({ config, onSave, saving }: {
  config?: EconomyConfig; onSave: (d: any) => void; saving: boolean;
}) {
  const [form, setForm] = useState<EconomyConfig>({
    enabled: true, currencyName: "Coins", currencySymbol: "🪙",
    dailyAmount: 100, workMinAmount: 50, workMaxAmount: 200,
    messageXpMin: 5, messageXpMax: 15, voiceXpPerMin: 3, xpCooldownSec: 60, ...config,
  });
  useEffect(() => { if (config) setForm((p) => ({ ...p, ...config })); }, [config]);

  const numFields = [
    { key: "dailyAmount", label: "Tägliche Belohnung (Münzen)" },
    { key: "workMinAmount", label: "Mindest-Arbeitslohn" },
    { key: "workMaxAmount", label: "Maximum-Arbeitslohn" },
    { key: "messageXpMin", label: "Mindest-XP pro Nachricht" },
    { key: "messageXpMax", label: "Maximum-XP pro Nachricht" },
    { key: "voiceXpPerMin", label: "XP pro Sprachminute" },
    { key: "xpCooldownSec", label: "XP-Cooldown (Sekunden)" },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
            <Coins className="w-7 h-7 text-orange-400" /> Economy & Leveling
          </h1>
          <p className="text-gray-400 text-sm">Münzsystem, XP, Shops & mehr</p>
        </div>
        <button onClick={() => onSave(form)} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" /> {saving ? "Speichern…" : "Speichern"}
        </button>
      </div>
      <div className="glass-card p-5 mb-5 flex items-center justify-between">
        <p className="text-white font-semibold">Economy aktivieren</p>
        <Toggle checked={form.enabled} onChange={() => setForm((p) => ({ ...p, enabled: !p.enabled }))} />
      </div>
      <div className="glass-card p-5 mb-5">
        <h3 className="text-white font-semibold mb-4">Währungseinstellungen</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Währungsname</label>
            <input value={form.currencyName} onChange={(e) => setForm((p) => ({ ...p, currencyName: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Währungssymbol</label>
            <input value={form.currencySymbol} onChange={(e) => setForm((p) => ({ ...p, currencySymbol: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500" />
          </div>
        </div>
      </div>
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">XP & Belohnungsraten</h3>
        <div className="grid grid-cols-2 gap-4">
          {numFields.map(({ key, label }) => (
            <div key={key}>
              <label className="text-gray-400 text-xs mb-1 block">{label}</label>
              <input type="number" min="0" value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: +e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-orange-500" : "bg-gray-700"}`}>
      <span className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
