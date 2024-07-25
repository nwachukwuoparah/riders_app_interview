import React, { useContext } from "react";
import {
	Alert,
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
import { deleteAccountType, riderOtpType } from "../types";
import { deleteAccountSchems, verifySchems } from "../utilities/schema";
import { KeyboardView } from "../components/container";
import { clearAuthData } from "../utilities/storage";
import { handleError, logOut } from "../helpers";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../helpers/mutate";
import LoadingComponent from "../components/loading";
import { UserContext } from "../components/contex/userContex";

export default function DeleteAccountModal1({ closeModal, modalOpen, navigation, CommonActions }: any) {
	const { userData } = useContext(UserContext);
	const { isPending, mutate } = useMutation({
		mutationFn: deleteAccount,
		onSuccess: async (data) => {
			await clearAuthData("user-data");
			logOut(navigation, CommonActions)
			Alert.alert("Message", data?.data?.msg)
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});


	const onSubmit = () => {
		mutate();
	}

	return (
		<Modal
			visible={modalOpen}
			animationType="slide"
			transparent={true}
		>
			<Pressable
				style={{ flex: 2.4, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
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
							Enter your account password
						</Typography>
						<Typography type="text14" sx={{ color: colors.white, textAlign: "center" }}>
							You are totally erasing your data and account by deleting your account
						</Typography>
					</View>
					<View style={{ width: "90%", gap: 40 }}>
						<View style={{ gap: 5 }}>
							<CustButton
								type="rounded"
								onPress={onSubmit}
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
			<LoadingComponent display={isPending} />
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
