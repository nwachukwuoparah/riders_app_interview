import Checkbox from "expo-checkbox";
import { StyleSheet } from "react-native";
import { CustCheckBoxProps } from "../../types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustCheckBox = ({
	onChange,
	checked,
	style,
	color,
}: CustCheckBoxProps) => {
	const styles = StyleSheet.create({
		checkbox: {
			height: hp("3%"),
			width: hp("3%"),
			marginRight: "5%",
			...(style as object),
		},
	});
	return (
		<Checkbox
			style={styles.checkbox}
			value={checked}
			onValueChange={onChange}
			color={color}
		/>
	);
};

export default CustCheckBox;
