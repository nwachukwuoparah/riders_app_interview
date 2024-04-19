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

export default function GuarantorForm({ navigation }: any) {
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
										backgroundColor: index < 4 ? colors.tint : colors.grey_a,
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
								label="Your guarantor’s full name"
								type="text"
								onChange={() => {}}
								placeholder="e.g John Doe"
							/>
							<InputComponent
								label="Your guarantor’s phone number"
								type="phone"
								onChange={() => {}}
							/>
							<InputComponent
								label="Your next of kin’s full name"
								type="text"
								onChange={() => {}}
								placeholder="e.g John Doe"
							/>
							<InputComponent
								label="Your next of kin’s relationship"
								type="dropdown"
								onChange={() => {}}
								data={[
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
								]}
								placeholder="Select relationship"
							/>
							<InputComponent
								label="Your next of kin’s phone number"
								type="phone"
								onChange={() => {}}
							/>
						</View>
					</ScrollContainer>
				</KeyboardView>
				<View style={styles.buttonCont}>
					<CustButton
						type="rounded"
						onPress={() => navigation.navigate("capture")}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Go to face capture
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