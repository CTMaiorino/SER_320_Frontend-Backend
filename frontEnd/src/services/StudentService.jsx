import http from "./httpService";
import { apiUrl } from "../config.json";
import { getJwt, getCurrentUser } from "./authService";

const apiEndpoint = apiUrl + "users";

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
export function getStudentList(userId) {
  http.setJwt(getJwt());

  console.log("Running getStudentList with Id : "+ userId);

  return http.get(studentUrl(userId) + "/student");
}
export function getCourseList(userId) {
  http.setJwt(getJwt());

  console.log("Running getCourseList with Id : "+ userId);

  return http.get(studentUrl(userId) + "/courses");
}
