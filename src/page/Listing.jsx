import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar, Edit3, Trash2, BookOpen, Plus } from "lucide-react"

export default function Listing() {
  const [editingPost, setEditingPost] = useState(null)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React 18",
      description: "Learn how to build modern web applications with the latest version of React.",
      date: "Dec 18, 2024",
      content: `React 18 brings exciting features...`,
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      description: "A detailed comparison of CSS Grid and Flexbox.",
      date: "Dec 15, 2024",
      content: `CSS Grid is two-dimensional...`,
    },
    {
      id: 3,
      title: "Building a Personal Brand",
      description: "Tips for developers to stand out in tech.",
      date: "Dec 10, 2024",
      content: `Why personal branding matters...`,
    },
  ])

  const handleEdit = (post) => {
    setEditingPost({ ...post })
  }

  const handleSave = () => {
    setPosts(posts.map((post) => (post.id === editingPost.id ? editingPost : post)))
    setEditingPost(null)
  }

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
  
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Blogs</h1>
              <p className="text-lg text-gray-600">Manage and edit your content</p>
            </div>
            <Link to="/create">
              <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                <Plus className="h-4 w-4 mr-2" />
                New Blog
              </button>
            </Link>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-6 mb-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <div className="text-sm text-gray-500 flex items-center mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
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

              {/* Edit Form */}
              {editingPost?.id === post.id && (
                <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded border">
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={editingPost.description}
                    onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full border px-3 py-2 rounded min-h-[150px]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPost(null)}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="px-6 py-3 border hover:bg-gray-100 rounded text-gray-700">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}
