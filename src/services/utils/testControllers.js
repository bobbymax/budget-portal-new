import { ENDPOINT } from "./index";
import authHeader from "./auth/auth.header";
import axios from "axios";

export const fetchCollection = async (entity) => {
  try {
    return await axios.get(`${ENDPOINT.url + entity}`, {
      headers: authHeader(),
    });
  } catch (error) {
    console.log(error);
  }
};
