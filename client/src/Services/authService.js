import http from "./httpService";
import { APIEndpoint } from "./config.json";

const endpoint = APIEndpoint + "/user";

export async function login(email, password) {
  console.log("authService", email, password);
  const url = endpoint + "/login";
  const obj = { email, password };
  const { data } = await http.post(url, obj);
  const { token } = data;
  if (token) {
    http.setJwt(token);
    localStorage.setItem("token", token);
  }
  return data;
}

export async function auth() {
  const url = endpoint + "/auth";
  const { data } = await http.get(url);
  if (!data.error) localStorage.setItem("user", data.user);
  return data;
}

export async function register(user) {
  const url = endpoint + "/register";
  const { data } = await http.post(url, user);
  return data;
}

function getJwt() {
  return localStorage.getItem("token");
}

export async function getUsers() {
  const url = endpoint + "/";
  const { data } = await http.get(url);
  return data;
}
