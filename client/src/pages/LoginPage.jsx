import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        console.log("Login");
        console.log("Username: ", username, "Password: ", password);

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await response.json();
            console.log(data);

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Login successful");
                localStorage.setItem("user-token", JSON.stringify(data));
                window.location.href = "/home";
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later");
        }
    };

    return (
        <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="h-full p-6 w-full bg-green-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
                <h1 className="text-3xl text-center font-semibold text-white p-5">
                    Login
                    <span className="text-blue-500">  ChatApp</span>
                </h1>
                <form className="gap-2 flex flex-col">
                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Username</span>
                        </label>
                        <input type="text" className="w-full text-white placeholder-shown:text-gray input input-bordered" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Password</span>
                        </label>
                        <input type="text" className="w-full text-white placeholder-shown:text-gray input input-bordered" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <a href="/signup" className="text-sm text-white hover:underline hover:text-blue-500">Don{'\''}t have an account? </a>
                    <div>
                        <button onClick={handleSubmit} className="btn w-full btn-primary mt-2 hover:uppercase transition-transform duration-500">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
