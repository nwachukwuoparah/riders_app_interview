import React, { useContext, useRef, useState } from "react";
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
import { UserContext } from "../../components/contex/userContex";
import PreviewModal from "../../modals/previewModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";

type VehicleDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type VehicleDetailsScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: VehicleDetailsScreenNavigationProp;
	route: VehicleDetailsScreenRouteProp;
};
export default function Vehicle_Details({ navigation }: Props) {
	const { userData } = useContext(UserContext);
	const previewRef = useRef(null)
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [image, setImage] = useState<any>()

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
			vehicleType: userData?.vehicle?.vehicleType,
			vehicleBrand: userData?.vehicle?.vehicleBrand,
			plateNumber: userData?.vehicle?.plateNumber,
			image: userData?.vehicle?.vehicleLicense,
		},
	});

	const onSubmit = (data: vehicleTypes) => {
		const formData = new FormData();
		data?.image.forEach((image: any, index: number) => {
			formData.append('image', image);
		});
		formData.append("plateNumber", data?.plateNumber);
		formData.append("vehicleBrand", data?.vehicleBrand);
		formData.append("vehicleType", data?.vehicleType);
		formData.append("updateType", "vehicle");
		console.log(formData);
	};

	return (
		<Container>
			<InnerWrapper sx={{ gap: 50, flex: 1 }}>
				<KeyboardView sx={{ gap: 30, flex: 1 }}>
					<View
						style={{
							width: "100%",
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
					<ScrollContainer innerStyles={{ paddingBottom: 20 }}>
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="What is your vehicle type?"
								type="dropdown"
								data={[
									{ label: "Bike", value: "Bike" },
									{ label: "Car", value: "Car" },
									{ label: "Bicycle", value: "Bicycle" },
								]}
								placeholder="Select vehicle type"
								control={control}
								errors={errors}
								name="vehicleType"
								defualtValue={userData?.vehicle?.vehicleType}
								disable={
									userData?.vehicle?.status === "in-progress" ||
									userData?.vehicle?.status === "approved"
								}
							/>
							<InputComponent
								label="What brand is your vehicle?"
								type="text"
								placeholder="e.g. Toyota"
								name="vehicleBrand"
								control={control}
								errors={errors}
								editable={
									(userData?.vehicle?.status === "in-progress" ||
										userData?.vehicle?.status === "approved") ? false : true
								}
							/>
							<InputComponent
								label="What is your vehicle plate number?"
								type="text"
								placeholder="Enter * digit"
								name="plateNumber"
								control={control}
								errors={errors}
								editable={
									(userData?.vehicle?.status === "in-progress" ||
										userData?.vehicle?.status === "approved") ? false : true
								}
							/>
							<Show>
								<Show.When
									isTrue={
										userData?.vehicle?.status === "rejected" ||
										userData?.vehicle?.status === undefined
									}
								>
									<PickImage
										allowsMultipleSelection={true}
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
													Tap here to upload document (front and back)
												</Typography>
												<Typography type="text14" sx={{ color: colors.grey }}>
													Max 10mb file allowed
												</Typography>
											</View>
										</View>
									</PickImage>
									{watch("image")?.map((i: any, index: number) => (
										<FilePreview
											key={index}
											handelDelete={() => {
												setValue("image", undefined);
											}}
											handelPreview={() => {
												setModalOpen(!modalOpen)
												if (i?.uri) {
													setImage(i?.uri)
												}
											}}
											type="Driver's licence"
										/>
									))}
								</Show.When>
								<Show.When
									isTrue={
										userData?.vehicle?.status === "in-progress" ||
										userData?.vehicle?.status === "approved"
									}
								>
									{userData?.vehicle?.vehicleLicense?.map((i: any, index: number) => (
										<FilePreview
											key={index}
											setDelete={false}
											handelDelete={() => {
												setValue("image", undefined);
											}}
											handelPreview={() => {
												setModalOpen(!modalOpen)
												setImage(i)
											}}
											type="Driver's licence"
										/>
									))}
								</Show.When>
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