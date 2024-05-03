import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../constant/theme";

export default function Camera_() {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const cameraRef = useRef<Camera | null>(null);
	const [photoUri, setPhotoUri] = useState<string | null>(null);

	useEffect(() => {
		askPermission(); // Call askPermission once the component mounts
	}, []); // Empty dependency array means this effect runs only once, on mount

	useEffect(() => {
		console.log(photoUri);
	}, [photoUri]);

	const askPermission = () => {
		if (!permission?.granted && !permission) {
			requestPermission();
		}
	};

	function toggleCameraType() {
		console.log("call");
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	const takePicture = async () => {
		if (cameraRef.current) {
			try {
				const { uri } = await cameraRef.current.takePictureAsync();
				setPhotoUri(uri);
				console.log(uri);
			} catch (error) {
				console.error("Error taking picture:", error);
			}
		}
	};

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} ref={cameraRef}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={toggleCameraType}>
						<MaterialIcons
							name="flip-camera-android"
							size={30}
							color={colors.white}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={takePicture}>
						<MaterialIcons name="camera" size={60} color={colors.white} />
					</TouchableOpacity>
					<TouchableOpacity>
						<MaterialCommunityIcons
							name="flash-outline"
							size={35}
							color={colors.white}
						/>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	buttonContainer: {
		width: "80%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "transparent",
		marginBottom: "10%",
	},
});