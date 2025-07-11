import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import logo from "../assets/blogverse.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../FireBaseConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserProvider";
import Swal from 'sweetalert2';



export default function Login() {
  let { userInfo, setUserInfo } = useContext(UserContext);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const emailLogin = async (event) => {
    event.preventDefault();
    let userEmail = event.target.email.value;
    let userPassword = event.target.password.value;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      const userObj = {
        displayName: user.displayName || "Anonymous",
        email: user.email,
        uid: user.uid,
        provider: "email",
      };

      setUserInfo(userObj);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login successful! Redirecting to home...",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "text-sm p-5 rounded-lg shadow-md",
        },
      });
      setTimeout(() => {
         navigate("/");
      }, 2000);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };


  
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        const obj = {
        displayName: user.displayName || "Anonymous",
        email: user.email,
        uid: user.uid,
        provider: "google",
      };
        setUserInfo(obj);
        console.log(user)
        navigate("/");
      })
      .catch((error) => {
        console.error("Login Error: ", error);
      });
  };


  useEffect(()=>{
    console.log(userInfo)
  },[userInfo])
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-8 space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                <img
                  src={logo}
                  alt="Blogverse Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your BlogVerse account</p>
          </div>

          <form className="space-y-4" onSubmit={emailLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff]    text-white font-semibold rounded-md transition duration-150"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign-In */}
          <button
            onClick= {googleLogin}
            type="button"
            className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md bg-white text-sm hover:bg-gray-50"
          >
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-600 hover:text-orange-500 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
