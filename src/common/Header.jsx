import React, { useContext, useState  } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/blogverse.png";
import { UserContext } from "../UserProvider";
import Swal from 'sweetalert2';
export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let navigate = useNavigate()
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  const handleLogout = ()=>{
    setUserInfo(null);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Logout successful! Redirecting to home...",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "text-sm p-5 rounded-lg shadow-md",
        },
    });

    setTimeout(() => {
      navigate('/')
    }, 2000);

  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Blogverse Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-gray-900">BlogVerse</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-4 ml-10">
            <Link
              to="/"
              className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm"
            >
              Blogs
            </Link>
            <Link
              to="/create"
              className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm"
            >
              Create
            </Link>
            <Link
              to="/my-blogs"
              className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm"
            >
              My Blogs
            </Link>
          </div>

          {/* Username + Login + Signup - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {(userInfo !== null) ? 
              <>
                <span className="text-sm text-gray-700 font-medium">
                  Hi, {userInfo.displayName}
                </span>
                <Link>
                  <button onClick = {handleLogout} className="text-sm px-4 py-2 rounded bg-orange-100 text-orange-700 hover:bg-orange-50">
                    Logout
                  </button>
                </Link>
              </>
               : 
              <Link to="/login">
                <button className="text-sm px-4 py-2 rounded bg-orange-100 text-orange-700 hover:bg-orange-50">
                  Login
                </button>
              </Link>
            }
          </div>

          {/* Hamburger menu icon - Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 mt-2 pb-4 border-t pt-4">
            {/* Nav Links */}
            <Link
              to="/"
              className="px-3 py-2 text-sm text-gray-900 hover:text-orange-600"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="px-3 py-2 text-sm text-gray-600 hover:text-orange-600"
            >
              Blogs
            </Link>
            <Link
              to="/create"
              className="px-3 py-2 text-sm text-gray-600 hover:text-orange-600"
            >
              Create
            </Link>
            <Link
              to="/my-blogs"
              className="px-3 py-2 text-sm text-gray-600 hover:text-orange-600"
            >
              My Blogs
            </Link>

            {/* Username */}
             {(userInfo !== null) ? 
              <>
                <span className="px-3 pt-2 text-sm text-gray-700 font-medium">
                  Hi, {userInfo.displayName}
                </span>
                <Link className="px-3">
                  <button onClick = {handleLogout} className="w-full text-sm px-4 py-2 rounded bg-orange-100 text-orange-700 hover:bg-orange-50">
                    Logout
                  </button>
                </Link>
              </>
               : 
              <Link to="/login" className="px-3">
                <button className="w-full text-sm px-4 py-2 rounded bg-orange-100 text-orange-700 hover:bg-orange-50" >
                  Login
                </button>
              </Link>
            }

          </div>
        )}
      </div>
    </nav>
  );
}
