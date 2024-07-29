import React, { useContext, useEffect, useState } from "react";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import { RefreshControl, SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
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
import moment from "moment";
import { font } from "../../utilities/loadFont";
import { BlurView } from "expo-blur";
import { ROUTE } from "../../constant/route";
const date = new Date();
const data = [
	// Example data
	{
		id: 1,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: date,
	},
	{
		id: 11,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: date,
	},
	{
		id: 12,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: date,
	},
	{
		id: 13,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: date,
	},
	{
		id: 21,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: new Date(date).setDate(date.getDate() - 1),
	},
	{
		id: 22,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: new Date(date).setDate(date.getDate() - 1),
	},
	{
		id: 23,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: new Date(date).setDate(date.getDate() - 1),
	},
	{
		id: 3,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-22T10:30:00Z',
	},
	{
		id: 4,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-21T10:30:00Z',
	},
	{
		id: 5,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-20T10:30:00Z',
	},
	{
		id: 55,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-20T10:30:00Z',
	},
	{
		id: 56,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-20T10:30:00Z',
	},
	{
		id: 6,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-19T10:30:00Z',
	},
	{
		id: 66,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-19T10:30:00Z',
	},
	{
		id: 67,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-19T10:30:00Z',
	},
	{
		id: 7,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-18T10:30:00Z',
	},
	{
		id: 77,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-18T10:30:00Z',
	},
	{
		id: 78,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-18T10:30:00Z',
	},
	{
		id: 8,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-17T10:30:00Z',
	},
	{
		id: 9,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-16T10:30:00Z',
	},
	{
		id: 10,
		title: 'Order Shipped',
		message: 'Your order #123456 has been shipped and is on its way!',
		createdAt: '2024-07-15T10:30:00Z',
	},

] || [];

export default function Notification({navigation}:any) {
	const [notification, setNotification] = useState<any>([]);


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
			const notifications = data;

			const grouped = notifications.reduce(
				(
					acc: { [x: string]: any[] },
					notification: { createdAt: string | number | Date }
				) => {
					const date = moment(notification?.createdAt).startOf("day");
					let dateTitle;
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
	}, []);

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
							refreshing={false}
							onRefresh={() => {

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
						<TouchableOpacity onPress={() => { navigation.navigate(ROUTE.ORDERS) }}>
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
						</TouchableOpacity>
					)}
					keyExtractor={({ id }) => id
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
