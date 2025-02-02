"use client";

import Image from "next/image";
import SidebarItem from "@/ui/sidebar/SidebarItem";
import { useLogout } from "@/hooks/useLogout";

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

  return (
    <div className="flex flex-col w-[250px] px-4 text-white py-10 sticky top-0 h-screen bg-primary">
      <div className="mb-8">
        <Image
          priority={true}
          className="max-w-40 mx-auto w-auto "
          src="/logoWhite.png"
          alt="logo"
          width={900}
          height={900}
        />
      </div>

      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          {pahts.map((item) => (
            <li key={item.name}>
              <SidebarItem text={item.name} icon={item.icon} path={item.path} />
            </li>
          ))}
        </ul>
      </nav>

      <div onClick={logout} className="mt-auto">
        <SidebarItem
          text="Cerrar sesión"
          icon="icon-[material-symbols--logout]"
        />
      </div>
    </div>
  );
};

export default Sidebar;
