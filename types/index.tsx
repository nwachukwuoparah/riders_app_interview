import {
	KeyboardTypeOptions,
	StyleProp,
	ViewStyle,
	TextStyle,
	TextInput,
	ImageStyle,
} from "react-native";
import { Ref } from "react";

export type textType = {
	children: any;
	type: "text24" | "text20" | "text16" | "text14" | "text12";
	sx?: any;
	fontfamily?: string;
};

export interface textInputPropType {
	type?: "text" | "hidden";
	label: string;
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
	onChange: (text: string) => void;
	onFocus?: () => void;
}

export interface textInputMethodType {
	clear?: () => void;
}

export interface dateInputPropType {
	onChange: (value: Date | undefined) => void;
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
	onChange: (value: {
		countryCode: string;
		countrySymbol: string;
		number: string;
	}) => void;
}

export interface DropdownInputProps {
	type?: "dropdown";
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
