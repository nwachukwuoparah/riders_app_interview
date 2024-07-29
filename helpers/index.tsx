import * as Location from "expo-location";
import { ROUTE } from "../constant/route";

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
				address: `${address.street !== null ? address.street : ""} ${address.city
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

export const truncateString = (str: string, returnLength: number = 10) => {
	if (str) {
		const formattedString = str.slice(0, returnLength);
		return str.length > formattedString.length
			? formattedString + "..."
			: formattedString;
	}
};

export const logOut = async (navigation: any, CommonActions: any) => {
	navigation.dispatch(
		CommonActions.reset({
			index: 0,
			routes: [
				{
					name: ROUTE.AUTH_STACK,
					params: {
						screen: ROUTE.LOGIN,
					},
				},
			],
		})
	);
};
