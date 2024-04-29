import DashboardComp from "@/components/Dashboard/DashboardComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Page | User Dashboard",
  description:
    "This is the Dashboard Page for Users to track their activities.",
  // other metadata
};

const Dashboard = () => {
  return (
    <>
      <DashboardComp />
    </>
  );
};

export default Dashboard;
