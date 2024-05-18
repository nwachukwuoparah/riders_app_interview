import { Share } from "react-native";

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
