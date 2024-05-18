import axios, { toFormData } from "axios";
import {
	signUpTypes,
	guarantorTypes,
	vehicleTypes,
	addressTypes,
	captureTypes,
	workingShiftType,
	updateUserTypes,
	logInTypes,
	changePasswordType,
} from "../types";
import { getCachedAuthData } from "../utilities/storage";
import { Alert } from "react-native";
const Api = "https://afrilish-version-2-0.onrender.com/api/v1";

export const createUser = async (data: signUpTypes): Promise<any> => {
	return await axios.post(`${Api}/rider`, data);
};

export const login = async (data: logInTypes): Promise<any> => {
	return await axios.post(`${Api}/rider/login`, data);
};

export const updateUser = async (
	data: vehicleTypes | addressTypes | guarantorTypes | captureTypes | any
): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${Api}/rider`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const updateProfile = async (data: updateUserTypes): Promise<any> => {
	const value = toFormData(data);
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${Api}/rider/profile`, value, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const workingHours = async (data: workingShiftType): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${Api}/working-hours`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const changePassword = async (
	data: changePasswordType
): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.post(`${Api}/rider/change-password`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const support = async (data: changePasswordType): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.post(`${Api}/user/support`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};