import axios, { toFormData } from "axios";
import {
	signUpTypes,
	guarantorTypes,
	vehicleTypes,
	addressTypes,
} from "../types";
import { getCachedAuthData } from "../utilities/storage";
const Api = "https://afrilish-version-2-0.onrender.com/api/v1";

export const createUser = async (data: signUpTypes): Promise<any> => {
	return await axios.post(`${Api}/rider`, data);
};

export const updateUser = async (
	data: vehicleTypes | addressTypes | guarantorTypes
): Promise<any> => {
	const value = toFormData(data);
	const token = getCachedAuthData("user-data");
	return await axios.patch(`${Api}/rider`, value, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});
};
