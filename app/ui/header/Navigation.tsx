'use client';

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import NavLink from "@/app/ui/header/NavLink";
import Link from "next/link";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileNavButtonClick = () => {
    setIsOpen(!isOpen);
  }

  const TopNav = ({ mode }: { mode?: "desktop" | "mobile" }) => {
    return (
      (
        <>
          <NavLink href="/exercises" mode={mode}>Exercises</NavLink>
          <NavLink href="/exercises/featured" mode={mode}>Featured Exercises</NavLink>
          <NavLink href="/exercises/create" mode={mode}>Create Exercise</NavLink>
          <NavLink href="/workouts" mode={mode}>Workouts</NavLink>
        </>
      )
    )
  }

  return (
    <nav className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">

            <button type="button" onClick={handleMobileNavButtonClick} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center w-10 h-10">
              <Link href={'/'}>
                <Image
                  src="/barbell-white.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  priority={true}
                  className="w-10 h-10"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <TopNav />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx("sm:hidden", { block: isOpen, hidden: !isOpen })} id="mobile-menu" >

        <div className="space-y-1 px-2 pb-3 pt-2">
          <TopNav mode="mobile" />
        </div>
      </div>
    </nav >
  )
}

export default Navigation;