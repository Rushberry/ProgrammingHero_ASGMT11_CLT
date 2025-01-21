import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const AccessProvider = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname;
    if (loader) {
        return <>
            <div className="fixed inset-0 bg-black  flex items-center justify-center z-50">
                <img
                    src="/assets/favicon.png" 
                    alt="Loading..."
                    className="w-36 h-36 border border-white rounded-3xl animate-ping"
                />
            </div>
        </>
    }
    if (user) {
        return children;
    }
    return (
        <div>
            <Navigate state={path} to="/login"></Navigate>
        </div>
    );
};

export default AccessProvider;