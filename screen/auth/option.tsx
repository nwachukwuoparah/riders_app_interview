import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import Rider from "../../assets/svg/optionSvg.svg";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../constant/theme";
import CustButton from "../../components/button";
import { ROUTE } from "../../constant/route";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../../types";


type OptionScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type OptionScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: OptionScreenNavigationProp;
	route: OptionScreenRouteProp;
};

export default function Option({ navigation }: Props) {
	return (
		<Container>
			<InnerWrapper sx={{ alignItems: "center", gap: 20 }}>
				<View style={styles.title}>
					<Typography type="text24" sx={{ textAlign: "center" }}>
						Become a{" "}
						<Typography type="text24" sx={{ color: colors.yellow }}>
							rider
						</Typography>{" "}
						and{" "}
						<Typography type="text24" sx={{ color: colors.yellow }}>
							earn
						</Typography>{" "}
						more with us
					</Typography>
				</View>
				<Rider width={wp("100%")} height={hp("50%")} />
				<View style={styles.button_contain}>
					<CustButton
						type="rounded"
						onPress={() => navigation.navigate(ROUTE.SIGN_UP)}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Sign up as a new rider
						</Typography>
					</CustButton>
					<CustButton onPress={() => navigation.navigate(ROUTE.LOGIN)}>
						<Typography type="text16">Login as existing rider</Typography>
					</CustButton>
				</View>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		width: "70%",
		justifyContent: "center",
		marginTop: "10%",
		alignItems: "center",
	},
	button_contain: {
		width: "100%",
		height: hp("20%"),
		alignItems: "center",
		justifyContent: "center",
	},
});
