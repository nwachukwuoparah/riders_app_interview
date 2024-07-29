import React, { useEffect } from "react";
import BottomModal from "./index";
import { Alert, StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import CustButton from "../components/button";
import LoadingComponent from "../components/loading";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { clearAuthData } from "../utilities/storage";

export default function CancelModal({
	cancelRef,
	cancelOrder,
	modalOpen,
	orderID,
}: any) {
	const queryClient = useQueryClient();

	return (
		<>
			<BottomModal
				bottomSheetModalRef={cancelRef}
				open={modalOpen}
				handleClose={cancelOrder}
				snapMin="20%"
				snapMax="35%"
			>
				<View style={styles.top}>
					<Typography type="text16" sx={{ color: colors.red }}>
						Cancel order
					</Typography>
				</View>
				<View style={styles.body}>
					<Typography
						type="text16"
						sx={{ color: colors.white, textAlign: "center" }}
					>
						If you cancel this order, you will not be paid any cancellation fee
					</Typography>
					<CustButton type="rounded" onPress={() => cancelOrder()}>
						<Typography type="text16" sx={{ color: colors.black }}>
							I don’t want to cancel
						</Typography>
					</CustButton>
					<CustButton
						onPress={() => {
						
						}}
						sx={{ paddingVertical: "3%" }}
					>
						<Typography type="text16" sx={{ color: colors.red }}>
							Cancel anyway
						</Typography>
					</CustButton>
				</View>
			</BottomModal>
		</>
	);
}

const styles = StyleSheet.create({
	top: {
		flex: 0.4,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.grey_a,
	},
	body: {
		backgroundColor: colors.black_1,
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
	},
});
