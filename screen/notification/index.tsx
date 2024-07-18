import React, { useContext, useEffect, useState } from "react";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import { RefreshControl, SectionList, StyleSheet, View } from "react-native";
import colors from "../../constant/theme";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Bell from "../../assets/svg/bellTag.svg";
import CustButton from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import Show from "../../components/show";
import LoadingComponent from "../../components/loading";
import EmptyState from "../../components/emptyState";
import moment from "moment";
import { font } from "../../utilities/loadFont";
import { BlurView } from "expo-blur";
import { getNotification } from "../../helpers/mutate";

export default function Notification() {
	const navigation = useNavigation();
	const [notification, setNotification] = useState<any>([]);

	const { data, isFetching, error, refetch } = useQuery({
		queryKey: ["get-notification"],
		queryFn: getNotification,
		staleTime: 600000,
	});

	const formatTimestamp = (timestamp: Date) => {
		const now = moment();
		const createdAt = moment(timestamp);
		const diffMinutes = now.diff(createdAt, 'minutes');
		const diffHours = now.diff(createdAt, 'hours');

		if (diffMinutes < 1) {
			return 'just now';
		} else if (diffMinutes < 60) {
			return `${diffMinutes}min ago`;
		} else if (diffHours < 5) {
			return `${diffHours}h ago`;
		} else {
			return createdAt.format('hh:mma');
		}
	};

	useEffect(() => {
		(() => {
			const today = moment().startOf("day");
			const yesterday = moment().subtract(1, "days").startOf("day");

			// Ensure data?.data?.data is an array
			const notifications = data?.data?.data || [];

			const grouped = notifications.reduce(
				(
					acc: { [x: string]: any[] },
					notification: { createdAt: string | number | Date }
				) => {
					const date = moment(notification?.createdAt).startOf("day");
					let dateTitle;
					console.log(notification?.createdAt);

					// Custom date formatting based on conditions
					if (date.isSame(today, "day")) {
						dateTitle = `Today, ${date.format("Do MMM YYYY")}`;
					} else if (date.isSame(yesterday, "day")) {
						dateTitle = `Yesterday, ${date.format("Do MMM YYYY")}`;
					} else {
						dateTitle = `${date.format("dddd")}, ${date.format("Do MMM YYYY")}`;
					}

					if (!acc[dateTitle]) {
						acc[dateTitle] = [];
					}
					acc[dateTitle].push(notification);
					return acc;
				},
				{}
			);

			const result = Object.keys(grouped).map((dateTitle) => ({
				title: dateTitle,
				data: grouped[dateTitle],
			}));

			setNotification(result);
		})();
	}, [data]);

	return (
		<Container>
			<InnerWrapper>
				<View style={styles.title}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<CustButton
							type="back"
							onPress={() => {
								navigation.goBack();
							}}
							color={colors.white}
						/>
						<Typography type="text20" sx={{ color: colors.white }}>
							Notifications
						</Typography>
						<CustButton
							type="back"
							color={colors.white}
							sx={{ opacity: 0 }}
						/>
					</View>
				</View>
				<SectionList
					style={styles.flatlist}
					sections={notification}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: "20%" }}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							onRefresh={() => {
								refetch();
							}}
							colors={[colors.yellow]}
							tintColor={colors.yellow}
						/>
					}
					renderSectionHeader={({ section: { title } }) => (
						<BlurView intensity={10}>
							<View
								style={{
									paddingVertical: "3%",
								}}
							>
								<Typography
									type="text16"
									sx={{
										color: colors.white,
									}}
								>
									{title}
								</Typography>
							</View>
						</BlurView>
					)}
					SectionSeparatorComponent={() => (
						<View
							style={{
								paddingVertical: "1%",
							}}
						></View>
					)}
					ItemSeparatorComponent={() => (
						<View
							style={{
								paddingVertical: "0.9%",
							}}
						></View>
					)}
					renderItem={(item: any) => (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								borderWidth: 0.5,
								borderColor: colors.grey,
								paddingVertical: 10,
								paddingHorizontal: 10,
								backgroundColor: colors.grey_a,
								borderRadius: 10
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 7,
									paddingVertical: 3,
								}}
							>
								<Bell width={wp("10%")} height={hp("3.5%")} />
								<View style={{ gap: 10, width: "85%" }}>
									<Typography type="text14" fontfamily={font.DMSans_700Bold}>
										{item?.item?.message}
									</Typography>
									<Typography
										type="text14"
										sx={{
											color: colors.white,
										}}
									>
										{formatTimestamp(item?.item?.createdAt)}
									</Typography>
								</View>
							</View>
						</View>
					)}
					keyExtractor={({ _id }) => _id
					}
					ListEmptyComponent={() => (
						<Show>
							<Show.Else>
								<View
									style={{
										flex: 1,
										width: "90%",
										alignSelf: "center",
										marginTop: "50%",
									}}
								>
									<EmptyState
										onRefresh={() => refetch()}
										title="No notification yet"
									/>
								</View>
							</Show.Else>
						</Show>
					)}
				/>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		width: "100%",
		flexDirection: "row",
		paddingBottom: "5%"
	},
	flatlist: {
		width: "100%",
		marginBottom: 5,
		height: "100%",
	},
});
