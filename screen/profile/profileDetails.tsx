import React, { useContext, useRef, useState } from "react";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserTypes } from "../../types";
import { updateUserSchems } from "../../utilities/schema";
import { UserContext } from "../../components/contex/userContex";
import { CommonActions } from "@react-navigation/native";
import DeleteModal from "../../modals/deleteModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";


type ProfileDetailScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type ProfileDetailScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: ProfileDetailScreenNavigationProp;
	route: ProfileDetailScreenRouteProp;
};
export default function Profile_Details({ navigation }: Props) {
	const { userData } = useContext(UserContext);
	const deleteRef = useRef(null)
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<updateUserTypes | any>({
		resolver: yupResolver(updateUserSchems),
		defaultValues: {
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			phone: userData?.phone,
			email: userData?.email,
			dateOfBirth: userData?.dateOfBirth,
		},
	});



	const onSubmit = (data: updateUserTypes) => {
		console.log(data);
	};

	return (
		<Container>
			<InnerWrapper sx={{ flex: 6, gap: 15 }}>
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
							<Typography type="text24">My account details</Typography>
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
					<ScrollContainer innerStyles={{ paddingBottom: 50 }}>
						<View style={{ ...styles.inputContain }}>
							<InputComponent
								label="First name"
								type="text"
								control={control}
								errors={errors}
								placeholder="enter first name"
								name="firstName"
							/>
							<InputComponent
								label="Last name "
								type="text"
								control={control}
								errors={errors}
								placeholder="enter last name"
								name="lastName"
							/>
							<InputComponent
								label="Phone number"
								type="phone"
								control={control}
								errors={errors}
								name="phone"
								defaultValue={userData?.phone}
							/>
							<InputComponent
								label="Email address"
								type="text"
								control={control}
								errors={errors}
								placeholder="enter your email"
								name="email"
							/>
							<InputComponent
								label="Date of birth"
								type="date"
								mode="date"
								control={control}
								errors={errors}
								name="dateOfBirth"
								defaultValue={userData?.dateOfBirth}
							/>
						</View>
					</ScrollContainer>
				</KeyboardView>
			</InnerWrapper>

			<View style={styles.buttonCont}>
				<CustButton
					sx={{ width: "100%", backgroundColor: colors.tint_a }}
					type="rounded"
					onPress={() => setModalOpen(!modalOpen)}
				>
					<Typography type="text16" sx={{ color: colors.red }}>
						Delete account
					</Typography>
				</CustButton>
			</View>
			<DeleteModal
				deleteRef={deleteRef}
				closeModal={() => {
					setModalOpen(!modalOpen)
				}}
				modalOpen={modalOpen}
				navigation={navigation}
				CommonActions={CommonActions}
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
		gap: 25,
		flex: 1,
	},
	buttonCont: {
		flex: 1,
		width: "90%", paddingTop: "5%"
	},
});
