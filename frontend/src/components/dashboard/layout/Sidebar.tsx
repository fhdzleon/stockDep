"use client";

import Image from "next/image";
import SidebarItem from "@/ui/sidebar/SidebarItem";
import { useLogout } from "@/hooks/useLogout";
import useScreen from "@/hooks/useScreen";
import clsx from "clsx";

const Sidebar = () => {
  const { logout } = useLogout();

  const pahts = [
    {
      name: "Inicio",
      path: "/dashboard",
      icon: "icon-[lineicons--home]",
    },
    {
      name: "Productos",
      path: "/dashboard/products",
      icon: "icon-[lsicon--goods-outline]",
    },
    {
      name: "Registro de E/S",
      path: "/dashboard/movements",
      icon: "icon-[tabler--arrows-diff]",
    },
    {
      name: "Administración",
      path: "/dashboard/admin",
      icon: "icon-[clarity--administrator-line]",
    },
  ];

  const { screen, isSm, isMd, isLg, isXl, is2Xl } = useScreen();
  const sideClass = clsx("bg-primary z-40", {
    "h-14 p-1 justify-center items-center w-full flex fixed bottom-0 z-10":
      isSm || screen === undefined,
    "flex flex-col w-20 px-4 text-white py-10 h-screen sty top-0 sticky": isMd,
    "flex flex-col w-[250px] px-4 text-white py-10 h-screen top-0 sticky":
      isLg || isXl || is2Xl,
  });

  const ulClass = clsx("relative", {
    "grid grid-cols-5": isSm || screen === undefined,
    "space-y-2": isLg || isMd || isXl || is2Xl,
  });

  return (
    <div className={sideClass}>
      {!isSm && screen !== undefined && !isMd && (
        <div className="mb-8 px-4">
          <Image
            src="/logoWhite.png"
            alt="logo"
            width={160}
            height={40}
            className="mx-auto"
          />
        </div>
      )}
      <ul className={ulClass}>
        {pahts.map((item) => (
          <SidebarItem
            key={item.name}
            text={item.name}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </ul>
      <div onClick={logout} className="md:mt-auto hidden md:block ">
        <SidebarItem
          text="Cerrar sesión"
          icon="icon-[material-symbols--logout]"
        />
      </div>
    </div>
  );
};

export default Sidebar;
