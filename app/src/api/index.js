const { serverUrl } = require("../config");
const axios = require("axios");

export function postRequest(endpoint, body) {
  return axios.post(`${serverUrl}${endpoint}`, body).then(res => res.data);
}

export function getRequest(endpoint, params) {
  return axios.get(`${serverUrl}${endpoint}`, { params }).then(res => res.data);
}

export function deleteRequest(endpoint, params) {
  return axios
    .delete(`${serverUrl}${endpoint}`, { params })
    .then(res => res.data);
}

export * from "./stripe";
export * from "./auth";
export * from "./activeUser";
export * from "./location";
