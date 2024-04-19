import { otpProps } from "../../types";
import colors from "../../constant/theme";
import Typography from "../typography";
import OTPTextInput from "react-native-otp-textinput";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export const OtpInput = ({ control, errors }: otpProps) => {
	const styles = StyleSheet.create({
		otpComp: {
			marginTop: "10%",
			width: "80%",
			justifyContent: "space-between",
		},

		otpText: {
			borderWidth: 1,
			borderColor: colors.yellow,
			marginHorizontal: wp("1%"),
			borderRadius: 10,
			backgroundColor: colors.white,
		},
	});

	return (
		<View style={{ gap: 10 }}>
			{/* <Controller
				control={control}
				name="otp"
				render={({ field }) => ( */}
			<OTPTextInput
				inputCount={4}
				containerStyle={styles.otpComp}
				textInputStyle={styles.otpText}
				offTintColor={colors.yellow}
				// tintColor={colors.yellow}
				// handleTextChange={(text) => {
				// 	field.onChange(text);
				// }}
			/>
			{/* )}
			/> */}
			{/* {errors?.["otp"] && (
				<Typography type="text14" sx={{ color: colors.red }}>
					{errors?.["otp"]?.message}
				</Typography>
			)} */}
		</View>
	);
};
