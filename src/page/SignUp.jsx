import React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen } from "lucide-react"
import logo from '../assets/blogverse.png';
import { getAuth,  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from '../FireBaseConfig';
import { useNavigate } from "react-router-dom"; 
import Swal from 'sweetalert2';

export default function Signup() {
    const auth = getAuth(app);
    const navigate = useNavigate();

  let submitDetails = async (event)=>{
    event.preventDefault();
    let userEmail = event.target.email.value ;
    let userName = event.target.firstname.value + ' ' + event.target.lastname.value ;
    let userPassword = event.target.password.value ;

    try {
      const userCredential =  await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      const user = userCredential.user ;

      await updateProfile(user,{displayName:userName}) ;

    Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Signup successful! Redirecting to login...",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: "text-sm p-5 rounded-lg shadow-md",
    },
    })

    setTimeout(() => {
      navigate('/login')
    }, 2000);
  
  }
   catch (error) {
    console.error("Error creating user:", error.message);
  }
    
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-orange-600">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Signup Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-8 space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                <img src={logo} alt="Blogverse Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Join BlogVerse</h2>
            <p className="text-gray-600">Create your account and start writing</p>
          </div>

          <form onSubmit = {submitDetails}  className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  required
                  name = "firstname"
                  placeholder="John"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name = "lastname"
                  required
                  placeholder="Doe"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name= "email"
                required
                placeholder="john@example.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                name= "password"
                placeholder="Create a password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff]  text-white font-semibold rounded-md transition duration-150"
            >
              Create Account
            </button>
          </form>


          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
