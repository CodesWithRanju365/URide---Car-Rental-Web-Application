"use client";

import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

function NavBar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bookings", label: "Bookings" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link href="/">
          <Image
            src="/URide.png"
            alt="logo"
            width={100}
            height={100}
            priority
            className={styles.logo}
          />
        </Link>
        <nav className={styles.links}>
          <ul>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${
                    pathname === href ? styles.activeLink : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.rightSection}>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default NavBar;
