import React from "react";
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

export default function Ordercard({
	onPress,
	type,
	cancel,
	confirm,
}: {
	onPress?: () => void;
	type?: string;
	cancel?: () => void;
	confirm?: () => void;
}) {
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
		<Show>
			<Show.When isTrue={type === "on-going"}>
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
								29th street, nothingham
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
			<Show.When isTrue={type === "pending" || type === "completed"}>
				<Pressable onPress={onPress}>
					<View style={styles.ongoing_card}>
						<View style={styles.top}>
							<View style={{ ...styles.status, backgroundColor: colors.black }}>
								<Typography type="text16">Schedule</Typography>
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
										Kings close, notthingham
									</Typography>
								</View>
								<View style={styles.direction}>
									<Typography type="text14" sx={{ color: colors.white }}>
										From
									</Typography>
									<Typography type="text16" sx={{ color: colors.white }}>
										29th street, nothingham
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
										£12
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
										Kings close, notthingham
									</Typography>
								</View>
								<View style={styles.direction}>
									<Typography type="text14" sx={{ color: colors.white }}>
										From
									</Typography>
									<Typography type="text16" sx={{ color: colors.white }}>
										29th street, nothingham
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
	);
}
