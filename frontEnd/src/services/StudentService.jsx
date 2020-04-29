import http from "./httpService";
import { apiUrl } from "../config.json";
import { getJwt } from "./authService";

const apiEndpoint = apiUrl + "/users";

function studentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getStudents() {
  http.setJwt(getJwt());
  return http.get(apiEndpoint);
}

export function getStudent(studentId) {
  http.setJwt(getJwt());
  return http.get(studentUrl(studentId));
}

export function saveStudent(student) {
  http.setJwt(getJwt());
  if (student._id) {
    const body = { ...student };
    delete body._id;
    return http.put(studentUrl(student._id), body);
  }
  return http.post(apiEndpoint, student);
}

export function deleteStudent(studentId) {
  http.setJwt(getJwt());
  return http.delete(studentUrl(studentId));
}
