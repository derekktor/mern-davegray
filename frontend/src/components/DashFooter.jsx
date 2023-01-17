import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHouseUser, FaUserAlt, FaToggleOn } from "react-icons/fa";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleGoHome() {
    navigate("/dash");
  }

  let goHomeButton;
  //   Display goHomeButton if not at home already
  if (pathname !== "/dash") {
    goHomeButton = (
      <button className="btn btn-outline-primary" onClick={handleGoHome}>
        <FaHouseUser />
      </button>
    );
  }

  return (
    <footer className="py-2 my-2">
        <ul className="nav justify-content-center">
            <li className="nav-item">
                Current user: <FaUserAlt />
            </li>
            <li className="nav-item">
                Status: <FaToggleOn />
            </li>
            <li>
                {goHomeButton}
            </li>
        </ul>
    </footer>
  );
};

export default DashFooter;
