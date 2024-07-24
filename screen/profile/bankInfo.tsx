import React from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
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
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { bankDetailsSchems } from "../../utilities/schema";
import { bankDetailsType } from "../../types";
import { updateUser } from "../../helpers/mutate";
import LoadingComponent from "../../components/loading";
import { handleError } from "../../helpers";

export default function BankInfo({ navigation }: any) {
	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<bankDetailsType | any>({
		resolver: yupResolver(bankDetailsSchems),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			navigation.navigate("bankDetails");
			queryClient.invalidateQueries("get-profile" as QueryFilters);
			Alert.alert("Message", data?.data?.msg);
		},
		onError: (err) => {
			handleError(err)
		},
	});

	const onSubmit = (data: bankDetailsType) => {
		mutate(data);
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<InnerWrapper sx={{ flex: 7 }}>
				<KeyboardView sx={{ gap: 30, flex: 1 }}>
					<View style={styles.title}>
						<CustButton
							type="back"
							sx={{ color: colors.white }}
							onPress={() => navigation.goBack()}
						/>
						<Typography type="text24">Set up payment details</Typography>
					</View>
					<ScrollContainer innerStyles={{ paddingBottom: 100 }}>
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="Bank name"
								type="text"
								placeholder="Bank name"
								name="bankName"
								control={control}
								errors={errors}
							/>

							<InputComponent
								label="Account number"
								type="text"
								placeholder="Enter here"
								name="accountName"
								control={control}
								errors={errors}
								keyboardType="numeric"
							/>
							<InputComponent
								label="Sort code"
								type="text"
								placeholder="Enter here"
								name="sortCode"
								control={control}
								errors={errors}
								keyboardType="numeric"
							/>
							<InputComponent
								label="Postal code"
								type="text"
								placeholder="Enter here"
								name="postalCode"
								control={control}
								errors={errors}
							/>
								<InputComponent
								label="Location code"
								type="text"
								placeholder="Enter here"
								name="location"
								control={control}
								errors={errors}
							/>
						</View>
					</ScrollContainer>
				</KeyboardView>
			</InnerWrapper>
			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Save payment details
					</Typography>
				</CustButton>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		gap: 5,
		width: "100%",
		paddingBottom: "5%"
	},
	inputContain: {
		gap: 20,
		flex: 1,
	},
	buttonCont: {
		width: "100%",
		flex: 1,
		alignItems: "center",
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
