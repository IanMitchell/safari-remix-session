import { createMemorySessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createMemorySessionStorage({
    cookie: {
      name: "challenge",
      path: "/",
      httpOnly: true,
      maxAge: 60,
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };
