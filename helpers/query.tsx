import axios from "axios";
import { getCachedAuthData } from "../utilities/storage";
const Api = "https://afrilish-version-2-0.onrender.com/api/v1";

export const getProfile = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${Api}/rider/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getWorkHours = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${Api}/working-hours`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getPointHistory = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${Api}/referral-point`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
