import React from "react";
import { StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";

export default function Login({ navigation }: any) {
	return (
		<Container>
			<InnerWrapper sx={{ gap: 50 }}>
				<View style={styles.title}>
					<Typography type="text24">Welcome back!</Typography>
					<Typography type="text16">Login to continue</Typography>
				</View>
				<View style={{ ...styles.inputContain }}>
					<InputComponent
						label="Enter your email address"
						type="text"
						onChange={() => {}}
					/>
					<InputComponent
						label="Enter your password"
						type="hidden"
						onChange={() => {}}
					/>
				</View>
				<View style={styles.buttonCont}>
					<CustButton
						type="rounded"
						onPress={() => navigation.navigate("login")}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Log in
						</Typography>
					</CustButton>
					<CustButton onPress={() => navigation.navigate("signUp")}>
						<Typography type="text16">
							Are you a new rider?{" "}
							<Typography type="text16" sx={{ color: colors.yellow }}>
								Register here
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
	},
	inputContain: {
		gap: 20,
		flex: 1,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
	},
});
