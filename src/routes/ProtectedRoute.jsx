import { useAuth } from "../context/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../ui/Loading";
function ProtectedRoute() {
  const { session, authLoading } = useAuth();

  if (authLoading) return <Loading />;
  if (!session) return <Navigate to="/signin" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
