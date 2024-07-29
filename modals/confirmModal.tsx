import React, { useEffect, useState } from "react";
import BottomModal from "./index";
import {
	Alert,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import { InputComponent } from "../components/input";
import CustButton from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { riderOtpType } from "../types";
import { verifySchems } from "../utilities/schema";
import {
	useQueryClient,
} from "@tanstack/react-query";
import { KeyboardView } from "../components/container";
import Show from "../components/show";
import { clearAuthData } from "../utilities/storage";
import { ROUTE } from "../constant/route";

export default function ConfirmModal({ toogleConfirm, modalOpen, navigation, orderType, day }: any) {
	const queryClient = useQueryClient();
	const [period, setPeriod] = useState("")

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<riderOtpType>({
		resolver: yupResolver(verifySchems),
	});

	return (
		<Modal
			visible={modalOpen}
			animationType="slide"
			transparent={true}
		>
			<Pressable
				style={{ flex: orderType ? 1.4 : 2.1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
				onPress={toogleConfirm}
			></Pressable>

			<KeyboardView sx={{ flex: 1.2 }}>
				<View style={styles.top}>
					<Typography type="text16" sx={{ color: colors.white }}>
						Enter pick up code
					</Typography>
					<CustButton
						type="close"
						sx={{ color: colors.white }}
						onPress={toogleConfirm}
					/>
				</View>
				<View style={styles.body}>
					<Typography type="text16" sx={{ color: colors.white }}>
						Ask customer to give you 4-digit pick up code
					</Typography>
					<Show.When isTrue={orderType}>
						<View style={{ flexDirection: "row", gap: 20 }}>
							{[{ period: "Breskfast", value: "breskfast" }, { period: "Lunch", value: "lunch" }, { period: "Dinner", value: "dinner" }].map((i) => (
								<TouchableOpacity onPress={() => {
									setPeriod(i?.value)
								}}>
									<View style={{
										padding: 10,
										paddingHorizontal: 20,
										borderRadius: 20,
										borderWidth: 1,
										borderColor: i?.value === period ? colors.yellow : colors.grey,
										backgroundColor: colors.grey_a
									}}>
										<Typography type="text16" sx={{ color: colors.white }}>
											{i.period}
										</Typography>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</Show.When>
					<View style={{ width: "90%", gap: 15 }}>
						<InputComponent
							type="otp"
							name="otp"
							control={control}
							errors={errors}
						/>
						<CustButton
							type="rounded"
							onPress={handleSubmit((data) => {
								Alert.alert("Success", "order delivered successfully")
								clearAuthData("destination")
								toogleConfirm()
								navigation.navigate(ROUTE.HOME)
							})}
							sx={{ width: "100%" }}
						>
							<Typography type="text16" sx={{ color: colors.black }}>
								Verify drop off
							</Typography>
						</CustButton>
					</View>
				</View>
			</KeyboardView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: "5%",
		alignItems: "center",
		paddingVertical: "2%",
		justifyContent: "space-between",
		backgroundColor: colors.grey_a,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	body: {
		width: "100%",
		backgroundColor: colors.black_1,
		flex: 3,
		alignItems: "center",
		paddingTop: "6%",
		gap: 15,
	},
	order: {
		borderWidth: 1,
		borderColor: colors.yellow,
		padding: 10,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		backgroundColor: colors.grey_a,
	},
});
