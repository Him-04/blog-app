import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";
import Swal from "sweetalert2";

export default function Auth() {
  let { userInfo, setUserInfo } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (userInfo == null) {
      navigate("/");
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to continue accessing this page.",
        confirmButtonColor: "#ff5ef7",
        confirmButtonText: "Login Now",
        backdrop: `
    rgba(0,0,0,0.5)
    left top
    no-repeat
  `,
        customClass: {
          popup: "rounded-xl shadow-lg",
          title: "text-lg font-semibold",
          confirmButton: "px-4 py-2",
        },
      });
    }
  });
  return (
    <div>
      <Outlet />
    </div>
  );
}
