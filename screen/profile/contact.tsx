import React, { useRef, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	KeyboardView,
	ScrollContainer,
} from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputComponent } from "../../components/input";

export default function Contact({ navigation }: any) {
	const [type, setType] = useState("morning");

	return (
		<KeyboardView>
			<Container>
				<InnerWrapper sx={{ gap: 20, flex: 1 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View style={styles.title}>
							<CustButton
								type="back"
								color={colors.white}
								onPress={() => navigation.goBack()}
							/>
							<Typography type="text24">Contact support</Typography>
						</View>
					</View>
					<ScrollContainer innerStyles={{ gap: 5 }}></ScrollContainer>
				</InnerWrapper>
				<View style={styles.buttonCont}>
					<View
						style={{ width: "95%", flexDirection: "row", alignItems: "center" }}
					>
						<InputComponent
							wrapperStyle={{
								backgroundColor: colors.black_1,
								borderWidth: 0,
								flexDirection: "row-reverse",
							}}
							style={{
								width: "81%",
								backgroundColor: colors.grey_a,
								borderRadius: 20,
								paddingHorizontal: 15,
								paddingTop:10
							}}
							type="text"
							onChange={() => {}}
							placeholder="Type your message"
							multiLine={true}
						>
							<View style={styles.button}>
								<MaterialCommunityIcons name="send" size={24} color="black" />
							</View>
						</InputComponent>
					</View>
				</View>
			</Container>
		</KeyboardView>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},

	button: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: colors.yellow,
		borderRadius: 20,
		alignSelf: "flex-start",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonCont: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		backgroundColor: colors.black_1,
		paddingTop: 15,
		...Platform.select({
			ios: {
				shadowOpacity: 0.1,
				shadowRadius: 0.2,
				shadowColor: "#6C6C6C",
				shadowOffset: { height: -1, width: 0 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
});
