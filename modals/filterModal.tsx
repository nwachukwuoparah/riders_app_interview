import React from "react";
import BottomModal from "./index";
import { StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import CustButton from "../components/button";
import { InputComponent } from "../components/input";
import { Ionicons } from "@expo/vector-icons";

export default function FilterModal({
	cancelRef,
	cancelOrder,
	modalOpen,
}: any) {
	return (
		<BottomModal
			bottomSheetModalRef={cancelRef}
			open={modalOpen}
			handleClose={cancelOrder}
			snapMin="25%"
			snapMax="45%"
		>
			<View style={styles.top}>
				<Typography type="text16" sx={{ color: colors.white }}>
					Apply filters
				</Typography>
				<Typography type="text16" sx={{ color: colors.yellow }}>
					Reset
				</Typography>
			</View>

			<View style={styles.body}>
				<View style={{ width: "90%", gap: 15 }}>
					<Typography type="text16" sx={{ color: colors.white }}>
						Apply filters
					</Typography>
					<View style={{ flexDirection: "row", gap: 20 }}>
						<View style={styles.order}>
							<Typography type="text16" sx={{ color: colors.white }}>
								Scheduled orders
							</Typography>
							<Ionicons name="close-sharp" size={24} color={colors.white} />
						</View>
						<View style={styles.order}>
							<Typography type="text16" sx={{ color: colors.white }}>
								Normal orders
							</Typography>
						</View>
					</View>
				</View>
				<View style={{ width: "90%", gap: 15 }}>
					<InputComponent
						label="Filter by date"
						type="date"
						mode="date"
						onChange={() => {}}
					/>
					<CustButton
						type="rounded"
						onPress={cancelOrder}
						sx={{ width: "100%" }}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Apply filters
						</Typography>
					</CustButton>
				</View>
			</View>
		</BottomModal>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "space-between",
		backgroundColor: colors.grey_a,
		paddingBottom: 15,
	},
	body: {
		width: "100%",
		backgroundColor: colors.black_1,
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
	},
	order: {
		borderWidth: 1,
		borderColor: colors.yellow,
		padding: 10,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		backgroundColor: colors.grey_a,
	},
});