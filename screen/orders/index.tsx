import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import EmptyOrder from "../../assets/svg/emptyOrder.svg";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Show from "../../components/show";
import Ordercard from "../../components/orderCard";
import { Ionicons } from "@expo/vector-icons";
import CancelModal from "../../modals/cancelModal";
import FilterModal from "../../modals/filterModal";
import ConfirmModal from "../../modals/confirmModal";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../helpers/query";
import { getCachedAuthData } from "../../utilities/storage";
import { handleError } from "../../helpers";

export default function Order({ navigation }: any) {
	const [type, setType] = useState("pending");
	const [cancel, setCancel] = useState(false);
	const [displayFilter, setDisplayFilter] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const cancelRef = useRef(null);
	const filterRef = useRef(null);
	const confirmRef = useRef(null);
	const [filter, setFilter] = useState(
		`?schedule=false`
	);
	const { data, isFetching, error } = useQuery({
		queryKey: ["get-order", filter],
		queryFn: getOrders,
		// staleTime: 600000,
	});

	const cancelOrder = () => {
		setCancel(!cancel);
		setDisplayFilter(displayFilter);
		setConfirm(false);
	};
	const toogleFilter = () => {
		setDisplayFilter(!displayFilter);
		setCancel(false);
		setConfirm(false);
	};
	const toogleConfirm = () => {
		setConfirm(!confirm);
		setDisplayFilter(false);
		setCancel(false);
	};

	useEffect(() => {
		if (error) {
			handleError(error);
		}
	}, [error]);

	useEffect(() => {
		(async () => {
			if (!displayFilter) {
				const data = await getCachedAuthData("filter-data");
				if (data !== undefined && type === "pending") {
					setFilter(`?schedule=${data?.status}&createdAt=${data?.date}`);
				} else {
					setFilter(
						`?schedule=${data?.status}&createdAt=${data?.date}&riderStatus=${type}`
					);
				}
			}
		})();
	}, [displayFilter, type]);

	useEffect(() => {
		console.log(data?.data?.data);
	}, [data]);

	return (
		<Container>
			<InnerWrapper sx={{ gap: 30, flex: 1 }}>
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
				<View style={styles.body}>
					<TouchableOpacity
						onPress={() => {
							setType("pending");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor: type === "pending" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Pending</Typography>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setType("on-going");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor: type === "on-going" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Ongoing</Typography>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setType("completed");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor: type === "completed" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Completed</Typography>
					</TouchableOpacity>
				</View>
				<CustButton
					onPress={toogleFilter}
					type="rounded"
					sx={{
						width: "100%",
						paddingVertical: "3.5%",
						backgroundColor: colors.tint,
						flexDirection: "row",
						gap: 10,
					}}
				>
					<Ionicons name="filter-outline" size={24} color="black" />
					<Typography type="text14" sx={{ color: colors.black }}>
						Filter orders
					</Typography>
				</CustButton>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={{
						// flex: 1,
						width: "100%",
					}}
					contentContainerStyle={{
						gap: 30,
						paddingTop: "2%",
						paddingBottom: "15%",
					}}
					data={data?.data?.data}
					renderItem={({ item }: any) => (
						<Ordercard
							onPress={() => navigation.navigate("orderDetails")}
							type={type}
							cancel={cancelOrder}
							confirm={toogleConfirm}
						/>
					)}
					// keyExtractor={(item) => item?._id}
					// refreshControl={
					// 	<RefreshControl
					// 		refreshing={isFetching}
					// 		onRefresh={onRefresh}
					// 		colors={[appColors.yellow]}
					// 		tintColor={appColors.yellow}
					// 	/>
					// // }
					ListEmptyComponent={() => (
						<View
							style={{
								alignItems: "center",
								alignSelf: "center",
								justifyContent: "center",
								marginTop: 30,
							}}
						>
							<EmptyOrder width={wp("70%")} height={hp("35%")} />
							<Typography type="text16" sx={{ textAlign: "center" }}>
								You have no ongoing order at the moment, stay online to receive
								trip requests
							</Typography>
						</View>
					)}
				/>
			</InnerWrapper>
			<CancelModal
				cancelRef={cancelRef}
				cancelOrder={cancelOrder}
				modalOpen={cancel}
			/>
			<FilterModal
				filterRe={filterRef}
				closeFilter={toogleFilter}
				modalOpen={displayFilter}
			/>
			<ConfirmModal
				cancelRef={confirmRef}
				cancelOrder={toogleConfirm}
				modalOpen={confirm}
			/>
		</Container>
	);
}

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
	filter: {},
});
