import WidgetsCards from "@/components/dashboard/main/WidgetsCards";
import React from "react";
import MostSellChart from "@/components/dashboard/main/MostSellChart";
import LastAdded from "@/components/dashboard/main/LastAdded";

const Page = () => {
  return (
    <div>
      <WidgetsCards />
      <MostSellChart />
      <LastAdded/>  
    </div>
  );
};

export default Page;
