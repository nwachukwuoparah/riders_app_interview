import React, { useContext, useEffect } from "react";
import BottomModal from "./index";
import { Alert, StyleSheet, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import CustButton from "../components/button";
import { logOut } from "../helpers";
import {
	useQueryClient,
} from "@tanstack/react-query";
import { clearAuthData } from "../utilities/storage";
import { KeyboardView } from "../components/container";
import { UserContext } from "../components/contex/userContex";
import Show from "../components/show";

export default function DeleteModal({
	deleteRef,
	modalOpen,
	closeModal,
	navigation,
	CommonActions,
	type
}: any) {
	const onSubmit = () => {
		Alert.alert("Message", "Account deleted successfully")
		logOut(navigation, CommonActions)
	}

	return (
		<>
			<BottomModal
				bottomSheetModalRef={deleteRef}
				open={modalOpen}
				handleClose={closeModal}
				snapMin="20%"
				snapMax={type !== "bank" ? "32%" : "25%"}
			>
				<KeyboardView sx={{ flex: 1.2 }}>
					<View style={styles.top}>
						<CustButton
							type="close"
							sx={{ color: colors.white }}
							onPress={closeModal}
						/>
						<Show>
							<Show.When isTrue={type === "bank"}>
								<Typography type="text16" sx={{ color: colors.white }}>
									"Delete bank information"
								</Typography>
							</Show.When>
							<Show.When isTrue={type === "logout"}>
								<Typography type="text16" sx={{ color: colors.white }}>
									Log me out
								</Typography>
							</Show.When>
							<Show.Else>
								<Typography type="text16" sx={{ color: colors.white }}>
									Delete account
								</Typography>
							</Show.Else>
						</Show>

						<CustButton
							type="close"
							sx={{ color: colors.white, opacity: 0 }}
						/>
					</View>
					<View style={styles.body}>
						<View style={{ alignItems: "center", width: "70%", gap: 5 }}>
							<Show>
								<Show.When isTrue={type === "bank"}>
									<Typography type="text14" sx={{ color: colors.white, textAlign: "center" }}>
										You are totally erasing your bank details
									</Typography>
								</Show.When>
								<Show.When isTrue={type === "logout"}>
									<Typography type="text14" sx={{ color: colors.white, textAlign: "center" }}>
										Are you sure you want to log out? We'd love to have you stay and enjoy our app!
									</Typography>
								</Show.When>
								<Show.Else>
									<Typography type="text14" sx={{ color: colors.white, textAlign: "center" }}>
										You are totally erasing your data and account by deleting your account
									</Typography>
								</Show.Else>
							</Show>
						</View>
						<View style={{ width: "90%", gap: 40 }}>
							<View style={{ gap: 5 }}>
								<Show>
									<Show.When isTrue={type === "logout"}>
										<CustButton
											type="rounded"
											onPress={onSubmit}
											sx={{ width: "100%", backgroundColor: colors.yellow }}
											color={colors.red}
										>
											<Typography type="text16" sx={{ color: colors.black }}>
												I want to logout
											</Typography>
										</CustButton>
										<CustButton
											type="rounded"
											onPress={closeModal}
											sx={{ width: "100%", backgroundColor: "transprant" }}
											color={colors.red}
										>
											<Typography type="text16" sx={{ color: colors.white }}>
												Cancel
											</Typography>
										</CustButton>
									</Show.When>
									<Show.Else>
										<CustButton
											type="rounded"
											onPress={onSubmit}
											sx={{ width: "100%", backgroundColor: colors.red }}
											color={colors.red}
										>
											<Typography type="text16" sx={{ color: colors.white }}>
												Delete my account permanently
											</Typography>
										</CustButton>
									</Show.Else>
								</Show>
								<Show.When isTrue={type !== "bank" && type !== "logout"}>
									<CustButton
										type="rounded"
										onPress={async () => {
											await clearAuthData("user-data");
											logOut(navigation, CommonActions)
										}}
										sx={{ width: "100%", backgroundColor: "transprant" }}
										color={colors.red}
									>
										<Typography type="text16" sx={{ color: colors.white }}>
											I want to logout
										</Typography>
									</CustButton>
								</Show.When>

							</View>
						</View>
					</View>
				</KeyboardView>
			</BottomModal>
		</>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: "5%",
		alignItems: "center",
		paddingBottom: "1%",
		justifyContent: "space-between",
		backgroundColor: colors.grey_a,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	body: {
		width: "100%",
		backgroundColor: colors.black,
		flex: 3,
		alignItems: "center",
		paddingTop: "6%",
		gap: 15,
	},
	order: {
		borderWidth: 1,
		borderColor: colors.yellow,
		padding: 10,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		backgroundColor: colors.grey_a,
	},
});