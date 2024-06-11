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
					if (date.isSame(today, "day")) {
						dateTitle = "Today";
					} else if (date.isSame(yesterday, "day")) {
						dateTitle = "Yesterday";
					} else {
						dateTitle = date.format("dddd, Do MMM YYYY");
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
			<View style={styles.title}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
						paddingVertical:"10%"
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
					<CustButton type="back" color={colors.black} sx={{ opacity: 0 }} />
				</View>
			</View>
			<InnerWrapper>
				<SectionList
					style={styles.flatlist}
					sections={notification}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: "5%" }}
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
						<BlurView intensity={100}>
							<View
								style={{
									paddingVertical: "3%",
								}}
							>
								<Typography
									type="text16"
									sx={{
										color: colors.black,
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
								paddingVertical: "0.5%",
							}}
						></View>
					)}
					renderItem={(item: any) => (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								borderBottomWidth: 1,
								borderColor: colors.grey,
								paddingBottom: 5,
								// backgroundColor:"red"
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
								<View style={{ gap: 10 }}>
									<Typography type="text14" fontfamily={font.DMSans_700Bold}>
										{item?.item?.message}
									</Typography>
									<Typography
										type="text14"
										sx={{
											color: colors.black,
										}}
									>
										{moment(item?.item?.createdAt)?.format(
											"DD/MM/YYYY HH:mm:ss"
										)}
									</Typography>
								</View>
							</View>
						</View>
					)}
					// keyExtractor={({ _id }) => _id}
					ListEmptyComponent={() => (
						<Show>
							<Show.When isTrue={isFetching}>
								<></>
								{/* <Loading title="Fetching notifications" /> */}
							</Show.When>
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
		width: "90%",
		gap: 15,
		paddingBottom: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	flatlist: {
		width: "100%",
		marginBottom: 5,
		height: "100%",
	},
});
