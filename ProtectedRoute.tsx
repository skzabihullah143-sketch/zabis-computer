import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy-700" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
