import React from "react";
import { StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { font } from "../../utilities/loadFont";
import Expand_more from "../../assets/svg/expand_more.svg";
import OverviewIcon from "../../assets/svg/overviewIcon.svg";
export default function Overview({ navigation }: any) {
	return (
		<Container>
			<InnerWrapper sx={{ gap: 25, flex: 1 }}>
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
					<CustButton type="bell" color={colors.white} />
				</View>
				<View style={styles.body}>
					<View style={styles.action}>
						<View style={styles.status}>
							<Typography type="text16" sx={{ color: colors.black }}>
								Status:{" "}
								<Typography
									type="text16"
									sx={{ color: colors.black }}
									fontfamily={font.DMSans_700Bold}
								>
									Offline
								</Typography>
							</Typography>
						</View>
						<View
							style={{
								...styles.status,
								backgroundColor: colors.grey_a,
								flexDirection: "row",
								alignItems: "center",
								gap: 5,
							}}
						>
							<Typography type="text16" sx={{ color: colors.white }}>
								This week
							</Typography>
							<Expand_more />
						</View>
					</View>

					<View style={{ ...styles.card_contain }}>
						<View style={styles.card}>
							<OverviewIcon />
							<Typography type="text14">Total amount earned</Typography>
							<Typography type="text20">£900</Typography>
						</View>
						<View style={styles.card}>
							<OverviewIcon />
							<Typography type="text14">Total pending orders</Typography>
							<Typography type="text20">9</Typography>
						</View>
						<View style={styles.card}>
							<OverviewIcon />
							<Typography type="text14">Total amount collected</Typography>
							<Typography type="text20">£500</Typography>
						</View>
						<View style={styles.card}>
							<OverviewIcon />
							<Typography type="text14">Total distance covered</Typography>
							<Typography type="text20">25km</Typography>
						</View>
						<View style={styles.card}>
							<OverviewIcon />
							<Typography type="text14">Total orders delivered</Typography>
							<Typography type="text20">24</Typography>
						</View>
						<View style={styles.card}>
							<OverviewIcon />
							<Typography type="text14">Total time spent</Typography>
							<Typography type="text20">234m</Typography>
						</View>
					</View>
				</View>
				<View style={styles.buttonCont}>
					<CustButton
						type="rounded"
						onPress={() => navigation.navigate("login")}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Go online
						</Typography>
					</CustButton>
				</View>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	body: {
		flex: 1,
		gap: 10,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
	},
	action: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	status: {
		paddingHorizontal: 15,
		paddingVertical: 6,
		backgroundColor: colors.tint,
		borderRadius: 50,
		justifyContent: "center",
	},
	card_contain: {
		width: "100%",
		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		borderRadius: 20,
		overflow: "hidden",
		justifyContent: "space-between",
		gap: 5,
	},
	card: {
		backgroundColor: colors.grey_a,
		padding: "6%",
		width: "49.25%",
		height: "34%",
		gap: 7,
	},
});
