import { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const ProtectedRoute = ({ role }) => {

const { isLoggedIn,user, loading } = useContext(AuthContext);

if (loading) {
  return <div>Loading...</div>;
}

if (!isLoggedIn) {
  return <Navigate to="/" replace />;
}

if(role && user.role !== role){
   return (
     <Navigate
       to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
       replace
     />
   );
}

return <Outlet />;
}

export default ProtectedRoute;