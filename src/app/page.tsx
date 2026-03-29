import Link from 'next/link';
import { Shield, Music, Zap, BarChart, Server, Layout, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f121d] text-white selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-[#0f121d]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg shadow-lg shadow-purple-500/20">
            <Zap className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter italic">BOTFORGE</span>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition font-medium py-2">Dashboard</Link>
          <Link href="https://discord.com/oauth2/authorize?client_id=1487274173695787089&response_type=code&redirect_uri=https%3A%2F%2Fbot-forgev1-2.vercel.app%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=email+identify+guilds.join+guilds" 
                className="bg-white text-black hover:bg-purple-500 hover:text-white px-6 py-2 rounded-full font-bold transition-all transform active:scale-95 shadow-lg shadow-white/5">
            Login mit Discord
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto pt-32 pb-20 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
          DEIN SERVER. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">OPTIMIERT.</span>
        </h1>
        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Moderation, Musik, Economy und Leveling – Alles in einem Bot. Steuere deinen Server mit dem modernsten Dashboard auf dem Markt.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="https://discord.com/oauth2/authorize?client_id=1487274173695787089&response_type=code&redirect_uri=https%3A%2F%2Fbot-forgev1-2.vercel.app%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=email+identify+guilds.join+guilds" 
                className="bg-purple-600 hover:bg-purple-700 px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-purple-600/30 flex items-center gap-2">
            JETZT STARTEN <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-3 gap-8">
        <FeatureCard icon={<Shield className="text-green-400" />} title="Auto-Moderation" desc="Schütze deinen Server automatisch vor Spam, Links und Schimpfwörtern." />
        <FeatureCard icon={<Music className="text-pink-400" />} title="High-End Musik" desc="Höre Musik von Spotify, YouTube und SoundCloud in höchster Qualität." />
        <FeatureCard icon={<BarChart className="text-blue-400" />} title="Server-Stats" desc="Detaillierte Statistiken über deine Mitglieder und Nachrichten." />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-all cursor-default group">
      <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
