import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login button clicked");
    navigate("/Dashboard");
  };

  const handleGoogleClick = () => {
    console.log("Google login clicked");
    window.location.href = "http://localhost:3000/auth/google";
    // OR hardcoded for now:
  };

  return (
    <div className="flex flex-col items-center m-10 border rounded-md">
      <h2 className="flex flex-col items-center justify-center font-bold text-2xl">
        Welcome back
      </h2>
      {/* <p>Email</p>
        <input className="border border-gray-300 rounded-md p-2" type="text" />
        <p>Password</p>
        <input className="border border-gray-300 rounded-md p-2" type="password" />
        <p>or continue with</p> */}
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Sign in
      </button>
      <div className="flex gap-4 m-4">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md"
        >
          Google
        </button>
        <button className="px-4 py-2 bg-blue-800 text-white rounded-md">
          Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
