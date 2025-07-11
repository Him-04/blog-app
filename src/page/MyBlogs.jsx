import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Edit3, Trash2, Plus } from "lucide-react";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  update,
  remove,
} from "firebase/database";
import { app } from "../FireBaseConfig";
import { UserContext } from "../UserProvider";
import Swal from "sweetalert2";

export default function MyBlogs() {
  const { userInfo } = useContext(UserContext);
  const [myBlogs, setMyBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // Show 3 initially

  const db = getDatabase(app);

  useEffect(() => {
    if (!userInfo) return;

    const blogsRef = ref(db, "blog/");
    const userBlogQuery = query(
      blogsRef,
      orderByChild("authorId"),
      equalTo(userInfo.uid)
    );

    onValue(userBlogQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const blogArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setMyBlogs(blogArray.reverse()); // Latest first
      } else {
        setMyBlogs([]);
      }
    });
  }, [userInfo]);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleUpdate = async (e, blogId) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      blogTitle: form.title.value,
      blogDescription: form.description.value,
      blogContent: form.content.value,
    };

    try {
      const blogRef = ref(db, `blog/${blogId}`);
      await update(blogRef, updatedData);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Blog updated successfully!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "text-sm p-3 rounded-lg shadow-md",
        },
      });

      setEditingId(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this blog permanently?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "text-sm p-4 rounded-lg shadow-md",
        },
      });

      if (result.isConfirmed) {
        const blogRef = ref(db, `blog/${id}`);
        await remove(blogRef);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Blog deleted permanently!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "text-sm p-3 rounded-lg shadow-md",
          },
        });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete blog!",
      });
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                My Blogs
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Manage and edit your content
              </p>
            </div>
            <Link to="/create" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex justify-center items-center px-4 py-2 bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff] text-white rounded hover:scale-105 transition">
                <Plus className="h-4 w-4 mr-2" />
                New Blog
              </button>
            </Link>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-6 mb-8">
          {myBlogs.slice(0, visibleCount).map((post) => (
            <div
              key={post.id}
              className="bg-white border p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {post.blogTitle}
              </h2>
              <p className="text-gray-600 mb-2">{post.blogDescription}</p>
              <div className="text-sm text-gray-500 flex items-center mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post.id)}
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-50 flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 text-sm border border-red-200 text-red-600 hover:bg-red-50 rounded flex items-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Editable Form */}
              {editingId === post.id && (
                <form
                  onSubmit={(e) => handleUpdate(e, post.id)}
                  className="mt-4 space-y-4 bg-gray-50 p-4 rounded border"
                >
                  <div>
                    <label htmlFor="title" className="block font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={post.blogTitle}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Blog Title"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block font-medium mb-1"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={post.blogDescription}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Blog Description"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="content" className="block font-medium mb-1">
                      Content
                    </label>
                    <textarea
                      name="content"
                      defaultValue={post.blogContent}
                      className="w-full border px-3 py-2 rounded min-h-[150px]"
                      placeholder="Blog Content"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < myBlogs.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff] hover:scale-105 transition"
            >
              Load More
            </button>
          </div>
        )}

        {/* All loaded message */}
        {visibleCount >= myBlogs.length && myBlogs.length > 0 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            All blogs loaded 🎉
          </p>
        )}
      </div>
    </div>
  );
}
