import React from "react";
import { Platform, StyleSheet, View } from "react-native";
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
import { RootStackParamList, signUpTypes } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchems } from "../../utilities/schema";
import { ROUTE } from "../../constant/route";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type SignUpScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: SignUpScreenNavigationProp;
	route: SignUpScreenRouteProp;
};


export default function SignUp({ navigation }: Props) {

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<signUpTypes | any>({
		resolver: yupResolver(signUpSchems),
		defaultValues: {
			firstName: "John",
			lastName: "doe",
			email: "example@gmail.com",
			password: "Example/1225"
		}
	});

	const onSubmit = async (data: signUpTypes) => {
		navigation.navigate(ROUTE.VERIFY)
	};

	return (
		<Container>
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
									label="Your email address"
									type="text"
									placeholder="enter your email"
									control={control}
									errors={errors}
									name="email"
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
								<View style={{ gap: 5 }}>
									<Typography type="text12" sx={{ color: colors.white }}>
										Should contain at least 6 characters
									</Typography>
									<Typography type="text12" sx={{ color: colors.white }}>
										Should contain upper case and special characters
									</Typography>
								</View>
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
					<CustButton onPress={() => navigation.navigate(ROUTE.LOGIN)}>
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
