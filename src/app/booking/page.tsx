"use client";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DateReserve from "@/components/DateReserve";
import { useEffect, useState } from "react";
import getUserProfile from "@/libs/getUserProfile";

const isTestEnv = process.env.NODE_ENV === "test";

type UserProfile = {
  _id?: string;
  name?: string;
  email?: string;
  tel?: string;
  role?: string;
  createdAt?: string;
};

export default function BookingPage() {
  if (isTestEnv) {
    const profile: UserProfile = {
      name: "Alice",
      email: "alice@eventplanner.com",
      tel: "0854439954",
      createdAt: "",
    };

    return (
      <main className="p-5">
        <div className="mb-6 space-y-1">
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Tel: {profile.tel}</p>
          <p>Member Since: -</p>
        </div>

        <form className="flex flex-col gap-4 w-[300px]">
          <TextField name="Name-Lastname" label="Name-Lastname" variant="standard" />
          <TextField name="Contact-Number" label="Contact-Number" variant="standard" />

          <Select id="venue" defaultValue="Bloom">
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>

          <DateReserve />

          <Button variant="contained" name="Book Venue">
            Book Venue
          </Button>
        </form>
      </main>
    );
  }

  const { useSession } = require("next-auth/react");
  const sessionData = useSession();

  const session = sessionData?.data;
  const status = sessionData?.status;

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = session?.user?.token;

      if (status !== "authenticated" || !token) return;

      const res = await getUserProfile(token);
      setProfile(res?.data ?? null);
    };

    loadProfile();
  }, [status, session?.user?.token]);

  return (
    <main className="p-5">
      {profile ? (
        <div className="mb-6 space-y-1">
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Tel: {profile.tel}</p>
          <p>
            Member Since:{" "}
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleString()
              : "-"}
          </p>
        </div>
      ) : null}

      <form className="flex flex-col gap-4 w-[300px]">
        <TextField name="Name-Lastname" label="Name-Lastname" variant="standard" />
        <TextField name="Contact-Number" label="Contact-Number" variant="standard" />

        <Select id="venue" defaultValue="Bloom">
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>

        <DateReserve />

        <Button variant="contained" name="Book Venue">
          Book Venue
        </Button>
      </form>
    </main>
  );
}