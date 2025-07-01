import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../lib/configuration";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/shop/login`, {
        username,
        password,
      });

      const { token, shop } = response.data;

      // Store token in localStorage or cookie
      localStorage.setItem("token", token);
      localStorage.setItem("shop_id", shop?.id);
      localStorage.setItem("name", shop?.name);
      localStorage.setItem("unique_code", shop?.unique_code);

      // Redirect or update state
      console.log("User logged in:", shop);

      if (localStorage.getItem("redirectTo")) {
        navigate(localStorage.getItem("redirectTo"));
        localStorage.removeItem("redirectTo");
      } else {
        navigate("/");
      }
      setLoading(false);
      // window.location.href = "/dashboard";
    } catch (err) {
      setLoading(false);

      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-center">
          <img
            // src={"/images/logo/logo_new.jpeg"}
            src={"/images/logo/logo_1.jpg"}
            alt="logo"
            width={300}
            // height={100}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* <h2 className="text-xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2> */}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border border-[hsl(0,0%,89.8%)] rounded-md focus:outline-none focus:ring-1 focus:ring-[#7a1c35]"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-[hsl(0,0%,89.8%)] rounded-md focus:outline-none focus:ring-1 focus:ring-[#7a1c35]"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#E64E25] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="cursor-pointer flex items-center justify-center gap-2 bg-[#EE8821] w-full py-2 font-semibold text-white rounded-md cursor-pointer"
            disabled={loading}
          >
             {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Login</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          {/* <a href="#" className="text-[#7a1c35] hover:underline">
            Contact 
          </a> */}
        </p>
        <p
          className="text-sm text-center text-[#E64E25] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Skip Login
        </p>
      </div>
    </div>
  );
}
