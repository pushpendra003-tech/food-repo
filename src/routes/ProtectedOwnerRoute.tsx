import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedOwnerRoute({ children }: Props) {
  const authStore = useAuthStore();
  const token = localStorage.getItem("token");
  const role = authStore.user?.role;

  if (!token || !authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "owner") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

