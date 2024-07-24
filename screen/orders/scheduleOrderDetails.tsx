import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import Ordercard from "../../components/orderCard";
import ConfirmModal from "../../modals/confirmModal";
import { useQuery } from "@tanstack/react-query";
import { getDailyScheduleItem } from "../../helpers/query";
import { handleError } from "../../helpers";
import Show from "../../components/show";
import OrderClock from "../../assets/svg/orderClock.svg"
import LoadingComponent from "../../components/loading";

export default function ScheduleOrderDetails({ navigation, route }: any) {
	const [confirm, setConfirm] = useState(false);

	const toogleConfirm = (id: string) => {
		setConfirm(!confirm);
	};

	const { data, isFetching, error, refetch } = useQuery({
		queryKey: ["get-DailyScheduleItem", route?.params?._id],
		queryFn: getDailyScheduleItem,
		staleTime: 600000
	});

	useEffect(() => {
		if (error) {
			handleError(error)
		}
	}, [data, isFetching]);

	return (
		<Container>
			<InnerWrapper sx={{ gap: 30, flex: 7 }}>
				<View style={styles.title}>
					<CustButton
						type="back"
						sx={{ color: colors.white }}
						onPress={() => navigation.goBack()}
					/>
					<Typography type="text24">Order details</Typography>
				</View>
				<Show>
					<Show.When isTrue={data !== undefined && route?.params?.schedule}>
						<Ordercard item={route?.params} navigation={navigation} />
						<ConfirmModal
							closeModal={toogleConfirm}
							modalOpen={confirm}
							orderID={route?.params?._id}
							orderType={route?.params.schedule}
							day={data?.data?.day}
						/>
					</Show.When>
					<Show.Else>
						<View style={{ flex: 1, alignItems: "center", marginTop: "20%" }}>
							<OrderClock />
							<Typography type="text24" sx={{ color: colors.white }}>
								Not yet time for this order
							</Typography>
							<Typography type="text14" sx={{ color: colors.white, textAlign: "center" }}>
								This delivery is scheduled for{" "}
								<Typography type="text16" sx={{ color: colors.yellow }}>
									01:00pm{"  "}
									<Typography type="text16" sx={{ color: colors.white }}>
										on{"  "}
									</Typography>
									25th March, 2024.
								</Typography>
							</Typography>
						</View>
					</Show.Else>
				</Show>

			</InnerWrapper>

			<Show.When isTrue={true}>
				<View style={styles.buttonCont}>
					<CustButton type="rounded" onPress={() => setConfirm(!confirm)}>
						<Typography type="text16" sx={{ color: colors.black }}>
							I’ve arrived at the restaurant
						</Typography>
					</CustButton>
				</View>
			</Show.When>

			<Show.When isTrue={true}>
				<View style={styles.buttonCont}>
					<CustButton type="rounded" onPress={() => setConfirm(!confirm)}>
						<Typography type="text16" sx={{ color: colors.black }}>
							I’ve picked order up
						</Typography>
					</CustButton>
				</View>
			</Show.When>

			<Show.When isTrue={true}>
				<View style={styles.buttonCont}>
					<CustButton type="rounded" onPress={() => setConfirm(!confirm)}>
						<Typography type="text16" sx={{ color: colors.black }}>
							I’ve arrived to deliver order
						</Typography>
					</CustButton>
				</View>
			</Show.When>

			<Show.When isTrue={true}>
				<View style={styles.buttonCont}>
					<CustButton type="rounded" onPress={() => setConfirm(!confirm)}>
						<Typography type="text16" sx={{ color: colors.black }}>
							Confirm drop off
						</Typography>
					</CustButton>
				</View>
			</Show.When>
			<LoadingComponent display={isFetching} />
		</Container>
	);
};

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	body: {
		width: "100%",
		flexDirection: "row",
	},
	button: {
		width: "25%",
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		borderColor: colors.grey_b,
		alignSelf: "flex-start",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonCont: {
		width: "100%",
		alignItems: "center",
		backgroundColor: colors.black_1,
		paddingTop: 20,
		flex: 1,
		...Platform.select({
			ios: {
				shadowOpacity: 0.1,
				shadowRadius: 0.5,
				shadowColor: "#6C6C6C",
				shadowOffset: { height: -2, width: 0 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
});