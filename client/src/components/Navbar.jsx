import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
 
   const {isLoggedIn} = useAuth();
   console.log('Auth state', isLoggedIn);
   

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Keep Notes </h1>
     

      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : ''}
    </div>
    </div>
  );
}

export default Navbar;