import React from "react";
import BottomModal from "./index";
import { StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import CustButton from "../components/button";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
	cacheAuthData,
	clearAuthData,
	getCachedAuthData,
} from "../utilities/storage";

export default function Set_upModal({ setupRef, close, modalOpen }: any) {
	const navigation: any = useNavigation();
	return (
		<BottomModal
			bottomSheetModalRef={setupRef}
			open={modalOpen}
			handleClose={close}
			snapMin="20%"
			snapMax="35%"
		>
			<View style={styles.top}>
				<Typography type="text16" sx={{ color: colors.white }}>
					Continue set up later
				</Typography>
			</View>
			<View style={styles.body}>
				<Typography
					type="text16"
					sx={{ color: colors.white, textAlign: "center" }}
				>
					You won’t be able to get trips if you don’t complete your verification
				</Typography>
				<CustButton type="rounded" onPress={close}>
					<Typography type="text16" sx={{ color: colors.black }}>
						I want to set up now
					</Typography>
				</CustButton>
				<CustButton
					onPress={async () => {
						const { status, ...others } = await getCachedAuthData("user-data");
						await cacheAuthData("user-data", { status: true, ...others });
						clearAuthData("step");
						navigation.dispatch(
							CommonActions?.reset({
								index: 0,
								routes: [
									{
										name: "UserStack",
									},
								],
							})
						);
					}}
					sx={{ paddingVertical: "3%" }}
				>
					<Typography type="text16" sx={{ color: colors.white }}>
						I’ll set up later in my settings
					</Typography>
				</CustButton>
			</View>
		</BottomModal>
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
