import { phoneInputProps } from "../../types";
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet, View } from "react-native";
import colors from "../../constant/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect, useRef } from "react";
import Typography from "../typography";
import { Controller } from "react-hook-form";

const CustPhoneInput = ({
	style,
	defaultValue,
	countryCode,
	label,
	control,
	errors,
	name,
}: phoneInputProps) => {
	const phoneNumInput = useRef<PhoneInput>();

	useEffect(() => {
		phoneNumInput.current?.setState({
			number: defaultValue as string,
		});
	}, [defaultValue]);

	phoneNumInput.current?.getCallingCode();

	const styles = StyleSheet.create({
		phoneNumberView: {
			width: "100%",
			backgroundColor: colors.grey_a,
			borderRadius: 30,
			// borderWidth: 1,
			borderColor: colors.yellow,
			fontSize: hp("3%"),
			overflow: "hidden",
			...(style as object),
		},
	});

	// const onInput = (number: string) => {
	// 	const countryCode = phoneNumInput.current?.getCallingCode();
	// 	const countrySymbol = phoneNumInput.current?.getCountryCode();
	// 	onChange({
	// 		countryCode: countryCode as string,
	// 		countrySymbol: countrySymbol as string,
	// 		number: number.replace(`+${countryCode}`, ""),
	// 	});
	// };
	// {
	// 	 onChangeFormattedText={(formattedText) => {
	// 						onChange(formattedText);
	// 					}}
	// }
	return (
		<View style={{ gap: 15 }}>
			{label && <Typography type="text16">{label}</Typography>}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<PhoneInput
						defaultCode={"GB"}
						layout="first"
						placeholder=""
						ref={phoneNumInput as React.MutableRefObject<PhoneInput>}
						containerStyle={styles.phoneNumberView}
						textContainerStyle={{
							paddingVertical: "4%",
							backgroundColor: colors.grey_a,
						}}
						textInputStyle={{ color: colors.white }}
						codeTextStyle={{ color: colors.grey_d }}
						defaultValue={(countryCode || "+44") + defaultValue}
						onChangeFormattedText={(formattedText) => {
							onChange(formattedText);
						}}
						value={value}
					/>
				)}
			/>
		</View>
	);
};

export default CustPhoneInput;
