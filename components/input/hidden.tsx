import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../constant/theme";
import { textInputPropType } from "../../types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import Typography from "../typography";
import { font } from "../../utilities/loadFont";
import { Controller } from "react-hook-form";
import { checkPasswordStrength } from "../../helpers";

const HiddenInput = ({
	editable,
	style,
	wrapperStyle,
	placeholder,
	defaultValue,
	maxLength,
	multiLine,
	keyboardType,
	label,
	control,
	errors,
	name,
	watch,
}: textInputPropType) => {
	const [hidden, sethidden] = useState<boolean>(true);
	const [active, setActive] = useState(false);
	const [strength, setStrength] = useState<number>(0);

	useEffect(() => {
		const checkStrength = async () => {
			const newStrength = await checkPasswordStrength(watch(name));
			setStrength(newStrength);
		};
		checkStrength();
	}, [watch(name)]);

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
			borderColor: !active ? colors.grey_a : colors.yellow,
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
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{label && <Typography type="text16">{label}</Typography>}
				<View style={{ flexDirection: "row", width: "35 %", gap: 3 }}>
					{[1, 2, 3, 4, 5].map((i, index) => (
						<View
							key={index}
							style={{
								flex: 1,
								backgroundColor:
									index < strength ? colors.yellow : colors.grey_a,
								height: 5,
								borderRadius: 5,
							}}
						></View>
					))}
				</View>
			</View>
			<View style={styles.inputWrapper}>
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							autoCapitalize="none"
							multiline={multiLine}
							maxLength={maxLength}
							keyboardType={keyboardType}
							defaultValue={defaultValue}
							onChangeText={onChange}
							onBlur={() => setActive(false)}
							onFocus={() => setActive(true)}
							value={value}
							style={styles.textInput}
							placeholder={placeholder}
							placeholderTextColor={colors.grey_d}
							editable={editable}
							secureTextEntry={hidden}
						/>
					)}
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
			{errors?.[name] && (
				<Typography type="text14" sx={{ color: colors.red, lineHeight: 25 }}>
					{errors?.[name]?.message}
				</Typography>
			)}
		</View>
	);
};

export default HiddenInput;