import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";

export default function Payment({ navigation }: any) {
	return (
		<Container>
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<View style={styles.title}>
					<CustButton
						type="back"
						sx={{ color: colors.white }}
						onPress={() => navigation.goBack()}
					/>
					<Typography type="text24">Set up payment details</Typography>
				</View>
				<View style={{ ...styles.inputContain }}>
					<InputComponent
						label="Select bank"
						type="dropdown"
						onChange={() => {}}
						data={[
							{ label: "Car", value: "Car" },
							{ label: "Car", value: "Car" },
							{ label: "Car", value: "Car" },
						]}
						placeholder="Select bank"
					/>
					<InputComponent
						label="Your account number"
						type="text"
						onChange={() => {}}
						placeholder="Enter here"
					/>
					<InputComponent
						label="Sort code"
						type="text"
						onChange={() => {}}
						placeholder="Enter here"
					/>
				</View>
			</InnerWrapper>
			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={() => navigation.navigate("paymentDetails")}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Save payment details
					</Typography>
				</CustButton>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	inputContain: {
		gap: 20,
		flex: 1,
	},
	buttonCont: {
		width: "100%",
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
