import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import NavBar from "./nav";
import Search from "./search";
import Transactions from "./transactions";
import { getTransactions } from "../../services/api";
import { AuthContext, AuthProvider } from "../../contexts/auth";

const HomePage = () => {
  const { client, logout } = useContext(AuthContext);
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadData = async (query) => {
    try {
      setLoading(true);
      await getTransactions(client.id, query)
        .then(response => {
          setTransaction(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  }

  const handleLogout = () => {
    logout();
  }

  const handleSearch = (query) => {
    loadData(query);
  }

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  if (loadingError) {
    return (
      <div className="loading">
        A error ocurred while trying to load transactions. <Link to="/login">Voltar</Link>.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <div id="main">
      <NavBar onLogout={handleLogout} />
      <Search onSearch={handleSearch} />
      <Transactions transactions={transactions} />
    </div>
  );
}

export default HomePage;