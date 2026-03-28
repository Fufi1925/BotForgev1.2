import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/guilds/[guildId]/config - Fetch full guild config
export async function GET(
  req: NextRequest,
  { params }: { params: { guildId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { guildId } = params;

  const config = await prisma.guildConfig.findUnique({
    where: { guildId },
    include: {
      automod: true,
      musicConfig: true,
      logConfig: true,
      economyConfig: true,
      welcomeConfig: true,
    },
  });

  if (!config) {
    // Create default config
    const newConfig = await prisma.guildConfig.create({
      data: {
        guildId,
        guildName: "Unknown Server",
        automod: { create: {} },
        musicConfig: { create: {} },
        logConfig: { create: {} },
        economyConfig: { create: {} },
        welcomeConfig: { create: {} },
      },
      include: {
        automod: true,
        musicConfig: true,
        logConfig: true,
        economyConfig: true,
        welcomeConfig: true,
      },
    });
    return NextResponse.json(newConfig);
  }

  return NextResponse.json(config);
}

// PATCH /api/guilds/[guildId]/config - Update guild config module
export async function PATCH(
  req: NextRequest,
  { params }: { params: { guildId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { guildId } = params;
  const body = await req.json();
  const { module, data } = body;

  try {
    let result;
    switch (module) {
      case "automod":
        result = await prisma.autoModConfig.upsert({
          where: { guildId },
          update: data,
          create: { guildId, ...data },
        });
        break;
      case "music":
        result = await prisma.musicConfig.upsert({
          where: { guildId },
          update: data,
          create: { guildId, ...data },
        });
        break;
      case "logging":
        result = await prisma.logConfig.upsert({
          where: { guildId },
          update: data,
          create: { guildId, ...data },
        });
        break;
      case "economy":
        result = await prisma.economyConfig.upsert({
          where: { guildId },
          update: data,
          create: { guildId, ...data },
        });
        break;
      case "welcome":
        result = await prisma.welcomeConfig.upsert({
          where: { guildId },
          update: data,
          create: { guildId, ...data },
        });
        break;
      default:
        return NextResponse.json({ error: "Unknown module" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("[API/config PATCH]", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
