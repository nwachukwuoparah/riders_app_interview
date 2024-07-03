import React, { useContext, useEffect } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	ScrollContainer,
} from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { font } from "../../utilities/loadFont";
import Expand_more from "../../assets/svg/expand_more.svg";
import OverviewIcon from "../../assets/svg/overviewIcon.svg";
import {
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getOverview } from "../../helpers/query";
import { updateUser } from "../../helpers/mutate";
import { handleError } from "../../helpers";
import { UserContext } from "../../components/contex/userContex";

export default function Overview({ navigation }: any) {
	const queryClient = useQueryClient();
	const { userData, isPending, mutate } = useContext(UserContext);

	const { data, isFetching, error, refetch } = useQuery({
		queryKey: ["get-overview"],
		queryFn: getOverview,
		staleTime: 600000,
	});

	return (
		<Container>
			<InnerWrapper sx={{ gap: 25, flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.title}>
						<Typography type="text24">My activity overview</Typography>
						<Typography type="text16">
							Track your earnings and rides here
						</Typography>
					</View>
					<CustButton
						type="bell"
						color={colors.white}
						onPress={() => navigation.navigate("notification")}
					/>
				</View>
				<ScrollContainer
					innerStyles={{ gap: 20 }}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							onRefresh={() => refetch()}
							colors={[colors.yellow]}
							tintColor={colors.yellow}
						/>
					}
				>
					<View style={styles.body}>
						<View style={styles.action}>
							<View style={styles.status}>
								<Typography type="text16" sx={{ color: colors.black }}>
									Status:{" "}
									<Typography
										type="text16"
										sx={{ color: colors.black }}
										fontfamily={font.DMSans_700Bold}
									>
										{userData?.status === "on-line" ? "Online" : "Offline"}
									</Typography>
								</Typography>
							</View>
							<View
								style={{
									...styles.status,
									backgroundColor: colors.grey_a,
									flexDirection: "row",
									alignItems: "center",
									gap: 5,
								}}
							>
								<Typography type="text16" sx={{ color: colors.white }}>
									This week
								</Typography>
								<Expand_more />
							</View>
						</View>
						<View
							style={{
								...styles.card_contain,
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
								marginTop: 10,
							}}
						>
							<View style={styles.card}>
								<OverviewIcon />
								<Typography type="text14">Total amount earned</Typography>
								<Typography type="text20">
									£ {isFetching ? "---" : data?.data?.data?.totalAmountEarned}
								</Typography>
							</View>
							<View style={styles.card}>
								<OverviewIcon />
								<Typography type="text14">Total pending orders</Typography>
								<Typography type="text20">
									{isFetching ? "---" : data?.data?.data?.totalPendingOrders}
								</Typography>
							</View>
						</View>
						<View style={{ ...styles.card_contain }}>
							<View style={styles.card}>
								<OverviewIcon />
								<Typography type="text14">Total amount collected</Typography>
								<Typography type="text20">
									£{" "}
									{isFetching ? "---" : data?.data?.data?.totalAmountCollected}
								</Typography>
							</View>
							<View style={styles.card}>
								<OverviewIcon />
								<Typography type="text14">Total distance covered</Typography>
								<Typography type="text20">
									{isFetching ? "---" : data?.data?.data?.totalDistanceCovered}{" "}
									km
								</Typography>
							</View>
						</View>
						<View
							style={{
								...styles.card_contain,
								borderBottomLeftRadius: 20,
								borderBottomRightRadius: 20,
							}}
						>
							<View style={styles.card}>
								<OverviewIcon />
								<Typography type="text14">Total orders delivered</Typography>
								<Typography type="text20">
									{isFetching ? "---" : data?.data?.data?.totalOrdersDelivered}
								</Typography>
							</View>
							<View style={styles.card}>
								<OverviewIcon />
								<Typography type="text14">Total time spent</Typography>
								<Typography type="text20">
									{isFetching ? "---" : data?.data?.data?.totalTimeSpent} m
								</Typography>
							</View>
						</View>
					</View>
					<View style={styles.buttonCont}>
						<CustButton
							type="rounded"
							onPress={() => {
								if (userData?.status === "on-line") {
									mutate({ status: "off-line" });
								} else {
									mutate({ status: "on-line" });
								}
							}}
						>
							<Typography type="text16" sx={{ color: colors.black }}>
								{userData?.status === "on-line"
									? "Go offline"
									: isPending
									? "Updating. . . . ."
									: "Go online"}
							</Typography>
						</CustButton>
					</View>
				</ScrollContainer>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	body: {
		flex: 1,
		gap: 10,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
	},
	action: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	status: {
		paddingHorizontal: 15,
		paddingVertical: 6,
		backgroundColor: colors.tint,
		borderRadius: 50,
		justifyContent: "center",
	},
	card_contain: {
		width: "100%",
		flex: 1,
		flexDirection: "row",
		overflow: "hidden",
		justifyContent: "space-between",
	},
	card: {
		backgroundColor: colors.grey_a,
		padding: "6%",
		width: "48.5%",
		gap: 7,
	},
});
