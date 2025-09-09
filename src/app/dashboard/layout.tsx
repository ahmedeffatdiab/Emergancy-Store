import Sidebar from "../components/Dashboard/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 bg-muted p-6">
      <DashboardHeader/>
      <div className="flex-1  ">{children}</div>
      </div>
      
    </div>
    </ProtectedRoute>
    
  );
}
