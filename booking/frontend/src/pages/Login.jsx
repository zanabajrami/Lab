import React, { useState } from "react";

function Login({ onSwitchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
            alert("Please enter a valid email ending with @gmail.com or @hotmail.com");
            return;
        }

        if (password.length < 8) {
            alert("Password must have at least 8 characters");
            return;
        }

        alert(`Login with: ${email}`);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="showPassword"
                                className="mr-2"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPassword" className="text-sm text-gray-600">
                                Show Password
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-gray-600 text-sm text-center">
                    Don't have an account?{" "}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-red-600 hover:underline"
                    >
                        Register
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Login;
