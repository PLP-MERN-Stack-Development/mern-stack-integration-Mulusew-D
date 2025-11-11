import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);

  const navStyle = {
    background: "#ffffff",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    fontWeight: "600",
    border: "1px solid #ddd",
    color: "#333",
    transition: "0.2s ease",
  };

  const brandStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1d4ed8",
    textDecoration: "none",
  };

  const buttonStyle = {
    padding: "8px 14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  };

  const newPostStyle = {
    ...buttonStyle,
    background: "#2563eb",
    color: "#fff",
    border: "none",
  };

  const navLinks = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        
        {/* ✅ Logo */}
        <Link to="/" style={brandStyle}>
          My Blog
        </Link>

        <div style={navLinks}>

          {user ? (
            <>
              {/* ✅ New Post */}
              <Link to="/create" style={newPostStyle}>
                New Post
              </Link>

              {/* ✅ Logout */}
              <button onClick={logout} style={buttonStyle}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* ✅ Login */}
              <Link to="/login" style={linkStyle}>
                Login
              </Link>

              {/* ✅ Register */}
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}


