import DashboardLayout from "@/components/Dashboard/Layout";
import RoleBasedDashboard from "@/components/Dashboard/RoleBasedDashboard";

export default function Dashboard() {
  return(
    <DashboardLayout>
      <RoleBasedDashboard />
    </DashboardLayout>
  );
}