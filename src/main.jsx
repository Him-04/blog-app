import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './common/Header.jsx'
import Home from './Home.jsx'
import Login from './page/Login.jsx'
import SignUp from './page/SignUp.jsx'
import Blog from './page/Blog.jsx'
import Create from './page/Create.jsx'
import MyBlogs from './page/MyBlogs.jsx'
import RouteLayout from './RouteLayout.jsx'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import UserProvider from './UserProvider.jsx'
import Auth from './Auth.jsx'

let routes = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/create",
        element: <Auth />,
        children:[
          {
            path: '',
            element: <Create/>
          }
        ]
      },
      {
        path: "/my-blogs",
        element: <Auth/>,
        children: [
          {
            path : '',
            element: <MyBlogs/>
          }
        ]
      }

    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
])
createRoot(document.getElementById('root')).render(
  <>
    {/* <MainContext>
     
    </MainContext> */}
     <UserProvider>
      <RouterProvider router={routes} />
     </UserProvider>
  </>
)
