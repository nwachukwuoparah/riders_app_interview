import axios from "axios";
import { getCachedAuthData } from "../utilities/storage";
import { EXPO_PUBLIC_API } from "@env"


export const getProfile = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");;
	return await axios.get(`${EXPO_PUBLIC_API}/rider/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getWorkHours = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/working-hours`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getPointHistory = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/referral-point`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getOverview = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/rider/overview?timeFrame=weekly`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getOrders = async (data: any): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/order${data?.queryKey?.[1]}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getDailyScheduleItem = async (data: any): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/order/day-schedule/${data?.queryKey?.[1]}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getWallet = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/rider/wallet`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getTransactions = async (): Promise<any> => {
	const { token } = await getCachedAuthData("user-data");
	return await axios.get(`${EXPO_PUBLIC_API}/payout`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};