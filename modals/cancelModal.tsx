import React from "react";
import BottomModal from "./index";
import { StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";

export default function CancelModal({
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
			snapMax="30%"
		>
			<View style={styles.top}>
				<Typography type="text16" sx={{ color: "red" }}>
					Cancel order
				</Typography>
			</View>
		</BottomModal>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.grey_a,
	},
});
