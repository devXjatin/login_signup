import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import "./Login.css";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = user;
  };

  return (
    <div>
      <div className="container">
        <div className="form-container sign-in-container">
          <form method="POST" className="userLogin" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="userIcon">
              <span className="inputIcon">
                <FaUser />
              </span>
              <input
                className="loginInput"
                type="text"
                required
                placeholder="Email"
                autoComplete="off"
                name="email"
                id="email"
                value={user.email}
                onChange={handleUserInput}
              />
            </div>
            <div className="passwordIcon">
              <span className="inputIcon">
                <FaLock />
              </span>
              <input
                className="loginInput"
                type="Password"
                name="password"
                id="password"
                required
                value={user.password}
                placeholder="Password"
                onChange={handleUserInput}
              />
            </div>
            <button type="submit" className="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;