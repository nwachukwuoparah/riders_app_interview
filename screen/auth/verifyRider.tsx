import React, { useEffect, useState } from "react";
import {
	Alert,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	KeyboardView,
} from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { verifySchems } from "../../utilities/schema";
import { resendOtp, verifyUser } from "../../helpers/mutate";
import { riderOtpType } from "../../types";
import LoadingComponent from "../../components/loading";
import {
	cacheAuthData,
	clearAuthData,
	getCachedAuthData,
} from "../../utilities/storage";
import { font } from "../../utilities/loadFont";
import Set_upModal from "../../modals/setupModal";
import { handleError, truncateString } from "../../helpers";

export default function VerifyRider({ navigation }: any) {
	const [resend, setResend] = useState<number>(30);
	const [email, setEmail] = useState<string>("");
	const {
		control,
		handleSubmit,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<riderOtpType>({
		resolver: yupResolver(verifySchems),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: verifyUser,
		onSuccess: async (data) => {
			await cacheAuthData("step", 2);
			navigation.navigate("verifyVehicle");
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
				setResend(30);
			},
		});

	const onSubmit = async (data: riderOtpType) => {
		const email: string = await getCachedAuthData("verify-email");
		mutate({ ...data, email });
	};

	useEffect(() => {
		(async () => {
			const email = await getCachedAuthData("verify-email");
			setEmail(email);
		})();
		let interval = setInterval(() => {
			setResend((prev: number) => (prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Container>
			<LoadingComponent display={isPending || resend_otp_pending} />
			<InnerWrapper sx={{ flex: 6 }}>
				<KeyboardView sx={{ width: "100%" }} style={{ gap: 20 }}>
					<View style={styles.title}>
						<View style={{ gap: 5 }}>
							<Typography type="text24">Enter verification code</Typography>
							<Typography type="text16" fontfamily={font.DMSans_400Regular}>
								A 4 digit code was sent to {truncateString(email, 16)}
							</Typography>
						</View>
						<TouchableOpacity
							onPress={async () => {
								await clearAuthData("verify-email");
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
						<InputComponent
							label="Enter OTP"
							type="otp"
							name="otp"
							control={control}
							errors={errors}
						/>
						<TouchableOpacity
							onPress={async () => {
								if (resend === 0) {
									const email = await getCachedAuthData("verify-email");
									resend_otp_mutate({ email });
								}
							}}
							style={{
								alignItems: "center",
								marginTop: "20%",
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
				</KeyboardView>
			</InnerWrapper>
			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Verify
					</Typography>
				</CustButton>
			</View>
			<Set_upModal />
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 20,
	},
	inputContain: {
		gap: 20,
		flex: 1,
	},
	buttonCont: {
		width: "100%",
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.black_1,
		paddingTop: 25,
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
