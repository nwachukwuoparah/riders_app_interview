import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ProfileIcon from "../../assets/svg/profileIcon.svg";
import { Pressable, TouchableOpacity, View } from "react-native";
import colors from "../../constant/theme";
import Typography from "../typography";
import Show from "../show";

export default function ProfileCard({
	type,
	index = 0,
	value,
	onPress,
	label,
	check,
}: {
	type?: string;
	index?: number | undefined;
	value?: string;
	label?: string;
	check?: boolean;
	onPress?: () => void;
}) {
	return (
		<Show>
			<Show.When isTrue={type === "profile"}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						borderWidth: 0.2,
						borderColor: colors.grey,
						backgroundColor: colors.grey_a,
						borderTopRightRadius: index < 1 ? 15 : 0,
						borderTopLeftRadius: index < 1 ? 15 : 0,
						padding: 10,
						paddingVertical: 15,
					}}
				>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{
								gap: 10,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<View
								style={{
									borderWidth: 0.5,
									backgroundColor: colors.black,
									padding: 10,
									borderRadius: 20,
									borderColor: colors.yellow,
								}}
							>
								<ProfileIcon />
							</View>
							<Typography
								type="text16"
								sx={{
									color: colors.white,
								}}
							>
								{value}
							</Typography>
						</View>
						<AntDesign name="right" size={15} color={colors.white} />
					</View>
				</View>
			</Show.When>
			<Show.When isTrue={type === "workHours"}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						borderWidth: 0.2,
						borderColor: colors.grey,
						backgroundColor: colors.grey_a,
						borderTopRightRadius: index < 1 ? 15 : 0,
						borderTopLeftRadius: index < 1 ? 15 : 0,
						padding: 10,
						paddingVertical: 15,
					}}
				>
					<View
						style={{
							width: "95%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{
								gap: 10,
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: 10,
							}}
						>
							<Typography
								type="text16"
								sx={{
									color: colors.white,
								}}
							>
								{label}
							</Typography>
						</View>
						<View
							style={{
								width: 45,
								padding: 3,
								backgroundColor: check ? colors.tint : colors.grey_b,
								borderRadius: 20,
								overflow: "hidden",
							}}
						>
							<View
								style={{
									padding: 10,
									backgroundColor: check ? colors.yellow : colors.grey,
									alignSelf: check ? "flex-end" : "flex-start",
									borderRadius: 10,
								}}
							></View>
						</View>
					</View>
				</View>
			</Show.When>
			<Show.Else>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						borderWidth: 0.2,
						borderColor: colors.grey,
						backgroundColor: colors.grey_a,
						borderRadius: 5,
						padding: 10,
					}}
				>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{
								gap: 5,
							}}
						>
							<Typography
								type="text16"
								sx={{
									color: colors.white,
								}}
							>
								21/04/2024
							</Typography>
							<Typography
								type="text16"
								sx={{
									color: colors.white,
								}}
							>
								09:00am
							</Typography>
						</View>
						<Typography
							type="text16"
							sx={{
								color: "red",
							}}
						>
							-£125
						</Typography>
					</View>
				</View>
			</Show.Else>
		</Show>
	);
}
