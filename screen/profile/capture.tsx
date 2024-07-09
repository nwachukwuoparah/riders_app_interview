import React, { useState } from "react";
import { Alert, Image, Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import Camera_ from "../../components/camera";
import Show from "../../components/show";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { clearAuthData } from "../../utilities/storage";
import { updateUser } from "../../helpers/mutate";
import LoadingComponent from "../../components/loading";
import { handleError } from "../../helpers";

export default function Update_capture({ navigation }: any) {
	const [photoUri, setPhotoUri] = useState<object | null>(null);

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			// clearAuthData("step");
			// navigation.navigate("UserStack");
			// console.log(data?.data);
		},
		onError: (err) => {
			handleError(err);
		},
	});

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ width: "100%", flex: 1 }}>
				<View style={styles.title}>
					<CustButton
						type="back"
						color={colors.white}
						onPress={() => navigation.goBack()}
					/>
					<Typography type="text24">One step to go</Typography>
					<Typography type="text16">
						We need someone we can reach out to
					</Typography>
					<View style={{ flexDirection: "row", width: "100%", gap: 5 }}>
						{[1, 2, 3, 4, 5].map((i, index) => (
							<View
								key={index}
								style={{
									flex: 1,
									backgroundColor: index < 5 ? colors.tint : colors.grey_a,
									height: 7,
									borderRadius: 5,
								}}
							></View>
						))}
					</View>
				</View>
				<Show>
					<Show.When isTrue={photoUri === null}>
						<Camera_ capture={(image) => setPhotoUri(image)} />
					</Show.When>
					<Show.Else>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<View
								style={{
									width: 300,
									height: 300,
									borderRadius: 150,
									borderWidth: 1,
									borderColor: colors.yellow,
									overflow: "hidden",
								}}
							>
								<Image
									source={{
										uri: (photoUri as ImagePicker.ImagePickerAsset)?.uri,
									}}
									style={{
										width: "100%",
										height: "100%",
										borderColor: colors.yellow,
										// objectFit: "scale-down",
									}}
								/>
							</View>
						</View>
					</Show.Else>
				</Show>
				<View style={styles.buttonCont}>
					<CustButton
						type="rounded"
						onPress={() => {
							// navigation.navigate("UserStack");
							if (photoUri === null) {
								Alert.alert("Message", "take a picture.");
							} else {
								const formData = new FormData();
								formData.append("image", photoUri as any);
								mutate(formData);
							}
						}}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Use photo
						</Typography>
					</CustButton>
					<CustButton onPress={() => setPhotoUri(null)}>
						<Typography type="text16">Retake photo</Typography>
					</CustButton>
				</View>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
		marginHorizontal: "5%",
		marginBottom: 10,
	},
	body: {
		marginHorizontal: "5%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	camera: {
		flex: 1,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.black_1,
		paddingTop: 15,
		...Platform.select({
			ios: {
				shadowOpacity: 0.1,
				shadowRadius: 0.5,
				shadowColor: "#6C6C6C",
				shadowOffset: { height: -2, width: 0 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
});

// {"image": {
// 	"name": "EE56B960-7F7F-4471-A54F-E859086FDF23.jpg",
// 	 "type": "image/jpg",
// 	 "uri": "file:///Users/user/Library/Developer/CoreSimulator/Devices/C03CDEB5-4BF7-47A6-A4AF-BA93863B34AF/data/Containers/Data/Application/CAE873EB-1658-4097-9F11-E1F2813BFCF7/Library/Caches/ExponentExperienceData/%2540afrilish%252Fafrilish-riders/ImagePicker/EE56B960-7F7F-4471-A54F-E859086FDF23.jpg"
// 	},
// 	"plateNumber": "sdfbv vxcv ",
// 	"vehicleBrand": "fasbnnbcvx",
// 	"vehicleType": "Car"
// }
