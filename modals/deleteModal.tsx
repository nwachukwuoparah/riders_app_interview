import React, { useContext, useEffect } from "react";
import BottomModal from "./index";
import { Alert, StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import CustButton from "../components/button";
import LoadingComponent from "../components/loading";
import { handleError, logOut } from "../helpers";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { deleteAccount, deleteBankAccount } from "../helpers/mutate";
import { clearAuthData } from "../utilities/storage";
import { KeyboardView } from "../components/container";
import { UserContext } from "../components/contex/userContex";

export default function DeleteModal({
	deleteRef,
	modalOpen,
	closeModal,
	navigation,
	CommonActions,
	type
}: any) {
	const queryClient = useQueryClient();

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

	const { isPending: bankPending, mutate: bankMutate } = useMutation({
		mutationFn: deleteBankAccount,
		onSuccess: async (data) => {
			navigation.navigate("bankInfo")
			Alert.alert("Message", data?.data?.msg)
			queryClient.invalidateQueries("get-profile" as QueryFilters);
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});

	const onSubmit = () => {
		if (type === "bank") {
			bankMutate();
		} else {
			mutate();
		}
	}

	return (
		<>
			<BottomModal
				bottomSheetModalRef={deleteRef}
				open={modalOpen}
				handleClose={closeModal}
				snapMin="20%"
				snapMax={type !== "bank" ? "32%" : "25%"}
			>
				<KeyboardView sx={{ flex: 1.2 }}>
					<View style={styles.top}>
						<CustButton
							type="close"
							sx={{ color: colors.white }}
							onPress={closeModal}
						/>
						<Typography type="text16" sx={{ color: colors.white }}>
							{type === "bank" ? "Delete bank information" : "Delete account"}
						</Typography>
						<CustButton
							type="close"
							sx={{ color: colors.white, opacity: 0 }}
						/>
					</View>
					<View style={styles.body}>
						<View style={{ alignItems: "center", width: "70%", gap: 5 }}>
							<Typography type="text14" sx={{ color: colors.white, textAlign: "center" }}>
								{type === "bank" ? "You are totally erasing your bank details" : "You are totally erasing your data and account by deleting your account"}
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
								{type !== "bank" && <CustButton
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
								</CustButton>}
							</View>
						</View>
					</View>
				</KeyboardView>
			</BottomModal>
			<LoadingComponent display={isPending|| bankPending} />
		</>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: "5%",
		alignItems: "center",
		paddingBottom: "1%",
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


// import React, { useContext } from "react";
// import {
// 	Alert,
// 	Modal,
// 	Pressable,
// 	StyleSheet,
// 	View,
// } from "react-native";
// import Typography from "../components/typography";
// import colors from "../constant/theme";
// import { InputComponent } from "../components/input";
// import CustButton from "../components/button";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { deleteAccountType, riderOtpType } from "../types";
// import { deleteAccountSchems, verifySchems } from "../utilities/schema";
// import { KeyboardView } from "../components/container";
// import { clearAuthData } from "../utilities/storage";
// import { handleError, logOut } from "../helpers";
// import { useMutation } from "@tanstack/react-query";
// import { deleteAccount } from "../helpers/mutate";
// import LoadingComponent from "../components/loading";
// import { UserContext } from "../components/contex/userContex";

// export default function DeleteAccountModal({ closeModal, modalOpen, navigation, CommonActions }: any) {





// 	return (
// 		<Modal
// 			visible={modalOpen}
// 			animationType="slide"
// 			transparent={true}
// 		>
// 			<Pressable
// 				style={{ flex: 2.4, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
// 				onPress={closeModal}
// 			></Pressable>

// 			
// 			<LoadingComponent display={isPending} />
// 		</Modal>
// 	);
// }

