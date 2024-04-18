import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	KeyboardView,
	ScrollContainer,
} from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function VerifyVehicle({ navigation }: any) {
	return (
		<Container>
			<InnerWrapper sx={{ width: "100%", flex: 1 }}>
				<KeyboardView sx={{ width: "100%", flex: 1 }}>
					<View style={styles.title}>
						<CustButton
							type="back"
							color={colors.white}
							onPress={() => navigation.goBack()}
						/>
						<Typography type="text24">Let’s verify your vehicle</Typography>
						<Typography type="text16">
							We need some details to do this
						</Typography>
						<View style={{ flexDirection: "row", width: "100%", gap: 5 }}>
							{[1, 2, 3, 4, 5].map((i, index) => (
								<View
									key={index}
									style={{
										flex: 1,
										backgroundColor: index < 2 ? colors.tint : colors.grey_a,
										height: 7,
										borderRadius: 5,
									}}
								></View>
							))}
						</View>
					</View>
					<ScrollContainer innerStyles={{paddingBottom:30}}>
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="Select vehicle type"
								type="dropdown"
								onChange={() => {}}
								data={[
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
								]}
								placeholder="Select vehicle type"
							/>
							<View style={styles.image_wrap}>
								<Typography type="text16" sx={{ color: colors.white_1 }}>
									Upload your drivers license
								</Typography>
								<View style={styles.image_placeholder}>
									<LottieView
										autoPlay
										style={{
											width: 100,
											height: 50,
										}}
										source={require("../../assets/lottile/imageFile.json")}
									/>
									<Typography type="text14" sx={{ color: colors.black_1 }}>
										Tap here to upload document
									</Typography>
									<Typography type="text14" sx={{ color: colors.grey }}>
										Max 10mb file allowed
									</Typography>
								</View>
							</View>
							<InputComponent
								label="What brand is your vehicle?"
								type="text"
								onChange={() => {}}
								placeholder="e.g. Toyota"
							/>
							<InputComponent
								label="What is your vehicle plate number?"
								type="text"
								onChange={() => {}}
								placeholder="Enter * digit"
							/>
						</View>
					</ScrollContainer>
				</KeyboardView>
				<View style={styles.buttonCont}>
					<CustButton
						type="rounded"
						onPress={() => navigation.navigate("verifyAddress")}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Continue
						</Typography>
					</CustButton>
					<CustButton
					// onPress={() => navigation.navigate("login")}
					>
						<Typography type="text16">
							I want continue my registration later
						</Typography>
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
	inputContain: {
		gap: 35,
		marginHorizontal: "5%",
		marginBottom: 20,
		paddingTop: 20,
	},
	image_wrap: {
		gap: 15,
	},
	image_placeholder: {
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.yellow,
		borderRadius: 30,
		paddingVertical: "5%",
		gap: 10,
		backgroundColor: colors.tint,
		...Platform.select({
			ios: {},
			android: {},
		}),
	},
	// 4500-2001+2024
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
