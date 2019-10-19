const { serverUrl, devServerUrl } = require("../config");
const axios = require("axios");

const rootUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? devServerUrl
    : serverUrl;

export function postRequest(endpoint, body) {
  return axios.post(`${rootUrl}${endpoint}`, body).then(res => res.data);
}

export function getRequest(endpoint, params) {
  return axios.get(`${rootUrl}${endpoint}`, { params }).then(res => res.data);
}

export function deleteRequest(endpoint, params) {
  return axios
    .delete(`${rootUrl}${endpoint}`, { params })
    .then(res => res.data);
}

export * from "./stripe";
export * from "./activeUser";
export * from "./location";
export * from "./transport";
