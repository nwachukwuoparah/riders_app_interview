import {
	View,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	RefreshControl,
} from "react-native";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import CustButton from "../../components/button";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import moment from "moment";
import Share from "../../assets/svg/share.svg";
import PointStar from "../../assets/svg/pointStar.svg";
import Show from "../../components/show";
import EmptyState from "../../components/emptyState";
import ProfileCard from "../../components/profile";
import { openShareModal } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { getPointHistory } from "../../helpers/query";
import { useContext, useEffect } from "react";
import { UserContext } from "../../components/contex/userContex";

const Referal = ({ navigation }: any) => {
	const { userData } = useContext(UserContext);

	const { data, isFetching, error, refetch } = useQuery({
		queryKey: ["get-point-history"],
		queryFn: getPointHistory,
		staleTime: 600000,
	});

	const onRefresh = async () => {
		refetch();
	};


	useEffect(() => {
		console.log(data);
		console.log(isFetching);
	}, [data,isFetching])

	return (
		<Container>
			<View
				style={{
					width: wp("90%"),
					height: "10%",
					justifyContent: "space-between",
					marginTop: 20,
				}}
			>
				<CustButton
					type="back"
					onPress={() => navigation.goBack()}
					color={colors.white}
				/>
				<Typography
					type="text24"
					sx={{
						color: colors.white,
						marginBottom: 10,
					}}
				>
					Invite friends and earn
				</Typography>
				<View style={styles.profile_top}></View>
			</View>

			<InnerWrapper
				sx={{
					width: "100%",
				}}
			>
				<View
					style={{
						width: "100%",
						alignItems: "center",
						gap: 20,
						marginTop: 5,
					}}
				>
					<ImageBackground
						source={require("../../assets/pointImage.png")}
						imageStyle={{ objectFit: "fill" }}
						style={{
							...styles.point_dash,
							backgroundColor: colors.black_1,
						}}
					>
						<PointStar />
						<View>
							<Typography
								type="text16"
								sx={{
									color: colors.white,
								}}
							>
								Total points earned
							</Typography>
							<Typography
								type="text24"
								sx={{
									color: colors.white,
								}}
							>
								{data?.data?.data?.currentTotalPoint} pts
							</Typography>
						</View>
					</ImageBackground>

					<View
						style={{
							...styles.point_shear,
							backgroundColor: colors.grey_a,
							borderWidth: 0.2,
							borderColor: colors.yellow,
						}}
					>
						<View style={{ gap: 5, justifyContent: "center" }}>
							<Typography
								type="text14"
								sx={{
									color: colors.white,
								}}
							>
								Referral code:
							</Typography>
							<Typography
								type="text20"
								sx={{
									color: colors.white,
								}}
							>
								{userData?.referralCode}
							</Typography>
						</View>
						<TouchableOpacity
							onPress={() => {
								openShareModal(userData?.referralCode);
							}}
							style={{
								width: 55,
								height: 55,
								backgroundColor: colors.yellow,
								borderRadius: 30,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Share />
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.body}>
					<Typography
						type="text16"
						sx={{
							color: colors.white,
							marginVertical: 10,
						}}
					>
						Point history
					</Typography>

					<FlatList
						style={{ height: "57%", width: "100%" }}
						data={data?.data?.data?.pointHistory}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ gap: 20, paddingBottom: 150 }}
						refreshControl={
							<RefreshControl
								refreshing={false}
								onRefresh={onRefresh}
								colors={[colors.yellow]}
								tintColor={colors.yellow}
							/>
						}
						renderItem={(item: any) => <ProfileCard type="wallet" />}
						keyExtractor={({ _id }) => _id}
						ListEmptyComponent={() => (
							<Show>
								<Show.When isTrue={!true}>
									<>
										<Typography
											type="text14"
											sx={{
												color: colors.white,
											}}
										>
											loading...
										</Typography>
									</>
									{/* <Load title="Fetching vendor" /> */}
								</Show.When>
								<Show.Else>
									<EmptyState
										top="15%"
										onRefresh={onRefresh}
										title="You have no points Invite friends and earn "
										message="swipe down to refresh"
									/>
								</Show.Else>
							</Show>
						)}
					/>
				</View>
			</InnerWrapper>
		</Container>
	);
};

const styles = StyleSheet.create({
	profile_top: {
		width: "10%",
	},
	body: {
		marginTop: 20,
		width: "90%",
		alignSelf: "center",
	},
	point_dash: {
		width: "90%",
		height: hp("12%"),
		borderRadius: 20,
		alignItems: "center",
		paddingHorizontal: "4%",
		flexDirection: "row",
		borderWidth: 1,
		borderColor: colors.yellow,
		gap: 10,
	},
	point_shear: {
		width: "90%",
		borderRadius: 40,
		justifyContent: "space-between",
		paddingVertical: "3%",
		paddingHorizontal: "10%",
		flexDirection: "row",
	},
});

export default Referal;
