import React from "react";
import BottomModal from "./index";
import {
	Alert,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import { InputComponent } from "../components/input";
import CustButton from "../components/button";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { riderOtpType } from "../types";
import { verifySchems } from "../utilities/schema";
import { confirmOrder } from "../helpers/mutate";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { handleError } from "../helpers";
import LoadingComponent from "../components/loading";
import { KeyboardView } from "../components/container";

export default function ConfirmModal({ closeModal, modalOpen, orderID }: any) {
	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<riderOtpType>({
		resolver: yupResolver(verifySchems),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: confirmOrder,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-order" as QueryFilters);
			Alert.alert("Message", data?.data?.msg);
			closeModal();
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	}); 

	return (
		<Modal
			visible={modalOpen}
			animationType="slide"
			transparent={true}
		>
			<Pressable
				style={{ flex: 2.1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
				onPress={closeModal}
			></Pressable>

			<KeyboardView sx={{ flex: 1.2 }}>
				<View style={styles.top}>
					<Typography type="text16" sx={{ color: colors.white }}>
						Enter pick up code
					</Typography>
					<CustButton
						type="close"
						sx={{ color: colors.white }}
						onPress={closeModal}
					/>
				</View>
				<View style={styles.body}>
					<Typography type="text16" sx={{ color: colors.white }}>
						Ask customer to give you 4-digit pick up code
					</Typography>
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
								mutate({
									id: orderID,
									pickUpCode: data?.otp,
									schedule: false,
								});
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
