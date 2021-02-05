import axios from "axios";

const URL = "http://localhost:5000/api";

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
