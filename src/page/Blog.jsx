import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../FireBaseConfig";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const db = getDatabase(app);

  useEffect(() => {
    const blogRef = ref(db, "blog/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const blogList = [];
      for (let key in data) {
        blogList.push({ ...data[key], id: key });
      }
      setBlogs(blogList.reverse()); // latest first
    });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blogs</h1>
        <p className="text-lg text-gray-600">
          Discover stories from writers around the world
        </p>

        {/* Blog Cards */}
        <div className="space-y-8 mt-10">
          {blogs.slice(0, visibleCount).map((post) => (
            <div
              key={post.id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                {post.blogTitle}
              </h2>
              <p className="text-gray-600 mb-4">{post.blogDescription}</p>
              <div className="flex text-sm text-gray-500 space-x-6 mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.authorName|| "Anonymous"}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(post)}
                className="bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff] text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition"
              >
                Read Full Article
              </button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={visibleCount >= blogs.length}
            className={`px-6 py-3 rounded-md text-white font-bold transition ${
              visibleCount >= blogs.length
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:scale-105"
            }`}
            style={{
              backgroundImage:
                visibleCount >= blogs.length
                  ? "none"
                  : "radial-gradient(circle farthest-corner at 10% 20%, #ff5ef7 17.8%, #02f5ff 100.2%)",
            }}
          >
            {visibleCount >= blogs.length ? "No More Blogs" : "Load More Articles"}
          </button>
        </div>

        {/* Blog Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="bg-white max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-lg p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                onClick={() => setSelectedPost(null)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-2 capitalize">
                {selectedPost.blogTitle}
              </h2>
              <div className="text-sm text-gray-500 mb-4 flex space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {selectedPost.authorName || "Anonymous"}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedPost.date}
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                {selectedPost.blogContent?.split("\n").map((para, i) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-bold mt-6 mb-3">
                        {para.replace("## ", "")}
                      </h2>
                    );
                  } else if (para.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-lg font-semibold mt-4 mb-2">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  } else {
                    return <p key={i} className="mb-3">{para}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
