import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    console.log("Navbar user:", user);


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="flex flex-row justify-between items-center px-20 h-16">
        <div>
          <h2 className="text-2xl font-bold">Recruent</h2>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>
              {user && !loading ? (
                <div>
                  <p>Welcome, {user.name}</p>
                  <button className="border" onClick={logout}>Logout</button>
                </div>
              ) : ( 
                <NavLink to="/Login">Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
