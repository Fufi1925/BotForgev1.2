import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, fetchUserGuilds, filterAdminGuilds, checkMainServerMembership, MAIN_SERVER_ID } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch user DB record to get Discord access token
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.accessToken) {
      return NextResponse.json({ error: "No access token" }, { status: 401 });
    }

    // Fetch guilds from Discord API
    const allGuilds = await fetchUserGuilds(user.accessToken);

    // Check main server membership
    const isMainServerMember = allGuilds.some((g: any) => g.id === MAIN_SERVER_ID);

    if (!isMainServerMember) {
      return NextResponse.json({
        error: "NOT_MAIN_SERVER_MEMBER",
        message: "You must join the BotForge server first.",
      }, { status: 403 });
    }

    // Filter guilds where user is admin
    const adminGuilds = filterAdminGuilds(allGuilds);

    // Fetch bot guild memberships from DB
    const botGuildIds = await prisma.guildConfig.findMany({
      where: { botPresent: true },
      select: { guildId: true },
    }).then((gs) => new Set(gs.map((g) => g.guildId)));

    // Merge bot presence info
    const guildsWithBotStatus = adminGuilds.map((g: any) => ({
      ...g,
      botPresent: botGuildIds.has(g.id),
    }));

    return NextResponse.json({ guilds: guildsWithBotStatus, isMainServerMember: true });
  } catch (err: any) {
    console.error("[API/guilds]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
