# 🖥️ BotForge Dashboard

Next.js 14 (App Router) Web-Dashboard für den BotForge Discord Bot.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fuelle die .env.local mit deinen Werten

# Datenbank setup (PostgreSQL)
npm run db:generate
npm run db:push

npm run dev  # http://localhost:3000
```

## Benutzerfluss

1. **Landing Page** (`/`) → Discord OAuth2 Login
2. **Stamm-Server-Check** → Automatisch nach Login
3. **Join-Server-Seite** (`/join-server`) → Wenn nicht Mitglied
4. **Server-Auswahl** (`/select-server`) → Admin-Server anzeigen
5. **Dashboard** (`/dashboard/[guildId]`) → Bot konfigurieren

## API Routen

| Route | Methode | Funktion |
|-------|---------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth Handlers |
| `/api/guilds` | GET | Admin-Server + Bot-Status |
| `/api/guilds/[id]/config` | GET/PATCH | Guild-Konfiguration |
| `/api/guilds/[id]/stats` | GET | Statistik-Daten |
| `/api/bot/webhook` | POST | Bot-Sync (Bot → Dashboard) |

## Umgebungsvariablen

Siehe `.env.example` für alle benötigten Variablen.

**Wichtig:** Setze `DISCORD_MAIN_SERVER_ID` auf die ID deines BotForge-Stamm-Servers!
