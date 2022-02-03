import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export const createSession = async (email, password) => {
  return api.post("/sessions", { email, password });
};

export const getTransactions = async (clientId, query) => {
  let url = `/transactions/${clientId}`;

  if (query && query !== '') {
    url += `?q=${query}`
  }
  return api.get(url);
};