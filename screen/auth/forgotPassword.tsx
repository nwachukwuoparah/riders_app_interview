import { Alert, Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { useForm } from "react-hook-form";
import { forgetTypes } from "../../types";
import { cacheAuthData, clearAuthData } from "../../utilities/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetSchems } from "../../utilities/schema";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../helpers/mutate";
import LoadingComponent from "../../components/loading";
import { useEffect, useState } from "react";
import { handleError } from "../../helpers";

export default function ForgotPassword({ navigation }: any) {
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<forgetTypes>({
		resolver: yupResolver(forgetSchems),
	});

	const { isPending, mutate, error } = useMutation({
		mutationFn: forgotPassword,
		onSuccess: async (data) => {
			Alert.alert("Message", `${data?.data?.msg}`);
			navigation.navigate("resetPassword");
		},
		onError: async (err: { msg: string; success: boolean }) => {
			handleError(err)
			await clearAuthData("reset-email");
		},
	});

	const onSubmit = async (data: forgetTypes) => {
		await cacheAuthData("reset-email", watch("email"));
		mutate(data);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<View style={styles.title}>
					<Typography type="text24">Forgot your password?</Typography>
					<Typography type="text16">
						Enter the email you used to register{" "}
					</Typography>
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
					<Typography
						type="text14"
						sx={{ color: colors.white, alignSelf: "center" }}
					>
						We’ll send a password reset link to this email
					</Typography>
				</View>
			</InnerWrapper>
			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Send link
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
		gap: 10,
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
