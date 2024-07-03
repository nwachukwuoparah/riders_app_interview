import React, { useCallback } from "react";
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
import { logInTypes } from "../../types";
import { useFocusEffect } from "@react-navigation/native";
import {
	cacheAuthData,
	clearAuthData,
	getCachedAuthData,
} from "../../utilities/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchems } from "../../utilities/schema";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../helpers/mutate";
import LoadingComponent from "../../components/loading";
import { handleError } from "../../helpers";

export default function Login({ navigation }: any) {

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<logInTypes>({
		resolver: yupResolver(loginSchems),
	});

	useFocusEffect(
		useCallback(() => {
			(async () => {
				// await clearAuthData("step");
				try {

					const step = await getCachedAuthData("step");
					const reset_email = await getCachedAuthData("reset-email");
					if (reset_email) {
						navigation.navigate("resetPassword");
					}
					if (step === 1) {
						navigation.navigate("verifyRider");
					} else if (step === 2) {
						navigation.navigate("verifyVehicle");
					} else if (step === 3) {
						navigation.navigate("verifyAddress");
					} else if (step === 4) {
						navigation.navigate("guarantorForm");
					} else if (step === 5) {
						navigation.navigate("capture");
					}
				} catch (err) {
					return null;
				}
			})();
		}, [])
	);

	const { isPending, mutate, error } = useMutation({
		mutationFn: login,
		onSuccess: async (data) => {
			await cacheAuthData("user-data", {
				token: data?.data?.data?.token,
				status: true,
			});
			navigation.navigate("UserStack");
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});

	const onSubmit = (data: logInTypes) => {
		mutate(data);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<View style={styles.title}>
					<Typography type="text24">Welcome back!</Typography>
					<Typography type="text16">Login to continue</Typography>
				</View>
				<View style={{ ...styles.inputContain }}>
					<InputComponent
						label="Enter your email address"
						type="text"
						control={control}
						errors={errors}
						name="email"
						placeholder="Email"
					/>
					<InputComponent
						label="Enter your password"
						type="hidden"
						control={control}
						errors={errors}
						name="password"
						placeholder="password"
						watch={watch}
					/>
					<TouchableOpacity
						onPress={() => navigation.navigate("forgotPassword")}
						style={{ alignSelf: "flex-end" }}
					>
						<Typography type="text14" sx={{ color: colors.white }}>
							Forgot password?{"  "}
							<Typography
								type="text14"
								sx={{ color: "#B09000", textDecorationLine: "underline" }}
							>
								Click here
							</Typography>
						</Typography>
					</TouchableOpacity>
				</View>
			</InnerWrapper>
			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Log in
					</Typography>
				</CustButton>
				<CustButton onPress={() => navigation.navigate("signUp")}>
					<Typography type="text16">
						Are you a new rider?{" "}
						<Typography type="text16" sx={{ color: colors.yellow }}>
							Register here
						</Typography>
					</Typography>
				</CustButton>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
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
