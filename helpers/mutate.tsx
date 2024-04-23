import axios from "axios";
import { signUpTypes } from "../types";
const Api = "https://afrilish-version-2-0.onrender.com/api/v1";

export const createUser = async (data: signUpTypes): Promise<any> => {
	return await axios.post(`${Api}/rider`, data);
};
