import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

// ─────────────────────────────────────────────
// Discord OAuth2 Scopes
// ─────────────────────────────────────────────
const DISCORD_SCOPES = ["identify", "email", "guilds", "guilds.members.read"].join(" ");

// ─────────────────────────────────────────────
// Main Server (Stamm-Server) Configuration
// ─────────────────────────────────────────────
export const MAIN_SERVER_ID = process.env.DISCORD_MAIN_SERVER_ID || "YOUR_SERVER_ID_HERE";
export const MAIN_SERVER_INVITE = process.env.DISCORD_MAIN_SERVER_INVITE || "https://discord.gg/your-invite";

// ─────────────────────────────────────────────
// Bot Invite Link Generator
// ─────────────────────────────────────────────
export const BOT_PERMISSIONS = "8"; // Administrator

export function generateBotInviteLink(guildId?: string): string {
  const clientId = process.env.DISCORD_BOT_CLIENT_ID || process.env.DISCORD_CLIENT_ID;
  const scopes = "bot%20applications.commands";
  const base = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${BOT_PERMISSIONS}&scope=${scopes}`;
  return guildId ? `${base}&guild_id=${guildId}` : base;
}

// ─────────────────────────────────────────────
// NextAuth Configuration
// ─────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: DISCORD_SCOPES } },
    }),
  ],
  session: { strategy: "database", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/", error: "/auth/error" },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        (session.user as any).discordId = (user as any).discordId;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "discord") {
        await prisma.user.upsert({
          where: { discordId: account.providerAccountId },
          update: {
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            tokenExpires: account.expires_at ? new Date(account.expires_at * 1000) : null,
          },
          create: {
            discordId: account.providerAccountId,
            name: user.name,
            email: user.email,
            image: user.image,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            tokenExpires: account.expires_at ? new Date(account.expires_at * 1000) : null,
          },
        }).catch(console.error);
      }
      return true;
    },
  },
  events: {
    async signIn({ account }) {
      if (account?.provider === "discord" && account.access_token) {
        const guilds = await fetchUserGuilds(account.access_token).catch(() => []);
        const isMember = guilds.some((g: any) => g.id === MAIN_SERVER_ID);
        await prisma.user.update({
          where: { discordId: account.providerAccountId },
          data: { joinedMainServer: isMember },
        }).catch(console.error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// ─────────────────────────────────────────────
// Discord API Helpers
// ─────────────────────────────────────────────
export async function fetchUserGuilds(accessToken: string): Promise<any[]> {
  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Failed to fetch guilds");
  return res.json();
}

export async function fetchUserProfile(accessToken: string): Promise<any> {
  const res = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function checkMainServerMembership(accessToken: string): Promise<boolean> {
  const guilds = await fetchUserGuilds(accessToken).catch(() => []);
  return guilds.some((g: any) => g.id === MAIN_SERVER_ID);
}

export function filterAdminGuilds(guilds: any[]): any[] {
  return guilds.filter((g) => {
    const perms = BigInt(g.permissions || "0");
    return (perms & BigInt(0x8)) === BigInt(0x8);
  });
}
