import React, { useState } from "react";
import "./styles.css";
import { AuthContext } from "../../contexts/auth"
import { useContext } from "react/cjs/react.development";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    login(email, password);
  }

  return (
    <div id="login">
      <h1 className="title">System Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
