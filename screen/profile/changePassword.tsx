import React, { useEffect } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { changePasswordSchems } from "../../utilities/schema";
import { changePassword } from "../../helpers/mutate";
import { changePasswordWithConfirmType, changePasswordType } from "../../types";
import LoadingComponent from "../../components/loading";

export default function ChangePassword({ navigation }: any) {

	const {
		control,
		handleSubmit,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<changePasswordWithConfirmType>({
		resolver: yupResolver(changePasswordSchems),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: changePassword,
		onSuccess: async (data) => {
			console.log(data?.data);
			Alert.alert("Message", data?.data?.msg);
		},
		onError: (err) => {
			console.error(JSON.stringify(err, null, 2));
		},
	});

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

	const onSubmit = (data: changePasswordWithConfirmType) => {
		const { confirmPassword, ...others } = data;
		mutate(others);
		// console.log(others);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<View style={styles.title}>
					<CustButton
						type="back"
						color={colors.white}
						onPress={() => navigation.goBack()}
					/>
					<Typography type="text24">Reset my password</Typography>
				</View>
				<View style={{ ...styles.inputContain }}>
					<InputComponent
						label="Enter old password"
						type="hidden"
						name="oldPassword"
						control={control}
						errors={errors}
						placeholder="Old password"
						watch={watch}
					/>
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
