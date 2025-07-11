import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, PlusCircle, Edit3 } from "lucide-react";
import { UserContext } from './UserProvider';
export default function Home() {
  const { userInfo } = useContext(UserContext);
  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Your Stories with{" "}
            <span className="text-orange-500">BlogVerse</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create, discover, and share amazing stories. Join our community of
            writers and readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {
             (userInfo)?
               <Link to="/create">
                <button className="w-full sm:w-auto bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff]  hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg flex items-center justify-center">
                  Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>

              :

              <Link to="/signup">
                <button className="w-full sm:w-auto bg-gradient-to-r from-[#ff5ef7] to-[#02f5ff]  hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg flex items-center justify-center">
                  Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            }
            <Link to="/blog">
              <button className="w-full sm:w-auto border px-6 py-3 rounded-lg text-lg flex items-center justify-center">
                Read Blogs
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="hover:shadow-lg transition-shadow bg-white p-6 rounded-lg border">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Read Blogs</h2>
          <p className="text-gray-600 mb-4">
            Discover stories from writers around the world
          </p>
          <Link to="/blog">
            <button className="w-full hover:bg-blue-50 text-blue-600 py-2 rounded flex justify-center items-center border">
              Explore Blogs <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="hover:shadow-lg transition-shadow bg-white p-6 rounded-lg border">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <PlusCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Create Content</h2>
          <p className="text-gray-600 mb-4">Write and publish your stories</p>
          <Link to="/create">
            <button className="w-full hover:bg-green-50 text-green-600 py-2 rounded flex justify-center items-center border">
              Start Creating <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="hover:shadow-lg transition-shadow bg-white p-6 rounded-lg border">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <Edit3 className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Manage Blogs</h2>
          <p className="text-gray-600 mb-4">Edit and organize your content</p>
          <Link to="/my-blogs">
            <button className="w-full hover:bg-orange-50 text-orange-600 py-2 rounded flex justify-center items-center border">
              My Blogs <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
