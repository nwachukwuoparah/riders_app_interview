import * as SecureStore from "expo-secure-store";

export const cacheAuthData = async (key: string, data: any) => {
	try {
		const jsonData = JSON.stringify(data);
		await SecureStore.setItemAsync(key, jsonData);
	} catch (error) {
		throw error;
	}
};

export const getCachedAuthData = async (
	key: string
): Promise<any | undefined> => {
	try {
		const authData = await SecureStore.getItemAsync(key);
		if (authData) {
			return JSON.parse(authData);
		}
	} catch (error: any) {
    throw error;
	}
};

export const clearAuthData = async (key: string) => {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		throw error;
	}
};
