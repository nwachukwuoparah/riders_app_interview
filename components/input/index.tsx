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

export function InputComponent({ type, ...props }: any) {
	switch (type) {
		case "dropdown":
			return <DropdownInput{...props} />;
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
