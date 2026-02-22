import { useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login button clicked");
    navigate("/Dashboard");
  };

  const handleGoogleClick = () => {
    console.log("Google login clicked");
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col items-center m-10 ">
      <h2 className="flex flex-col items-center justify-center font-bold text-2xl mb-4">
        Welcome,
      </h2>
      <div className="flex gap-5 mb-4">
        <p className="mt-1">Email:</p>
        <input className="border border-gray-300 rounded-md p-2" type="text" />
      </div>
      <div className="flex gap-5" >
        <p>Password:</p>
        <input className="border border-gray-300 rounded-md p-2" type="password" />
      </div>
        <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded-md mt-5">
        Sign in
        </button>
        <div>
          <p className="m-8">or continue with</p> 
        </div>
    
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="flex gap-3 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md"
        >
          <FaGoogle className="mt-1"/>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
