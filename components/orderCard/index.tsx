import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity, Alert } from "react-native";
import Typography from "../typography";
import colors from "../../constant/theme";
import CustButton from "../button";
import Show from "../show";
import RequesIcon from "../../assets/svg/requesIcon.svg";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { truncateString } from "../../helpers";
import { cacheAuthData, getCachedAuthData } from "../../utilities/storage";
import { font } from "../../utilities/loadFont";
import moment from "moment";
import { ROUTE } from "../../constant/route";
import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type OrderDetailsNavigationProp = StackNavigationProp<RootStackParamList>;

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
	navigation: OrderDetailsNavigationProp;
}) {
	const [destination, setDestination] = useState<{ step: number, to: { latitude: number, longitude: number } }>();

	const fetchDestination = useCallback(async () => {
		const destination = await getCachedAuthData("destination");
		setDestination(destination);
	  }, []);
	  
	 useFocusEffect(
		useCallback(() => {
		  fetchDestination();
		}, [destination])
	  );

	return (
		<>
			<Show>
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
												{item?.seller?.address?.street}
											</Typography>
										</Typography>
									</View>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											Delivery to
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											{item?.buyer?.address?.street}
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
											£ {item?.totalPrice}
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
								<Show.When isTrue={!destination}>
									<CatButton
										onPress={async () => {
											await cacheAuthData("destination", {
												step: 1,
												to: { ...item?.buyer?.coordinates }
											});
											navigation.navigate(ROUTE.HOME);
										}}
										buttonText="Proceed to pick up"
										text="If you don’t pick up in 10 mins, this order will be
											re-assigned to a different rider"
									/>
								</Show.When>
 
								<Show.When isTrue={destination?.step === 1}>
									<CatButton onPress={confirm}
										buttonText="I’ve arrived to deliver the order"
										text="Let the buyer know when you’ve reached their destination"
									/>
								</Show.When>
							</Show>
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
											{item?.buyer?.address?.street}
										</Typography>
									</View>
									<View style={styles.direction}>
										<Typography type="text14" sx={{ color: colors.white }}>
											From
										</Typography>
										<Typography type="text16" sx={{ color: colors.white }}>
											<Typography type="text16" sx={{ color: colors.white }}>
												{item?.seller?.address?.street}
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
										<Typography type="text14">02:00pm</Typography>
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
										<Typography type="text14">05:00pm</Typography>
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


const CatButton = ({ onPress, buttonText, text }: any) => {
	return (
		<View style={{ gap: 10 }}>
			<CustButton
				type="rounded"
				onPress={onPress}
				sx={{
					width: "100%",
				}}
			>
				<Typography type="text16" sx={{ color: colors.black }}>
					{buttonText}
				</Typography>
			</CustButton>
			{text && <Typography
				type="text14"
				sx={{ color: colors.white, textAlign: "center" }}
			>
				{text}
			</Typography>}
		</View>
	)
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
