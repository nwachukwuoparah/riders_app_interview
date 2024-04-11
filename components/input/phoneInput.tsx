import { phoneInputProps } from "../../types";
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet } from "react-native";
import colors from "../../constant/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect, useRef } from "react";

const CustPhoneInput = ({
	style,
	onChange,
	defaultValue,
	countryCode,
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
			paddingVertical: "3.7%",
			borderRadius: 10,
			borderColor: colors.grey_d,
			borderWidth: 1,
			backgroundColor: colors.white,
			fontSize: hp("3%"),
			...(style as object),
		},
	});

	const onInput = (number: string) => {
		const countryCode = phoneNumInput.current?.getCallingCode();
		const countrySymbol = phoneNumInput.current?.getCountryCode();
		onChange({
			countryCode: countryCode as string,
			countrySymbol: countrySymbol as string,
			number: number.replace(`+${countryCode}`, ""),
		});
	};

	return (
		<PhoneInput
			defaultCode={"NG"}
			layout="first"
			placeholder=" "
			ref={phoneNumInput as React.MutableRefObject<PhoneInput>}
			containerStyle={styles.phoneNumberView}
			textContainerStyle={{ paddingVertical: 0, backgroundColor: colors.white }}
			textInputStyle={{ color: colors.grey_d }}
			codeTextStyle={{ color: colors.grey_d }}
			defaultValue={(countryCode || "") + defaultValue}
			onChangeFormattedText={onInput}
		/>
	);
};

export default CustPhoneInput;
