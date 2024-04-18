import React, { useContext } from "react";
import { ScrollContainer } from "../container";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import colors from "../../constant/theme";
import Typography from "../typography";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Empty_State from "../../assets/svg/emptyState.svg";

export default function EmptyState({
	title,
	message,
	onRefresh,
	top,
}: {
	title: string;
	message: string;
	onRefresh: () => void;
	top?: string;
}) {
	return (
		<>
			<ScrollContainer
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={onRefresh}
						colors={[colors.yellow]}
						tintColor={colors.yellow}
					/>
				}
				innerStyles={{
					alignItems: "center",
					marginTop: top,
					gap: 20,
				}}
			>
				<Empty_State />
				<View style={styles.order}>
					<Typography
						type="text20"
						sx={{
							color: colors.grey_c,
							textAlign: "center",
						}}
					>
						{title}
					</Typography>
					<Typography
						type="text16"
						sx={{
							color: colors.grey_b,
						}}
					>
						{message}
					</Typography>
				</View>
			</ScrollContainer>
		</>
	);
}

const styles = StyleSheet.create({
	order: {
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},
});
