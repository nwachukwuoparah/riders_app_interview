import { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { dateInputPropType } from "../../types";
import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import Typography from "../typography";
import Show from "../show";
import moment from "moment";
import colors from "../../constant/theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const DatePicker = ({
	onChange,
	placeholder,
	style,
	mode,
	wrapperStyle,
	label,
}: dateInputPropType) => {
	const [dateVal, setdateVal] = useState<Date>();
	const [showDateSelector, setshowDateSelector] = useState(false);

	const toggleDatePicker = () => {
		Platform.OS === "android" &&
			DateTimePickerAndroid.open({
				mode,
				value: new Date(),
				onChange: (e, value) => {
					if (e.type === "set") {
						onChange(value);
						setdateVal(value);
						DateTimePickerAndroid.dismiss("date");
						// DateTimePickerAndroid.dismiss("date");
					}
				},
			});
	};

	useEffect(() => {
		if (Platform.OS === "ios") setshowDateSelector(true);
	}, []);

	const styles = StyleSheet.create({
		inputWrapper: {
			flexDirection: "row",
			marginVertical: "2%",
			justifyContent: "space-between",
			padding: "2%",
			alignItems: "center",
			borderRadius: 30,
			borderWidth: 1,
			borderColor: !false ? colors.grey_a : colors.yellow,
			backgroundColor: colors.grey_a,
			...(wrapperStyle as object),
		},
		calendarPreview: {
			flexDirection: "row",
			marginBottom: 10,
		},
	});

	return (
		<View style={{ gap: 10 }}>
			{label && <Typography type="text16">{label}</Typography>}
			<TouchableOpacity style={styles.inputWrapper} onPress={toggleDatePicker}>
				<Show>
					<Show.When isTrue={showDateSelector}>
						<View style={{ flex: 1, flexDirection: "row" }}>
							{[1, 2, 3].map((_, i) => (
								<RNDateTimePicker
									key={i}
									mode={mode}
									style={{
										opacity: 0.02,
										flex: 1,
										backgroundColor: "rgba(0,0,0,0)",
										zIndex: 10,
									}}
									value={dateVal || new Date()}
									onChange={(e, value) => {
										if (e.type === "set") {
											onChange(value);
											setdateVal(value);
										}
									}}
									minimumDate={moment().add().toDate()}
									maximumDate={moment().add(30, "days").toDate()}
								/>
							))}
						</View>
					</Show.When>
					<Show.Else>
						<View
							style={{
								opacity: 0.02,
								flex: 1,
								backgroundColor: "rgba(0,0,0,0)",
								zIndex: 10,
								paddingVertical: 20,
							}}
						></View>
					</Show.Else>
				</Show>

				<Show>
					<Show.When isTrue={mode === "date"}>
						<Typography
							sx={{
								position: "absolute",
								left: "2%",
								zIndex: -1,
								color: colors.grey_c,
							}}
							type="text16"
						>
							{placeholder || dateVal
								? moment(dateVal).format("dddd, Do MMM, YYYY")
								: "select date"}
						</Typography>
					</Show.When>
					<Show.When isTrue={mode !== "date"}>
						<Typography
							sx={{
								position: "absolute",
								left: "2%",
								zIndex: -1,
								color: colors.grey_c,
							}}
							type="text16"
						>
							{placeholder || dateVal
								? moment(dateVal).format("hh:mm A")
								: "select time"}
						</Typography>
					</Show.When>
				</Show>

				<Show>
					<Show.When isTrue={mode === "date"}>
						<MaterialCommunityIcons
							name="calendar-month-outline"
							size={24}
							color={colors.grey_c}
						/>
					</Show.When>
					<Show.Else>
						<MaterialIcons name="access-time" size={24} color={colors.grey_c} />
					</Show.Else>
				</Show>
			</TouchableOpacity>
		</View>
	);
};

export default DatePicker;
