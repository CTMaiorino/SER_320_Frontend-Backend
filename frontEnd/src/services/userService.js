import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "users/register";

export function register(user) {
  return http.post(apiEndpoint, {
    //match user
    username: user.username,
    password: user.password,
    lastname: user.lastname,
    firstname: user.firstname,
  });
}
