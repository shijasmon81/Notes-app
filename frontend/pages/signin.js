// /pages/signin.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

export default function SignIn({ onClose }) {
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = () => {
    dispatch(loginUser({ user_email: email, password }));
  };

  useEffect(() => {
    if (token) {
      setSuccessMessage("Login successful!");
      setEmail(""); setPassword("");
      if (onClose) setTimeout(onClose, 1000); // auto-close popup
    }
  }, [token, onClose]);

  return (
    <div>
      <h2>Sign In</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      &nbsp;
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}
