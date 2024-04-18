import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import ConfirmModal from "../../modals/confirmModal";

export default function Payment_details({ navigation }: any) {
	const confirmRef = useRef(null);
	const [confirm, setConfirm] = useState(false);

	const toogleConfirm = () => {
		setConfirm(!confirm);
	};
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
							onPress={() => navigation.goBack()}
						/>
						<Typography type="text24">Payment details</Typography>
					</View>
					<View style={{ width: "22%" }}>
						<CustButton
							sx={{
								width: "100%",
								backgroundColor: colors.white,
								paddingVertical: 13,
							}}
							type="rounded"
							onPress={toogleConfirm}
						>
							<Typography type="text16" sx={{ color: colors.black }}>
								Edit
							</Typography>
						</CustButton>
					</View>
				</View>
				<View style={{ ...styles.card }}>
					<View style={{ gap: 10 }}>
						<Typography type="text16" sx={{ color: colors.white }}>
							Transfer Wise
						</Typography>
						<Typography type="text14" sx={{ color: colors.white }}>
							John Doe
						</Typography>
					</View>
					<View style={styles.delete}>
						<MaterialCommunityIcons
							name="delete-outline"
							size={24}
							color={colors.red}
						/>
					</View>
				</View>
			</InnerWrapper>
			<ConfirmModal
				cancelRef={confirmRef}
				cancelOrder={toogleConfirm}
				modalOpen={confirm}
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
