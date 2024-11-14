import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { User } from "@prisma/client";

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      callbackURL: env.DISCORD_REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userAlreadyExits = await prisma.user.findUnique({
          where: {
            user_provider_id: profile.id,
          },
        });

        if (userAlreadyExits) {
          return done(null, userAlreadyExits);
        }

        const {
          avatar,
          email,
          global_name,
          username,
          id: user_provider_id,
        } = profile;

        const avatarUrl = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${user_provider_id}/${avatar}.png`
          : null;

        const user = await prisma.user.create({
          data: {
            email,
            avatar: avatarUrl,
            user_provider_id,
            provider: "discord",
            name: global_name ?? username,
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
