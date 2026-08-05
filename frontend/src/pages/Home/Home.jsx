/**
 * ==========================================================
 * FINVERSE AI
 * Home Page
 * ==========================================================
 */

import { Navigate } from "react-router-dom";

function Home() {

    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;

}

export default Home;