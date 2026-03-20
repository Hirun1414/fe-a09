const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://a08-venue-explorer-backend.vercel.app";

export default async function getUserProfile(token: string) {
  const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
}

