import React from "react";
import { StyleSheet, View } from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import Ordercard from "../../components/orderCard";

export default function Order({ navigation }: any) {
	return (
		<Container>
			<InnerWrapper sx={{ gap: 30 }}>
				<View style={styles.title}>
					<CustButton
						type="back"
						sx={{ color: colors.white }}
						onPress={() => navigation.goBack()}
					/>
					<Typography type="text24">Order details</Typography>
				</View>
				<Ordercard />
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
