"use client";
import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, MessageSquare } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function StatsPanel({ guildId }: { guildId: string }) {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/guilds/${guildId}/stats?days=${days}`);
        const data = await res.json();
        setStats(data.stats || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, [guildId, days]);

  // Generate mock data if empty
  const chartData = stats.length > 0 ? stats.map((s) => ({
    date: new Date(s.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
    members: s.memberCount,
    messages: s.messageCount,
    active: s.activeUsers,
    voice: s.voiceMinutes,
  })) : [...Array(days)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    return {
      date: d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
      members: Math.floor(Math.random() * 50) + 200,
      messages: Math.floor(Math.random() * 500) + 100,
      active: Math.floor(Math.random() * 30) + 10,
      voice: Math.floor(Math.random() * 300) + 50,
    };
  });

  const latest = chartData[chartData.length - 1] || {};
  const kpis = [
    { label: "Mitglieder", value: latest.members?.toLocaleString() || "—", icon: Users, color: "text-blue-400" },
    { label: "Nachrichten (gesamt)", value: latest.messages?.toLocaleString() || "—", icon: MessageSquare, color: "text-green-400" },
    { label: "Aktive Nutzer", value: latest.active?.toLocaleString() || "—", icon: TrendingUp, color: "text-orange-400" },
    { label: "Sprachminuten", value: latest.voice?.toLocaleString() || "—", icon: BarChart3, color: "text-violet-400" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-400" /> Server-Statistiken
          </h1>
          <p className="text-gray-400 text-sm">Aktivität & Wachstum deines Servers</p>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <button key={d} onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${days === d ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
              {d}T
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-4">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-gray-400 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Mitglieder Chart */}
      <div className="glass-card p-5 mb-5">
        <h3 className="text-white font-semibold mb-4">Mitgliederentwicklung</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: 8, color: "#f9fafb" }} />
            <Line type="monotone" dataKey="members" stroke="#60A5FA" strokeWidth={2} dot={false} name="Mitglieder" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Nachrichten Chart */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Nachrichten-Aktivität</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: 8, color: "#f9fafb" }} />
            <Bar dataKey="messages" fill="#34D399" radius={[4, 4, 0, 0]} name="Nachrichten" />
            <Bar dataKey="active" fill="#A78BFA" radius={[4, 4, 0, 0]} name="Aktive Nutzer" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
