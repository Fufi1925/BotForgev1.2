"use client";
import { useEffect, useState } from "react";

const FOOTER_ICON = "https://cdn.discordapp.com/attachments/1484888992209047696/1487168273240952923/file_00000000f688720abc73d778f13d5c871.png?ex=69c828e2&is=69c6d762&hm=6a5094c30011584a0f254b5bcc7d1febd4bec92c3b199c2df7d88bbb6e63b5e9&";

interface EmbedField { name: string; value: string; inline?: boolean; }
interface EmbedProps {
  title?: string;
  description?: string;
  color?: string;
  fields?: EmbedField[];
  thumbnail?: string;
  image?: string;
  authorName?: string;
  authorIcon?: string;
}

export function DiscordEmbedPreview({ embed }: { embed: EmbedProps }) {
  const [footerTime, setFooterTime] = useState("");
  useEffect(() => {
    const update = () => setFooterTime(new Date().toLocaleString("de-DE", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }));
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  const borderColor = embed.color || "#7C3AED";
  const inlineFields = embed.fields?.filter((f) => f.inline) ?? [];
  const blockFields = embed.fields?.filter((f) => !f.inline) ?? [];

  return (
    <div className="bg-[#313338] rounded-lg p-3 max-w-lg">
      <div className="flex items-center gap-2 mb-2">
        <img src={FOOTER_ICON} alt="BotForge" className="w-8 h-8 rounded-full" />
        <span className="text-white text-sm font-semibold">BotForge</span>
        <span className="text-[10px] bg-[#5865F2] text-white px-1 py-0.5 rounded font-semibold">BOT</span>
      </div>
      <div className="discord-embed relative" style={{ borderLeftColor: borderColor, borderLeftWidth: "4px" }}>
        {embed.authorName && (
          <div className="flex items-center gap-2 mb-2">
            {embed.authorIcon && <img src={embed.authorIcon} alt="" className="w-5 h-5 rounded-full" />}
            <span className="text-white text-xs font-semibold">{embed.authorName}</span>
          </div>
        )}
        {embed.title && <p className="discord-embed-title">{embed.title}</p>}
        {embed.description && <p className="discord-embed-description mt-1 whitespace-pre-wrap">{embed.description}</p>}
        {inlineFields.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {inlineFields.map((f, i) => (
              <div key={i}>
                <p className="discord-embed-field-name">{f.name}</p>
                <p className="discord-embed-field-value">{f.value}</p>
              </div>
            ))}
          </div>
        )}
        {blockFields.map((f, i) => (
          <div key={i} className="mt-2">
            <p className="discord-embed-field-name">{f.name}</p>
            <p className="discord-embed-field-value">{f.value}</p>
          </div>
        ))}
        {embed.thumbnail && (
          <img src={embed.thumbnail} alt="" className="absolute top-3 right-3 w-16 h-16 rounded object-cover" />
        )}
        {embed.image && <img src={embed.image} alt="" className="mt-3 rounded max-w-full" />}
        {/* MANDATORY BotForge Footer */}
        <div className="discord-embed-footer mt-3 pt-2 border-t border-gray-700/50">
          <img src={FOOTER_ICON} alt="BotForge" className="w-4 h-4 rounded-full" />
          <span>Powered by BotForge/Fufi | {footerTime}</span>
        </div>
      </div>
    </div>
  );
}
