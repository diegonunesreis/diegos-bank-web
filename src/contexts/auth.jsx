import React, { useState, useEffect, createContext } from "react";
import { api, createSession } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = new createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = localStorage.getItem('client');
    const token = localStorage.getItem('token');

    if (client && token) {
      setClient(JSON.parse(client));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await createSession(email, password)
      .then(response => {
        localStorage.setItem('client', JSON.stringify(response.data.client));
        localStorage.setItem('token', response.data.token);

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        setClient(response.data.client);
        navigate('/');
      });
  };

  const logout = () => {
    localStorage.removeItem('client');
    localStorage.removeItem('token');
    api.defaults.Authorization = null;
    setClient(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!client,
        client,
        loading,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
}