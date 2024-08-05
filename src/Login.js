import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
    };

    axios
      .post("http://127.0.0.1:5000/login", userData)
      .then((response) => {
        console.log(response);
        const userId = response.data.user1;
        navigate("/home", { state: { id: userId } });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Invalid credentials");
      });
  };

  return (
    <div className="login-container">
      <h2>Please login to your account</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="or-divider">
        <span>OR</span>
      </div>
      <button className="register-button" onClick={() => navigate("/register")}>
        Register for new user
      </button>
    </div>
  );
};

export default Login;
