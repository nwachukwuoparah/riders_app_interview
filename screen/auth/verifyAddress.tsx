import React, { useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
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
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../helpers/mutate";
import { cacheAuthData } from "../../utilities/storage";
import { addressTypes } from "../../types";
import PickImage from "../../components/input/imagePicker";
import Show from "../../components/show";
import FilePreview from "../../components/filePreview";
import { addressSchems } from "../../utilities/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingComponent from "../../components/loading";
import { handleError } from "../../helpers";
import Set_upModal from "../../modals/setupModal";

export default function VerifyAddress({ navigation }: any) {
	const setupRef = useRef(null);
	const [display, setDiaplay] = useState(false);

	const {
		control,
		setValue,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm<addressTypes>({
		resolver: yupResolver(addressSchems),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			cacheAuthData("step", 4);
			navigation.navigate("guarantorForm");
		},
		onError: (err) => {
			handleError(err);
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
		<View style={{ flex: 1 }}>
			<Container>
				<LoadingComponent display={isPending} />
				<InnerWrapper sx={{ width: "100%", flex: 1 }}>
					<KeyboardView sx={{ width: "100%", flex: 1 }}>
						<View style={styles.title}>
							<CustButton
								type="back"
								color={colors.white}
								onPress={() => navigation.goBack()}
							/>
							<Typography type="text24">Verify your address</Typography>
							<Typography type="text16">
								We need to verify a few more details
							</Typography>
							<View style={{ flexDirection: "row", width: "100%", gap: 5 }}>
								{[1, 2, 3, 4, 5].map((i, index) => (
									<View
										key={index}
										style={{
											flex: 1,
											backgroundColor: index < 3 ? colors.tint : colors.grey_a,
											height: 7,
											borderRadius: 5,
										}}
									></View>
								))}
							</View>
						</View>
						<ScrollContainer>
							<View style={{ ...styles.inputContain }}>
								<InputComponent
									label="Enter post code"
									type="text"
									placeholder="Enter * digit"
									control={control}
									errors={errors}
									name="currentAddress"
								/>
								<View style={styles.image_wrap}>
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
									/>
									<PickImage
										imageName="image"
										errors={errors}
										setValue={setValue}
										control={control}
										clearErrors={clearErrors}
									>
										<View style={styles.image_placeholder}>
											<LottieView
												autoPlay
												style={{
													width: 100,
													height: 40,
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
									</PickImage>
									<Show>
										<Show.When isTrue={watch("image") !== undefined}>
											<FilePreview
												type={watch("addressDocType")}
												handelDelete={() => {
													setValue("image", undefined);
												}}
												handelPreview={() => {}}
											/>
										</Show.When>
									</Show>
								</View>
							</View>
						</ScrollContainer>
					</KeyboardView>
					<View style={styles.buttonCont}>
						<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
							<Typography type="text16" sx={{ color: colors.black }}>
								Continue
							</Typography>
						</CustButton>
						<CustButton onPress={() => setDiaplay(!display)}>
							<Typography type="text16">
								I want continue my registration later
							</Typography>
						</CustButton>
					</View>
				</InnerWrapper>
			</Container>
			<Set_upModal
				setupRef={setupRef}
				close={() => setDiaplay(!display)}
				modalOpen={display}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
		marginHorizontal: "5%",
		marginBottom: 10,
	},
	inputContain: {
		gap: 35,
		marginHorizontal: "5%",
		marginBottom: 20,
		paddingTop: 20,
	},
	image_wrap: {
		gap: 10,
	},
	image_placeholder: {
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.yellow,
		borderRadius: 30,
		paddingVertical: "5%",
		backgroundColor: colors.tint,
		...Platform.select({
			ios: {},
			android: {},
		}),
	},
	// 4500-2001+2024
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.black_1,
		paddingTop: 15,
		...Platform.select({
			ios: {
				shadowOpacity: 0.1,
				shadowRadius: 0.5,
				shadowColor: "#6C6C6C",
				shadowOffset: { height: -2, width: 0 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
});
