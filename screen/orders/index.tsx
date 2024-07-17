import React, { useEffect, useRef, useState } from "react";
import {
	FlatList,
	RefreshControl,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import EmptyOrder from "../../assets/svg/emptyOrder.svg";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ordercard from "../../components/orderCard";
import { Ionicons } from "@expo/vector-icons";
import CancelModal from "../../modals/cancelModal";
import FilterModal from "../../modals/filterModal";
import ConfirmModal from "../../modals/confirmModal";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../helpers/query";
import { getCachedAuthData } from "../../utilities/storage";
import { handleError } from "../../helpers";
import Show from "../../components/show";

export default function Order({ navigation }: any) {
	const [type, setType] = useState("orderStatus=ready&orderStatus=picked&orderStatus=arrived");
	const [cancel, setCancel] = useState(false);
	const [displayFilter, setDisplayFilter] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [orderID, setOrderId] = useState<string>("");
	const cancelRef = useRef(null);
	const filterRef = useRef(null);
	const [filter, setFilter] = useState(`?schedule=false&orderStatus=ready&orderStatus=picked&orderStatus=arrived`);
	const [filterData, setFilterData] = useState({ status: false });

	const { data, isFetching, error, refetch } = useQuery({
		queryKey: ["get-order", filter],
		queryFn: getOrders,
		staleTime: 600000,
	});

	const cancelOrder = (id: string) => {
		setCancel(!cancel);
		setDisplayFilter(displayFilter);
		setConfirm(false);
		if (id) {
			setOrderId(id);
		}
	};

	const toogleFilter = () => {
		setDisplayFilter(!displayFilter);
		setCancel(false);
		setConfirm(false);
	};

	const toogleConfirm = (id: string) => {
		setConfirm(!confirm);
		setDisplayFilter(false);
		setCancel(false);
		if (id) {
			setOrderId(id);
		}
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
				setFilterData(data);
				if (data !== undefined && type === "orderStatus=ready&orderStatus=picked&orderStatus=arrived") {
					setFilter(`?schedule=${data?.status}&orderStatus=ready&orderStatus=picked&orderStatus=arrived`); //&createdAt=${data?.date}
				} else {
					setFilter(
						`?schedule=${data?.status}&orderStatus=${type}` //&createdAt=${data?.date}
					);
				}
			}
		})();
	}, [displayFilter, type]);

	useEffect(() => {
		// console.log(JSON.stringify(data?.data?.data,null,2));
		console.log(filter);
	}, [filter]);

	useEffect(() => {
		console.log(JSON.stringify(data?.data?.data, null, 2));
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
							setType("orderStatus=ready&orderStatus=picked&orderStatus=arrived");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor: type === "orderStatus=ready&orderStatus=picked&orderStatus=arrived" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Pending</Typography>
					</TouchableOpacity>
					{!filterData?.status && <TouchableOpacity
						onPress={() => {
							setType("in-transit");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor:
								type === "in-transit" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">In transit</Typography>
					</TouchableOpacity>}
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
							onPress={() => navigation.navigate("orderDetails", item)}
							type={type}
							cancel={() => cancelOrder(item?._id)}
							confirm={() => toogleConfirm(item?._id)}
							item={item}
							navigation={navigation}
						/>
					)}
					keyExtractor={(item) => item?._id}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							onRefresh={refetch}
							colors={[colors.yellow]}
							tintColor={colors.yellow}
						/>
					}
					ListEmptyComponent={() => (
						<Show>
							<Show.When isTrue={isFetching}>
								<></>
							</Show.When>
							<Show.Else>
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
										You have no ongoing order at the moment, stay online to
										receive trip requests
									</Typography>
								</View>
							</Show.Else>
						</Show>
					)}
				/>
			</InnerWrapper>
			<CancelModal
				cancelRef={cancelRef}
				cancelOrder={cancelOrder}
				modalOpen={cancel}
				orderID={orderID}
			/>
			<FilterModal
				filterRe={filterRef}
				closeFilter={toogleFilter}
				modalOpen={displayFilter}
			/>
			<ConfirmModal
				closeModal={toogleConfirm}
				modalOpen={confirm}
				orderID={orderID}
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
