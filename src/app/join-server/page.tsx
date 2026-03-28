"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, AlertTriangle, CheckCircle, Bot } from "lucide-react";
import { MAIN_SERVER_INVITE } from "@/lib/auth";

export default function JoinServerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const handleCheckMembership = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/guilds");
      const data = await res.json();
      if (data.isMainServerMember || res.status !== 403) {
        setJoined(true);
        setTimeout(() => router.push("/select-server"), 1500);
      }
    } catch {
      // Still not a member
    } finally {
      setChecking(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 glass-card p-10 max-w-md w-full text-center"
      >
        {joined ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Willkommen!</h2>
            <p className="text-gray-400">Du bist jetzt Mitglied. Weiterleitung…</p>
          </motion.div>
        ) : (
          <>
            {/* Bot Icon */}
            <div className="w-20 h-20 bg-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Bot className="w-10 h-10 text-violet-400" />
            </div>

            {/* Warning */}
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 text-left">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <p className="text-yellow-300 font-semibold text-sm">Zugang eingeschränkt</p>
                <p className="text-yellow-400/70 text-xs mt-1">
                  Du musst dem BotForge-Server beitreten, um das Dashboard nutzen zu können.
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-black text-white mb-3">
              Tritt dem BotForge-Server bei
            </h1>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Um das BotForge-Dashboard nutzen zu können, musst du zuerst unserem Stamm-Server beitreten.
              Klicke auf den Button unten, um beizutreten, und bestätige danach deine Mitgliedschaft.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={process.env.NEXT_PUBLIC_MAIN_SERVER_INVITE || "https://discord.gg/your-invite"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-discord w-full justify-center py-3"
              >
                <ExternalLink className="w-5 h-5" />
                BotForge-Server beitreten
              </a>
              <button
                onClick={handleCheckMembership}
                disabled={checking}
                className="btn-secondary w-full justify-center py-3"
              >
                <RefreshCw className={`w-5 h-5 ${checking ? "animate-spin" : ""}`} />
                {checking ? "Überprüfe Mitgliedschaft…" : "Mitgliedschaft bestätigen"}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
              <img
                src="https://cdn.discordapp.com/attachments/1484888992209047696/1487168273240952923/file_00000000f688720abc73d778f13d5c871.png?ex=69c828e2&is=69c6d762&hm=6a5094c30011584a0f254b5bcc7d1febd4bec92c3b199c2df7d88bbb6e63b5e9&"
                alt="BotForge"
                className="w-4 h-4 rounded-full"
              />
              Powered by BotForge/Fufi
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
