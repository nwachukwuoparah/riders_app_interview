import React, { useContext, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	KeyboardView,
	ScrollContainer,
} from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserTypes } from "../../types";
import { updateUserSchems } from "../../utilities/schema";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { updateProfile } from "../../helpers/mutate";
import LoadingComponent from "../../components/loading";
import { UserContext } from "../../components/contex/userContex";
import { handleError } from "../../helpers";

export default function Profile_Details({ navigation }: any) {
	const { userData } = useContext(UserContext);
	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<updateUserTypes | any>({
		resolver: yupResolver(updateUserSchems),
		defaultValues: {
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			phone: userData?.phone,
			email: userData?.email,
			dateOfBirth: userData?.dateOfBirth,
		},
	});

	const { isPending, mutate, error } = useMutation({
		mutationFn: updateProfile,
		onSuccess: async (data) => {
			Alert.alert("Message", data?.data?.msg);
			queryClient.invalidateQueries("get-profile" as QueryFilters);
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});

	const onSubmit = (data: updateUserTypes) => {
		mutate(data);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ flex: 1, gap: 15 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.title}>
						<CustButton
							type="back"
							sx={{ color: colors.white }}
							onPress={() => navigation.goBack()}
						/>
						<Typography type="text24">My account details</Typography>
					</View>
					<View style={{ width: "22%" }}>
						<CustButton
							sx={{
								width: "100%",
								backgroundColor: colors.white,
								paddingVertical: 13,
							}}
							type="rounded"
							onPress={handleSubmit(onSubmit)}
						>
							<Typography type="text16" sx={{ color: colors.black }}>
								Edit
							</Typography>
						</CustButton>
					</View>
				</View>
				<ScrollContainer innerStyles={{ paddingBottom: 100 }}>
					<KeyboardView sx={{ gap: 50, flex: 1 }}>
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="First name"
								type="text"
								control={control}
								errors={errors}
								placeholder="enter first name"
								name="firstName"
							/>
							<InputComponent
								label="Last name "
								type="text"
								control={control}
								errors={errors}
								placeholder="enter last name"
								name="lastName"
							/>
							<InputComponent
								label="Phone number"
								type="phone"
								control={control}
								errors={errors}
								name="phone"
								defaultValue={userData?.phone}
							/>
							<InputComponent
								label="Email address"
								type="text"
								control={control}
								errors={errors}
								placeholder="enter your email"
								name="email"
							/>
							<InputComponent
								label="Date of birth"
								type="date"
								mode="date"
								control={control}
								errors={errors}
								name="dateOfBirth"
								defaultValue={userData?.dateOfBirth}
							/>
						</View>
					</KeyboardView>
				</ScrollContainer>
			</InnerWrapper>

			<View style={styles.buttonCont}>
				<CustButton
					sx={{ width: "100%", backgroundColor: colors.tint_a }}
					type="rounded"
					onPress={() => navigation.navigate("login")}
				>
					<Typography type="text16" sx={{ color: colors.red }}>
						Delete account
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
		gap: 25,
		flex: 1,
	},
	buttonCont: {
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
	},
});
