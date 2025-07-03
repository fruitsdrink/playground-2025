import { cookies } from "next/headers";
import { prisma } from "./prisma";
// todo 验证
interface Session {
  id: string;
  userId: string;
  secretHash: Uint8Array;
  expiresAt: Date;
  createdAt: Date;
}

interface SessionWithToken extends Session {
  token: string;
}

function generateSecureRandomString(): string {
  // Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
  const alphabet = "abcdefghijklmnpqrstuvwxyz23456789";

  // Generate 24 bytes = 192 bits of entropy.
  // We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);

  let id = "";
  for (let i = 0; i < bytes.length; i++) {
    // >> 3 s"removes" the right-most 3 bits of the byte
    id += alphabet[bytes[i] >> 3];
  }
  return id;
}

async function hashSecret(secret: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return new Uint8Array(secretHashBuffer);
}

const sessionExpiresInSeconds = 60 * 60 * 24; // 1 day

async function createSession(opts: {
  userId: string;
}): Promise<SessionWithToken> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + sessionExpiresInSeconds * 1000);

  const id = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = await hashSecret(secret);

  const token = id + "." + secret;

  const session: SessionWithToken = {
    id,
    userId: opts.userId,
    secretHash,
    expiresAt,
    createdAt: now,
    token,
  };

  await prisma.session.create({
    data: {
      userId: opts.userId,
      id: session.id,
      secretHash: session.secretHash,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
    },
  });

  return session;
}

async function deleteSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
}

async function getSession(sessionId: string): Promise<Session | null> {
  const now = new Date();

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });
  if (!result) {
    return null;
  }
  const session: Session = {
    id: result.id,
    secretHash: result.secretHash,
    createdAt: result.createdAt,
    userId: result.userId,
    expiresAt: result.expiresAt,
  };

  // Check expiration
  if (
    now.getTime() - session.createdAt.getTime() >=
    sessionExpiresInSeconds * 1000
  ) {
    await deleteSession(sessionId);
    return null;
  }

  return session;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  let c = 0;
  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}

async function validateSessionToken(token: string): Promise<Session | null> {
  const tokenParts = token.split(".");
  if (tokenParts.length != 2) {
    return null;
  }
  const sessionId = tokenParts[0];
  const sessionSecret = tokenParts[1];

  const session = await getSession(sessionId);
  if (!session) {
    return null;
  }

  const tokenSecretHash = await hashSecret(sessionSecret);
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
  if (!validSecret) {
    return null;
  }

  return session;
}

const COOKIE_NAME = "Set-Cookie";
async function setCookieBySession(session: SessionWithToken) {
  const env = process.env.NODE_ENV;
  const cookieStore = await cookies();
  if (env === "production") {
    cookieStore.set(
      COOKIE_NAME,
      `session=${
        session.id
      }; HttpOnly; SameSite=Lax; Expires=${session.expiresAt.toUTCString()}; path=/;Secure;`
    );
  } else {
    cookieStore.set(
      COOKIE_NAME,
      `session=${
        session.id
      }; HttpOnly; SameSite=Lax; Expires=${session.expiresAt.toUTCString()}; path=/`
    );
  }
}

async function deleteCookie() {
  const env = process.env.NODE_ENV;
  const cookieStore = await cookies();
  if (env === "production") {
    cookieStore.set(
      COOKIE_NAME,
      "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;"
    );
  } else {
    cookieStore.set(
      COOKIE_NAME,
      "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/"
    );
  }
}

async function setCookie(opts: { userId: string }) {
  const session = await createSession(opts);
  await setCookieBySession(session);
}

export const lucia = {
  createSession,
  validateSessionToken,
  setCookie,
  setCookieBySession,
  deleteCookie,
};
