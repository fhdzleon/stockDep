"use client";
import Notifications from "./Notifications";
import ProfileNavbar from "./ProfileNavbar";
import { useUserStore } from "@/store/user.store";

const DashboardNavbar = () => {
  const { data } = useUserStore();
  return (
    <div className="flex justify-between z-10 sticky top-0 px-10 items-center py-4 h-14 md:h-20  bg-white w-full shadow-sm">
      <p className="text-2xl font-bold">
        {data?.nameCompany ?? "Nombre de la Empresa"}
      </p>

      <div className="flex items-center space-x-8">
        <Notifications />
        <ProfileNavbar />
      </div>
    </div>
  );
};

export default DashboardNavbar;
