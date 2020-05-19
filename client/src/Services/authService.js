import http from "./httpService";
import { APIEndpoint } from "./config.json";

export async function login(email, password) {
  const url = APIEndpoint + "/login";
  const res = await http.post(url, { email, password });
  console.log("Res: ", res);
}

export async function defaultLogin() {
  const url = APIEndpoint + "/user/login";
  const { status } = await http.post(url, {
    email: "ignacio.sanhueza2.l@gmail.com",
    password: "ignacio1233",
  });

  console.log("The status is ", status);
}
