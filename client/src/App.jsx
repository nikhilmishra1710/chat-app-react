import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Chat from "./pages/ChatPage";

import "./App.css";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { authUser } = useAuthContext();
    console.log("authUser", authUser);

    return (
        <div className="flex justify-center item-middle">
            <Routes>
                <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
                <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <SignUp />} />
                <Route path="/" element={<Chat />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
