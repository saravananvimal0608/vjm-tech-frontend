import { Navigate } from 'react-router-dom';
import parseJwt from '../common/getAdmin'
import isTokenExpired from '../common/TokenExpiry';

const AdminProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");
    const admin = token ? parseJwt(token) : null;

   if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        return <Navigate to="/" replace />;
    }

    if (!admin?.role) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};



export default AdminProtectedRoute