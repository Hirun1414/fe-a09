const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://a08-venue-explorer-backend.vercel.app";

export default async function userLogIn(
  userEmail: string,
  userPassword: string
) {
  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });

  const data = await res.json();
  console.log("LOGIN RESPONSE:", data);

  return data;
}

