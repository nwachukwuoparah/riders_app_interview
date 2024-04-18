import { StyleSheet, View } from "react-native";
import { DropdownInputProps } from "../../types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../constant/theme";
import { Dropdown } from "react-native-element-dropdown";
import Typography from "../typography";
import { font } from "../../utilities/loadFont";

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
	label,
}: DropdownInputProps) => {
	const styles = StyleSheet.create({
		dropdown: {
			width: "100%",
			paddingHorizontal: "5%",
			paddingVertical: "3.4%",
			// borderWidth: 1,
			borderRadius: 30,
			// borderColor: colors.yellow,
			backgroundColor: colors.grey_a,
			marginTop: 15,
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
			fontFamily: font.DMSans_400Regular,
			color: colors.white,
			...(selectedTextStyle as object),
		},

		itemTextStyle: {
			color: colors.black,
			fontFamily: font.DMSans_400Regular,
			textAlign: "center",
			borderWidth: 1,
			backgroundColor: colors.grey_a,
			...(itemTextStyle as object),
		},

		iconStyle: {
			backgroundColor: colors.grey_a,
			...(iconStyle as object),
		},

		containerStyle: {
			backgroundColor: colors.grey_a,
			...(containerStyle as object),
		},
	});

	return (
		<View>
			{label && <Typography type="text16">{label}</Typography>}
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
		</View>
	);
};

export default DropdownInput;
