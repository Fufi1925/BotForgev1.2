"use client";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Shield, Music, BarChart3, FileText, Coins, Gift,
  Settings, Home, ChevronRight, Bot, LogOut, Save,
  ToggleLeft, ToggleRight, Activity
} from "lucide-react";
import { signOut } from "next-auth/react";
import { DiscordEmbedPreview } from "@/components/embeds/EmbedPreview";
import { AutoModPanel } from "@/components/dashboard/AutoModPanel";
import { MusicPanel } from "@/components/dashboard/MusicPanel";
import { LoggingPanel } from "@/components/dashboard/LoggingPanel";
import { EconomyPanel } from "@/components/dashboard/EconomyPanel";
import { StatsPanel } from "@/components/dashboard/StatsPanel";
import { WelcomePanel } from "@/components/dashboard/WelcomePanel";

const MODULES = [
  { id: "overview", label: "Übersicht", icon: Home, category: null },
  { id: "automod", label: "Auto-Mod", icon: Shield, category: "moderation" },
  { id: "music", label: "Musik", icon: Music, category: "music" },
  { id: "stats", label: "Statistiken", icon: BarChart3, category: "stats" },
  { id: "logging", label: "Logging", icon: FileText, category: "logging" },
  { id: "economy", label: "Economy", icon: Coins, category: "economy" },
  { id: "welcome", label: "Willkommen", icon: Gift, category: "utility" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const guildId = params.guildId as string;

  const [activeModule, setActiveModule] = useState("overview");
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch(`/api/guilds/${guildId}/config`);
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [guildId]);

  useEffect(() => {
    if (status === "authenticated") fetchConfig();
  }, [status, fetchConfig]);

  const handleSave = async (module: string, data: any) => {
    setSaving(true);
    try {
      await fetch(`/api/guilds/${guildId}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module, data }),
      });
      await fetchConfig();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const renderPanel = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    switch (activeModule) {
      case "overview": return <OverviewPanel config={config} guildId={guildId} />;
      case "automod": return <AutoModPanel config={config?.automod} onSave={(d) => handleSave("automod", d)} saving={saving} />;
      case "music": return <MusicPanel config={config?.musicConfig} onSave={(d) => handleSave("music", d)} saving={saving} />;
      case "stats": return <StatsPanel guildId={guildId} />;
      case "logging": return <LoggingPanel config={config?.logConfig} onSave={(d) => handleSave("logging", d)} saving={saving} />;
      case "economy": return <EconomyPanel config={config?.economyConfig} onSave={(d) => handleSave("economy", d)} saving={saving} />;
      case "welcome": return <WelcomePanel config={config?.welcomeConfig} onSave={(d) => handleSave("welcome", d)} saving={saving} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-gray-900/50 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">BotForge</span>
          </div>
          {config && (
            <div className="mt-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-400 font-bold">
                {config.guildName?.charAt(0) || "?"}
              </div>
              <span className="text-xs text-gray-400 truncate">{config.guildName}</span>
            </div>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {MODULES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveModule(id)}
              className={activeModule === id ? "sidebar-item-active w-full text-left" : "sidebar-item w-full text-left"}
            >
              <Icon className="w-4 h-4" />
              {label}
              {activeModule === id && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800 space-y-1">
          <button onClick={() => router.push("/select-server")} className="sidebar-item w-full text-left">
            <Settings className="w-4 h-4" />
            Server wechseln
          </button>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="sidebar-item w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderPanel()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
// Overview Panel
// ─────────────────────────────────────────────
function OverviewPanel({ config, guildId }: { config: any; guildId: string }) {
  const modules = [
    { label: "Auto-Mod", enabled: config?.automod?.enabled, icon: Shield },
    { label: "Musik", enabled: config?.musicConfig?.enabled, icon: Music },
    { label: "Logging", enabled: config?.logConfig?.enabled, icon: FileText },
    { label: "Economy", enabled: config?.economyConfig?.enabled, icon: Coins },
    { label: "Willkommen", enabled: config?.welcomeConfig?.welcomeEnabled, icon: Gift },
  ];

  const sampleEmbed = {
    title: "BotForge Online!",
    description: "Dein All-in-One Bot ist bereit. Nutze `/help` für alle Befehle.",
    color: "#7C3AED",
    fields: [
      { name: "Prefix", value: config?.prefix || "!", inline: true },
      { name: "Module aktiv", value: `${modules.filter((m) => m.enabled).length}/${modules.length}`, inline: true },
    ],
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1">Dashboard Übersicht</h1>
        <p className="text-gray-400 text-sm">Server-ID: {guildId}</p>
      </div>

      {/* Module Status */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {modules.map(({ label, enabled, icon: Icon }) => (
          <div key={label} className="glass-card p-4 text-center">
            <Icon className={`w-6 h-6 mx-auto mb-2 ${enabled ? "text-green-400" : "text-gray-600"}`} />
            <p className="text-xs font-medium text-gray-300">{label}</p>
            <span className={`text-xs ${enabled ? "text-green-400" : "text-gray-600"}`}>
              {enabled ? "Aktiv" : "Inaktiv"}
            </span>
          </div>
        ))}
      </div>

      {/* Embed Preview */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-violet-400" />
          <h2 className="text-white font-semibold">Embed-Vorschau</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          So sehen Bot-Nachrichten auf deinem Server aus. Alle Embeds enthalten automatisch den BotForge-Footer.
        </p>
        <DiscordEmbedPreview embed={sampleEmbed} />
      </div>
    </div>
  );
}
