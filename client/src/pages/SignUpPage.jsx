import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import GenderCheckBox from './../components/GenderCheckBox';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [gender , setGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !name || !gender) {
            toast.error("Please fill in all fields");
            return;
        }

        console.log("SignUp");
        console.log("Username: ", username, "name: ",name, "Email: ", email, "Password: ", password,"gender:",gender);

        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, name:name, email: email, gender:gender, password: password }),
            });

            const data = await response.json();
            console.log(data);

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("SignUp successful");
                window.location.href = "/login";
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later");
        }
    };

	const handleGenderChange=(newGender)=>{
		if (newGender === gender) setGender("")
		else setGender(newGender);
	}

    return (
        <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="h-full p-6 w-full bg-green-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
                <h1 className="text-3xl text-center font-semibold text-white p-5">
                    SignUp
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form className="gap-2 flex flex-col">
                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            className="w-full text-white placeholder-shown:text-gray input input-bordered"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            className="w-full text-white placeholder-shown:text-gray input input-bordered"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            className="w-full text-white placeholder-shown:text-gray input input-bordered"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

					<GenderCheckBox onGenderChange = {handleGenderChange} selectedGender={gender} />

                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Password</span>
                        </label>
                        <input
                            type="text"
                            className="w-full text-white placeholder-shown:text-gray input input-bordered"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <a href="/login" className="text-sm text-white hover:underline hover:text-blue-500">
                        Already have an account?{" "}
                    </a>

                    <div>
                        <button onClick={handleSubmit} className="btn w-full btn-primary mt-2 hover:uppercase transition-transform duration-500">
                            SignUp
                        </button>
                    </div>
					
                </form>
            </div>
        </div>
    );
};

export default SignUp;
