import React, { useRef, useState } from "react";
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
import WalletModal from "../../modals/walletModal";
import PointStar from "../../assets/svg/pointStar.svg";
import Show from "../../components/show";
import EmptyState from "../../components/emptyState";
import ProfileCard from "../../components/profile";

export default function Wallet({ navigation }: any) {
	const [type, setType] = useState("pending");
	const [openModal, setModal] = useState(false);
	const modalRef = useRef(null);

	const toogleModal = () => {
		setModal(!openModal);
	};

	const onRefresh = () => {};

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
					<CustButton type="bell" color={colors.white} onPress={() => navigation.navigate("notification")} />
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
									£ 250
								</Typography>
							</View>
						</Show.When>
						<Show.Else>
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
									£ 1,800
								</Typography>
							</View>
						</Show.Else>
					</Show>
				</View>
				<Show>
					<Show.When isTrue={type !== "available"}>
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
								data={[1, 2, 3, 4, 5, 6, 7]}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{
									gap: 5,
									paddingBottom: 160,
								}}
								refreshControl={
									<RefreshControl
										refreshing={false}
										onRefresh={onRefresh}
										colors={[colors.yellow]}
										tintColor={colors.yellow}
									/>
								}
								renderItem={(item: any) => <ProfileCard />}
								// keyExtractor={({ _id }) => _id}
								ListEmptyComponent={() => (
									<Show>
										{/* <Show.When isTrue={!true}>
									<Loading title="Fetching vendor" />
								</Show.When> */}
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
