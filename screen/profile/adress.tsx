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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressTypes } from "../../types";
import { addressSchems } from "../../utilities/schema";
import PickImage from "../../components/input/imagePicker";
import LottieView from "lottie-react-native";
import Show from "../../components/show";
import FilePreview from "../../components/filePreview";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { updateUser } from "../../helpers/mutate";
import { UserContext } from "../../components/contex/userContex";

export default function Address({ navigation }: any) {
	const { userData } = useContext(UserContext);
	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<addressTypes | any>({
		resolver: yupResolver(addressSchems),
		defaultValues: {
			currentAddress: userData?.currentAddress,
			addressDocType: userData?.addressDocType,
			image: userData?.proofOfAddress,
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

	const onSubmit = (data: addressTypes) => {
		const formData = new FormData();
		formData.append("image", data?.image as any);
		formData.append("currentAddress", data?.currentAddress);
		formData.append("addressDocType", data?.addressDocType);
		mutate(formData);
	};

	return (
		<Container>
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<KeyboardView sx={{ gap: 30, flex: 1 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<View style={styles.title}>
							<CustButton
								type="back"
								sx={{ color: colors.white }}
								onPress={() => navigation.goBack()}
							/>
							<Typography type="text24">My address</Typography>
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
					<ScrollContainer innerStyles={{ paddingBottom: 30 }}>
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="Enter post code"
								type="text"
								name="currentAddress"
								control={control}
								errors={errors}
								placeholder="Enter * digit"
							/>
							<InputComponent
								label="Upload your proof of address"
								type="dropdown"
								data={[
									{ label: "Utility Bill", value: "Utility Bill" },
									{ label: "Bank statement", value: "Bank statement" },
								]}
								placeholder="Select document type"
								control={control}
								errors={errors}
								name="addressDocType"
								defualtValue={userData?.addressDocType}
							/>
							<PickImage
								imageName="image"
								errors={errors}
								setValue={setValue}
								control={control}
								clearErrors={clearErrors}
							>
								<View style={styles.image_wrap}>
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
										userData?.proofOfAddress !== undefined
									}
								>
									<FilePreview
										handelDelete={() => {
											setValue("image", undefined);
										}}
										handelPreview={() => {}}
									/>
								</Show.When>
							</Show>
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
