import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [checkAuth, setCheckAuth] = useState("login");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleModal = () => {
    setCheckAuth("login");
    setShowModal(!showModal);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="header-wrapper">
      <div
        className="header-title"
        onClick={() => window.location.replace("/")}
      >
        <h2>부르미</h2>
      </div>
      {user?.name ? (
        <div className="header-login" onClick={logout}>
          <h6>Logout</h6>
        </div>
      ) : (
        <div className="header-login" onClick={handleModal}>
          <FaUserCircle />
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-wrapper" ref={modalRef}>
            {checkAuth === "login" ? (
              <Login setCheckAuth={setCheckAuth} />
            ) : (
              <Signup setCheckAuth={setCheckAuth} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
