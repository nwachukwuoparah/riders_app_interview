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
import { verifySchems } from "../../utilities/schema";
import { riderOtpType, RootStackParamList } from "../../types";
import {
	clearAuthData,
	getCachedAuthData,
} from "../../utilities/storage";
import { font } from "../../utilities/loadFont";
import { truncateString } from "../../helpers";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ROUTE } from "../../constant/route";

type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type VerifyScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: VerifyScreenNavigationProp;
	route: VerifyScreenRouteProp;
};

export default function VerifyRider({ navigation }: Props) {
	const [resend, setResend] = useState<number>(30);
	const [email, setEmail] = useState<string>("");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<riderOtpType>({
		resolver: yupResolver(verifySchems),
	});

	const onSubmit = async (data: riderOtpType) => {
		console.log(data);
		navigation.navigate(ROUTE.USER_STACK)
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
								await clearAuthData("step");
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
							secureTextEntry={true}
						/>
						<TouchableOpacity
							onPress={async () => {
								if (resend === 0) {
									Alert.alert("Success", "Otp sent to example@gmail.com")
									setResend(30)
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
