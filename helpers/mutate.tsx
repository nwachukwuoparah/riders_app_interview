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
import { EXPO_PUBLIC_API } from "@env";

export const createUser = async (data: signUpTypes): Promise<any> => {
	return await axios.post(`${EXPO_PUBLIC_API}/rider`, data);
};

export const verifyUser = async (data: verifyRiderType): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.post(`${EXPO_PUBLIC_API}/rider/verify`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const login = async (data: logInTypes): Promise<any> => {
	return await axios.post(`${EXPO_PUBLIC_API}/rider/login`, data);
};

export const forgotPassword = async (data: forgetTypes): Promise<any> => {
	return await axios.post(`${EXPO_PUBLIC_API}/rider/forgot-password`, data);
};

export const resendOtp = async (data: { email: string }): Promise<any> => {
	return await axios.post(`${EXPO_PUBLIC_API}/rider/resend-otp`, data);
};

export const resetPassword = async (data: resetPasswordType): Promise<any> => {
	return await axios.post(`${EXPO_PUBLIC_API}/rider/reset-password`, data);
};

export const updateUser = async (
	data: vehicleTypes | addressTypes | guarantorTypes | captureTypes | any
): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${EXPO_PUBLIC_API}/rider`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const updateProfile = async (data: updateUserTypes): Promise<any> => {
	const value = toFormData(data);
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${EXPO_PUBLIC_API}/rider/profile`, value, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const workingHours = async (data: workingShiftType): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${EXPO_PUBLIC_API}/working-hours`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const changePassword = async (
	data: changePasswordType
): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.post(`${EXPO_PUBLIC_API}/rider/change-password`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const support = async (data: changePasswordType): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.post(`${EXPO_PUBLIC_API}/user/support`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getNotification = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/notification`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const acceptOrder = async (data: { id: string }): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(
		`${EXPO_PUBLIC_API}/rider/accept-order/${data?.id}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const rejectOrder = async (data: { id: string }): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(
		`${EXPO_PUBLIC_API}/rider/cancel-order/${data?.id}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const requestPayout = async (data: any): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.post(`${EXPO_PUBLIC_API}/payout`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const updateOrder = async (data: any): Promise<any> => {
	let { id, ...others } = data;
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${EXPO_PUBLIC_API}/order/${id}`, others, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const confirmOrder = async (data: any): Promise<any> => {
	let { id, ...others } = data;
	const { token } = await getCachedAuthData("user-data");
	return await axios.patch(`${EXPO_PUBLIC_API}/rider/deliver-order/${id}`, others, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const deleteAccount = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.delete(`${EXPO_PUBLIC_API}/rider/delete`, {
		headers: {
			Authorization: `Bearer ${token}`
		},
	});
};
