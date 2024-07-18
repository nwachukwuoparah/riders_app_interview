import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Typography from "../typography";
import colors from "../../constant/theme";
import OngoingIcon from "../../assets/svg/ongoingIcon.svg";
import CustButton from "../button";
import Show from "../show";
import RequesIcon from "../../assets/svg/requesIcon.svg";
import Clock from "../../assets/svg/clock.svg";
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
import { rejectOrder, updateOrder } from "../../helpers/mutate";
import LoadingComponent from "../loading";
import { cacheAuthData, clearAuthData } from "../../utilities/storage";
import { font } from "../../utilities/loadFont";
import moment from "moment";

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
	const queryClient = useQueryClient();

	const { isPending, mutate } = useMutation({
		mutationFn: updateOrder,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-order" as QueryFilters);
			console.log(data?.data);
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
			clearAuthData("destination");
		},
	});

	useEffect(() => { 
		console.log(JSON.stringify(item, null, 2));
	}, []);

	return (
		<>
			<Show>
				<Show.When isTrue={item?.schedule}>
					<Pressable onPress={onPress}>
						<View style={styles.ongoing_card}>
							<View style={styles.top}>
								<View
									style={{ ...styles.status, backgroundColor: colors.black }}
								>
									<Typography type="text16">
										{item?.schedule ? "Schedule" : "Normal delivery"}
									</Typography>
								</View>

								<View style={styles.status}>
									<Typography type="text14" sx={{ color: colors.black }}>
										{moment(item?.createdAt).format("h:mm a")}
									</Typography>
								</View>
							</View>

							<View style={{ flexDirection: "row", gap: 10 }}>
								<RequesIcon height={hp("12%")} />
								<View style={{ gap: 15 }}>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											Pick up from
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											<Typography
												type="text16"
												fontfamily={font.DMSans_700Bold}
												sx={{ color: colors.white }}
											>
												{item?.vendorId?.address}
											</Typography>
										</Typography>
									</View>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											Delivery to
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											{truncateString(item?.deliveryAddress, 40)}
										</Typography>
									</View>
								</View>
							</View>

							{!cancel && <View style={styles.top}>
								<View style={styles.single_order_banner}>
									<Typography type="text14" sx={{ color: colors.white_1 }}>
										Daily delivery times
									</Typography>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",

										}}
									>
										{[{ time: "09:00am" }, { time: "12:00pm" }, { time: "04:00pm" }]?.map((i, index) => (
											<View key={index} style={{ flexDirection: "row", gap: 5 }}>
												<Clock />
												<Typography
													type="text14"
													fontfamily={font.DMSans_700Bold}
													sx={{ color: colors.white_1 }}
												>
													{i?.time}
												</Typography>
											</View>
										))}
									</View>
								</View>
							</View>
							}

							{type !== "completed" && cancel && (
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
						</View>
					</Pressable>
				</Show.When>
				<Show.When isTrue={type === "orderStatus=ready&orderStatus=picked&orderStatus=arrived"}>
					<Pressable onPress={onPress}>
						<View style={styles.ongoing_card}>
							<View style={styles.top}>
								<View
									style={{ ...styles.status, backgroundColor: colors.black }}
								>
									<Typography type="text16">
										{item?.schedule ? "Schedule" : "Normal delivery"}
									</Typography>
								</View>

								<View style={styles.status}>
									<Typography type="text14" sx={{ color: colors.black }}>
										{moment(item?.createdAt).format("h:mm a")}
									</Typography>
								</View>
							</View>
							<View style={{ flexDirection: "row", gap: 10 }}>
								<RequesIcon height={hp("12%")} />
								<View style={{ gap: 15 }}>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											Pick up from
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											<Typography
												type="text16"
												fontfamily={font.DMSans_700Bold}
												sx={{ color: colors.white }}
											>
												{item?.vendorId?.address}
											</Typography>
										</Typography>
									</View>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											Delivery to
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											{truncateString(item?.deliveryAddress, 40)}
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
							<Show>
								<Show.When isTrue={true}>
									<View style={{ gap: 10 }}>
										<CustButton
											type="rounded"
											onPress={async () => {
												mutate({
													id: item?._id,
													orderStatus: "in-transit",
													isAfrilish: true,
												});
												// await cacheAuthData("destination", {
												// 	step: 2,
												// 	to: {
												// 		longitude: item?.locationCoord?.coordinates[0],
												// 		latitude: item?.locationCoord?.coordinates[1],
												// 	},
												// });
												// navigation.navigate("Home");
											}}
											sx={{
												//  opacity: isPending ? 0.5 : 1,
												width: "100%",
											}}
										>
											<Typography type="text16" sx={{ color: colors.black }}>
												{/* Proceede to pick up */}
												I’ve picked order up
											</Typography>
										</CustButton>
									</View>
								</Show.When>
								<Show.When isTrue={!true}>
									<View style={{ gap: 10 }}>
										<CustButton
											type="rounded"
											onPress={async () => {
												await cacheAuthData("destination", {
													step: 1,
													to: {
														longitude:
															item?.vendorId?.locationCoord?.coordinates[0],
														latitude:
															item?.vendorId?.locationCoord?.coordinates[1],
													},
												});
												navigation.navigate("Home");
											}}
											sx={{
												width: "100%",
											}}
										>
											<Typography type="text16" sx={{ color: colors.black }}>
												Proceed to pick up
											</Typography>
										</CustButton>

										<Typography
											type="text14"
											sx={{ color: colors.white, textAlign: "center" }}
										>
											If you don’t pick up in 10 mins, this order will be
											re-assigned to a different rider2333
										</Typography>
									</View>
								</Show.When>
							</Show>
						</View>
					</Pressable>
				</Show.When>
				<Show.When isTrue={type === "in-transit"}>
					<Pressable onPress={onPress}>
						<View style={styles.ongoing_card}>
							<View style={styles.top}>
								<Typography type="text16">
									{item?.schedule ? "Schedule" : "Normal delivery"}
								</Typography>
								<View style={styles.status}>
									<Typography type="text14" sx={{ color: colors.black }}>
										{moment(item?.createdAt).format("h:mm a")}
									</Typography>
								</View>
							</View>
							<View style={styles.direction}>
								<Typography type="text14" sx={{ color: colors.white }}>
									Pick up from
								</Typography>
								<Typography
									type="text16"
									fontfamily={font.DMSans_700Bold}
									sx={{ color: colors.white }}
								>
									{item?.vendorId?.address}
								</Typography>
							</View>
							<OngoingIcon />
							<View style={styles.direction}>
								<Typography type="text14" sx={{ color: colors.white }}>
									Delivery to
								</Typography>
								<Typography
									type="text16"
									fontfamily={font.DMSans_700Bold}
									sx={{ color: colors.white }}
								>
									{item?.deliveryAddress}
								</Typography>
							</View>
							<View style={{ gap: 10 }}>
								<CustButton
									type="rounded"
									sx={{ width: "100%" }}
									onPress={confirm}
								>
									<Typography type="text16" sx={{ color: colors.black }}>
										I’ve arrived to deliver order
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
				<Show.Else>
					<Pressable onPress={onPress}>
						<View style={styles.ongoing_card}>
							<View style={styles.top}>
								<View style={styles.status}>
									<Typography type="text14" sx={{ color: colors.black }}>
										{moment(item?.createdAt).format("h:mm a")}
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
			<LoadingComponent display={isPending} />
		</>
	);
}

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
	single_order_banner: {
		width: "100%",
		padding: 12,
		backgroundColor: colors.grey_a,
		borderRadius: 15,
		gap: 10,
		paddingHorizontal: 15,
	},
});
