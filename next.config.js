/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.discordapp.com",
      "media.discordapp.net",
      "avatars.githubusercontent.com",
    ],
  },
  env: {
    NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    NEXT_PUBLIC_MAIN_SERVER_INVITE: process.env.DISCORD_MAIN_SERVER_INVITE,
  },
};
module.exports = nextConfig;
