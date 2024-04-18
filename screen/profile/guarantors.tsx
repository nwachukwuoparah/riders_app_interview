import React from "react";
import { StyleSheet, View } from "react-native";
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
import File from "../../assets/svg/file.svg";

export default function Guarantors({ navigation }: any) {
	return (
		<Container>
			<ScrollContainer innerStyles={{ paddingBottom: 170 }}>
				<KeyboardView sx={{ gap: 50, flex: 1 }}>
					<InnerWrapper sx={{ gap: 50, flex: 1 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<View style={styles.title}>
								<CustButton
									type="back"
									sx={{ color: colors.white }}
									onPress={() => navigation.goBack()}
								/>
								<Typography type="text24">My guarantors</Typography>
							</View>
							<View style={{ width: "22%" }}>
								<CustButton
									sx={{
										width: "100%",
										backgroundColor: colors.white,
										paddingVertical: 13,
									}}
									type="rounded"
									onPress={() => navigation.navigate("login")}
								>
									<Typography type="text16" sx={{ color: colors.black }}>
										Edit
									</Typography>
								</CustButton>
							</View>
						</View>

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
					</InnerWrapper>
				</KeyboardView>
			</ScrollContainer>
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
