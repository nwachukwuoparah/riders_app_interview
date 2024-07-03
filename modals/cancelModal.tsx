import React, { useEffect } from "react";
import BottomModal from "./index";
import { StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import CustButton from "../components/button";
import LoadingComponent from "../components/loading";
import { handleError } from "../helpers";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { rejectOrder } from "../helpers/mutate";

export default function CancelModal({
	cancelRef,
	cancelOrder,
	modalOpen,
	orderID,
}: any) {
	const queryClient = useQueryClient();

	const { isPending, mutate } = useMutation({
		mutationFn: rejectOrder,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-order" as QueryFilters);
			console.log(data?.data?.data);
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});
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
							mutate({ id: orderID });
						}}
						sx={{ paddingVertical: "3%" }}
					>
						<Typography type="text16" sx={{ color: colors.red }}>
							Cancel anyway
						</Typography>
					</CustButton>
				</View>
			</BottomModal>
			<LoadingComponent display={isPending} />
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
