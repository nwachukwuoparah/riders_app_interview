import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Image,
	Pressable,
	RefreshControl,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
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
import LoadingComponent from "../../components/loading";
import { UserContext } from "../../components/contex/userContex";
import Rating from "../../components/rating";
import { clearAuthData } from "../../utilities/storage";
import Show from "../../components/show";
import { logOut } from "../../helpers";

export default function Profile({ navigation }: any) {
	const { userData, isFetching, refetch } = useContext(UserContext);

	useEffect(() => {
		console.log(JSON.stringify(userData, null, 2));

	}, [])

	return (
		<Container>
			<LoadingComponent display={isFetching} />
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
					<CustButton
						type="bell"
						color={colors.white}
						onPress={() => navigation.navigate("notification")}
					/>
				</View>
				<ScrollContainer
					sx={{ height: "100%" }}
					innerStyles={{ gap: 15, paddingBottom: "30%" }}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							onRefresh={refetch}
							colors={[colors.yellow]}
							tintColor={colors.yellow}
						/>
					}
				>
					<View style={styles.user}>
						<Pressable
							onPress={() => {
								navigation.navigate("updatecapture");
							}}
						>
							<Show>
								<Show.When isTrue={userData?.image !== undefined}>
									<View
										style={{
											width: "100%",
											alignItems: "center",
										}}
									>
										<Image
											source={{ uri: userData?.image }}
											style={{
												width: 120,
												height: 120,
												borderRadius: 100,
												borderWidth: 1,
												borderColor: colors.yellow,
											}}
											resizeMode="cover"
										/>
									</View>
								</Show.When>
								<Show.Else>
									<User />
								</Show.Else>
							</Show>
						</Pressable>

						<Typography type="text24">{userData?.firstName}</Typography>
						<Typography type="text16">
							{userData?.totalRides} rides done
						</Typography>
						<Rating maxStars={5} defaultRating={userData?.ratingAverage} />
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
							{
								value: "Payment details",
								route:
									!userData?.bankName &&
										!userData?.accountName &&
										!userData?.sortCode
										? "bankInfo"
										: "bankDetails",
								type: "routh",
							},
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
								onPress={async () => {
									if (i?.type && i?.type === "routh") {
										navigation.navigate(i?.route);
									} else if (i?.type && i.type === "log-out") {
										await clearAuthData("user-data");
										logOut(navigation, CommonActions)
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
