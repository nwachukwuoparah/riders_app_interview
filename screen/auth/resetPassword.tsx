import React, { useEffect, useState } from "react";
import {
	Alert,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordSchems } from "../../utilities/schema";
import { resendOtp, resetPassword } from "../../helpers/mutate";
import { resetPasswordWithConfirmType } from "../../types";
import LoadingComponent from "../../components/loading";
import { clearAuthData, getCachedAuthData } from "../../utilities/storage";
import { font } from "../../utilities/loadFont";
import { handleError } from "../../helpers";

export default function ResetPassword({ navigation }: any) {
	const [resend, setResend] = useState<number>(10);
	const {
		control,
		handleSubmit,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<resetPasswordWithConfirmType>({
		resolver: yupResolver(resetPasswordSchems),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: resetPassword,
		onSuccess: async (data) => {
			await clearAuthData("reset-email");
			navigation.navigate("login");
			Alert.alert("Message", `${data?.data?.msg}`);
		},
		onError: (err) => {
			handleError(err);
		},
	});

	const { isPending: resend_otp_pending, mutate: resend_otp_mutate } =
		useMutation({
			mutationFn: resendOtp,
			onSuccess: async (data) => {
				Alert.alert("Message", `${data?.data?.msg}`);
			},
			onError: async (err: { msg: string; success: boolean }) => {
				handleError(err);
			},
		});

	const onSubmit = async (data: resetPasswordWithConfirmType) => {
		const { confirmPassword, ...others } = data;
		const email = await getCachedAuthData("reset-email");
		mutate({ ...others, email }); 
	};

	useEffect(() => {
		(() => {
			if (watch("confirmPassword") !== watch("newPassword")) {
				setError("confirmPassword", {
					type: "manual",
					message: "Passwords do not match",
				});
			} else {
				clearErrors("confirmPassword");
			}
		})();
	}, [watch("newPassword"), watch("confirmPassword")]);

	useEffect(() => {
		let interval = setInterval(() => {
			setResend((prev: number) => (prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Container>
			<LoadingComponent display={isPending || resend_otp_pending} />
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<View style={styles.title}>
					<View style={{ gap: 5 }}>
						<Typography type="text24">Reset my password</Typography>
						<Typography type="text16" fontfamily={font.DMSans_400Regular}>
							Enter the OTP sent to your email{" "}
						</Typography>
					</View>
					<TouchableOpacity
						onPress={async () => {
							await clearAuthData("reset-email");
							navigation.goBack();
						}}
					>
						<Typography
							type="text14"
							sx={{ color: colors.tint, textDecorationLine: "underline" }}
						>
							Change email address
						</Typography>
					</TouchableOpacity>
				</View>
				<View style={{ ...styles.inputContain }}>
					<View
						style={{
							borderBottomWidth: 2,
							paddingBottom: "7%",
							borderColor: colors.grey_a,
						}}
					>
						<InputComponent
							label="Enter otp"
							type="otp"
							name="otp"
							control={control}
							errors={errors}
						/>
					</View>
					<InputComponent
						label="Enter new password"
						type="hidden"
						name="newPassword"
						control={control}
						errors={errors}
						placeholder="New password"
						watch={watch}
					/>
					<InputComponent
						label="Confirm new password"
						type="hidden"
						name="confirmPassword"
						control={control}
						errors={errors}
						placeholder="Confirm new password"
						watch={watch}
					/>
					<TouchableOpacity
						onPress={async () => {
							if (resend === 0) {
								const email = await getCachedAuthData("reset-email");
								resend_otp_mutate({email});
							}
						}}
						style={{
							alignSelf: "center",
							backgroundColor: colors.grey_a,
							width: "100%",
							paddingVertical: 15,
							borderRadius: 25,
							alignItems: "center",
							marginTop: "10%",
							opacity: resend === 0 ? 1 : 0.6,
						}}
					>
						<Typography
							type="text14"
							sx={{ color: colors.white, textAlign: "center", width: "80%" }}
						>
							Didn’t receive a link in your mail?{" "}
							<Typography
								type="text14"
								sx={{ color: "#B09000", textDecorationLine: "underline" }}
							>
								Resend token
							</Typography>{" "}
							in {resend} s
						</Typography>
					</TouchableOpacity>
				</View>
			</InnerWrapper>

			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Reset password
					</Typography>
				</CustButton>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 15,
	},
	inputContain: {
		gap: 20,
		flex: 1,
	},
	buttonCont: {
		width: "100%",
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
