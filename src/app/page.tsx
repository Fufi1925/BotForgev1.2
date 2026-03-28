"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield, Music, BarChart3, ListChecks, Coins, Zap,
  Star, ChevronRight, Bot, Users, Server
} from "lucide-react";

const FEATURES = [
  { icon: Shield, title: "Auto-Mod Pro", desc: "KI-gestützte Toxizitätsprüfung + mehrstufige Filter. Hassrede, Spam, Links & mehr.", color: "text-red-400", bg: "bg-red-500/10" },
  { icon: Music, title: "Premium Musik", desc: "Hochwertige Streams von SoundCloud, Spotify & Webradio. Bassboost, Nightcore uvm.", color: "text-green-400", bg: "bg-green-500/10" },
  { icon: BarChart3, title: "Detaillierte Stats", desc: "Mitgliederwachstum, Top-User, Kanalaktivität & interaktive Grafiken.", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: ListChecks, title: "Vollständiges Logging", desc: "Lückenlose Protokolle: Edits, Löschungen, Rollenänderungen, Voice-Aktivität.", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { icon: Coins, title: "Economy & Level", desc: "Münzsystem, tägliche Belohnungen, Glücksspiel, XP & rollenbasierte Belohnungen.", color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: Zap, title: "All-in-One", desc: "Umfragen, Gewinnspiele, Willkommensnachrichten & mehr – alles in einem Bot.", color: "text-violet-400", bg: "bg-violet-500/10" },
];

const STATS = [
  { icon: Server, label: "Server", value: "10,000+" },
  { icon: Users, label: "Benutzer", value: "1,000,000+" },
  { icon: Bot, label: "Befehle", value: "150+" },
];

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/select-server");
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/5 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center animate-pulse-glow">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">BotForge</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors">Features</a>
          <a href="#stats" className="text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors">Statistiken</a>
          <button
            onClick={() => signIn("discord")}
            className="btn-discord text-sm py-2 px-4"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.1.133 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            Login mit Discord
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-4 pt-20 pb-24 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4" />
            Der beste All-in-One Discord Bot
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">BotForge</span>
            <br />
            <span className="text-gray-100">Dein Server.</span>
            <br />
            <span className="text-gray-400">Perfektioniert.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Auto-Moderation, Premium-Musik, detaillierte Statistiken, vollständiges Logging und ein
            umfassendes Economy-System – alles in einem einzigen, leistungsstarken Bot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => signIn("discord")}
              className="btn-discord text-lg py-4 px-8 animate-pulse-glow"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.1.133 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Jetzt starten – Kostenlos!
            </button>
            <a href="#features" className="btn-secondary text-lg py-4 px-8">
              Features entdecken <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Stats banner */}
      <section id="stats" className="relative z-10 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {STATS.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 text-center"
            >
              <Icon className="w-8 h-8 text-violet-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-white mb-4">Alles was du brauchst</h2>
          <p className="text-gray-400 text-lg">Sechs leistungsstarke Module. Ein Bot.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 hover:border-violet-500/30 transition-colors group"
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto glass-card p-12">
          <h2 className="text-4xl font-black text-white mb-4">Bereit loszulegen?</h2>
          <p className="text-gray-400 mb-8">Melde dich mit Discord an und füge BotForge zu deinem Server hinzu.</p>
          <button onClick={() => signIn("discord")} className="btn-discord mx-auto text-lg py-4 px-10">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.1.133 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            Mit Discord anmelden
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-6 px-4 text-center text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2">
          <img src="https://cdn.discordapp.com/attachments/1484888992209047696/1487168273240952923/file_00000000f688720abc73d778f13d5c871.png?ex=69c828e2&is=69c6d762&hm=6a5094c30011584a0f254b5bcc7d1febd4bec92c3b199c2df7d88bbb6e63b5e9&" alt="BotForge" className="w-5 h-5 rounded-full" />
          Powered by BotForge/Fufi · {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
