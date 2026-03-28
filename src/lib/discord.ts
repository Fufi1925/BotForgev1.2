// Discord API Type Definitions & Helpers

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

export function getGuildIconUrl(guildId: string, icon: string | null): string {
  if (!icon) return "/images/default-guild.png";
  const ext = icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.${ext}?size=128`;
}

export function getUserAvatarUrl(userId: string, avatar: string | null, discriminator?: string): string {
  if (!avatar) {
    const index = discriminator ? parseInt(discriminator) % 5 : 0;
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }
  const ext = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${ext}?size=128`;
}

export const BOTFORGE_FOOTER_ICON =
  "https://cdn.discordapp.com/attachments/1484888992209047696/1487168273240952923/file_00000000f688720abc73d778f13d5c871.png?ex=69c828e2&is=69c6d762&hm=6a5094c30011584a0f254b5bcc7d1febd4bec92c3b199c2df7d88bbb6e63b5e9&";

export function getFooterText(): string {
  return `Powered by BotForge/Fufi | ${new Date().toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}`;
}

export async function fetchBotGuilds(botToken: string): Promise<string[]> {
  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: { Authorization: `Bot ${botToken}` },
  });
  if (!res.ok) return [];
  const guilds = await res.json();
  return guilds.map((g: any) => g.id);
}
