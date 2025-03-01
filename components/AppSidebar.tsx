"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import { FaMagic, FaBook, FaEye, FaUsers, FaUser, FaCog, FaArrowLeft, FaGripHorizontal, FaPenNib } from "react-icons/fa";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SiDreamstime } from "react-icons/si";

interface AppSidebarProps {
  dashboard: React.ReactNode;
}

export function AppSidebar({ dashboard} : AppSidebarProps) {
  const links = [    
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <FaGripHorizontal className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },
    {
      label: "Journal",
      href: "/journal",
      icon: (
        <FaBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "New Dream",
      href: "/new-dream",
      icon: (
        <FaPenNib className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },
    {
      label: "Explore",
      href: "/explore",
      icon: (
        <FaEye className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },

    /*
    {
      label: "Insights",
      href: "/insights",
      icon: (
        <FaEye className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },    
    {
      label: "Dreamscapes",
      href: "/dreamscapes",
      icon: (
        <FaMagic className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Explore",
      href: "/explore",
      icon: (
        <FaUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    */
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <FaUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    /*
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <FaCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    */
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <FaArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "min-h-screen"        
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden fixed">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="mt-10 md:mt-0 w-full">
        {dashboard}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >      
      <div className="h-5 w-5 text-black dark:text-white flex-shrink-0">
        <SiDreamstime className="h-full w-full" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre pl-1"
      >
        DreamCapture
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-5 text-black dark:text-white flex-shrink-0">
        <SiDreamstime className="w-full h-full" />
      </div>
    </Link>
  );
};