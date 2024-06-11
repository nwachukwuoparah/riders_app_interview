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
	forgetTypes,
	resetPasswordType,
	verifyRiderType,
} from "../types";
import { getCachedAuthData } from "../utilities/storage";
const Api = "https://afrilish-version-2-0.onrender.com/api/v1";

export const createUser = async (data: signUpTypes): Promise<any> => {
	return await axios.post(`${Api}/rider`, data);
};

export const verifyUser = async (data: verifyRiderType): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.post(`${Api}/rider/verify`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const login = async (data: logInTypes): Promise<any> => {
	return await axios.post(`${Api}/rider/login`, data);
};

export const forgotPassword = async (data: forgetTypes): Promise<any> => {
	return await axios.post(`${Api}/rider/forgot-password`, data);
};

export const resendOtp = async (data: { email: string }): Promise<any> => {
	return await axios.post(`${Api}/rider/resend-otp`, data);
};

export const resetPassword = async (data: resetPasswordType): Promise<any> => {
	return await axios.post(`${Api}/rider/reset-password`, data);
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

export const getNotification = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${Api}/notification`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const acceptOrder = async (data: { id: string }): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	console.log(token);
	console.log(data);
	return await axios.patch(
		`${Api}/rider/accept-order/${data?.id}`,
		{},
		{
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU0OTFjMjEzZjIzYzg5M2NjMzgxMzUiLCJlbWFpbCI6Im53YWNodWt3dW9wYXJhaEBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiZmlyc3ROYW1lIjoiTmt1bWUiLCJsYXN0TmFtZSI6Ik5rdW1lIiwidXNlclR5cGUiOiJSaWRlciIsImlhdCI6MTcxNzQyMTY4NiwiZXhwIjoxNzE4MDI2NDg2fQ.Em-Rt_UNTNN_1b7IgDXWZxoI1CFi4q4FdnQ3csxaWv4`, //${token}
			},
		}
	);
};
