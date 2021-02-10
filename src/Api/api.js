import axios from "axios";

export const URL = "http://localhost:5000/api";

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

export const reuestAddUserToServer = async (server_id, user_id) => {
  try {
    const response = await axios.post(`${URL}/server/adduser`, {
      server_id,
      user_id,
    });
    return response.data;
  } catch (error) {
    console.log("Front end api call error", error);
  }
};

export const requestServersOfUser = async (u_token) => {
  try {
    const response = await axios.post(`${URL}/server/get`, { u_token });
    return response.data;
  } catch (error) {
    console.log("reqestServersOfUser - frontend api call ", error);
    return -1;
  }
};

export const requestAddTextChannel = async (server_id, channel_name) => {
  try {
    const response = await axios.post(`${URL}/channel/text/add`, {
      server_id,
      channel_name,
    });
    return response.data;
  } catch (error) {
    console.log("Frontend api call => ", error);
    return null;
  }
};

export const requestAddVoiceChannel = async (server_id, channel_name) => {
  try {
    const response = await axios.post(`${URL}/channel/voice/add`, {
      server_id,
      channel_name,
    });
    return response.data;
  } catch (error) {
    console.log("Frontend api call => ", error);
    return null;
  }
};
