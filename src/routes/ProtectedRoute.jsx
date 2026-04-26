import { useAuth } from "../context/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
  const { session } = useAuth();

  if (!session) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
