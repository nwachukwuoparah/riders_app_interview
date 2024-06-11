import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
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
import LottieView from "lottie-react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { vehicleTypes } from "../../types";
import { vehicleSchems } from "../../utilities/schema";
import PickImage from "../../components/input/imagePicker";
import Show from "../../components/show";
import FilePreview from "../../components/filePreview";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { updateUser } from "../../helpers/mutate";
import { UserContext } from "../../components/contex/userContex";
import LoadingComponent from "../../components/loading";

export default function Vehicle_Details({ navigation }: any) {
	const { userData } = useContext(UserContext);
	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<vehicleTypes | any>({
		resolver: yupResolver(vehicleSchems),
		defaultValues: {
			vehicleType: userData?.vehicleType,
			vehicleBrand: userData?.vehicleBrand,
			plateNumber: userData?.plateNumber,
			image: userData?.vehicleLicense,
		},
	});

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
		},
		onError: (err) => {
			console.error(JSON.stringify(err,null,2));
		},
	});

	const onSubmit = (data: vehicleTypes) => {
		const formData = new FormData();
		formData.append("image", data?.image as any);
		formData.append("plateNumber", data?.plateNumber);
		formData.append("vehicleBrand", data?.vehicleBrand);
		formData.append("vehicleType", data?.vehicleType);
		mutate(formData);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<ScrollContainer innerStyles={{ paddingBottom: 30 }}>
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
								<Typography type="text24">My vehicle details</Typography>
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
								label="Select vehicle type"
								type="dropdown"
								data={[
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
									{ label: "Car", value: "Car" },
								]}
								placeholder="Select vehicle type"
								name="vehicleType"
								control={control}
								errors={errors}
								defualtValue={userData?.vehicleType}
							/>
							<InputComponent
								label="What brand is your vehicle?"
								type="text"
								placeholder="e.g. Toyota"
								name="vehicleBrand"
								control={control}
								errors={errors}
							/>
							<InputComponent
								label="What is your vehicle plate number?"
								type="text"
								placeholder="Enter * digit"
								name="plateNumber"
								control={control}
								errors={errors}
							/>
							<PickImage
								imageName="image"
								errors={errors}
								setValue={setValue}
								control={control}
								clearErrors={clearErrors}
							>
								<View style={styles.image_wrap}>
									<Typography type="text16" sx={{ color: colors.white_1 }}>
										Upload your drivers license
									</Typography>
									<View style={styles.image_placeholder}>
										<LottieView
											autoPlay
											style={{
												width: 100,
												height: 50,
											}}
											source={require("../../assets/lottile/imageFile.json")}
										/>
										<Typography type="text14" sx={{ color: colors.black_1 }}>
											Tap here to upload document
										</Typography>
										<Typography type="text14" sx={{ color: colors.grey }}>
											Max 10mb file allowed
										</Typography>
									</View>
								</View>
							</PickImage>
							<Show>
								<Show.When
									isTrue={
										watch("image") !== undefined ||
										userData?.vehicleLicense !== undefined
									}
								>
									<FilePreview
										handelDelete={() => {
											setValue("image", undefined);
										}}
										handelPreview={() => {}}
										type="Driver's licence"
									/>
								</Show.When>
							</Show>
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
	image_wrap: {
		gap: 15,
	},
	image_placeholder: {
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.yellow,
		borderRadius: 30,
		paddingVertical: "5%",
		gap: 10,
		backgroundColor: colors.tint,
		...Platform.select({
			ios: {},
			android: {},
		}),
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
	},
});
