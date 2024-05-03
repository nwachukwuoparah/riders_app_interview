import React from "react";
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
import File from "../../assets/svg/file.svg";
import Delete from "../../assets/svg/delete.svg";
import Preview from "../../assets/svg/preview.svg";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../helpers/mutate";
import { cacheAuthData } from "../../utilities/storage";
import { addressTypes } from "../../types";
import PickImage from "../../components/input/imagePicker";
import Show from "../../components/show";

export default function VerifyAddress({ navigation }: any) {
	const {
		control,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<any>();
	// resolver: yupResolver(loginSchems),

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			cacheAuthData("step", 3);
			navigation.navigate("verifyAddress");
		},
		onError: (err) => {
			console.error(err);
		},
	});

	const onSubmit = (data: addressTypes) => {
		// mutate(data);
		navigation.navigate("guarantorForm");
		// console.warn(data)
	};

	return (
		<Container>
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
								// name="postCode"
								name="currentAddress"
							/>
							<View style={styles.image_wrap}>
								<InputComponent
									label="Your next of kin’s relationship"
									type="dropdown"
									data={[
										{ label: "Utility Bill", value: "Utility Bill" },
										{ label: "Bank statement", value: "Bank statement" },
									]}
									placeholder="Select relationship"
									control={control}
									errors={errors}
									name="addressDocType"
								/>
								<PickImage imageName="image" setValue={setValue}>
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
										<View style={styles.doc_list}>
											<View style={{ flexDirection: "row", gap: 10 }}>
												<File />
												<Typography type="text16" sx={{ color: colors.white }}>
													My utility bill
												</Typography>
											</View>
											<View style={{ flexDirection: "row", gap: 10 }}>
												<Preview />
												<Delete />
											</View>
										</View>
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
					<CustButton
					// onPress={() => navigation.navigate("login")}
					>
						<Typography type="text16">
							I want continue my registration later
						</Typography>
					</CustButton>
				</View>
			</InnerWrapper>
		</Container>
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
	doc_list: {
		width: "100%",
		backgroundColor: colors.grey_a,
		paddingVertical: 15,
		paddingHorizontal: 25,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	doc_list_left: {},
	doc_list_right: {},
});
