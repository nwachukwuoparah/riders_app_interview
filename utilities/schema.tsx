import * as yup from "yup";

export const signUpSchems = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	lastName: yup.string().required("Last name is required"),
	phone: yup.string().required("Phone number is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
	dateOfBirth: yup.string(),
});

export const loginSchems = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const vehicleSchems = yup.object().shape({
	plateNumber: yup.string().required("Plate number is required"),
	vehicleType: yup.string().required("Vehicle type  is required"),
	vehicleBrand: yup.string().required("Vehicle brand is required"),
	image: yup.mixed().required("Drivers liscense is required"),
});

export const addressSchems = yup.object().shape({
	currentAddress: yup.string().required("Current address is required"),
	addressDocType: yup.string().required("Document type  is required"),
	image: yup.mixed().required("Drivers liscense is required"),
});

export const garantorsSchems = yup.object().shape({
	guarantorName: yup.string().required("Current address is required"),
	guarantorPhone: yup.string().required("Document type  is required"),
	nextOfKin: yup.string().required("Document type  is required"),
	kinRelationship: yup.string().required("Document type  is required"),
	kinPhone: yup.string().required("Document type  is required"),
});

export const updateUserSchems = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	lastName: yup.string().required("Last name is required"),
	phone: yup.string().required("Phone number is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	dateOfBirth: yup.string(),
});

export const bankDetailsSchems = yup.object().shape({
	bankName: yup.string().required("Bank name is required"),
	accountName: yup.string().required("Account name is required"),
	sortCode: yup.string().required("Sort code is required"),
});

export const changePasswordSchems = yup.object().shape({
	oldPassword: yup.string().required("Password field is required"),
	newPassword: yup.string().required("New password field is required"),
	confirmPassword: yup.string().required("Confirm password field is required"),
});

export const supportSchems = yup.object().shape({
	message: yup.string().required("Message field is required"),
});