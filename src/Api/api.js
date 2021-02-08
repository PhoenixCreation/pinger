import axios from "axios";

const URL = "http://localhost:5000/api";

export const requestLogin = async (username, password) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

export const requestSignup = async (username, password) => {
  try {
    const response = await axios.post(`${URL}/auth/signup`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return -1;
  }
};

export const requestUser = async (u_token) => {
  try {
    const response = await axios.post(`${URL}/auth/userinfo`, { u_token });
    return response.data;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

export const requestCreateServer = async (newServer) => {
  try {
    if (!newServer.server_name) {
      return -1;
    }
    const response = await axios.post(`${URL}/server/create`, newServer);
    return response.data;
  } catch (error) {
    console.log("Api frontedn call error", error);
    return -1;
  }
};
