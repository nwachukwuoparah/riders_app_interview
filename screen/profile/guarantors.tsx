import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
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
import { QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingComponent from "../../components/loading";
import { UserContext } from "../../components/contex/userContex";

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
			guarantorName: userData?.guarantorName,
			guarantorPhone: userData?.guarantorPhone,
			nextOfKin: userData?.nextOfKin,
			kinRelationship: userData?.kinRelationship,
			kinPhone: userData?.kinPhone,
		},
	});

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
		},
		onError: (err) => {
			console.error(err);
		},
	});

	const onSubmit = (data: guarantorTypes) => {
		mutate(data);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<ScrollContainer innerStyles={{ paddingBottom: 170 }}>
				<KeyboardView sx={{ gap: 50, flex: 1 }}>
					<InnerWrapper sx={{ gap: 50, flex: 1 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
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
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="Your guarantor’s full name"
								type="text"
								name="guarantorName"
								control={control}
								errors={errors}
								placeholder="e.g John Doe"
							/>
							<InputComponent
								label="Your guarantor’s phone number"
								type="phone"
								name="guarantorPhone"
								control={control}
								errors={errors}
								defaultValue={userData?.guarantorPhone}
							/>
							<InputComponent
								label="Your next of kin’s full name"
								type="text"
								name="nextOfKin"
								control={control}
								errors={errors}
								placeholder="e.g John Doe"
							/>
							<InputComponent
								label="Your next of kin’s relationship"
								type="dropdown"
								name="kinRelationship"
								control={control}
								errors={errors}
								data={[
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
								]}
								placeholder="Select relationship"
								defualtValue={userData?.kinRelationship}
							/>
							<InputComponent
								label="Your next of kin’s phone number"
								type="phone"
								name="kinPhone"
								control={control}
								errors={errors}
								defaultValue={userData?.kinPhone}
							/>
						</View>
					</InnerWrapper>
				</KeyboardView>
			</ScrollContainer>
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
