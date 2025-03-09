"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  mode?: "desktop" | "mobile";
};

const NavLink = ({
  href,
  children,
  mode = "desktop",
  ...props
}: NavLinkProps) => {
  const path = usePathname();

  const classes = clsx("rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap", {
    "block": mode === "mobile",
    "bg-gray-900 hover:bg-gray-950 text-white": path === href,
    "text-gray-300 hover:bg-gray-700 hover:text-white": path !== href,
  });

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
