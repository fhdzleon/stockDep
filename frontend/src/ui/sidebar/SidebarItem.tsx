"use client";
import type React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface SidebarItemProps {
  text: string;
  icon: string;
  path?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, icon, path }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === path;
  const sharedClass = clsx("relative transition-colors duration-300 ", {
    "text-primary": isActive,
    "text-white": !isActive
  });
  const iconClass = clsx(sharedClass, icon, "text-2xl");
  const textClass = clsx(sharedClass, "text-sm font-medium hidden lg:block");

  const handleRouter = () => {
    if (path) router.push(path)
  };

  return (
    <button
      onClick={handleRouter}
      className="relative flex w-full items-center gap-3 rounded-md p-3"
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="inset-0 absolute rounded bg-white"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
      <span className={iconClass} />
      <span className={textClass}>{text}</span>
    </button>
  );
};

export default SidebarItem;
