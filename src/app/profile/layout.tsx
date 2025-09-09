import ProtectedRoute from "../components/ProtectedRoute";


export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <section className="min-h-screen">
      <main>{children}</main>
    </section>
    </ProtectedRoute>
    
  );
}
