import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import Ordercard from "../../components/orderCard";
import ConfirmModal from "../../modals/confirmModal";
import { useQuery } from "@tanstack/react-query";
import { getDailyScheduleItem, getProfile } from "../../helpers/query";

export default function Order({ navigation, route }: any) {
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
		console.log("call", JSON.stringify(data?.data?.data, null, 2));
		console.log(isFetching);
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
				<Ordercard item={route?.params} navigation={navigation} />
			</InnerWrapper>

			<View style={styles.buttonCont}>
				<CustButton type="rounded" onPress={() => setConfirm(!confirm)}>
					<Typography type="text16" sx={{ color: colors.black }}>
						Confirm drop off
					</Typography>
				</CustButton>
			</View>

			<ConfirmModal
				closeModal={toogleConfirm}
				modalOpen={confirm}
				orderID={route?.params?._id}
				orderType={route?.params.schedule}
			/>
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