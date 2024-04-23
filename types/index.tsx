import {
	KeyboardTypeOptions,
	StyleProp,
	ViewStyle,
	TextStyle,
	TextInput,
	ImageStyle,
} from "react-native";
import { Ref } from "react";
import { UseFormStateReturn } from "react-hook-form";

export type textType = {
	children: any;
	type: "text24" | "text20" | "text16" | "text14" | "text12";
	sx?: any;
	fontfamily?: string;
};

export interface textInputPropType {
	type?: "text" | "hidden";
	label?: string;
	children?: React.ReactNode;
	wrapperStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<TextStyle>;
	placeholder?: string;
	maxLength?: number;
	editable?: boolean;
	defaultValue?: string;
	hidden?: boolean;
	multiLine?: boolean;
	ref?: Ref<TextInput> | undefined;
	keyboardType?: KeyboardTypeOptions;
	control: any;
	errors: UseFormStateReturn<any>["errors"];
	name: string;
}

export interface textInputMethodType {
	clear?: () => void;
}

export interface dateInputPropType {
	onChange: (value: Date | undefined) => void;
	label: string;
	placeholder?: string;
	mode: "date" | "time";
	wrapperStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<TextStyle>;
}

export interface CustCheckBoxProps {
	style?: StyleProp<ViewStyle>;
	onChange?: (value: boolean) => void;
	checked?: boolean;
	color?: string;
}

export interface CustSwitchProps {
	style?: StyleProp<ViewStyle>;
	onChange?: (value: boolean) => void;
	on?: boolean;
	thumbColor?: string;
	trackColor?: { true: string; false: string };
}

export interface RadioButnProps {
	value?: boolean;
	size?: number;
	selectedColor: string;
	color: string;
	onChange?: (value: boolean) => void;
}

export interface phoneInputProps {
	style?: StyleProp<ViewStyle>;
	label: string;
	defaultValue?: string;
	countryCode?: any;
	control: any;
	errors: UseFormStateReturn<any>["errors"];
	name: string;
}

export interface DropdownInputProps {
	type?: "dropdown";
	label: string;
	style?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	placeholderStyle?: StyleProp<TextStyle>;
	selectedTextStyle?: StyleProp<TextStyle>;
	itemTextStyle?: StyleProp<TextStyle>;
	iconStyle?: StyleProp<ImageStyle>;
	placeholder?: string;
	defualtValue?: dropDownDataType | string;
	data: dropDownDataType[];
	onChange: (item: dropDownDataType) => void;
}

export type dropDownDataType = {
	label: string | number;
	value: string | number;
};

export interface CustSearchBarProps {
	type?: "search";
	placeholder?: string;
	style?: StyleProp<ViewStyle>;
	dataToQuery: any[];
	autoComplete?: string;
	propertyToQuery: string[];
	clearAutoComplete?: () => void;
	returnFunc?: (result: any[]) => any;
}

export interface otpProps {
	style?: StyleProp<ViewStyle>;
	label?: string;
	defaultValue?: string;
	countryCode?: any;
	control?: any;
	errors?: UseFormStateReturn<any>["errors"];
}

export interface signUpTypes {
	firstName: string;
	lastName: string;
	email: string;
	phone: number;
	password: string;
}

export interface logInTypes {
	email: string;
	password: string;
}

export interface vehicleTypes {
	plateNumber: number;
	vehicleBrand: string;
	image: { uri: string; name: string; type: string };
}
