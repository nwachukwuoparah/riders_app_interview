import { StyleSheet } from "react-native";
import { DropdownInputProps } from "../../types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../constant/theme";
import { Dropdown } from "react-native-element-dropdown";

const DropdownInput = ({
	data,
	style,
	placeholder,
	placeholderStyle,
	selectedTextStyle,
	itemTextStyle,
	iconStyle,
	containerStyle,
	onChange,
	defualtValue,
}: DropdownInputProps) => {
	const styles = StyleSheet.create({
		dropdown: {
			width: "100%",
			height: hp("6%"),
			paddingHorizontal: "5%",
			borderWidth: 1,
			marginBottom: "5%",
			borderRadius: 10,
			borderColor: colors.grey_d,
			backgroundColor: colors.white,
			...(style as object),
		},

		placeholder: {
			fontSize: hp("2%"),
			color: colors.grey_d,
			...(placeholderStyle as object),
		},

		selectedText: {
			fontSize: hp("2%"),
			fontWeight: "200",
			...(selectedTextStyle as object),
		},

		itemTextStyle: {
			color: colors.black,
			fontWeight: "200",
			...(itemTextStyle as object),
		},

		iconStyle: {
			backgroundColor: colors.white,
			...(iconStyle as object),
		},

		containerStyle: {
			...(containerStyle as object),
		},
	});

	return (
		<Dropdown
			style={styles.dropdown}
			placeholderStyle={styles.placeholder}
			selectedTextStyle={styles.selectedText}
			itemTextStyle={styles.itemTextStyle}
			containerStyle={styles.containerStyle}
			iconStyle={styles.iconStyle}
			data={data}
			labelField="label"
			valueField="value"
			value={defualtValue}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};

export default DropdownInput;
