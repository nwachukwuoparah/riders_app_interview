import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	ScrollContainer,
} from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import User from "../../assets/svg/user.svg";
import ProfileCard from "../../components/profile";
import { openBrowserAsync } from "expo-web-browser";
import { CommonActions } from "@react-navigation/native";

export default function Profile({ navigation }: any) {
	const onRefresh = () => {};
	const logOut = async () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [
					{
						name: "AuthStack",
						params: {
							screen: "login",
						},
					},
				],
			})
		);
	};
	return (
		<Container>
			<InnerWrapper sx={{ gap: 25 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.title}>
						<Typography type="text24">My profile</Typography>
						<Typography type="text16">Manage your account here</Typography>
					</View>
					<CustButton type="bell" color={colors.white} />
				</View>
				<ScrollContainer
					sx={{ height: "100%" }}
					innerStyles={{ gap: 15, paddingBottom: "20%" }}
				>
					<View style={styles.user}>
						<User />
						<Typography type="text24">John Doe</Typography>
						<Typography type="text16">0 rides done</Typography>
					</View>
					<View style={{ gap: 5 }}>
						{[
							{
								value: "My account details",
								route: "profileDetails",
								type: "routh",
							},
							{ value: "Working hours", route: "workingHours", type: "routh" },
							{
								value: "My vehicle details",
								route: "vehicleDetails",
								type: "routh",
							},
							{ value: "My address", route: "address", type: "routh" },
							{ value: "My guarantors", route: "guarantorForm", type: "routh" },
							{ value: "Payment details", route: "payment", type: "routh" },
							{
								value: "Password reset",
								route: "changePassword",
								type: "routh",
							},
							{
								value: "Invite friends and earn",
								route: "referal",
								type: "routh",
							},
							{ value: "Contact support", route: "contact", type: "routh" },
							{
								value: "Terms and privacy",
								type: "web",
							},
							{ value: "Logout", type: "log-out" },
						].map((i, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => {
									if (i?.type && i?.type === "routh") {
										navigation.navigate(i?.route);
									} else if (i?.type && i.type === "log-out") {
										logOut();
									} else if (i?.type && i.type === "web") {
										openBrowserAsync("https://afrilish.com/legalpage");
									}
								}}
							>
								<ProfileCard
									type="profile"
									index={index || 0}
									value={i?.value}
								/>
							</TouchableOpacity>
						))}
					</View>
				</ScrollContainer>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	user: {
		width: "100%",
		alignItems: "center",
	},
	list: {},
});