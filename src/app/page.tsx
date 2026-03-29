import Link from 'next/link';
import { Shield, Zap, Music, BarChart3, MessageSquare, Star, Settings, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0d13] text-white selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0b0d13]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">BotForge</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#stats" className="hover:text-white transition">Statistiken</a>
          <a href="#premium" className="hover:text-white transition">Premium</a>
        </div>
        <Link href="/api/auth/signin" className="bg-white text-black hover:bg-purple-500 hover:text-white px-6 py-2.5 rounded-full font-bold transition-all active:scale-95 shadow-xl shadow-white/5">
          Dashboard öffnen
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold text-purple-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            V2.0 IST JETZT LIVE
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
            DEIN SERVER. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 animate-gradient-x">ULTIMATIVE POWER.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            BotForge ist das All-in-One Werkzeug für deinen Discord-Server. Musik, Moderation, Economy und vieles mehr – gesteuert über ein High-End Dashboard.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/api/auth/signin" className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-purple-500/40">
              JETZT KOSTENLOS STARTEN
            </Link>
            <a href="https://discord.com/oauth2/authorize?client_id=1211756586060152862&permissions=8&scope=bot%20applications.commands" target="_blank" className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-4 rounded-2xl font-black text-lg transition-all">
              BOT EINLADEN
            </a>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">ALLES WAS DU BRAUCHST</h2>
          <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="w-10 h-10 text-emerald-400" />} 
            title="Sicherheit 24/7" 
            desc="Automatisches Filtern von Schimpfwörtern, Spam-Schutz und Log-System."
          />
          <FeatureCard 
            icon={<Music className="w-10 h-10 text-pink-400" />} 
            title="High-End Audio" 
            desc="Kristallklare Musik von YouTube, Spotify und SoundCloud ohne Verzögerung."
          />
          <FeatureCard 
            icon={<BarChart3 className="w-10 h-10 text-blue-400" />} 
            title="Live-Statistiken" 
            desc="Verfolge das Wachstum deines Servers in Echtzeit mit interaktiven Graphen."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; 2026 BotForge - Erstellt für professionelle Communities.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-[#141722] border border-white/5 p-8 rounded-3xl hover:border-purple-500/50 transition-all group">
      <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
