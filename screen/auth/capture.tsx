import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import Camera_ from "../../components/camera";

export default function Capture({ navigation }: any) {
	return (
		<Container>
			<InnerWrapper sx={{ width: "100%",	flex: 1, }}>
				<View style={styles.title}>
					<CustButton
						type="back"
						color={colors.white}
						onPress={() => navigation.goBack()}
					/>
					<Typography type="text24">One step to go</Typography>
					<Typography type="text16">
						We need someone we can reach out to
					</Typography>
					<View style={{ flexDirection: "row", width: "100%", gap: 5 }}>
						{[1, 2, 3, 4, 5].map((i, index) => (
							<View
								key={index}
								style={{
									flex: 1,
									backgroundColor: index < 5 ? colors.tint : colors.grey_a,
									height: 7,
									borderRadius: 5,
								}}
							></View>
						))}
					</View>
				</View>
				<Camera_ />
				<View style={styles.buttonCont}>
					<CustButton
						type="rounded"
						onPress={() => navigation.navigate("UserStack")}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Use photo
						</Typography>
					</CustButton>
					<CustButton
					// onPress={() => navigation.navigate("login")}
					>
						<Typography type="text16">Retake photo</Typography>
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
		marginHorizontal: "5%",
		marginBottom: 10,
	},
	body: {
		marginHorizontal: "5%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	camera: {
		flex: 1,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.black_1,
		paddingTop: 15,
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
