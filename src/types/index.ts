export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  botPresent: boolean;
  memberCount?: number;
}

export interface BotEmbed {
  title?: string;
  description?: string;
  color?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  thumbnail?: string;
  image?: string;
  timestamp?: boolean;
}

export interface DashboardModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  category: "moderation" | "music" | "stats" | "logging" | "economy" | "utility";
}
