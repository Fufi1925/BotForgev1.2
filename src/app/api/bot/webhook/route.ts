import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("x-bot-secret");
  if (authHeader !== process.env.BOT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { action, guildId, guildName, guildIcon } = body;
  if (!guildId) return NextResponse.json({ error: "Missing guildId" }, { status: 400 });

  if (action === "join") {
    await prisma.guildConfig.upsert({
      where: { guildId },
      update: { botPresent: true, guildName, guildIcon },
      create: { guildId, guildName: guildName || "Unknown", guildIcon, botPresent: true },
    });
  } else if (action === "leave") {
    await prisma.guildConfig.updateMany({ where: { guildId }, data: { botPresent: false } });
  }

  return NextResponse.json({ success: true });
}
