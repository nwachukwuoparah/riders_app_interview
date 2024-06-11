import React, { useEffect } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
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
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useForm } from "react-hook-form";
import { signUpTypes } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../helpers/mutate";
import LoadingComponent from "../../components/loading";
import { cacheAuthData, clearAuthData } from "../../utilities/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchems } from "../../utilities/schema";
import { handleError } from "../../helpers";

export default function SignUp({ navigation }: any) {
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<signUpTypes | any>({
		resolver: yupResolver(signUpSchems),
	});

	const { isPending, mutate, error } = useMutation({
		mutationFn: createUser,
		onSuccess: async (data) => {
			await cacheAuthData("user-data", {
				token: data?.data?.data?.token,
				status: false,
			});
			Alert.alert("Message", data?.data?.msg);
			cacheAuthData("step", 1);
			navigation.navigate("verifyRider");
		},
		onError: async (err: { msg: string; success: boolean }) => {
			await clearAuthData("verify-email");
			handleError(err);
		},
	});

	const onSubmit = async (data: signUpTypes) => {
		await cacheAuthData("verify-email", watch("email"));
		mutate(data);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ width: "100%", flex: 1 }}>
				<KeyboardView sx={{ width: "100%", flex: 1 }}>
					<>
						<View style={styles.title}>
							<Typography type="text24">Let’s get you started</Typography>
							<Typography type="text16">
								We need some personal info to create your account
							</Typography>
							<View style={{ flexDirection: "row", width: "100%", gap: 5 }}>
								{[1, 2, 3, 4, 5].map((i, index) => (
									<View
										key={index}
										style={{
											flex: 1,
											backgroundColor: index < 1 ? colors.tint : colors.grey_a,
											height: 7,
											borderRadius: 5,
										}}
									></View>
								))}
							</View>
						</View>
						<ScrollContainer innerStyles={{ paddingBottom: 30 }}>
							<View style={{ ...styles.inputContain }}>
								<InputComponent
									label="Your first name"
									type="text"
									placeholder="enter your first name"
									control={control}
									errors={errors}
									name="firstName"
									autoFocus={true}
								/>
								<InputComponent
									label="Your last name "
									type="text"
									placeholder="enter your last name"
									control={control}
									errors={errors}
									name="lastName"
								/>
								<InputComponent
									label="Your phone number"
									type="phone"
									name="phone"
									control={control}
									errors={errors}
								/>
								<InputComponent
									label="Your email address"
									type="text"
									placeholder="enter your email"
									control={control}
									errors={errors}
									name="email"
								/>
								{/* <InputComponent
									label="Your email address"
									type="text"
									placeholder="enter your email"
									control={control}
									errors={errors}
									name="email"
								/> */}
								<InputComponent
									label="Date of birth"
									type="date"
									mode="date"
									control={control}
									errors={errors}
									name="dateOfBirth"
								/>
								<InputComponent
									label="Create your password"
									type="hidden"
									placeholder="enter your password"
									control={control}
									errors={errors}
									name="password"
									watch={watch}
								/>
							</View>
						</ScrollContainer>
					</>
				</KeyboardView>
				<View style={styles.buttonCont}>
					<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
						<Typography type="text16" sx={{ color: colors.black }}>
							Sign up
						</Typography>
					</CustButton>
					<CustButton onPress={() => navigation.navigate("login")}>
						<Typography type="text16">
							Are you already a rider here?
							<Typography type="text16" sx={{ color: colors.yellow }}>
								Log in
							</Typography>
						</Typography>
					</CustButton>
				</View>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
		marginHorizontal: "5%",
		marginBottom: 10,
	},
	inputContain: {
		gap: 20,
		marginHorizontal: "5%",
		marginBottom: 20,
		width: wp("90%"),
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
