import React, { useRef, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	ScrollContainer,
} from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import ProfileCard from "../../components/profile";

export default function WorkingHours({ navigation }: any) {
	const [type, setType] = useState("morning");

	return (
		<Container>
			<InnerWrapper sx={{ gap: 20, flex: 1 }}>
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
							color={colors.white}
							onPress={() => navigation.goBack()}
						/>
						<Typography type="text24">Set working hours</Typography>
					</View>
				</View>
				<View style={styles.body}>
					<TouchableOpacity
						onPress={() => {
							setType("morning");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							backgroundColor:
								type === "morning" ? colors.grey_a : colors.black_1,
							borderColor: type === "morning" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Morning shift</Typography>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setType("evening");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							backgroundColor:
								type === "evening" ? colors.grey_a : colors.black_1,
							borderColor: type === "evening" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Evening shift</Typography>
					</TouchableOpacity>
				</View>
				<Typography type="text16" sx={{ color: colors.white }}>
					Working hours are between 08:00am - 05:00pm
				</Typography>
				<ScrollContainer innerStyles={{ gap: 5 }}>
					{[
						{ value: "My account details", route: "profileDetails" },
						{ value: "Working hours", route: "workingHours" },
						{ value: "My vehicle details", route: "vehicleDetails" },
						{ value: "My address", route: "address" },
						{ value: "My guarantors", route: "guarantorForm" },
						{ value: "Payment details", route: "payment" },
						{ value: "Password reset", route: "" },
					].map((i, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => {
								navigation.navigate(i?.route);
							}}
						>
							<ProfileCard
								type="workHours"
								index={index || 0}
								value={i?.value}
								onPress={() => {
									navigation.navigate("login");
								}}
							/>
						</TouchableOpacity>
					))}
				</ScrollContainer>
			</InnerWrapper>
			<View style={styles.buttonCont}>
				<CustButton
					type="rounded"
					onPress={() => navigation.navigate("verifyVehicle")}
				>
					<Typography type="text16" sx={{ color: colors.black }}>
						Save working hours
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
	body: {
		width: "100%",
		flexDirection: "row",
	},
	button: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderBottomWidth: 0.5,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		alignSelf: "flex-start",
		alignItems: "center",
		justifyContent: "center",
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
