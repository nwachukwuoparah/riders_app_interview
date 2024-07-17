import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import colors from "../../constant/theme";
import Typography from "../typography";
import CustButton from "../button";
import Show from "../show";
import { font } from "../../utilities/loadFont";
import Clock from "../../assets/svg/clock.svg";
import RequesIcon from "../../assets/svg/requesIcon.svg";
import { requestCardType } from "../../types";
import { handleError, truncateString } from "../../helpers";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { acceptOrder, updateUser } from "../../helpers/mutate";
import { Lottile } from "../lottile";

export default function RequestCard({ item, navigate }: requestCardType) {
	const queryClient = useQueryClient();

	const { isPending, mutate } = useMutation({
		mutationFn: acceptOrder,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
			userMutate({ status: "off-line" });
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});

	const { isPending: userUpdate, mutate: userMutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
			Alert.alert("Success", "Status updated successfuly");
			navigate()
		},
		onError: (err: { msg: string; success: boolean }) => {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const aceptOrder = () => {
		mutate({ id: item._id });
	};

	useEffect(() => {
		console.log(JSON.stringify(item, null, 2));
	}, []) 

	return (
		<View style={styles.card}>
			<View style={styles.card_top}>
				<View style={{ marginLeft: 15, gap: 10 }}>
					<Typography type="text16" sx={{ color: colors.white_1 }}>
						{!item?.schedule ? "Normal delivery" : "Schedule delivery"}
					</Typography>
					<View style={styles.price_tag}>
						<Typography type="text24" sx={{ color: colors.black }}>
							{`£ ${item?.ridersFee}`}
						</Typography>
					</View>
				</View>
				<View
					style={{
						backgroundColor: colors.grey_a,
						borderRadius: 25,
						padding: 6,
					}}
				>
					<CustButton type="close" color={colors.white} />
				</View>
			</View>
			<Show>
				<Show.When isTrue={item?.schedule}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<RequesIcon />
						<View style={styles.schedule_order}>
							<View style={{ gap: 15 }}>
								<View style={styles.single_order_banner}>
									<Typography type="text14" sx={{ color: colors.white_1 }}>
										From
									</Typography>
									<Typography
										type="text16"
										fontfamily={font.DMSans_700Bold}
										sx={{ color: colors.white_1 }}
									>
										29th street, nothingham
									</Typography>
								</View>
								<View style={styles.single_order_banner}>
									<Typography type="text14" sx={{ color: colors.white_1 }}>
										From
									</Typography>
									<Typography
										type="text16"
										fontfamily={font.DMSans_700Bold}
										sx={{ color: colors.white_1 }}
									>
										{`${truncateString(item?.deliveryAddress)}`}
									</Typography>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									gap: 10,
								}}
							>
								<View style={styles.schedule_order_distance}>
									<Typography type="text12" sx={{ color: colors.white_1 }}>
										Total time
									</Typography>
									<Typography
										type="text14"
										fontfamily={font.DMSans_700Bold}
										sx={{ color: colors.white_1 }}
									>
										0 m
									</Typography>
								</View>
								<View style={styles.schedule_order_distance}>
									<Typography
										type="text12"
										sx={{
											color: colors.white_1,
											alignSelf: "flex-start",
										}}
									>
										No of trips
									</Typography>
									<Typography
										type="text14"
										fontfamily={font.DMSans_700Bold}
										sx={{
											color: colors.white_1,
											alignSelf: "flex-start",
										}}
									>
										0
									</Typography>
								</View>
								<View style={styles.schedule_order_distance}>
									<Typography type="text12" sx={{ color: colors.white_1 }}>
										Total distance
									</Typography>
									<Typography
										type="text14"
										fontfamily={font.DMSans_700Bold}
										sx={{
											color: colors.white_1,
											alignSelf: "flex-start",
										}}
									>
										{item?.totalDistance} km
									</Typography>
								</View>
							</View>
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
					</View>
				</Show.When>
				<Show.Else>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<RequesIcon />
						<View style={styles.single_order}>
							<View style={{ gap: 10, width: "100%" }}>
								<View style={styles.single_order_banner}>
									<Typography type="text14" sx={{ color: colors.white_1 }}>
										From
									</Typography>
									<Typography
										type="text16"
										fontfamily={font.DMSans_700Bold}
										sx={{ color: colors.white_1 }}
									>
										{`${truncateString(
											item?.["vendorDetails"]?.[0]?.address,
											40
										)}`}
									</Typography>
								</View>
								<View style={styles.single_order_banner}>
									<Typography type="text14" sx={{ color: colors.white_1 }}>
										To
									</Typography>
									<Typography
										type="text16"
										fontfamily={font.DMSans_700Bold}
										sx={{ color: colors.white_1 }}
									>
										{`${truncateString(item?.deliveryAddress, 40)}`}
									</Typography>
								</View>
								<View style={styles.single_order_banner}>
									<Typography type="text14" sx={{ color: colors.white_1 }}>
										Total distance
									</Typography>
									<Typography
										type="text16"
										fontfamily={font.DMSans_700Bold}
										sx={{ color: colors.white_1 }}
									>
										{`${item?.totalDistance} km`}
									</Typography>
								</View>
							</View>
							{/* <View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									// gap: 10,
									width: "25%",
								}}
							>
								<View style={styles.single_order_distance}>
									<Typography type="text12" sx={{ color: colors.white_1 }}>
										From
									</Typography>
									<Typography
										type="text16"
										fontfamily={font.DMSans_700Bold}
										sx={{ color: colors.white_1 }}
									>
										102m
									</Typography>
								</View>
								<View style={styles.single_order_distance}>
									<Typography type="text12" sx={{ color: colors.white_1 }}>
										Distance
									</Typography>
									<Typography
										type="text16"
										fontfamily={font.DMSans_700Bold}
										sx={{
											color: colors.white_1,
											alignSelf: "flex-start",
										}}
									>
										20km
									</Typography>
								</View> 
							</View>*/}
						</View>
					</View>
				</Show.Else>
			</Show>
			<CustButton type="rounded" sx={{ width: "100%" }} onPress={aceptOrder}>
				{userUpdate || isPending ? (
					<Lottile json={require("../../assets/lottile/imageFile.json")} />
				) : (
					<Typography type="text16" sx={{ color: colors.black }} fontfamily={font.DMSans_700Bold}>
						Accept order
					</Typography>
				)}
			</CustButton>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		backgroundColor: colors.black,
		borderRadius: 30,
		gap: 15,
	},
	price_tag: {
		backgroundColor: colors.yellow,
		borderRadius: 20,
		alignItems: "center",
		alignSelf: "flex-start",
		paddingVertical: 4,
		paddingHorizontal: 10,
	},
	card_top: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	schedule_order: {
		gap: 10,
		width: "95%",
		justifyContent: "space-between",
	},
	single_order: {
		gap: 10,
		width: "95%",
	},
	single_order_banner: {
		padding: 12,
		backgroundColor: colors.grey_a,
		borderRadius: 15,
		gap: 10,
		paddingHorizontal: 15,
	},
	schedule_order_distance: {
		flex: 1,
		backgroundColor: colors.grey_a,
		borderRadius: 20,
		gap: 10,
		padding: 10,
		paddingHorizomtal: 15,
	},
	single_order_distance: {
		flex: 1,
		backgroundColor: colors.grey_a,
		borderRadius: 20,
		gap: 10,
		padding: 10,
		alignItems: "center",
		paddingHorizontal: 20,
	},
});
