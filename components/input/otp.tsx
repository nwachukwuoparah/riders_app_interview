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

export const OtpInput = ({
	control,
	errors,
	inputCount,
	name,
	label,
}: otpProps) => {
	const styles = StyleSheet.create({
		otpComp: {
			justifyContent: "space-between",
		},
		otpText: {
			borderWidth: 1,
			borderBottomWidth: 1,
			height: hp("8%"),
			width: hp("8%"),
			borderRadius: 10,
			backgroundColor: colors.grey_a,
			color:  colors.white,
		},
	});

	return (
		<View style={{ gap: 10 }}>
			{label && <Typography type="text16" >{label}</Typography>}
			<Controller
				control={control}
				name={name || "otp"}
				render={({ field }) => (
					<OTPTextInput
						inputCount={inputCount || 4}
						containerStyle={{ ...styles.otpComp }}
						textInputStyle={styles.otpText}
						offTintColor={
							errors?.["otp"] || errors?.[name] ? colors.red : colors.grey
						}
						tintColor={colors.yellow}
						handleTextChange={(text) => {
							field.onChange(text);
						}}
						autoFocus={true}
					/>
				)}
			/>
		</View>
	);
};
