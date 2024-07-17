import { Alert, Share } from "react-native";
import * as Location from "expo-location";
import { CommonActions } from "@react-navigation/native";
import { clearAuthData } from "../utilities/storage";

export const getCurrentLocation = async (latitude: any, longitude: any) => {
	try {
		// Reverse geocode to get the address
		let reverseGeocode = await Location.reverseGeocodeAsync({
			latitude,
			longitude,
		});

		if (reverseGeocode.length > 0) {
			let address = reverseGeocode[0];
			return {
				address: `${address.street !== null ? address.street : ""} ${
					address.city
				}, ${address.region}`,
			};
		} else {
			return {
				address: "Address not found",
			};
		}
	} catch (error) {
		Promise.reject(error);
		// Alert.alert("Error getting location:", `${error}`);
		// console.log(error);
	}
};

export const openShareModal = async (value: string) => {
	try {
		const result = await Share.share({
			message: `Check out Afrlish: I use this platform to buy food. Get it at\n\nhttps://afrilish.com.\n\nuse this code\n${value}\nand we'll both get bonus to buy`,
		});

		if (result.action === Share.sharedAction) {
			if (result.activityType) {
				// console.log("shared with active type of :", result.activityType)
			} else {
				// console.log("shared");
			}
		} else if (result.action === Share.dismissedAction) {
			// console.log("dismissed");
		}
	} catch (error) {
		// console.error('Error opening share modal:', error);
	}
};

export const checkPasswordStrength = async (
	password: string
): Promise<number> => {
	const lengthCheck = password?.length >= 8;
	const uppercaseCheck = /[A-Z]/.test(password);
	const lowercaseCheck = /[a-z]/.test(password);
	const digitCheck = /[0-9]/.test(password);
	const specialCharCheck = /[\W_]/.test(password);

	const checksPassed = [
		lengthCheck,
		uppercaseCheck,
		lowercaseCheck,
		digitCheck,
		specialCharCheck,
	].filter(Boolean).length;

	// Ensure checksPassed is between 1 and 5
	return Math.max(1, Math.min(5, checksPassed));
};

export const handleError = (err: any, navigation?: any) => {
	const axiosError = err as any;
	if (axiosError?.response) {
		if (
			axiosError.response?.data?.message === "Unable to verify token." &&
			navigation
		) {
			(async () => {
				await clearAuthData("user-data");
				navigation.dispatch(
					CommonActions?.reset({
						index: 0,
						routes: [
							{
								name: "AuthStack",
								params: {
									screen: "login",
								},
							},
						],
					})
				);
				Alert.alert("Message", "Login in to continue");
			})();
			return;
		} else {
			console.log(axiosError.response?.data);
			Alert.alert("Error", axiosError.response?.data?.message);
			return axiosError.response?.data;
		}
	} else if (axiosError?.request) {
		Alert.alert("Error", "Something went wrong try again.");
		return { message: "Something went wrong try again!." };
	} else {
		return axiosError?.message;
	}
};

export const truncateString = (str: string, returnLength: number = 10) => {
	if (str) {
		const formattedString = str.slice(0, returnLength);
		return str.length > formattedString.length
			? formattedString + "..."
			: formattedString;
	}
};
