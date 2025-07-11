import React, { useState , useContext , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../FireBaseConfig";
import Swal from "sweetalert2";
import { UserContext } from "../UserProvider";
export default function Create() {
  const db = getDatabase(app);
  let { userInfo, setUserInfo } = useContext(UserContext);
  let navigate = useNavigate();
  let SaveBlog = (event) => {
    event.preventDefault();
    let blogTitle = event.target.title.value;
    let blogDescription = event.target.description.value;
    let blogContent = event.target.content.value;
    let currDate = new Date() ;
    let obj = {
      blogTitle: blogTitle,
      blogDescription: blogDescription,
      blogContent: blogContent,
      authorName : userInfo.displayName,
      authorId : userInfo.uid,
      date : `${currDate.getDate()}-${currDate.getMonth() + 1}-${currDate.getFullYear()} ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`
    };

    let userId = Date.now();
    set(ref(db, "blog/" + userId), obj);

   Swal.fire({
  toast: true,
  position: "top-end",
  icon: "success",
  title: "Blog saved successfully!",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  customClass: {
    popup: "text-sm p-3 rounded-lg shadow-md",
  },
});


    setTimeout(() => {
      console.log(obj)
      navigate('/blog')
      
    }, 1500);
    event.target.reset();

  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create New Blog
          </h1>
          <p className="text-lg text-gray-600">
            Share your ideas and stories with the community
          </p>
        </div>

        <form onSubmit={SaveBlog}>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your blog title..."
                name="title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <input
                id="description"
                type="text"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of your blog..."
                name="description"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block font-medium mb-1">
                Content
              </label>
              <textarea
                id="content"
                className="w-full min-h-[300px] border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog content here..."
                name="content"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff]  text-white rounded hover:bg-blue-700 transition"
              >
                Publish Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
