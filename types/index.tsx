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
	wrapperStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<TextStyle>;
	placeholder?: string;
	maxLength?: number;
	editable?: boolean;
	defaultValue?: string;
	hidden?: boolean;
	multiLine?: boolean;
	autoFocus?: boolean;
	ref?: Ref<TextInput> | undefined;
	keyboardType?: KeyboardTypeOptions;
	control: any;
	errors: UseFormStateReturn<any>["errors"];
	name: string;
	watch?: any;
	check?: boolean
}

export interface textInputMethodType {
	clear?: () => void;
}

export interface dateInputPropType {
	label: string;
	defaultValue?: Date;
	mode: "date" | "time";
	wrapperStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<TextStyle>;
	control: any;
	errors?: UseFormStateReturn<any>["errors"];
	name: string;
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
	control: any;
	errors: UseFormStateReturn<any>["errors"];
	name: string;
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
	control: any;
	errors: UseFormStateReturn<any>["errors"];
	inputCount?: number;
	name: string;
}

export interface signUpTypes {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
}

export interface riderOtpType {
	otp: string;
}

export interface verifyRiderType extends riderOtpType {
	email: string;
}

export interface logInTypes {
	email: string;
	password: string;
}

export interface forgetTypes {
	email: string;
}

export interface requestCardType {
	item: any;
	navigate: () => void;
}

export interface updateUserTypes {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dateOfBirth: string;
}

export interface vehicleTypes {
	plateNumber: string;
	vehicleType: string;
	vehicleBrand: string;
	image: any;
}

export interface addressTypes {
	location: string;
	postalCode: string;
	addressDocType: string;
	image: any;
}

export interface guarantorTypes {
	guarantorName: string;
	guarantorPhone: string;
	nextOfKin: string;
	kinPhone: string;
	kinRelationship: string;
}

export interface captureTypes {
	image: object;
}

export interface filePreviewType {
	type?: string;
	handelPreview: () => void;
	handelDelete: () => void;
	setDelete?: boolean
}

export interface periodDataType {
	[key: string]: boolean;
}

export interface workingShiftType {
	morning: periodDataType;
	evening: periodDataType;
}

export interface bankDetailsType { }

export interface changePasswordType {
	oldPassword: string;
	newPassword: string;
}

export interface changePasswordWithConfirmType extends changePasswordType {
	confirmPassword: string;
}

export interface resetPasswordType {
	otp: string;
	newPassword: string;
	email: string;
}

interface resetPassword {
	otp: string;
	newPassword: string;
}

export interface resetPasswordWithConfirmType extends resetPassword {
	confirmPassword: string;
}
