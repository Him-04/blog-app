import React from "react"
import { BookOpen } from "lucide-react"
import logo from '../assets/blogverse.png';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">

              <img src={logo} alt="Blogverse Logo" className="w-10 h-10 object-contain" />
            
            <span className="text-2xl font-bold text-gray-900">BlogVerse</span>
            
          </div>
          <p className="text-gray-600">© 2025 BlogVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
