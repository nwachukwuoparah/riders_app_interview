import { useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constant/theme";
import CustTextInput from "./textInput";
import DatePicker from "./dateInput";
import CustCheckBox from "./checkBox";
import RadioButton from "./radioButton";
import CustPhoneInput from "./phoneInput";
import HiddenInput from "./hidden";
import DropdownInput from "./dropDown";
import {
	textInputMethodType,
	textInputPropType,
	dateInputPropType,
	CustCheckBoxProps,
	CustSwitchProps,
	RadioButnProps,
	phoneInputProps,
	DropdownInputProps,
	CustSearchBarProps,
} from "../../types";

const CustSearchBar = ({
	placeholder,
	style,
	dataToQuery,
	returnFunc,
	propertyToQuery,
	autoComplete,
	clearAutoComplete,
}: CustSearchBarProps) => {
	useEffect(() => {
		autoComplete && search(autoComplete);
	}, [autoComplete]);

	const search = (text: string) => {
		if (text) {
			returnFunc &&
				returnFunc(
					propertyToQuery
						.map((prop) =>
							dataToQuery.filter((item) => item[prop]?.includes(text))
						)
						.flat()
				);
		} else {
			returnFunc && returnFunc([]);
			clearAutoComplete && clearAutoComplete();
		}
	};

	const styles = StyleSheet.create({
		searchBar: {
			backgroundColor: colors.grey_c,
			width: "90%",
			alignItems: "center",
			borderWidth: 2,
			borderColor: colors.grey_d,
			justifyContent: "space-between",
			paddingHorizontal: "5%",
			borderRadius: 10,
			marginTop: "2.5%",
			paddingVertical: "2.5%",
			...(style as object),
		},

		row: {
			flexDirection: "row",
			alignItems: "center",
			alignSelf: "center",
			justifyContent: "center",
		},
	});

	return (
		<View
			style={{
				backgroundColor: colors.grey,
				zIndex: 3,
				paddingBottom: "5%",
				width: "100%",
			}}
		>
			<View style={[styles.row, styles.searchBar]}>
				<Ionicons name="md-search-sharp" size={hp("3%")} color={colors.black} />
				<CustTextInput
					defaultValue={autoComplete}
					wrapperStyle={{
						flex: 0.98,
						borderWidth: undefined,
						backgroundColor: colors.grey_c,
					}}
					onChange={search}
					type="text"
					placeholder={placeholder || "Search Profession"}
				/>
			</View>
		</View>
	);
};

export function InputComponent(
	params: { type?: "text" } & textInputMethodType & textInputPropType
): JSX.Element;
export function InputComponent(
	params: { type?: "hidden" } & textInputMethodType & textInputPropType
): JSX.Element;
export function InputComponent(
	params: { type?: "radio" } & RadioButnProps
): JSX.Element;
export function InputComponent(
	params: { type?: "switch" } & CustSwitchProps
): JSX.Element;
export function InputComponent(
	params: { type?: "checkbox" } & CustCheckBoxProps
): JSX.Element;
export function InputComponent(
	params: { type?: "date" } & dateInputPropType
): JSX.Element;
export function InputComponent(
	params: { type?: "phone" } & phoneInputProps
): JSX.Element;
export function InputComponent(
	params: { type?: "dropdown" } & DropdownInputProps
): JSX.Element;
export function InputComponent(
	params: { type?: "search" } & CustSearchBarProps
): JSX.Element;

export function InputComponent({ type, ...props }: any) {
	switch (type) {
		case "dropdown":
			return <DropdownInput{...props} />;
		case "search":
			return <CustSearchBar {...props} />;
		case "checkbox":
			return <CustCheckBox {...props} />;
		case "radio":
			return <RadioButton {...props} />;
		case "date":
			return <DatePicker {...props} />;
		case "phone":
			return <CustPhoneInput {...props} />;
		case "hidden":
			return <HiddenInput {...props} />;
		default:
			return <CustTextInput {...props} />;
	}
}
