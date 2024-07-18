import React from "react";
import { TouchableOpacity, Alert, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import * as Permissions from "expo-permissions";
import colors from "../../constant/theme";
import Typography from "../typography";
import { Controller } from "react-hook-form";

const PickImage = ({
	imageName,
	setValue,
	children,
	errors,
	control,
	clearErrors,
	allowsMultipleSelection
}: any) => {

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: allowsMultipleSelection ? false : true,
			allowsMultipleSelection: allowsMultipleSelection,
			aspect: [4, 3],
			quality: 1,
		});

		const prepMultipleFileForUpload = (file: ImagePicker.ImagePickerResult) => {
			// Initialize an array to store formatted images
			const formattedImages: any[] = [];

			file?.assets?.forEach((asset) => {
				let uri = asset.uri;
				let name = uri.split("/").pop() as string;
				let match = /\.(\w+)$/.exec(name);
				let type = match ? `image/${match[1]}` : "image";

				// Prepare the image object
				const image = { uri, name, type };

				// Push the formatted image to the array
				formattedImages.push(image);
			});

			// Clear any errors related to the image field
			clearErrors(imageName);

			// Use unique key for each image to set in form data
			setValue(imageName, formattedImages);
		};

		const prepSingleFileForUpload = (file: ImagePicker.ImagePickerResult) => {
			file?.assets?.forEach((asset) => {
				let uri = asset.uri;
				let name = uri.split("/").pop() as string;
				let match = /\.(\w+)$/.exec(name);
				let type = match ? `image/${match[1]}` : "image";
				// Use unique key for each image to set in form data
				setValue(imageName, { uri, name, type });
			});
			clearErrors(imageName);
		};

		if (!result?.canceled && allowsMultipleSelection) {
			prepMultipleFileForUpload(result);
		} else {
			prepSingleFileForUpload(result)
		}
	};


	const requestPermission = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Permission required", "Please grant access to the media library to pick images.");
			return;
		} else {
			pickImage();
		}
	};

	return (
		<Controller
			control={control}
			render={({ field }) => (
				<View style={{ gap: 10 }}>
					<TouchableOpacity onPress={requestPermission}>
						{children}
					</TouchableOpacity>
					{errors?.[imageName || "image"] && (
						<Typography type="text14" sx={{ color: colors.red }}>
							{errors?.[imageName || "image"]?.message}
						</Typography>
					)}
				</View>
			)}
			name="image"
		/>
	);
};

export default PickImage;