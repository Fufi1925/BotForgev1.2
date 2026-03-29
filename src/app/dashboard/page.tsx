import Link from 'next/link';
import { CheckCircle, Server, Plus } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f121d] text-white p-8">
      {/* Erfolgsmeldung */}
      <div className="max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-top duration-700">
        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center gap-4 text-green-400">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">Erfolgreich eingeloggt! Willkommen im BotForge Dashboard.</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
          <Server className="text-purple-500" /> DEINE SERVER
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Beispiel-Server */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl">S</div>
              <div>
                <h3 className="font-bold">Stamm-Server</h3>
                <p className="text-xs text-gray-500 italic">Verwalte Module</p>
              </div>
            </div>
            <Link href="/dashboard/123" className="bg-purple-600 px-4 py-2 rounded-xl text-sm font-bold">Öffnen</Link>
          </div>

          {/* Bot einladen Card */}
          <Link href="https://discord.com/oauth2/authorize?client_id=1487274173695787089&permissions=8&redirect_uri=https%3A%2F%2Fbot-forgev1-2.vercel.app%2Fapi%2Fauth%2Fcallback%2Fdiscord&integration_type=0&scope=bot"
                target="_blank"
                className="bg-purple-600/10 border-2 border-dashed border-purple-500/30 p-6 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-purple-500/20 transition group">
            <Plus className="w-8 h-8 text-purple-500 group-hover:scale-125 transition-transform" />
            <span className="font-bold text-purple-400">Bot auf eigenen Server einladen</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
