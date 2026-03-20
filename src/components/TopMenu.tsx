"use client";

import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";

export default function TopMenu() {
  const { data: session, status } = useSession();

  return (
    <div className={styles.menucontainer}>
      {status === "authenticated" ? (
        <button
          type="button"
          className={styles.menuitem}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign-Out
        </button>
      ) : (
        <button
          type="button"
          className={styles.menuitem}
          onClick={() => signIn()}
        >
          Sign-In
        </button>
      )}

      <TopMenuItem title="Booking" pageRef="/booking" />

      <Image
        src={"/img/logo.png"}
        className={styles.logoimg}
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
      />
    </div>
  );
}


