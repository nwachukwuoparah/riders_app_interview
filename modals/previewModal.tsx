import React from "react";
import BottomModal from "./index";
import { Alert, Platform, StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import {
	Container,
	InnerWrapper,
	KeyboardView,
	ScrollContainer,
} from "../components/container";
import CustButton from "../components/button";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { InputComponent } from "../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { payOutSchems } from "../utilities/schema";
import { requestPayout } from "../helpers/mutate";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { handleError } from "../helpers";
import LoadingComponent from "../components/loading";

export default function PreviewModal({
	cancelRef,
	close,
	modalOpen,
	navigation,
	balance,
}: any) {
	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(payOutSchems),
	});

	const { isPending, mutate, error } = useMutation({
		mutationFn: requestPayout,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-wallet" as QueryFilters);
			queryClient.invalidateQueries("get-transaction" as QueryFilters);
			Alert.alert("Message", data?.data?.msg);
			close();
		},
		onError: (err) => {
			handleError(err, navigation);
		},
	});

	const submit = (data: { amount: string; userType: string }) => {
		mutate({ ...data, userType: "Rider" });
	};

	return (
		<BottomModal
			bottomSheetModalRef={cancelRef}
			open={modalOpen}
			handleClose={close}
			snapMin="25%"
			snapMax="100%"
		>
			<InnerWrapper
				sx={{
					flex: 1,
					width: "100%",
					paddingHorizontal: "5%",
					gap: 10,
					alignItems: "center",
				}}
			>
				<ScrollContainer
					innerStyles={{
						flex: 1,
						width: "100%",
						gap: 10,
						alignItems: "center",
					}}
				>
					<View style={styles.top}>
						<CustButton type="back" color={colors.white} onPress={close} />
						<Typography type="text24" sx={{ color: colors.white }}>
							Enter amount to withdraw
						</Typography>
					</View>
					<View
						style={{
							flexDirection: "row",
							width: "100%",
							height: "8%",
							borderRadius: 30,
							overflow: "hidden",
							borderWidth: 1,
							borderColor: colors.yellow,
							backgroundColor: colors.grey_a,
							justifyContent: "space-between",
						}}
					>
						<View
							style={{
								width: "15%",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: colors.grey,
							}}
						>
							<Typography sx={{ color: colors.white }} type="text24">
								£
							</Typography>
						</View>
						<InputComponent
							wrapperStyle={{
								width: "85%",
								height: "100%",
								paddingHorizontal: "10%",
								borderRadius: 0,
								borderWidth: 0,
							}}
							style={{
								textAlign: "center",
								fontSize: hp("2.2%"),
								top: 0,
							}}
							type="text"
							placeholder="Enter amount"
							control={control}
							errors={errors}
							name="amount"
							autoFocus={true}
							keyboardType="numeric"
						/>
					</View>
					<Typography sx={{ color: colors.white }} type="text14">
						Wallet Balance: £ {balance}
					</Typography>
				</ScrollContainer>
			</InnerWrapper>

			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={handleSubmit(submit)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Withdraw
					</Typography>
				</CustButton>
				<CustButton sx={{ paddingTop: "3%" }}>
					<Typography type="text16">
						Withdrawal usually takes 1-2 working days
					</Typography>
				</CustButton>
			</View>
			<LoadingComponent display={isPending} />
		</BottomModal>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "100%",
		backgroundColor: colors.grey_a,
		gap: 5,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.black_1,
		paddingTop: 15,
		...Platform.select({
			ios: {
				shadowOpacity: 0.1,
				shadowRadius: 0.5,
				shadowColor: "#6C6C6C",
				shadowOffset: { height: -2, width: 0 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
});
