"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ session }: { session?: Session | null }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const leftLinks = [{ name: "Kezdőlap", href: "/" }];
  const rightLinks = [
    { name: "Tippek", href: "/tips" },
    { name: "Előfizetés", href: "/subscription" },
    { name: "Útmutató", href: "/tutorial" },
    { name: "Belépés", href: "/sign-up" },
  ];

  const renderLink = (name: string, href: string, extraProps = {}) => {
    if (name === "Belépés" && session && session.user) {
      return (
        <Link
          href="/my-profile"
          {...extraProps}
          className="rounded p-1 text-black align-middle flex flex-col items-center gap-3 mt-2"
        >
          <Avatar>
            <AvatarFallback>
              {getInitials(session.user.name || "User")}
            </AvatarFallback>
          </Avatar>
          <span className="md:hidden text-white">{session.user.name}</span>
        </Link>
      );
    }

    return (
      <Link href={href} {...extraProps}>
        {name}
      </Link>
    );
  };

  return (
    <header className="relative z-[9999] md:z-[0]">
      <div className="flex items-center justify-between px-6 py-3 shadow-lg bg-gradient-to-r from-black/50 to-black/100">

        {/* Bal oldal */}
        <div className="flex-1 text-left hidden md:flex">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "header-button text-white",
                pathname === link.href && "border-b-2 border-yellow-500",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Közép brand */}
        <div className="flex-1 text-center">
          <Link href="/">
            <div className="flex items-center justify-center gap-3">

              <Image
                src="/images/kasza.png"
                alt="Kaszadella kasza"
                width={50}
                height={50}
              />

              {/* ✅ Javított brand – NINCS több button */}
              <div className="z-1 text-3xl font-bold text-white">
                Kaszadella
              </div>

              <motion.div className="flex">
                <Image
                  src="/images/kasza.png"
                  alt="Kaszadella kasza"
                  width={50}
                  height={50}
                  style={{ transform: "scaleX(-1)" }}
                />
              </motion.div>
            </div>
          </Link>
        </div>

        {/* Jobb desktop linkek */}
        <ul className="hidden md:flex gap-6 flex-1 justify-end">
          {rightLinks.map(({ name, href }) => (
            <li key={href}>
              {renderLink(name, href, {
                className: cn(
                  "header-button text-white",
                  pathname === href ? "border-b-2 border-yellow-500" : "",
                ),
              })}
            </li>
          ))}
        </ul>

        {/* Mobil hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-3 focus:outline-none"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-full bg-black/90 backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col h-full">

              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-3 focus:outline-none"
                >
                  <XMarkIcon className="h-6 w-6 text-yellow-500" />
                </button>
              </div>

              <ul className="flex flex-col justify-center items-center p-4 gap-6">
                {[...leftLinks, ...rightLinks].map(({ name, href }) => (
                  <li key={href} onClick={() => setMenuOpen(false)}>
                    {renderLink(name, href, {
                      className: "header-button text-white text-3xl",
                    })}
                  </li>
                ))}
              </ul>

            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
