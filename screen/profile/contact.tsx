import React, { useContext } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	KeyboardView,
	ScrollContainer,
} from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { InputComponent } from "../../components/input";
import { UserContext } from "../../components/contex/userContex";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { supportSchems } from "../../utilities/schema";
import { support } from "../../helpers/mutate";
import LoadingComponent from "../../components/loading";

export default function Contact({ navigation }: any) {
	const { userData } = useContext(UserContext);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(supportSchems),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: support,
		onSuccess: async (data) => {
			Alert.alert("Message", data?.data?.msg);
		},
		onError: (err) => {
			console.error(err);
		},
	});

	const onSubmit = (data: any) => {
		mutate({ ...data, email: userData?.email, userType: "Rider" });
	};

	return (
		<Container>
			<LoadingComponent display={isPending} />
			<KeyboardView sx={{ height: "90%" }}>
				<InnerWrapper sx={{ gap: 30 }}>
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
								color={colors.white}
								onPress={() => navigation.goBack()}
							/>
							<Typography type="text24">Contact support</Typography>
						</View>
					</View>
					<ScrollContainer innerStyles={{ gap: 5 }}>
						<InputComponent
							wrapperStyle={{
								backgroundColor: colors.black_1,
								borderWidth: 0,
								flexDirection: "row-reverse",
								height: 150,
							}}
							style={{
								height: "100%",
								backgroundColor: colors.grey_a,
								borderRadius: 10,
								paddingHorizontal: 15,
								paddingTop: 15,
							}}
							type="text"
							placeholder="Type your message"
							name="message"
							multiLine={true}
							control={control}
							errors={errors}
						/>
					</ScrollContainer>
				</InnerWrapper>
				<View style={styles.buttonCont}>
					<View
						style={{ width: "95%", flexDirection: "row", alignItems: "center" }}
					></View>
				</View>
			</KeyboardView>
			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={handleSubmit(onSubmit)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Send
					</Typography>
				</CustButton>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},

	button: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: colors.yellow,
		borderRadius: 20,
		alignSelf: "flex-start",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonCont: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		backgroundColor: colors.black_1,
		paddingTop: 15,
		...Platform.select({
			ios: {
				shadowOpacity: 0.1,
				shadowRadius: 0.2,
				shadowColor: "#6C6C6C",
				shadowOffset: { height: -1, width: 0 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
});
