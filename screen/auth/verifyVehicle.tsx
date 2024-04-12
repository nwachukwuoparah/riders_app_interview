import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	ScrollContainer,
} from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function VerifyVehicle({ navigation }: any) {


	return (
		<Container>
			<InnerWrapper sx={{ width: "100%" }}>
				<View style={styles.title}>
					<Typography type="text24">Let’s verify your vehicle</Typography>
					<Typography type="text16">We need some details to do this</Typography>
					<View style={{ flexDirection: "row", width: "100%", gap: 5 }}>
						{[1, 2, 3, 4, 5].map((i, index) => (
							<View
								key={index}
								style={{
									flex: 1,
									backgroundColor:
										index < 1 || index < 2 ? colors.tint : colors.grey_a,
									height: 7,
									borderRadius: 5,
								}}
							></View>
						))}
					</View>
				</View>
				<ScrollContainer>
					<View style={{ ...styles.inputContain }}>
						<InputComponent
							// label="What is your vehicle type?"
							type="dropdown"
							onChange={() => {}}
							data={[]}
						/>

						<InputComponent
							label="Your email address"
							type="text"
							onChange={() => {}}
							placeholder="enter your email"
						/>
						<InputComponent
							label="Create your password"
							type="text"
							onChange={() => {}}
							placeholder="enter your password"
						/>
					</View>
				</ScrollContainer>
				<View style={styles.buttonCont}>
					<CustButton
						type="rounded"
						onPress={() => navigation.navigate("login")}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Sign up
						</Typography>
					</CustButton>
					<CustButton
						sx={{ height: hp("3.5%") }}
						onPress={() => navigation.navigate("login")}
					>
						<Typography type="text16">
							Are you already a rider here?{" "}
							<Typography type="text16" sx={{ color: colors.yellow }}>
								Log in
							</Typography>
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
