import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Modal from "./Modal";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";

export default function Navbar() {
  const dispatch = useDispatch();
  const { token, user_name } = useSelector((state) => state.auth); // ✅ keep it consistent with slice

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
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
        <>
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>
            {user_name || "User"} 
          </span>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </>
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
  backgroundColor: "#4f46e5",
  color: "white",
  gap: "10px",
};

const buttonStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "white",
  color: "#4f46e5",
  cursor: "pointer",
  fontWeight: "bold",
};
