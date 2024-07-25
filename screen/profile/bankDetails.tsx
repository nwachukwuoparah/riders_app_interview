import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { UserContext } from "../../components/contex/userContex";
import { CommonActions } from "@react-navigation/native";
import DeleteModal from "../../modals/deleteModal";

export default function Bank_details({ navigation }: any) {
	const [modalOpen, setModalOpen] = useState(false)
	const { userData } = useContext(UserContext);
	const deleteRef = useRef(null)
	const toogleDelete = () => {
		setModalOpen(!modalOpen);
	};

	useEffect(() => {
		console.log(JSON.stringify(userData?.bankDetails, null, 2));
	}, [userData]) 
	return (
		<Container>
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
							onPress={() => navigation.navigate("Profile")}
						/>
						<Typography type="text24">Payment details</Typography>
					</View>
				</View>
				<View style={{ ...styles.card }}>
					<View style={{ gap: 10 }}>
						<Typography type="text16" sx={{ color: colors.white }}>
							{userData?.bankDetails?.bankName}
						</Typography>
						<Typography type="text14" sx={{ color: colors.white }}>
							{userData?.bankDetails?.accountName}
						</Typography>
					</View>
					<TouchableOpacity style={styles.delete} onPress={toogleDelete}>
						<MaterialCommunityIcons
							name="delete-outline"
							size={24}
							color={colors.red}
						/>
					</TouchableOpacity>
				</View>
			</InnerWrapper>
			<DeleteModal
			deleteRef={deleteRef}
				closeModal={() => {
					setModalOpen(!modalOpen)
				}}
				modalOpen={modalOpen}
				navigation={navigation}
				CommonActions={CommonActions}
				type="bank"
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	card: {
		gap: 20,
		backgroundColor: colors.grey_a,
		borderRadius: 25,
		paddingHorizontal: 15,
		paddingVertical: 25,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	delete: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.tint_a,
		padding: 9,
		alignSelf: "flex-start",
		borderRadius: 20,
	},
});
