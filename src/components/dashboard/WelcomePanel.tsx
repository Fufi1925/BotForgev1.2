"use client";
import { useState, useEffect } from "react";
import { Gift, Save } from "lucide-react";
import { DiscordEmbedPreview } from "@/components/embeds/EmbedPreview";

interface WelcomeConfig {
  welcomeEnabled: boolean; welcomeChannelId?: string; welcomeMessage?: string; welcomeColor: string;
  goodbyeEnabled: boolean; goodbyeChannelId?: string; goodbyeMessage?: string; goodbyeColor: string;
  autoRoleId?: string;
}

export function WelcomePanel({ config, onSave, saving }: {
  config?: WelcomeConfig; onSave: (d: any) => void; saving: boolean;
}) {
  const [form, setForm] = useState<WelcomeConfig>({
    welcomeEnabled: false, welcomeColor: "#5865F2",
    goodbyeEnabled: false, goodbyeColor: "#ED4245",
    welcomeMessage: "Willkommen auf dem Server, {user}! 🎉",
    goodbyeMessage: "{user} hat den Server verlassen. 👋", ...config,
  });
  useEffect(() => { if (config) setForm((p) => ({ ...p, ...config })); }, [config]);

  const toggleW = () => setForm((p) => ({ ...p, welcomeEnabled: !p.welcomeEnabled }));
  const toggleG = () => setForm((p) => ({ ...p, goodbyeEnabled: !p.goodbyeEnabled }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
            <Gift className="w-7 h-7 text-violet-400" /> Willkommens-Modul
          </h1>
          <p className="text-gray-400 text-sm">Begrüßungs- & Abschiedsnachrichten</p>
        </div>
        <button onClick={() => onSave(form)} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" /> {saving ? "Speichern…" : "Speichern"}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Welcome */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Begrüßungsnachricht</h3>
            <Toggle checked={form.welcomeEnabled} onChange={toggleW} color="bg-[#5865F2]" />
          </div>
          <label className="text-gray-400 text-xs mb-1 block">Kanal-ID</label>
          <input value={form.welcomeChannelId || ""} onChange={(e) => setForm((p) => ({ ...p, welcomeChannelId: e.target.value }))}
            placeholder="Kanal-ID" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:outline-none focus:border-violet-500" />
          <label className="text-gray-400 text-xs mb-1 block">Nachricht ({"{user}"} = Mitglied)</label>
          <textarea rows={3} value={form.welcomeMessage || ""} onChange={(e) => setForm((p) => ({ ...p, welcomeMessage: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:outline-none focus:border-violet-500 resize-none" />
          <label className="text-gray-400 text-xs mb-1 block">Embed-Farbe</label>
          <input type="color" value={form.welcomeColor} onChange={(e) => setForm((p) => ({ ...p, welcomeColor: e.target.value }))}
            className="h-8 w-16 rounded cursor-pointer bg-transparent" />
        </div>
        {/* Goodbye */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Abschiedsnachricht</h3>
            <Toggle checked={form.goodbyeEnabled} onChange={toggleG} color="bg-[#ED4245]" />
          </div>
          <label className="text-gray-400 text-xs mb-1 block">Kanal-ID</label>
          <input value={form.goodbyeChannelId || ""} onChange={(e) => setForm((p) => ({ ...p, goodbyeChannelId: e.target.value }))}
            placeholder="Kanal-ID" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:outline-none focus:border-red-500" />
          <label className="text-gray-400 text-xs mb-1 block">Nachricht</label>
          <textarea rows={3} value={form.goodbyeMessage || ""} onChange={(e) => setForm((p) => ({ ...p, goodbyeMessage: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:outline-none focus:border-red-500 resize-none" />
          <label className="text-gray-400 text-xs mb-1 block">Embed-Farbe</label>
          <input type="color" value={form.goodbyeColor} onChange={(e) => setForm((p) => ({ ...p, goodbyeColor: e.target.value }))}
            className="h-8 w-16 rounded cursor-pointer bg-transparent" />
        </div>
      </div>
      {/* Preview */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Embed-Vorschau</h3>
        <DiscordEmbedPreview embed={{
          title: "Willkommen! 🎉",
          description: form.welcomeMessage?.replace("{user}", "@NeuesMitglied") || "",
          color: form.welcomeColor,
        }} />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, color }: { checked: boolean; onChange: () => void; color: string }) {
  return (
    <button onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? color : "bg-gray-700"}`}>
      <span className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
