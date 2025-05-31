import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = ({user, handleLogout, handleActiveSignIn, handleActiveSignUP, handleActivebusiness, activeBusi, activeSignIn, activeSignUp,activeHome}) =>{
    
    return(
        <div className="flex justify-start flex-row-reverse">
          <div className="flex flex-row-reverse justify-start gap-4 w-full sm:w-1/2 p-4 mt-5 rounded-md">
            {user ? (
              <button
                className="p-3 flex justify-center items-center px-4 sm:text-2xl hover:text-white text-black font-bold hover:bg-blue-400 rounded-md"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={handleActiveSignIn}
                className={
                activeSignIn
                  ? "p-3 flex justify-center items-center px-4 sm:text-2xl text-white font-bold bg-blue-400 rounded-md"
                  : "p-3 flex justify-center items-center px-4 sm:text-2xl hover:text-white text-black font-bold hover:bg-blue-400 rounded-md"
              }
              >
                Log in
              </Link>
            )}
            {user ? (
              <></>
            ) : (
              <Link
                to="/signup"
                onClick={handleActiveSignUP}
                className={
                activeSignUp
                  ? "p-3 flex justify-center items-center px-4 sm:text-2xl text-white font-bold bg-blue-400 rounded-md"
                  : "p-3 flex justify-center items-center px-4 sm:text-2xl hover:text-white text-black font-bold hover:bg-blue-400 rounded-md"
              }
              >
                sign up
              </Link>
            )}
            <Link
              to="/kyc"
              onClick={handleActivebusiness}
              className={
                activeBusi
                  ? "p-3 flex justify-center items-center px-4 sm:text-2xl text-white font-bold bg-blue-400 rounded-md"
                  : "p-3 flex justify-center items-center px-4 sm:text-2xl hover:text-white text-black font-bold hover:bg-blue-400 rounded-md"
              }
            >
              Verify
            </Link>
            <Link                 
              to="/"
              onClick={handleActivebusiness}
              className={
                activeHome
                  ? "p-3 flex justify-center items-center px-4 sm:text-2xl text-white font-bold bg-blue-400 rounded-md"
                  : "p-3 flex justify-center items-center px-4 sm:text-2xl hover:text-white text-black font-bold hover:bg-blue-400 rounded-md"
              }
            >   
               Home   
            </Link>
          </div>
        </div>
    )
}

export default Navbar;
