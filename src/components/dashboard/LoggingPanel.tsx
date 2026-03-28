"use client";
import { useState, useEffect } from "react";
import { FileText, Save } from "lucide-react";

interface LogConfig {
  enabled: boolean;
  messageEditChannel?: string; messageDeleteChannel?: string;
  memberJoinChannel?: string; memberLeaveChannel?: string;
  roleChangeChannel?: string; voiceChannel?: string; modActionChannel?: string;
  logMessageEdits: boolean; logMessageDeletes: boolean;
  logMemberJoins: boolean; logMemberLeaves: boolean;
  logRoleChanges: boolean; logVoiceActivity: boolean; logModActions: boolean;
}

export function LoggingPanel({ config, onSave, saving }: {
  config?: LogConfig; onSave: (d: any) => void; saving: boolean;
}) {
  const [form, setForm] = useState<LogConfig>({
    enabled: false, logMessageEdits: true, logMessageDeletes: true,
    logMemberJoins: true, logMemberLeaves: true, logRoleChanges: true,
    logVoiceActivity: true, logModActions: true, ...config,
  });
  useEffect(() => { if (config) setForm((p) => ({ ...p, ...config })); }, [config]);

  const toggle = (k: keyof LogConfig) => setForm((p) => ({ ...p, [k]: !p[k] }));
  const setText = (k: keyof LogConfig, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const channels = [
    { key: "messageEditChannel", label: "Nachrichten-Edits", toggle: "logMessageEdits" },
    { key: "messageDeleteChannel", label: "Nachrichten-Löschungen", toggle: "logMessageDeletes" },
    { key: "memberJoinChannel", label: "Mitglieder beigetreten", toggle: "logMemberJoins" },
    { key: "memberLeaveChannel", label: "Mitglieder verlassen", toggle: "logMemberLeaves" },
    { key: "roleChangeChannel", label: "Rollenänderungen", toggle: "logRoleChanges" },
    { key: "voiceChannel", label: "Sprachkanal-Aktivität", toggle: "logVoiceActivity" },
    { key: "modActionChannel", label: "Moderationsaktionen", toggle: "logModActions" },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
            <FileText className="w-7 h-7 text-yellow-400" /> Logging-Modul
          </h1>
          <p className="text-gray-400 text-sm">Vollständige Server-Protokollierung</p>
        </div>
        <button onClick={() => onSave(form)} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" /> {saving ? "Speichern…" : "Speichern"}
        </button>
      </div>

      <div className="glass-card p-5 mb-5 flex items-center justify-between">
        <p className="text-white font-semibold">Logging aktivieren</p>
        <Toggle checked={form.enabled} onChange={() => toggle("enabled")} />
      </div>

      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Log-Kanäle konfigurieren</h3>
        <div className="space-y-4">
          {channels.map(({ key, label, toggle: tKey }) => (
            <div key={key} className="border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-200 text-sm font-medium">{label}</span>
                <Toggle checked={form[tKey] as boolean} onChange={() => toggle(tKey as keyof LogConfig)} disabled={!form.enabled} />
              </div>
              <input type="text" placeholder="Kanal-ID (z.B. 1234567890123456789)"
                value={(form[key as keyof LogConfig] as string) || ""}
                onChange={(e) => setText(key as keyof LogConfig, e.target.value)}
                disabled={!form.enabled || !(form[tKey] as boolean)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, disabled = false }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button onClick={onChange} disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-yellow-500" : "bg-gray-700"} ${disabled ? "opacity-50" : ""}`}>
      <span className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
