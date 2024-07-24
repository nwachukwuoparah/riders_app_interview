import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Platform, Alert } from "react-native";
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
import LoadingComponent from "../../components/loading";
import { handleError } from "../../helpers";
import PreviewModal from "../../modals/previewModal";

export default function Address({ navigation }: any) {
	const { userData } = useContext(UserContext);
	const queryClient = useQueryClient();
	const previewRef = useRef(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [image, setImage] = useState()


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
			location: userData?.location,
			addressDocType: userData?.addressDocType,
			image: userData?.proofOfAddress,
			postalCode: userData?.postalCode
		},
	});

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
			Alert.alert("Message", data?.data?.msg);
		},
		onError: (err) => {
			handleError(err);
		},
	});

	const onSubmit = (data: addressTypes) => {
		const formData = new FormData();
		formData.append("image", data?.image as any);
		formData.append("location", data?.location);
		formData.append("postalCode", data?.postalCode);
		formData.append("addressDocType", data?.addressDocType);
		mutate(formData);
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
								label="Enter City"
								type="text"
								placeholder="Enter city"
								control={control}
								errors={errors}
								name="location"
							/>
							<InputComponent
								label="Enter post code"
								type="text"
								placeholder="Enter * digit"
								control={control}
								errors={errors}
								name="postalCode"
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
							<Show>
								<Show.When
									isTrue={
										userData?.proofOfAddress !== undefined
									}
								>
									<FilePreview
										handelDelete={() => {
											setValue("image", undefined);
										}}
										handelPreview={() => {
											setModalOpen(!modalOpen)
											setImage(userData?.proofOfAddress)
										}}
									/>
								</Show.When>
								<Show.Else>
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
									<Show.When isTrue={
										userData?.proofOfAddress !== undefined
										|| watch("image") !== undefined
									}>
										<FilePreview
											handelDelete={() => {
												setValue("image", undefined);
											}}
											handelPreview={() => {
												setModalOpen(!modalOpen)
												setImage(watch("image")?.uri)
											}}
											type="Driver's licence"
										/>
									</Show.When>
								</Show.Else>
							</Show>
						</View>
					</ScrollContainer>
				</KeyboardView>
			</InnerWrapper>
			<PreviewModal
				previewRef={previewRef}
				close={() => {
					setModalOpen(!modalOpen)
				}}
				modalOpen={modalOpen}
				image={image}
			/>
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
		marginTop: "10%"
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
