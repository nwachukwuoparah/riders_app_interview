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

export default function Profile_Details({ navigation }: any) {
	return (
		<Container>
			<ScrollContainer innerStyles={{ paddingBottom: 100 }}>
				<KeyboardView sx={{ gap: 50, flex: 1 }}>
					<InnerWrapper sx={{ flex: 1 }}>
						<>
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
									<Typography type="text24">My account details</Typography>
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
									label="First name"
									type="text"
									onChange={() => {}}
									placeholder="enter first name"
								/>
								<InputComponent
									label="Last name "
									type="text"
									onChange={() => {}}
									placeholder="enter last name"
								/>
								<InputComponent
									label="Phone number"
									type="phone"
									onChange={() => {}}
								/>
								<InputComponent
									label="Email address"
									type="text"
									onChange={() => {}}
									placeholder="enter your email"
								/>
								<InputComponent
									label="Bate of birth"
									type="date"
									mode="date"
									onChange={() => {}}
								/>
							</View>
						</>
					</InnerWrapper>
				</KeyboardView>
			</ScrollContainer>
			<View style={styles.buttonCont}>
				<CustButton
					sx={{ width: "100%", backgroundColor: colors.tint_a }}
					type="rounded"
					onPress={() => navigation.navigate("login")}
				>
					<Typography type="text16" sx={{ color: colors.red }}>
						Delete account
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
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
	},
});
