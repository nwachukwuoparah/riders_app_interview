import React, { useContext, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	KeyboardView,
	ScrollContainer,
} from "../../components/container";
import { InputComponent } from "../../components/input";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import File from "../../assets/svg/file.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { guarantorTypes } from "../../types";
import { garantorsSchems } from "../../utilities/schema";
import { updateUser } from "../../helpers/mutate";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import LoadingComponent from "../../components/loading";
import { UserContext } from "../../components/contex/userContex";
import { handleError } from "../../helpers";

export default function Guarantors({ navigation }: any) {
	const { userData } = useContext(UserContext);
	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<guarantorTypes | any>({
		resolver: yupResolver(garantorsSchems),
		defaultValues: {
			name: userData?.guarantor?.name,
			phone: userData?.guarantor?.guarantorPhone,
			nextOfKin: userData?.guarantor?.nextOfKin,
			kinRelationship: userData?.guarantor?.kinRelationship,
			kinPhone: userData?.guarantor?.kinPhone,
		},
	});

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			Alert.alert("Message", data?.data?.msg);
			queryClient.invalidateQueries("get-profile" as QueryFilters);
		},
		onError: (err) => {
			handleError(err);
		},
	});

	const onSubmit = (data: guarantorTypes) => {
		mutate({ ...data, updateType: "guarantor" });
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<KeyboardView sx={{ gap: 30, flex: 1 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%"
						}}
					>
						<View style={styles.title}>
							<CustButton
								type="back"
								sx={{ color: colors.white }}
								onPress={() => navigation.goBack()}
							/>
							<Typography type="text24">My guarantors</Typography>
						</View>
						<View style={{ width: "22%" }}>
							<CustButton
								sx={{
									width: "100%",
									backgroundColor: colors.white,
									paddingVertical: 13,
								}}
								type="rounded"
								onPress={handleSubmit(onSubmit)}
							>
								<Typography type="text16" sx={{ color: colors.black }}>
									Edit
								</Typography>
							</CustButton>
						</View>
					</View>
					<ScrollContainer innerStyles={{ paddingBottom: 60 }}>
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="Your guarantor’s full name"
								type="text"
								name="name"
								control={control}
								errors={errors}
								placeholder="e.g John Doe"
								editable={
									(userData?.guarantor?.status === "in-progress" ||
										userData?.guarantor?.status === "approved") ? false : true
								}
							/>
							<InputComponent
								label="Your guarantor’s phone number"
								type="phone"
								name="phone"
								control={control}
								errors={errors}
								defaultValue={userData?.guarantor?.guarantorPhone}
								disabled={
									userData?.guarantor?.status === "in-progress" ||
									userData?.guarantor?.status === "approved"
								}
							/>
							<InputComponent
								label="Your next of kin’s full name"
								type="text"
								name="nextOfKin"
								control={control}
								errors={errors}
								placeholder="e.g John Doe"
								editable={
									(userData?.guarantor?.status === "in-progress" ||
										userData?.guarantor?.status === "approved") ? false : true
								}
							/>
							<InputComponent
								label="Your next of kin’s relationship"
								type="dropdown"
								name="kinRelationship"
								control={control}
								errors={errors}
								data={[
									{ label: "Brother", value: "Brother" },
									{ label: "Siater", value: "Siater" },
									{ label: "Mom", value: "Mom" },
									{ label: "Dad", value: "Dad" },
								]}
								placeholder="Select relationship"
								defualtValue={userData?.guarantor?.kinRelationship}
								disable={
									userData?.guarantor?.status === "in-progress" ||
									userData?.guarantor?.status === "approved"
								}
							/>
							<InputComponent
								label="Your next of kin’s phone number"
								type="phone"
								name="kinPhone"
								control={control}
								errors={errors}
								defaultValue={userData?.guarantor?.kinPhone}
								disabled={ 
									userData?.guarantor?.status === "in-progress" ||
									userData?.guarantor?.status === "approved"
								}
							/>
						</View>
					</ScrollContainer>
				</KeyboardView>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	inputContain: {
		gap: 20,
		flex: 1,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
	},
});
