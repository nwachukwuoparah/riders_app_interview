import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Typography from "../typography";
import colors from "../../constant/theme";
import OngoingIcon from "../../assets/svg/ongoingIcon.svg";
import CustButton from "../button";
import Show from "../show";
import RequesIcon from "../../assets/svg/requesIcon.svg";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { getCurrentLocation, handleError, truncateString } from "../../helpers";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { rejectOrder } from "../../helpers/mutate";
import LoadingComponent from "../loading";
import { cacheAuthData } from "../../utilities/storage";

export default function Ordercard({
	onPress,
	type,
	cancel,
	confirm,
	item,
	navigation,
}: {
	onPress?: () => void;
	type?: string;
	cancel?: () => void;
	confirm?: () => void;
	item: any;
	navigation: any;
}) {
	useEffect(() => {
		console.log(JSON.stringify(item, null, 2));
	}, []);

	const styles = StyleSheet.create({
		ongoing_card: {
			backgroundColor: colors.grey_a,
			padding: 15,
			borderRadius: 20,
			gap: 30,
		},
		top: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		status: {
			padding: 5,
			backgroundColor: colors.tint,
			borderRadius: 15,
			paddingHorizontal: 10,
		},
		direction: { gap: 5 },
		time: {
			gap: 5,
		},
	});

	return (
		<>
			<Show>
				<Show.When isTrue={type === "in-transit"}>
					<Pressable onPress={onPress}>
						<View style={styles.ongoing_card}>
							<View style={styles.top}>
								<Typography type="text16">Completed</Typography>
								<View style={styles.status}>
									<Typography type="text14" sx={{ color: colors.black }}>
										Arrival in 22m
									</Typography>
								</View>
							</View>
							<View style={styles.direction}>
								<Typography type="text14" sx={{ color: colors.white }}>
									To
								</Typography>
								<Typography type="text16" sx={{ color: colors.white }}>
									Kings close, notthingham
								</Typography>
							</View>
							<OngoingIcon />
							<View style={styles.direction}>
								<Typography type="text14" sx={{ color: colors.white }}>
									From
								</Typography>
								<Typography type="text16" sx={{ color: colors.white }}>
									{item?.vendorId?.address}
								</Typography>
							</View>
							<View style={{ gap: 10 }}>
								<CustButton
									type="rounded"
									sx={{ width: "100%" }}
									onPress={confirm}
								>
									<Typography type="text16" sx={{ color: colors.white }}>
										I’ve arrived
									</Typography>
								</CustButton>
								<Typography
									type="text14"
									sx={{ color: colors.white, textAlign: "center" }}
								>
									Let the customer know when you’ve reached their destination
								</Typography>
							</View>
						</View>
					</Pressable>
				</Show.When>
				<Show.When isTrue={type === "pending"}>
					<Pressable onPress={onPress}>
						<View style={styles.ongoing_card}>
							<View style={styles.top}>
								<View
									style={{ ...styles.status, backgroundColor: colors.black }}
								>
									<Typography type="text16">
										{item?.schedule ? "Schedule" : "Normal"}
									</Typography>
								</View>

								<View style={styles.status}>
									<Typography type="text14" sx={{ color: colors.black }}>
										01:00pm
									</Typography>
								</View>
							</View>
							<View style={{ flexDirection: "row", gap: 10 }}>
								<RequesIcon height={hp("12%")} />
								<View style={{ gap: 15 }}>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											To
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											{truncateString(item?.deliveryAddress, 40)}
										</Typography>
									</View>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											From
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											<Typography type="text16" sx={{ color: colors.white }}>
												{truncateString(item?.vendorId?.address, 50)}
											</Typography>
										</Typography>
									</View>
								</View>
							</View>
							{type !== "completed" && (
								<View style={styles.top}>
									<View
										style={{ ...styles.status, backgroundColor: colors.black }}
									>
										<Typography type="text24" sx={{ color: colors.yellow }}>
											£ {item?.ridersFee}
										</Typography>
									</View>

									<TouchableOpacity
										onPress={cancel}
										style={{ ...styles.status, backgroundColor: colors.black }}
									>
										<Entypo
											name="dots-three-horizontal"
											size={24}
											color={colors.white}
										/>
									</TouchableOpacity>
								</View>
							)}
							<View style={{ gap: 10 }}>
								<CustButton
									type="rounded"
									onPress={() => {
										(async () => {
											// users: {
											// 	lng: item?.locationCoord?.coordinates[0],
											// 	lat: item?.locationCoord?.coordinates[1],
											// },
											// console.log(JSON.stringify(item, null, 2));
											let curentLocation = await getCurrentLocation();
											if (curentLocation) {
												await cacheAuthData("destination", {
													step: 1,
													to: {
														longitude: item?.vendorId?.locationCoord?.coordinates[0],
														latitude: item?.vendorId?.locationCoord?.coordinates[1],
													},
													from: {
														longitude: curentLocation?.coords?.longitude,
														latitude: curentLocation?.coords?.latitude,
													},
												});
												navigation.navigate("Home");
											}
										})();
									}}
									sx={{
										//  opacity: isPending ? 0.5 : 1,
										width: "100%",
									}}
								>
									<Typography type="text16" sx={{ color: colors.black }}>
										Proceede to pick up
									</Typography>
								</CustButton>
								<Typography
									type="text14"
									sx={{ color: colors.white, textAlign: "center" }}
								>
									Let the seller know when you’ve reached their destination
								</Typography>
							</View>
						</View>
					</Pressable>
				</Show.When>
				<Show.Else>
					<Pressable onPress={onPress}>
						<View style={styles.ongoing_card}>
							<View style={styles.top}>
								<View style={styles.status}>
									<Typography type="text14" sx={{ color: colors.black }}>
										01:00pm
									</Typography>
								</View>
							</View>
							<View style={{ flexDirection: "row", gap: 10 }}>
								<RequesIcon height={hp("12%")} />
								<View style={{ gap: 15 }}>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											To
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											{truncateString(item?.deliveryAddress, 40)}
										</Typography>
									</View>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											From
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											<Typography type="text16" sx={{ color: colors.white }}>
												{truncateString(item?.vendorId?.address, 50)}
											</Typography>
										</Typography>
									</View>
								</View>
							</View>
							<View style={styles.top}>
								<View style={styles.time}>
									<Typography type="text16">Picked up</Typography>
									<View
										style={{
											...styles.status,
											backgroundColor: colors.black,
											paddingVertical: 10,
											paddingHorizontal: 20,
											borderRadius: 50,
										}}
									>
										<Typography type="text14">10:00am</Typography>
									</View>
								</View>
								<View style={styles.time}>
									<Typography type="text16">Picked up</Typography>
									<View
										style={{
											...styles.status,
											backgroundColor: colors.black,
											paddingVertical: 10,
											paddingHorizontal: 20,
											borderRadius: 50,
										}}
									>
										<Typography type="text14">10:00am</Typography>
									</View>
								</View>
								<View style={styles.time}>
									<Typography type="text16">Picked up</Typography>
									<View
										style={{
											...styles.status,
											backgroundColor: colors.black,
											paddingVertical: 10,
											paddingHorizontal: 20,
											borderRadius: 50,
										}}
									>
										<Typography type="text14">10:00am</Typography>
									</View>
								</View>
							</View>
						</View>
					</Pressable>
				</Show.Else>
			</Show>
		</>
	);
}
