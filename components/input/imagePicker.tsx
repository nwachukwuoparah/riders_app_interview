import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import * as Permissions from "expo-permissions";

const PickImage = ({ imageName, setValue, children, sx }: any) => {
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
		};
		if (!result.canceled) {
			prepFileForUpload(result.assets[0]);
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
		<TouchableOpacity onPress={requestPermission}>{children}</TouchableOpacity>
	);
};

export default PickImage;
