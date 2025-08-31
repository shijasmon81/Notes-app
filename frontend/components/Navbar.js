import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Modal from "./Modal";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import { color } from "framer-motion";

export default function Navbar() {
  const dispatch = useDispatch();
  const { token, user_name } = useSelector((state) => state.auth);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    setShowLogoutMsg(true);
    setTimeout(() => setShowLogoutMsg(false), 2000);
  };

  return (
    <nav style={navStyle}>
      <h1 style={{ marginRight: "auto" }}>Notes App</h1>

      {!token && (
        <>
          <button style={buttonStyle} onClick={() => setShowSignIn(true)}>Sign In</button>
          <button style={buttonStyle} onClick={() => setShowSignUp(true)}>Sign Up</button>
        </>
      )}

      {token && (
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <div
            style={avatarStyle}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user_name?.[0]?.toUpperCase()}
          </div>
          <span style={{ margin: "0 10px", fontWeight: "bold" }}>{user_name}</span>

          {dropdownOpen && (
            <div style={dropdownStyle}>
              <button style={dropdownBtnStyle} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}

      {/* Logout message */}
      <Modal isOpen={showLogoutMsg} onClose={() => setShowLogoutMsg(false)}>
        <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
          You have logged out successfully!
        </p>
      </Modal>

      {/* Sign In Modal */}
      <Modal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
        <SignIn onClose={() => setShowSignIn(false)} />
      </Modal>

      {/* Sign Up Modal */}
      <Modal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
        <SignUp onClose={() => setShowSignUp(false)} />
      </Modal>
    </nav>
  );
}

// Styles
const navStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#3e7fe7ff",
  color: "white",
  gap: "10px",
};

const buttonStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "white",
  color: "#3e7fe7ff",
  cursor: "pointer",
  fontWeight: "bold",
};

const avatarStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  color: "#000000ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  cursor: "pointer",
};

const dropdownStyle = {
  position: "absolute",
  top: "40px",
  right: "0",
  backgroundColor: "white",
  color: "#3e7fe7ff",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
  zIndex: 100,
};

const dropdownBtnStyle = {
  padding: "8px 12px",
  width: "100%",
  border: "none",
  background: "transparent",
  color: "#3e7fe7ff",
  textAlign: "left",
  cursor: "pointer",
  fontWeight: "bold",
};
