// /pages/signup.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";

export default function SignUp({ onClose }) {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) return; 
    dispatch(signupUser({ user_name: name, user_email: email, password }));
  };

  useEffect(() => {
    if (user) {
      setSuccessMessage("Signup successful!");
      setName(""); 
      setEmail(""); 
      setPassword("");

      // Auto-clear message after 3 sec
      const timer = setTimeout(() => setSuccessMessage(""), 3000);

      // Auto-close popup/modal if passed
      if (onClose) setTimeout(onClose, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, onClose]);

  return (
    <div>
      <h2>Sign Up</h2>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </div>
  );
}
