import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout} = useAuth0();


  return (
    <nav className=" p-4 mt-2 border-2 border-green-500 rounded-[20rem] w-[30rem] mx-auto">
      <div className="max-w-7xl mx-auto  justify-between items-center space-y-2">
        <div className="text-black font-bold text-2xl"><span className="font-mono text-green-500">VR</span> app</div>
        <div className="space-x-4 mb-10 ">
          <Link
            className=" hover:bg-green-100 hover:text-green-500 border border-transparent hover:border-green-500 px-3 py-2 rounded-md"
            to="/"
          >
            Home
          </Link>
          <Link
            className=" hover:bg-green-100 hover:text-green-500 border border-transparent hover:border-green-500 px-3 py-2 rounded-md"
            to="/book"
          >
            Book
          </Link>

          <Link
            className="  hover:bg-green-100 hover:text-green-500 border border-transparent hover:border-green-500 px-3 py-2 rounded-md"
            to="/view"
          >
            Reservations
          </Link>

          {isAuthenticated && (
            <Link
              className="text-white hover:bg-green-500 px-3 py-2 rounded-md"
              to="/profile"
            >
              Profile
            </Link>
          )}

          

          
        </div>
        <span className="">
            {!isAuthenticated ? (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-green-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-green-600"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            )}
          </span>
      </div>
    </nav>
  );
};

export default Navbar;
