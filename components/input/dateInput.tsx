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
import { Controller } from "react-hook-form";

const DatePicker = ({
	defaultValue,
	style,
	mode,
	wrapperStyle,
	label,
	control,
	errors,
	name,
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
			paddingHorizontal: "5%",
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
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<TouchableOpacity
						style={styles.inputWrapper}
						onPress={toggleDatePicker}
					>
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
													setdateVal(value);
													field.onChange(value);
												}
											}}
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
										left: "6.5%",
										zIndex: -1,
										color: colors.grey_c,
									}}
									type="text16"
								>
									{defaultValue || dateVal
										? moment(defaultValue?defaultValue:dateVal).format("dddd, Do MMM, YYYY")
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
									{defaultValue || dateVal
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
								<MaterialIcons
									name="access-time"
									size={24}
									color={colors.grey_c}
								/>
							</Show.Else>
						</Show>
					</TouchableOpacity>
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

export default DatePicker;
