import React from "react";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import { StyleSheet, View } from "react-native";
import colors from "../../constant/theme";
import LocationIcon from "../../assets/svg/location.svg";
import CustButton from "../../components/button";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Show from "../../components/show";
import { font } from "../../utilities/loadFont";
import RequestCard from "../../components/requestCard";
import MapView from "react-native-maps";

function Home() {
	return (
		<Container>
			{/* <MapView
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			/> */}
			<InnerWrapper sx={{ flex: 1 }}>
				<View style={styles.search}>
					<LocationIcon />
					<Typography sx={{ color: colors.white }} type="text16">
						Parkview street, notthingham
					</Typography>
				</View>
				<View style={styles.bottom}>
					<Show>
						<Show.When isTrue={!true}>
							<RequestCard />
						</Show.When>
						<Show.When isTrue={true}>
							<View style={styles.switch}>
								<CustButton type="rounded" sx={{ width: wp("85%") }}>
									<Typography type="text16" sx={{ color: colors.black }}>
										Go online
									</Typography>
								</CustButton>
								<Typography type="text12">You’re offline</Typography>
							</View>
						</Show.When>
						<Show.Else>
							<View style={styles.finding}>
								<Typography type="text16" fontfamily={font.DMSans_700Bold}>
									Finding a nearby trip for you..........
								</Typography>
							</View>
						</Show.Else>
					</Show>
				</View>
			</InnerWrapper>
		</Container>
	);
}

const styles = StyleSheet.create({
	search: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
		backgroundColor: colors.black,
		paddingVertical: "4.5%",
		borderRadius: 50,
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
	},
	switch: {
		backgroundColor: colors.black,
		padding: 10,
		paddingBottom: 15,
		borderRadius: 20,
		alignItems: "center",
		gap: 5,
	},
	finding: {
		paddingVertical: 25,
		backgroundColor: colors.black,
		alignItems: "center",
		borderRadius: 60,
	},
});

export default Home;
