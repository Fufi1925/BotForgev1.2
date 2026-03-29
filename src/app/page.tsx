import Link from 'next/link';
import { Shield, Zap, Music, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f111a] text-white font-sans">
      {/* Hero Section */}
      <nav className="p-6 flex justify-between items-center border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          BotForge
        </h1>
        <Link href="/api/auth/signin" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition">
          Login mit Discord
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
          Dein Server, <span className="text-purple-500">Deine Regeln.</span>
        </h2>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
          Verwalte Musik, Moderation und Statistiken mit dem mächtigsten Dashboard für deinen Discord-Bot.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-20">
          <FeatureIcon icon={<Shield className="w-8 h-8 text-green-400" />} title="Auto-Mod" />
          <FeatureIcon icon={<Music className="w-8 h-8 text-pink-400" />} title="High-End Musik" />
          <FeatureIcon icon={<BarChart3 className="w-8 h-8 text-blue-400" />} title="Statistiken" />
          <FeatureIcon icon={<Zap className="w-8 h-8 text-yellow-400" />} title="Economy" />
        </div>
      </main>
    </div>
  );
}

function FeatureIcon({ icon, title }: { icon: any, title: string }) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition cursor-default">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="font-bold">{title}</h3>
    </div>
  );
}
