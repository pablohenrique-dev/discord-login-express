import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { User } from "@prisma/client";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

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
        const {
          avatar,
          email,
          global_name,
          username,
          id: user_provider_id,
        } = profile;

        const registerUseCase = makeRegisterUseCase();

        const { user } = await registerUseCase.execute({
          avatar,
          email,
          global_name,
          username,
          user_provider_id,
        });

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
