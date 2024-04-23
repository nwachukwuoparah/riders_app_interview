import { StyleSheet, TextInput, View } from "react-native";
import { textInputMethodType, textInputPropType } from "../../types";
import { useRef, forwardRef, useImperativeHandle } from "react";
import colors from "../../constant/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { font } from "../../utilities/loadFont";
import Typography from "../typography";
import { Controller } from "react-hook-form";

const CustTextInput = forwardRef<textInputMethodType, textInputPropType>(
	(
		{
			children,
			editable,
			style,
			wrapperStyle,
			placeholder,
			defaultValue,
			maxLength,
			hidden,
			multiLine,
			keyboardType,
			label,
			control,
			errors,
			name,
		}: textInputPropType,
		ref
	) => {
		const textInputRef = useRef<TextInput>(null);

		const clearTextInput = () => {
			if (textInputRef.current) {
				textInputRef.current.clear();
			}
		};

		// Forward the ref to the TextInput component
		useImperativeHandle(ref, () => ({
			clear: clearTextInput,
		}));

		const styles = StyleSheet.create({
			inputWrapper: {
				width: "100%",
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
				backgroundColor: colors.grey_a,
				borderRadius: 30,
				borderWidth: 1,
				borderColor: !false ? colors.grey_a : colors.yellow,
				paddingHorizontal: "3%",
				...(wrapperStyle as object),
			},

			textInput: {
				width: "100%",
				color: colors.white,
				paddingVertical: "3.7%",
				paddingHorizontal: 10,
				fontSize: hp("2%"),
				fontFamily: font.DMSans_400Regular,
				...(style as object),
			},
		});

		return (
			<View style={{ gap: 10 }}>
				{label && <Typography type="text16">{label}</Typography>}
				<View style={styles.inputWrapper}>
					{children}
					<Controller
						control={control}
						name={name}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
							autoCapitalize="none"
								ref={textInputRef}
								multiline={multiLine}
								maxLength={maxLength}
								onFocus={()=>{
									
								}}
								keyboardType={keyboardType}
								defaultValue={defaultValue}
								onChangeText={onChange}
								value={value}
								style={styles.textInput}
								placeholder={placeholder}
								placeholderTextColor={colors.white}
								editable={editable}
								secureTextEntry={hidden}
							/>
						)}
					/>
				</View>
			</View>
		);
	}
);

export default CustTextInput;
