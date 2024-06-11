import { StyleSheet } from "react-native";
// import th
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { Ionicons } from "@expo/vector-icons";
import colors from "../../constant/theme";
import {
	GooglePlaceData,
	GooglePlaceDetail,
	GooglePlacesAutocomplete,
	GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { Ref, useEffect, useRef } from "react";
import { LocationObject } from "expo-location";

interface props {
	onPress?: (
		data: GooglePlaceData | null,
		detail: GooglePlaceDetail | LocationObject | null
	) => void;
}

export const PlacesApi = ({ onPress }: props) => {
	const palceApi = useRef<GooglePlacesAutocompleteRef>();

	return (
		<GooglePlacesAutocomplete
			placeholder="Select Your Location"
			fetchDetails
			ref={palceApi as Ref<GooglePlacesAutocompleteRef>}
			query={{
				key: "AIzaSyCnOvd_qyJXDpbeyI2le5wfcBRPBbu3Fm4",
				language: "en",
				components: "country:gb",
			}}
			styles={{
				container: { width: wp("90%") },
				listView: { backgroundColor: "white", marginBottom: "20%" },
				row: { paddingVertical: hp("2%") },
				description: {
					fontSize: hp("2%"),
					paddingHorizontal: wp("5%"),
					color: colors.black,
				},
				textInputContainer: {
					width: wp("90%"),
					overflow: "visible",
					height: hp("6%"),
					backgroundColor: colors.white,
					borderRadius: 10,
					borderColor: colors.grey,
					borderWidth: 1,
				},
				textInput: {
					color: colors.black,
					paddingHorizontal: wp("5%"),
					fontSize: hp("1.8%"),
					width: "100%",
					height: "100%",
					borderRadius: 10,
				},
			}}
			disableScroll
			suppressDefaultStyles
			onPress={(data, details = null) => {
				onPress && onPress(data, details);
			}}
			onFail={(error) => console.error(error)}
		/>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		width: wp("100%"),
		height: hp("100%"),
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: colors.white,
	},

	innerContainer: {
		backgroundColor: colors.grey,
		borderRadius: 20,
		width: "100%",
		height: "95%",
		justifyContent: "flex-start",
		overflow: "hidden",
		paddingHorizontal: "5%",
	},

	header: {
		justifyContent: "flex-start",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		marginVertical: "5%",
	},

	galleryImg: {
		alignSelf: "center",
		padding: "3%",
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
});
