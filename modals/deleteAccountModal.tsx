import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
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
import { KeyboardView } from "../components/container";
import { clearAuthData } from "../utilities/storage";
import { logOut } from "../helpers";

export default function DeleteAccountModal({ closeModal, modalOpen,navigation, CommonActions }: any) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<riderOtpType>({
		resolver: yupResolver(verifySchems),
	});

	// const { isPending, mutate } = useMutation({
	// 	mutationFn: confirmOrder,
	// 	onSuccess: async (data) => {
	// 		queryClient.invalidateQueries("get-order" as QueryFilters);
	// 		Alert.alert("Message", data?.data?.msg);
	// 		closeModal();
	// 	},
	// 	onError: (err: { msg: string; success: boolean }) => {
	// 		handleError(err);
	// 	},
	// });

	return (
		<Modal
			visible={modalOpen}
			animationType="slide"
			transparent={true}
		>
			<Pressable
				style={{ flex: 1.5, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
				onPress={closeModal}
			></Pressable>

			<KeyboardView sx={{ flex: 1.2 }}>
				<View style={styles.top}>
					<Typography type="text16" sx={{ color: colors.white }}>
						Let’s verify this is you
					</Typography>
					<CustButton
						type="close"
						sx={{ color: colors.white }}
						onPress={closeModal}
					/>
				</View>
				<View style={styles.body}>
					<View style={{ alignItems: "center", width: "70%", gap: 5 }}>
						<Typography type="text16" sx={{ color: colors.white }}>
							Enter your app pin
						</Typography>
						<Typography type="text14" sx={{ color: colors.white, textAlign: "center" }}>
							You are totally erasing your data and account by deleting your account
						</Typography>
					</View>
					<View style={{ width: "90%", gap: 15 }}>
						<InputComponent
							type="otp"
							name="otp"
							control={control}
							errors={errors}
						/>
						<View style={{ gap: 5 }}>
							<CustButton
								type="rounded"
								onPress={handleSubmit((data) => {
									console.log(data);
								})}
								sx={{ width: "100%", backgroundColor: colors.red }}
								color={colors.red}
							>
								<Typography type="text16" sx={{ color: colors.white }}>
									Delete my account permanently
								</Typography>
							</CustButton>
							<CustButton
								type="rounded"
								onPress={async () => {
									await clearAuthData("user-data");
									logOut(navigation, CommonActions)
								}}
								sx={{ width: "100%", backgroundColor: "transprant" }}
								color={colors.red}
							>
								<Typography type="text16" sx={{ color: colors.white }}>
									I want to logout
								</Typography>
							</CustButton>
						</View>
					</View>
				</View>
			</KeyboardView>
			{/* <LoadingComponent display={isPending} /> */}
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
		backgroundColor: colors.black,
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
