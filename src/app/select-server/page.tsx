"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Plus, Settings, Search, RefreshCw, LogOut, Crown } from "lucide-react";
import { signOut } from "next-auth/react";
import { getGuildIconUrl } from "@/lib/discord";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  botPresent: boolean;
}

export default function SelectServerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const fetchGuilds = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/guilds");
      const data = await res.json();

      if (res.status === 403 && data.error === "NOT_MAIN_SERVER_MEMBER") {
        router.push("/join-server");
        return;
      }
      if (!res.ok) throw new Error(data.error || "Fehler beim Laden der Server");

      setGuilds(data.guilds || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchGuilds();
  }, [status]);

  const filtered = guilds.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const botGuilds = filtered.filter((g) => g.botPresent);
  const otherGuilds = filtered.filter((g) => !g.botPresent);

  const handleAddBot = (guildId: string) => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands&guild_id=${guildId}`;
    window.open(url, "_blank", "width=500,height=700");
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">BotForge</span>
        </div>
        <div className="flex items-center gap-3">
          {session?.user && (
            <div className="flex items-center gap-2">
              <img
                src={session.user.image ?? "/images/default-avatar.png"}
                alt={session.user.name ?? ""}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-300 text-sm font-medium hidden sm:block">{session.user.name}</span>
            </div>
          )}
          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary p-2">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Server auswählen</h1>
          <p className="text-gray-400">Wähle einen Server aus, auf dem du Administratorrechte besitzt.</p>
        </motion.div>

        {/* Search */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Server suchen…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <button onClick={fetchGuilds} className="btn-secondary px-4">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-5 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Bot already present */}
            {botGuilds.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Bot aktiv ({botGuilds.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {botGuilds.map((guild, i) => (
                    <GuildCard
                      key={guild.id}
                      guild={guild}
                      index={i}
                      onManage={() => router.push(`/dashboard/${guild.id}`)}
                      onAddBot={handleAddBot}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No bot yet */}
            {otherGuilds.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Bot hinzufügen ({otherGuilds.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherGuilds.map((guild, i) => (
                    <GuildCard
                      key={guild.id}
                      guild={guild}
                      index={i}
                      onManage={() => router.push(`/dashboard/${guild.id}`)}
                      onAddBot={handleAddBot}
                    />
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && !loading && (
              <div className="text-center py-16 text-gray-500">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Keine Server gefunden.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GuildCard({ guild, index, onManage, onAddBot }: {
  guild: Guild;
  index: number;
  onManage: () => void;
  onAddBot: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-5 hover:border-violet-500/30 transition-all duration-200 group"
    >
      <div className="flex items-center gap-3 mb-4">
        {guild.icon ? (
          <img
            src={getGuildIconUrl(guild.id, guild.icon)}
            alt={guild.name}
            className="w-12 h-12 rounded-full ring-2 ring-violet-500/20"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 font-bold">
            {guild.name.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-white font-semibold text-sm truncate">{guild.name}</p>
            {guild.owner && <Crown className="w-3 h-3 text-yellow-400 shrink-0" />}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${guild.botPresent ? "bg-green-400" : "bg-gray-600"}`} />
            <p className="text-gray-500 text-xs">
              {guild.botPresent ? "Bot aktiv" : "Bot nicht hinzugefügt"}
            </p>
          </div>
        </div>
      </div>

      {guild.botPresent ? (
        <button onClick={onManage} className="btn-primary w-full justify-center text-sm">
          <Settings className="w-4 h-4" />
          Dashboard öffnen
        </button>
      ) : (
        <button onClick={() => onAddBot(guild.id)} className="btn-secondary w-full justify-center text-sm">
          <Plus className="w-4 h-4" />
          Bot hinzufügen
        </button>
      )}
    </motion.div>
  );
}
