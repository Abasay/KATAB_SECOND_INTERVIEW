import DashboardComp from "@/components/Dashboard/DashboardComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page - Solid SaaS Boilerplate",
  description: "This is Login page for Startup Pro",
  // other metadata
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardComp children={children} />
    </>
  );
};

export default Dashboard;
