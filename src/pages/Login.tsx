import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    setError("");
    alert("Login successful (simulated)");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
