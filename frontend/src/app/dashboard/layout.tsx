import Sidebar from "@/components/dashboard/layout/Sidebar";
import { ReactNode } from "react";
import DashboardNavbar from "@/components/dashboard/layout/NavBar";
import { getQueryClient } from "@/lib/tanstack/queryClient";
import prefetchTanstackData from "@/lib/tanstack/prefetchers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  await prefetchTanstackData(queryClient);
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex w-full flex-col h-full">
        <DashboardNavbar />
        <div className="px-5">
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
