import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, allowedRoles }) {
    const { user, isLoading } = useAuth()

    // wait until silent refresh completes before making any decision
    // without this, a logged-in user would get redirected to /login
    // on every page refresh because user is null for a brief moment
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#040d06]">
                <div className="w-8 h-8 rounded-full border-2 border-[#00FF88]/20 border-t-[#00FF88] animate-spin" />
            </div>
        )
    }

    // not logged in — send to login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // logged in but role not allowed — send to home
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/home" replace />
    }

    // all good — render the page
    return element
}