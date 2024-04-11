import { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { dateInputPropType } from "../../types";
import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import Typography from "../typography";

const DatePicker = ({
	onChange,
	placeholder,
	style,
	mode,
	wrapperStyle,
}: dateInputPropType) => {
	const [dateVal, setdateVal] = useState<Date>();
	const [showDateSelector, setshowDateSelector] = useState(false);

	const toggleDatePicker = () => {
		Platform.OS === "ios"
			? setshowDateSelector(!showDateSelector)
			: !showDateSelector
			? DateTimePickerAndroid.open({
					mode,
					value: new Date(),
					onChange: (e: any, value: any) => {
						if (e.type === "set") {
							onChange(value);
							setdateVal(value);
						}
					},
			  } as any)
			: DateTimePickerAndroid.dismiss("date");
	};

	const styles = StyleSheet.create({
		inputWrapper: {
			flexDirection: "row",
			marginVertical: "2%",
			borderWidth: 1.2,
			borderRadius: 15,
			justifyContent: "center",
			paddingHorizontal: "5%",
			alignItems: "center",
			...(wrapperStyle as object),
		},
	});

	return (
		<TouchableOpacity style={styles.inputWrapper} onPress={toggleDatePicker}>
			<Typography sx={style} type="text14">
				{(mode === "date"
					? dateVal?.toLocaleDateString()
					: dateVal?.toLocaleTimeString("en-US", {
							hourCycle: "h24",
							hour: "numeric",
							minute: "numeric",
					  })) ||
					placeholder ||
					(mode === "date"
						? new Date()?.toLocaleDateString()
						: new Date()?.toLocaleTimeString("en-US", {
								hourCycle: "h24",
								hour: "numeric",
								minute: "numeric",
						  }))}
			</Typography>
			{showDateSelector && (
				<RNDateTimePicker
					mode={mode}
					style={{
						width: "100%",
						opacity: 0.1,
						flex: 1,
						position: "absolute",
						backgroundColor: "rgba(0,0,0,0)",
						zIndex: 10,
					}}
					value={dateVal || new Date()}
					onChange={(e: { type: string }, value: Date | undefined) => {
						if (e.type === "set") {
							onChange(value);
							setdateVal(value);
						}
					}}
				/>
			)}
		</TouchableOpacity>
	);
};

export default DatePicker;
