import { StyleSheet, View } from "react-native";
import { DropdownInputProps } from "../../types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../constant/theme";
import { Dropdown } from "react-native-element-dropdown";
import Typography from "../typography";
import { font } from "../../utilities/loadFont";
import { Controller } from "react-hook-form";

const DropdownInput = ({
	data,
	style,
	placeholder,
	placeholderStyle,
	selectedTextStyle,
	itemTextStyle,
	iconStyle,
	containerStyle,
	defualtValue,
	label,
	name,
	errors,
	control,
	disable
}: DropdownInputProps) => {
	const styles = StyleSheet.create({
		dropdown: {
			width: "100%",
			paddingHorizontal: "5%",
			paddingVertical: "4%",
			borderRadius: 30,
			backgroundColor: colors.grey_a,
			marginTop: 15,
			...(style as object),
		},

		placeholder: {
			fontSize: hp("2%"),
			color: colors.grey_d,
			fontFamily: font.DMSans_400Regular,
			...(placeholderStyle as object),
		},

		selectedText: {
			fontSize: hp("2%"),
			fontFamily: font.DMSans_400Regular,
			color: colors.white,
			...(selectedTextStyle as object),
		},

		itemTextStyle: {
			color: colors.black,
			fontFamily: font.DMSans_400Regular,
			textAlign: "center",
			borderBottomWidth: 1,
			borderColor: colors.grey_a,
			fontSize: hp("2%"),
			...(itemTextStyle as object),
		},

		iconStyle: {
			backgroundColor: colors.grey_a,
			...(iconStyle as object),
		},

		containerStyle: {
			backgroundColor: colors.grey_d,
			borderRadius: 20,
			borderColor: colors.grey,
			overflow:"hidden",
			...(containerStyle as object),
		},
	});

	return (
		<View>
			{label && <Typography type="text16">{label}</Typography>}
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholder}
						selectedTextStyle={styles.selectedText}
						itemTextStyle={styles.itemTextStyle}
						containerStyle={styles.containerStyle}
						iconStyle={styles.iconStyle}
						disable={disable}
						data={data}
						labelField="label"
						valueField="value"
						value={defualtValue}
						placeholder={placeholder}
						onChange={(text) => field.onChange(text["value"])}
					/>
				)}
			/>
			{errors?.[name] && (
				<Typography type="text14" sx={{ color: colors.red }}>
					{errors?.[name]?.message}
				</Typography>
			)}
		</View>
	);
};

export default DropdownInput;
