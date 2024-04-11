import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, InnerWrapper } from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";

export default function Login() {
	return (
		<Container>
			<InnerWrapper>
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
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
	},
	inputContain: {},
});
