import { useGetUser } from "../../hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const user = useGetUser();

  if (!user) return <Navigate to="/signin" />;

  return children;
};

export default ProtectedRoute;
