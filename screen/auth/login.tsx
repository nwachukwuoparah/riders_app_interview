import React from "react";
import {
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
import { logInTypes, RootStackParamList } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchems } from "../../utilities/schema";
import { ROUTE } from "../../constant/route";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type LoginScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: LoginScreenNavigationProp;
	route: LoginScreenRouteProp;
};

export default function Login({ navigation }: Props) {

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<logInTypes>({
		resolver: yupResolver(loginSchems),
		defaultValues: {
			email: "example@gmail.com",
			password: "Example/1225"
		}
	});

	const onSubmit = (data: logInTypes) => {
		navigation.navigate(ROUTE.USER_STACK)
	};

	return (
		<Container>
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
						autoFocus={true}
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
						onPress={() => { }}
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
				<CustButton onPress={() => navigation.navigate(ROUTE.SIGN_UP)}>
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
