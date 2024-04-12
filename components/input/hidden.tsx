import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../constant/theme";
import { textInputPropType } from "../../types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import Typography from "../typography";
import { font } from "../../utilities/loadFont";

const HiddenInput = ({
	children,
	editable,
	style,
	wrapperStyle,
	placeholder,
	defaultValue,
	maxLength,
	onChange,
	onFocus,
	multiLine,
	keyboardType,
	label,
}: textInputPropType) => {
	const [hidden, sethidden] = useState<boolean>(true);

	const styles = StyleSheet.create({
		inputWrapper: {
			width: "100%",
			hegiht: "50%",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			backgroundColor: colors.grey_a,
			borderRadius: 30,
			borderWidth: 1,
			borderColor: colors.yellow,
			paddingHorizontal: "7%",
			marginTop: 10,
			...(wrapperStyle as object),
		},

		textInput: {
			// flex: 0.9,
			width: "100%",
			color: colors.white,
			paddingVertical: "3.7%",
			fontSize: hp("2%"),
			fontFamily: font.DMSans_400Regular,
			...(style as object),
		},
	});

	return (
		<View style={{ gap: 5 }}>
			{label && <Typography type="text16">{label}</Typography>}
			<View style={styles.inputWrapper}>
				{children}
				<TextInput
					multiline={multiLine}
					maxLength={maxLength}
					onFocus={onFocus}
					keyboardType={keyboardType}
					defaultValue={defaultValue}
					onChange={(e) => onChange(e.nativeEvent.text)}
					style={styles.textInput}
					placeholder={placeholder}
					placeholderTextColor={colors.grey_d}
					editable={editable}
					secureTextEntry={hidden}
				/>
				<TouchableOpacity onPress={() => sethidden(!hidden)}>
					{hidden ? (
						<Ionicons
							name="eye-off"
							size={hp("3%")}
							style={{ marginRight: "0%" }}
							color={colors.grey_d}
						/>
					) : (
						<Ionicons
							name="eye"
							size={hp("3%")}
							style={{ marginRight: "0%" }}
							color={colors.grey_d}
						/>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HiddenInput;
