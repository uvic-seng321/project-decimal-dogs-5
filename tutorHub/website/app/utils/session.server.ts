// import bcrypt from "bcryptjs";
import {
    createCookieSessionStorage,
    redirect,
} from "@remix-run/node";
// import { db } from "./db.server";
const sessionSecret = process.env.SESSION_SECRET || "secret";
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
}
const storage = createCookieSessionStorage({
    cookie: {
        name: "RJ_session",
        // normally you want this to be `secure: true`
        // but that doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
        httpOnly: true,
    },
});
export async function createUserSession(
    userId: number,
    redirectTo: string
) {
    const session = await storage.getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    });
}

function getUserSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    if (!userId) return null;
    return userId;
  }
  
  export async function getUser(request: Request) {
    const userId = await getUserId(request);
    if (!userId) {
      return null;
    }
    try {
    //   const user = await db.user.findUnique({
    //     where: { id: userId },
    //     select: { id: true, username: true },
    //   });
      const user = {username: "username", id: 1, password: "password"}
      return user;
    } catch {
      throw logout(request);
    }
  }

  export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
  ) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") {
      const searchParams = new URLSearchParams([
        ["redirectTo", redirectTo],
      ]);
      throw redirect(`/login?${searchParams}`);
    }
    return userId;
  }

type LoginForm = {
  username: string;
  password: string;
};

export async function register({
  username,
  password,
}: LoginForm) {
  const user = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: username, name:"hard coded name",  password: password}),
  }).then((res) => {
    if (res.status !== 200) return null;
    return res.json();
  });

  return user ? { id: user.id, username} : null;
}

export async function login({
  username,
  password,
}: LoginForm) {

  const user = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: username, password: password}),
  }).then((res) => {
    if (res.status != 200) return null;
    return res.json()
  });

  return user ? { id: user.id, username: user.username } : null;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}