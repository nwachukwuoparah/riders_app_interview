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
}: any) => {
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		const prepFileForUpload = (file: ImagePickerAsset) => {
			let uri = (file as ImagePicker.ImagePickerAsset).uri;
			let name = uri.split("/").pop() as string;
			let match = /\.(\w+)$/.exec(name);
			let type = match ? `image/${match[1]}` : "image";
			setValue(imageName, { uri, name, type });
			clearErrors(imageName);
			// console.log("after", { uri, name, type });
		};
		if (!result.canceled) {
			prepFileForUpload(result.assets[0]);
			// console.log("before", result.assets[0]);
		}
	};

	const requestPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
		if (status !== "granted") {
			Alert.alert("Sorry, we need camera roll permissions to make this work!");
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



// before  "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540afrilish%252Fafrilish-riders/ImagePicker/188553e2-1540-4bfd-bdba-b95312f63c67.jpeg"
// before  "uri": file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540afrilish%252Fafrilish-riders/Camera/c8b00d17-34ce-4134-ac94-71c973fbe4c0.jpg
//  LOG  {"name": "c8b00d17-34ce-4134-ac94-71c973fbe4c0.jpg", "type": "image/jpg", "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540afrilish%252Fafrilish-riders/Camera/c8b00d17-34ce-4134-ac94-71c973fbe4c0.jpg"}
// after {"name": "188553e2-1540-4bfd-bdba-b95312f63c67.jpeg", "type": "image/jpeg", "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540afrilish%252Fafrilish-riders/ImagePicker/188553e2-1540-4bfd-bdba-b95312f63c67.jpeg"}