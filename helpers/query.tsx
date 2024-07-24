import axios from "axios";
import { getCachedAuthData } from "../utilities/storage";
import { EXPO_PUBLIC_API } from "@env";


export const getProfile = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");;
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/rider/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getWorkHours = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/working-hours`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getPointHistory = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/referral-point`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getOverview = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/rider/overview?timeFrame=weekly`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getOrders = async (data: any): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/order${data?.queryKey?.[1]}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getDailyScheduleItem = async (data: any): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/order/day-schedule/${data?.queryKey?.[1]}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getWallet = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/rider/wallet`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getTransactions = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/api/v1/payout`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};