import React, { useEffect, useRef, useState } from "react";
import {
	FlatList,
	Pressable,
	RefreshControl,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import WalletModal from "../../modals/walletModal";
import PointStar from "../../assets/svg/pointStar.svg";
import Show from "../../components/show";
import EmptyState from "../../components/emptyState";
import ProfileCard from "../../components/profile";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getWallet } from "../../helpers/query";
import { handleError } from "../../helpers";

export default function Wallet({ navigation }: any) {
	const [type, setType] = useState("available");
	const [openModal, setModal] = useState(false);
	const modalRef = useRef(null);

	const { data, isFetching, error, refetch } = useQuery({
		queryKey: ["get-wallet"],
		queryFn: getWallet,
		staleTime: 600000,
	});

	const {
		data: transa_data,
		isFetching: transa_fetching,
		error: transa_Error,
		refetch: transa_refetch,
	} = useQuery({
		queryKey: ["get-transaction"],
		queryFn: getTransactions,
		staleTime: 300000,
	});

	useEffect(() => {
		if (error) {
			handleError(error);
		}
		if (transa_Error) {
			handleError(transa_Error);
		}
	}, [error, transa_Error]);

	const onRefresh = () => {
		refetch();
		transa_refetch();
	};

	const toogleModal = () => {
		setModal(!openModal);
	};

	useEffect(() => {
		console.log(JSON.stringify(transa_data?.data, null, 2)); 
	}, []); 

	return (
		<Container>
			<InnerWrapper sx={{ gap: 25 }}>
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
							setType("available");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor: type === "available" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Available</Typography>
					</TouchableOpacity>

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
				</View>
				<View
					style={{
						...styles.point_dash,
						backgroundColor: colors.grey_a,
					}}
				>
					<PointStar />
					<Show>
						<Show.When isTrue={type === "available"}>
							<View style={{ gap: 10 }}>
								<Typography
									type="text16"
									sx={{
										color: colors.white,
									}}
								>
									Your available balance
								</Typography>
								<Typography
									type="text24"
									sx={{
										color: colors.white,
									}}
								>
									£{" "}
									{data?.data?.data
										? new Intl.NumberFormat("en-US").format(
												data?.data?.data?.wallet
										  )
										: "---"}
								</Typography>
							</View>
						</Show.When>
						<Show.Else>
							<View style={{ gap: 10, width: "80%" }}>
								<Typography
									type="text16"
									sx={{
										color: colors.white,
									}}
								>
									Your pending balance
								</Typography>
								<Typography
									type="text16"
									sx={{
										color: colors.white,
									}}
								>
									You’ll get this after completing all pending orders
								</Typography>
								<Typography
									type="text24"
									sx={{
										color: colors.white,
									}}
								>
									£{" "}
									{transa_data?.data
										? new Intl.NumberFormat("en-US").format(
												transa_data?.data?.pendingOrderAmount
										  )
										: "---"}
								</Typography>
							</View>
						</Show.Else>
					</Show>
				</View>
				<Show>
					<Show.When isTrue={type === "available"}>
						<CustButton
							onPress={toogleModal}
							type="rounded"
							sx={{
								width: "100%",
							}}
						>
							<Typography type="text16" sx={{ color: colors.black }}>
								Withdraw from wallet
							</Typography>
						</CustButton>
						<View style={{ gap: 10 }}>
							<Typography
								type="text16"
								sx={{
									color: colors.white,
								}}
							>
								Withdrawal history
							</Typography>

							<FlatList
								style={{ height: "57%", width: "100%" }}
								data={transa_data?.data?.data}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{
									gap: 5,
									paddingBottom: 160,
								}}
								refreshControl={
									<RefreshControl
										refreshing={transa_fetching}
										onRefresh={onRefresh}
										colors={[colors.yellow]}
										tintColor={colors.yellow}
									/>
								}
								renderItem={(item: any) => (
									<Pressable
										onPress={() => {
											console.log(item);
										}}
									>
										<ProfileCard {...item?.item} />
									</Pressable>
								)}
								keyExtractor={({ _id }) => _id}
								ListEmptyComponent={() => (
									<Show>
										<Show.Else>
											<EmptyState
												onRefresh={onRefresh}
												title="You have no points Invite friends and earn "
												message="swipe down to refresh"
											/>
										</Show.Else>
									</Show>
								)}
							/>
						</View>
					</Show.When>
				</Show>
			</InnerWrapper>
			<WalletModal
				cancelRef={modalRef}
				close={toogleModal}
				modalOpen={openModal}
				navigation={navigation}
				balance={data?.data?.data?.wallet}
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
	point_dash: {
		width: "100%",
		borderRadius: 20,
		alignItems: "center",
		paddingHorizontal: "4%",
		paddingVertical: "5%",
		flexDirection: "row",
		borderWidth: 1,
		borderColor: colors.yellow,
		gap: 10,
	},
});
